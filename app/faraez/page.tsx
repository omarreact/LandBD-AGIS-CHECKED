"use client";

import { useMemo, useState } from "react";

type HeirKey = "sons" | "daughters" | "wife" | "husband" | "mother" | "father";
const labels: Record<HeirKey, string> = {
  sons: "পুত্র",
  daughters: "কন্যা",
  wife: "স্ত্রী",
  husband: "স্বামী",
  mother: "মাতা",
  father: "পিতা",
};

export default function FaraezPage() {
  const [estate, setEstate] = useState("100");
  const [heirs, setHeirs] = useState<Record<HeirKey, number>>({ sons: 1, daughters: 1, wife: 0, husband: 0, mother: 0, father: 0 });

  const result = useMemo(() => {
    const total = Number(estate);
    if (!Number.isFinite(total) || total < 0) return null;
    const sons = heirs.sons;
    const daughters = heirs.daughters;
    const spouse = heirs.wife || heirs.husband;
    const fixedSpouse = spouse ? (heirs.wife ? 1 / 8 : 1 / 2) : 0;
    const parentShare = (heirs.mother ? 1 / 6 : 0) + (heirs.father ? 1 / 6 : 0);
    const fixed = fixedSpouse + parentShare;
    const residue = Math.max(0, 1 - fixed);
    const units = sons * 2 + daughters;
    return { fixedSpouse, parentShare, residue, unitShare: units ? residue / units : 0, total };
  }, [estate, heirs]);

  function update(key: HeirKey, value: string) {
    setHeirs((current) => ({ ...current, [key]: Math.max(0, Number(value) || 0) }));
  }

  return (
    <main className="page-shell"><div className="container narrow">
      <a className="back-link" href="/">← মূল পেজ</a>
      <section className="page-heading"><span className="eyebrow">INHERITANCE · FARAẒ</span><h1>ফারায়েজ হিসাব</h1><p>উত্তরাধিকারীদের প্রাথমিক অংশ বোঝার জন্য নিয়মভিত্তিক একটি সহায়ক ক্যালকুলেটর।</p></section>
      <section className="calculator-card">
        <div className="card-title-row"><div><h2>পরিবারের কাঠামো</h2><p>প্রাথমিক হিসাবের জন্য উত্তরাধিকারীর সংখ্যা দিন।</p></div><span className="status-badge">Rule-based</span></div>
        <label className="field area-field"><span>মোট সম্পত্তি / হিসাবের পরিমাণ</span><input type="number" min="0" step="any" value={estate} onChange={(e) => setEstate(e.target.value)} /></label>
        <div className="unit-grid">{(Object.keys(labels) as HeirKey[]).map((key) => <label className="field" key={key}><span>{labels[key]}</span><input type="number" min="0" step="1" value={heirs[key]} onChange={(e) => update(key, e.target.value)} /></label>)}</div>
        {result && <div className="result-panel"><div className="result-main"><span>অবশিষ্ট অংশ</span><strong>{(result.residue * 100).toFixed(4)}%</strong></div><div className="result-grid"><div><span>স্বামী/স্ত্রীর নির্ধারিত অংশ</span><b>{(result.fixedSpouse * 100).toFixed(4)}%</b></div><div><span>পিতা/মাতার নির্ধারিত অংশ</span><b>{(result.parentShare * 100).toFixed(4)}%</b></div><div><span>প্রতি পুত্রের অবশিষ্ট অংশ</span><b>{(result.unitShare * 2 * 100).toFixed(4)}%</b></div><div><span>প্রতি কন্যার অবশিষ্ট অংশ</span><b>{(result.unitShare * 100).toFixed(4)}%</b></div></div></div>}
      </section>
      <div className="notice"><strong>গুরুত্বপূর্ণ:</strong> এটি পূর্ণাঙ্গ ফারায়েজ/আইনগত সিদ্ধান্ত নয়। মৃত ব্যক্তির ঋণ, ওসিয়ত, উত্তরাধিকারী বর্জন, অন্যান্য উত্তরাধিকারী এবং প্রযোজ্য ব্যক্তিগত আইন যাচাই না করে ফলকে চূড়ান্ত ধরে নেবেন না।
      </div>
    </div></main>
  );
}
