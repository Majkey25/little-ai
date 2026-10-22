import test from "node:test";
import assert from "node:assert/strict";
import { isGameReady } from "../src/gameFrame.ts";

test("readiness requires the sandboxed game window, opaque origin and protocol message", () => {
  const frame = {} as Window;
  const ready = { source: frame, origin: "null", data: { type: "little-clip-factory:ready" } };
  assert.equal(isGameReady(ready, frame), true);
  assert.equal(isGameReady({ ...ready, source: {} as Window }, frame), false);
  assert.equal(isGameReady(ready, null), false);
  for (const origin of ["https://majkey25.github.io", "https://attacker.example", ""]) {
    assert.equal(isGameReady({ ...ready, origin }, frame), false);
  }
  for (const data of [null, "little-clip-factory:ready", {}, { type: "other" }]) {
    assert.equal(isGameReady({ ...ready, data }, frame), false);
  }
});
