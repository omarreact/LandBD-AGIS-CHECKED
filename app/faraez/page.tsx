"use client";

import { useMemo, useState } from "react";
import { calculatePreliminaryFaraez, HeirCounts } from "../../lib/land/faraez";

const labels: Array<[keyof HeirCounts, string]> = [
  ["sons", "পুত্র"],
  ["daughters", "কন্যা"],
  ["wives", "স্ত্রী"],
  ["husbands", "স্বামী"],
  ["mothers", "মাতা"],
  ["fathers", "পিতা"],
];

export default function FaraezPage() {
  const [estate, setEstate] = useState("100");
  const [heirs, setHeirs] = useState<HeirCounts>({ sons: 1, daughters: 1, wives: 0, husbands: 0, mothers: 0, fathers: 0 });
  const [error, setError] = useState("");

  const result = useMemo(() => {
    try {
      setError("");
      return calculatePreliminaryFaraez(heirs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "ইনপুট যাচাই করুন");
      return null;
    }
  }, [heirs]);

  function update(key: keyof HeirCounts, value: string) {
    setHeirs((current) => ({ ...current, [key]: Math.max(0, Number(value) || 0) }));
  }

  const amount = Number(estate);

  return (
    <main className="page-shell"><div className="container narrow">
      <a className="back-link" href="/">← মূল পেজ</a>
      <section className="page-heading"><span className="eyebrow">INHERITANCE · FARAẒ</span><h1>ফারায়েজ হিসাব</h1><p>উত্তরাধিকার কাঠামো বোঝার জন্য প্রাথমিক নিয়মভিত্তিক হিসাব।</p></section>
      <section className="calculator-card">
        <div className="card-title-row"><div><h2>পরিবারের কাঠামো</h2><p>উত্তরাধিকারীর সংখ্যা দিন।</p></div><span className="status-badge">Preliminary</span></div>
        <label className="field area-field"><span>মোট সম্পত্তি / হিসাবের পরিমাণ</span><input type="number" min="0" step="any" value={estate} onChange={(e) => setEstate(e.target.value)} /></label>
        <div className="unit-grid">{labels.map(([key, label]) => <label className="field" key={key}><span>{label}</span><input type="number" min="0" step="1" value={heirs[key]} onChange={(e) => update(key, e.target.value)} /></label>)}</div>
        {error && <p className="error-box">{error}</p>}
        {result && Number.isFinite(amount) && amount >= 0 && <div className="result-panel"><div className="result-main"><span>অবশিষ্ট অংশ</span><strong>{(result.residue * 100).toFixed(4)}%</strong></div><div className="result-grid"><div><span>স্বামী/স্ত্রীর নির্ধারিত অংশ</span><b>{(result.spouseFixed * 100).toFixed(4)}%</b></div><div><span>পিতা/মাতার নির্ধারিত অংশ</span><b>{(result.parentsFixed * 100).toFixed(4)}%</b></div><div><span>প্রতি পুত্রের প্রাথমিক অংশ</span><b>{(result.sonShare * 100).toFixed(4)}% · {((result.sonShare * amount)).toFixed(6)}</b></div><div><span>প্রতি কন্যার প্রাথমিক অংশ</span><b>{(result.daughterShare * 100).toFixed(4)}% · {((result.daughterShare * amount)).toFixed(6)}</b></div></div></div>}
      </section>
      <div className="notice"><strong>গুরুত্বপূর্ণ:</strong> এটি পূর্ণাঙ্গ ফারায়েজ বা আইনগত সিদ্ধান্ত নয়। ঋণ, ওসিয়ত, উত্তরাধিকারী বর্জন, অন্যান্য উত্তরাধিকারী, আওল/রদ এবং প্রযোজ্য ব্যক্তিগত আইন যাচাই না করে ফল চূড়ান্ত হিসেবে ব্যবহার করবেন না।
      </div>
    </div></main>
  );
}
