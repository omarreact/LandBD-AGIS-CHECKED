/**
 * Bangladesh traditional ownership-share arithmetic.
 *
 * Canonical hierarchy:
 * 16 Ana = 1 whole
 * 1 Ana = 20 Gonda
 * 1 Gonda = 4 Kora
 * 1 Kora = 3 Kranti
 * 1 Kranti = 20 Til
 *
 * The engine keeps the source representation and converts it to an exact
 * integer unit (Til) before calculating the normalized fraction.
 */

export const TIL_PER_KRANTI = 20;
export const KRANTI_PER_KORA = 3;
export const KORA_PER_GONDA = 4;
export const GONDA_PER_ANA = 20;
export const ANA_PER_WHOLE = 16;

export const TIL_PER_KORA = KRANTI_PER_KORA * TIL_PER_KRANTI;
export const TIL_PER_GONDA = KORA_PER_GONDA * TIL_PER_KORA;
export const TIL_PER_ANA = GONDA_PER_ANA * TIL_PER_GONDA;
export const TIL_PER_WHOLE = ANA_PER_WHOLE * TIL_PER_ANA;

export type KhatianShareInput = {
  ana?: number;
  gonda?: number;
  kora?: number;
  kranti?: number;
  til?: number;
};

export type KhatianShareResult = {
  totalTil: number;
  fractionNumerator: number;
  fractionDenominator: number;
  percentage: number;
  normalized: KhatianShareInput;
};

function finiteNonNegative(value: number | undefined, label: string): number {
  const n = value ?? 0;
  if (!Number.isFinite(n) || n < 0) throw new Error(`${label} must be a non-negative number`);
  return n;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

/** Converts a traditional representation into the smallest supported unit. */
export function toTil(input: KhatianShareInput): number {
  const ana = finiteNonNegative(input.ana, "Ana");
  const gonda = finiteNonNegative(input.gonda, "Gonda");
  const kora = finiteNonNegative(input.kora, "Kora");
  const kranti = finiteNonNegative(input.kranti, "Kranti");
  const til = finiteNonNegative(input.til, "Til");

  return ana * TIL_PER_ANA + gonda * TIL_PER_GONDA + kora * TIL_PER_KORA + kranti * TIL_PER_KRANTI + til;
}

/** Converts Til back into the canonical mixed-unit representation. */
export function fromTil(totalTil: number): KhatianShareInput {
  if (!Number.isInteger(totalTil) || totalTil < 0 || totalTil > TIL_PER_WHOLE) {
    throw new Error(`Til must be an integer from 0 to ${TIL_PER_WHOLE}`);
  }

  let remainder = totalTil;
  const ana = Math.floor(remainder / TIL_PER_ANA);
  remainder %= TIL_PER_ANA;
  const gonda = Math.floor(remainder / TIL_PER_GONDA);
  remainder %= TIL_PER_GONDA;
  const kora = Math.floor(remainder / TIL_PER_KORA);
  remainder %= TIL_PER_KORA;
  const kranti = Math.floor(remainder / TIL_PER_KRANTI);
  const til = remainder % TIL_PER_KRANTI;

  return { ana, gonda, kora, kranti, til };
}

export function calculateKhatianShare(input: KhatianShareInput): KhatianShareResult {
  const totalTil = toTil(input);
  if (totalTil > TIL_PER_WHOLE) throw new Error("Share cannot exceed 16 Ana (one whole property)");

  const divisor = gcd(totalTil, TIL_PER_WHOLE);
  const fractionNumerator = totalTil / divisor;
  const fractionDenominator = TIL_PER_WHOLE / divisor;

  return {
    totalTil,
    fractionNumerator,
    fractionDenominator,
    percentage: (totalTil / TIL_PER_WHOLE) * 100,
    normalized: fromTil(totalTil),
  };
}

/** Physical land amount for a parcel whose total area is expressed in any unit. */
export function calculatePhysicalShare(totalArea: number, input: KhatianShareInput): number {
  if (!Number.isFinite(totalArea) || totalArea < 0) throw new Error("Total area must be non-negative");
  return totalArea * (toTil(input) / TIL_PER_WHOLE);
}
