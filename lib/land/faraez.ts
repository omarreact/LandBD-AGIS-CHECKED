export type HeirCounts = {
  sons: number;
  daughters: number;
  wives: number;
  husbands: number;
  mothers: number;
  fathers: number;
};

export type FaraezPreliminaryResult = {
  spouseFixed: number;
  parentsFixed: number;
  residue: number;
  sonShare: number;
  daughterShare: number;
};

/**
 * Preliminary calculator for the UI only.
 *
 * This is intentionally NOT a complete Islamic inheritance engine. A complete
 * engine must model exclusion (hajb), multiple wives, grandparents, siblings,
 * awl/radd, debts, wasiyyah and jurisdiction-specific legal rules.
 * Keep this module clearly labelled as preliminary until those rules are tested.
 */
export function calculatePreliminaryFaraez(heirs: HeirCounts): FaraezPreliminaryResult {
  const sons = Math.max(0, Math.floor(heirs.sons));
  const daughters = Math.max(0, Math.floor(heirs.daughters));
  const wives = Math.max(0, Math.floor(heirs.wives));
  const husbands = Math.max(0, Math.floor(heirs.husbands));
  const mothers = Math.max(0, Math.floor(heirs.mothers));
  const fathers = Math.max(0, Math.floor(heirs.fathers));

  if (wives > 0 && husbands > 0) throw new Error("একসঙ্গে স্ত্রী ও স্বামী নির্বাচন করা যাবে না।");
  if (mothers > 1 || fathers > 1) throw new Error("মাতা ও পিতার সংখ্যা সর্বোচ্চ ১ হতে পারে।");
  if (wives > 1) throw new Error("এই প্রাথমিক সংস্করণে একাধিক স্ত্রী এখনো সমর্থিত নয়।");

  const spouseFixed = wives ? 1 / 8 : husbands ? 1 / 2 : 0;
  const parentsFixed = (mothers ? 1 / 6 : 0) + (fathers ? 1 / 6 : 0);
  const residue = Math.max(0, 1 - spouseFixed - parentsFixed);
  const units = sons * 2 + daughters;

  return {
    spouseFixed,
    parentsFixed,
    residue,
    sonShare: units ? (residue * 2) / units : 0,
    daughterShare: units ? residue / units : 0,
  };
}
