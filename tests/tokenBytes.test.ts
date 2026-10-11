import test from "node:test";
import assert from "node:assert/strict";
import cl100k from "js-tiktoken/ranks/cl100k_base";
import o200k from "js-tiktoken/ranks/o200k_base";
import { tokenBytes } from "../src/tokenBytes.ts";

test("packed bytes preserve every real rank in both encodings", () => {
  for (const [ranks, expectedCount] of [
    [cl100k, 100256],
    [o200k, 199998],
  ] as const) {
    const bytes = tokenBytes(ranks);
    let count = 0;
    for (const line of ranks.bpe_ranks.split("\n").filter(Boolean)) {
      const [, start, ...tokens] = line.split(" ");
      for (let i = 0; i < tokens.length; i++) {
        const actual = bytes.get(Number(start) + i);
        assert.ok(actual);
        assert.deepEqual(Buffer.from(actual), Buffer.from(tokens[i], "base64"));
        count++;
      }
    }
    assert.equal(count, expectedCount);
    for (const id of [
      -1,
      -0.5,
      0.5,
      NaN,
      Infinity,
      expectedCount,
      Number.MAX_SAFE_INTEGER,
      ...Object.values(ranks.special_tokens),
    ]) {
      assert.equal(bytes.get(id), undefined);
    }
    assert.deepEqual(bytes.get(-0), bytes.get(0));
  }
});

test("sparse and empty tables never return bytes for missing IDs", () => {
  const bytes = tokenBytes({
    pat_str: "",
    special_tokens: { special: 20 },
    bpe_ranks: "! 2 QQ== QkM=\n! 7 AP+A",
  });
  assert.deepEqual(bytes.get(2), Uint8Array.of(65));
  assert.deepEqual(bytes.get(3), Uint8Array.of(66, 67));
  assert.deepEqual(bytes.get(7), Uint8Array.of(0, 255, 128));
  for (const id of [0, 1, 4, 5, 6, 8, 20, -1, 0.5, NaN, Infinity]) {
    assert.equal(bytes.get(id), undefined);
  }
  const empty = tokenBytes({ pat_str: "", special_tokens: {}, bpe_ranks: "" });
  assert.equal(empty.get(0), undefined);
});
