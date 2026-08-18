/** Bangladesh land measurement conversions.
 *
 * Standard profile used by this engine:
 * 1 Acre = 100 Decimal
 * 1 Decimal = 435.6 sq ft
 * 1 Katha = 1.65 Decimal
 * 1 Bigha = 33 Decimal = 20 Katha
 * 1 Decimal = 100 Ojutangsho
 *
 * Decimal is the canonical base unit. Source conventions should be
 * represented as profiles rather than silently mixed into calculations.
 */

export type LandUnit = "decimal" | "acre" | "katha" | "bigha" | "ojutangsho" | "sqft" | "sqm";

export const DECIMAL_TO: Record<LandUnit, number> = {
  decimal: 1,
  acre: 0.01,
  katha: 1 / 1.65,
  bigha: 1 / 33,
  ojutangsho: 100,
  sqft: 435.6,
  sqm: 40.468564224,
};

export function convertLand(value: number, from: LandUnit, to: LandUnit): number {
  if (!Number.isFinite(value) || value < 0) throw new Error("পরিমাণ শূন্য বা তার বেশি হতে হবে");
  const decimal = value * DECIMAL_TO[from];
  return decimal / DECIMAL_TO[to];
}

export const LAND_UNIT_LABELS: Record<LandUnit, string> = {
  decimal: "শতক / ডেসিমেল",
  acre: "একর",
  katha: "কাঠা",
  bigha: "বিঘা",
  ojutangsho: "অযুতাংশ",
  sqft: "বর্গফুট",
  sqm: "বর্গমিটার",
};
