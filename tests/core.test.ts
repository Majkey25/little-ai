import test from "node:test";
import assert from "node:assert/strict";
import {
  attentionRow,
  cosine,
  loss,
  predict,
  retrieve,
  softmax,
  train,
  parseProgress,
} from "../src/math.ts";
import { lessons, sources } from "../src/content.ts";
import { tokenBytes } from "../src/tokenBytes.ts";
import { Tiktoken } from "js-tiktoken/lite";
import cl100k from "js-tiktoken/ranks/cl100k_base";
import o200k from "js-tiktoken/ranks/o200k_base";

test("retrieval ranks a missing-country distractor but a metadata filter abstains", () => {
  assert.equal(retrieve("CZ", true, false)[0].id, "cz");
  assert.ok(retrieve("CZ", true, false)[0].score < 1);
  assert.equal(retrieve("CZ", false, false)[0].id, "fr");
  assert.deepEqual(retrieve("CZ", false, true), []);
  assert.equal(retrieve("FR", false, true)[0].id, "fr");
  assert.equal(cosine([1, 0], [0, 1]), 0);
  assert.equal(cosine([0, 0], [1, 0]), 0);
  assert.throws(() => cosine([1], [1, 2]));
});

test("causal attention sums to one and cannot attend to future positions", () => {
  for (let position = 0; position < 5; position++) {
    const row = attentionRow(position);
    assert.ok(Math.abs(row.reduce((a, b) => a + b, 0) - 1) < 1e-12);
    assert.ok(row.slice(position + 1).every((value) => value === 0));
  }
  assert.throws(() => attentionRow(-1));
  assert.throws(() => softmax([1, 2], 0));
  assert.ok(softmax([1, 2, 3], 0.1)[2] > softmax([1, 2, 3], 2)[2]);
});

test("gradient descent reduces real OR loss and learns all four examples", () => {
  const initial: [number, number, number] = [0, 0, 0];
  const trained = train(initial, 1000, 0.8);
  assert.ok(loss(trained) < loss(initial) / 5);
  for (const [x, y, expected] of [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ]) {
    assert.equal(Number(predict(trained, x, y) > 0.5), expected);
  }
  assert.deepEqual(initial, [0, 0, 0]);
  assert.throws(() => train(initial, 1001, 0.8));
});

test("both real encodings preserve Czech, emoji, whitespace and literal special strings byte for byte", () => {
  for (const ranks of [cl100k, o200k]) {
    const encoder = new Tiktoken(ranks);
    const bytes = tokenBytes(ranks);
    for (const input of [
      "Praha je hlavní město České republiky.",
      "😀🧠",
      "",
      "  hello\nworld",
      "<|endoftext|>",
    ]) {
      const ids = encoder.encode(input, [], []);
      const combined = Uint8Array.from(
        ids.flatMap((id) => [...bytes.get(id)!]),
      );
      assert.deepEqual(combined, new TextEncoder().encode(input));
      assert.equal(encoder.decode(ids), input);
    }
  }
  assert.deepEqual(new Tiktoken(cl100k).encode("hello world"), [15339, 1917]);
  assert.equal(
    new Tiktoken(cl100k).encode("Praha je hlavní město České republiky.")
      .length,
    19,
  );
});

test("every chapter has both languages and valid source links; saved progress is bounded", () => {
  const ids = lessons.map((lesson) => lesson.id);
  const sourceIds = new Set(sources.map((source) => source.id));
  assert.equal(new Set(ids).size, 16);
  for (const lesson of lessons) {
    for (const value of [
      lesson.name,
      lesson.title,
      lesson.intro,
      lesson.takeaway,
    ]) {
      assert.ok(value.en.trim());
      assert.ok(value.cs.trim());
    }
    assert.equal(lesson.scenes.length, 3);
    assert.ok(lesson.sources.every((id) => sourceIds.has(id)));
  }
  assert.deepEqual(parseProgress([ids[0], ids[0], "bad", 1, null], ids), [
    ids[0],
  ]);
  assert.deepEqual(parseProgress(null, ids), []);
});
