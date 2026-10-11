import test from "node:test";
import assert from "node:assert/strict";
import {
  guidedUpdate,
  IMAGE_STEPS,
  relaxTemplate,
  seededNoise,
} from "../src/imageMath.ts";

test("seeded teaching noise repeats exactly and remains bounded", () => {
  const first = seededNoise(7, 64);
  assert.deepEqual(seededNoise(7, 64), first);
  assert.notDeepEqual(seededNoise(8, 64), first);
  assert.ok(first.every((value) => value >= 0 && value < 1));
  assert.equal(seededNoise(0xffffffff, 1).length, 1);
  assert.throws(() => seededNoise(-1, 64), RangeError);
  assert.throws(() => seededNoise(0.5, 64), RangeError);
  assert.throws(() => seededNoise(7, 4097), RangeError);
});

test("template relaxation reduces error, preserves inputs and enforces step bounds", () => {
  const initial = [0.2, 0.4, 0.8];
  const template = [0.9, 0.4, 0.1];
  const error = (field: number[]) =>
    field.reduce((sum, value, i) => sum + Math.abs(value - template[i]), 0);
  assert.deepEqual(relaxTemplate(initial, template, 0), initial);
  const first = relaxTemplate(initial, template, 1);
  const last = relaxTemplate(initial, template, IMAGE_STEPS);
  assert.ok(error(last) < error(first) && error(first) < error(initial));
  assert.ok(last.every((value) => value >= 0 && value <= 1));
  assert.equal(last[1], template[1]);
  assert.deepEqual(initial, [0.2, 0.4, 0.8]);
  assert.deepEqual(template, [0.9, 0.4, 0.1]);
  for (const steps of [-1, 0.5, IMAGE_STEPS + 1]) {
    assert.throws(() => relaxTemplate(initial, template, steps), RangeError);
  }
  assert.throws(() => relaxTemplate(initial, [0.5], 1), RangeError);
  assert.throws(() => relaxTemplate([NaN], [0.5], 1), RangeError);
});

test("guidance selects its endpoints and extrapolates beyond the conditioned vector", () => {
  const unconditioned = [0.7, 0.25] as const;
  const conditioned = [0.4, 0.65] as const;
  assert.deepEqual(guidedUpdate(unconditioned, conditioned, 0), unconditioned);
  assert.deepEqual(guidedUpdate(unconditioned, conditioned, 1), conditioned);
  const stronger = guidedUpdate(unconditioned, conditioned, 2);
  assert.ok(stronger[0] < conditioned[0] && stronger[1] > conditioned[1]);
  assert.deepEqual(unconditioned, [0.7, 0.25]);
  assert.deepEqual(conditioned, [0.4, 0.65]);
  assert.throws(
    () => guidedUpdate(unconditioned, conditioned, 3.1),
    RangeError,
  );
  assert.throws(
    () => guidedUpdate(unconditioned, conditioned, NaN),
    RangeError,
  );
});
