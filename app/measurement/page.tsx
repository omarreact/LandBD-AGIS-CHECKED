"use client";

import { useMemo, useState } from "react";
import { convertLand, LAND_UNIT_LABELS, LandUnit } from "../../lib/land/measurement";

const units = Object.keys(LAND_UNIT_LABELS) as LandUnit[];

export default function MeasurementPage() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<LandUnit>("decimal");
  const [to, setTo] = useState<LandUnit>("sqft");
  const result = useMemo(() => {
    try { return convertLand(Number(value), from, to); } catch { return null; }
  }, [value, from, to]);

  return (
    <main className="page-shell"><div className="container narrow">
      <a className="back-link" href="/">← মূল পেজ</a>
      <section className="page-heading"><span className="eyebrow">LAND MEASUREMENT</span><h1>জমি পরিমাপ</h1><p>একক পরিবর্তন করুন এবং ফলাফল তাৎক্ষণিকভাবে দেখুন।</p></section>
      <section className="calculator-card">
        <div className="card-title-row"><div><h2>দ্বিমুখী রূপান্তর</h2><p>শতককে canonical base unit হিসেবে ব্যবহার করা হচ্ছে।</p></div><span className="status-badge">Deterministic</span></div>
        <div className="conversion-row">
          <label className="field"><span>পরিমাণ</span><input type="number" min="0" step="any" value={value} onChange={e => setValue(e.target.value)} /></label>
          <label className="field"><span>যে একক থেকে</span><select value={from} onChange={e => setFrom(e.target.value as LandUnit)}>{units.map(u => <option key={u} value={u}>{LAND_UNIT_LABELS[u]}</option>)}</select></label>
          <label className="field"><span>যে এককে</span><select value={to} onChange={e => setTo(e.target.value as LandUnit)}>{units.map(u => <option key={u} value={u}>{LAND_UNIT_LABELS[u]}</option>)}</select></label>
        </div>
        <div className="result-panel"><div className="result-main"><span>{LAND_UNIT_LABELS[from]} → {LAND_UNIT_LABELS[to]}</span><strong>{result === null ? "—" : result.toLocaleString("bn-BD", { maximumFractionDigits: 8 })}</strong></div></div>
      </section>
      <div className="notice"><strong>স্ট্যান্ডার্ড প্রোফাইল:</strong> ১ একর = ১০০ শতক, ১ শতক = ৪৩৫.৬ বর্গফুট, ১ কাঠা = ১.৬৫ শতক, ১ বিঘা = ৩৩ শতক। আঞ্চলিক বা দলিল-নির্ধারিত ভিন্নতা ভবিষ্যতে পৃথক profile হিসেবে রাখা হবে।</div>
    </div></main>
  );
}
