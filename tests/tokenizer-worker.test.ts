import test from "node:test";
import assert from "node:assert/strict";
import { tokenize, type TokenRequest } from "../src/tokenizer.ts";

test("count-only requests keep exact IDs without inspector details", async () => {
  for (const encoding of ["cl100k_base", "o200k_base"] as const) {
    for (const input of [
      "Praha je hlavní město České republiky.",
      "Ahoj 👋!",
      "  hello\nworld",
      "<|endoftext|>",
      "",
    ]) {
      const [count, inspected] = await Promise.all([
        tokenize({ request: 2, encoding, input, details: false }),
        tokenize({ request: 3, encoding, input }),
      ]);
      assert.equal(count.request, 2);
      assert.equal(inspected.request, 3);
      assert.equal(count.error, undefined);
      assert.equal(inspected.error, undefined);
      assert.deepEqual(count.ids, inspected.ids);
      assert.deepEqual(count.pieces, []);
      assert.deepEqual(count.bytes, []);
      assert.equal(inspected.pieces.length, inspected.ids.length);
      assert.equal(inspected.bytes.length, inspected.ids.length);
      assert.deepEqual(
        Buffer.concat(
          inspected.bytes.map((hex) =>
            Buffer.from(hex.replaceAll(" ", ""), "hex"),
          ),
        ),
        Buffer.from(input, "utf8"),
      );
      if (input.startsWith("Praha")) {
        assert.equal(count.ids.length, encoding === "cl100k_base" ? 19 : 11);
      }
    }
  }
});

test("invalid options and overlong input return explicit errors", async () => {
  const request = {
    request: 7,
    encoding: "cl100k_base",
    input: "hello",
  } satisfies TokenRequest;
  for (const invalid of [
    { ...request, encoding: "unsupported" },
    { ...request, input: 42 },
    { ...request, input: "x".repeat(3001) },
    { ...request, details: "yes" },
    { ...request, details: null },
  ]) {
    assert.deepEqual(await tokenize(invalid as unknown as TokenRequest), {
      request: 7,
      ids: [],
      pieces: [],
      bytes: [],
      error: "Invalid tokenizer request.",
    });
  }
  const boundary = await tokenize({
    ...request,
    input: "x".repeat(3000),
    details: false,
  });
  assert.equal(boundary.error, undefined);
  assert.ok(boundary.ids.length > 0);
  assert.deepEqual(boundary.pieces, []);
  assert.deepEqual(boundary.bytes, []);
});
