import test from "node:test";
import assert from "node:assert/strict";

function formatInr(paise) {
  if (!Number.isFinite(paise) || paise < 0) {
    throw new RangeError("paise must be a non-negative finite number");
  }
  const rupees = Math.round(paise) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

test("formats planned set prices without paise", () => {
  assert.equal(formatInr(720000), "₹7,200");
  assert.equal(formatInr(960000), "₹9,600");
});

test("rejects negative", () => {
  assert.throws(() => formatInr(-1), RangeError);
});
