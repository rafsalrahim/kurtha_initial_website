export function formatInr(paise: number): string {
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

export function parsePaise(rupees: number): number {
  return Math.round(rupees * 100);
}
