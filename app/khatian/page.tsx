"use client";

import { useMemo, useState } from "react";
import { calculateKhatianShare, calculatePhysicalShare, KhatianShareInput } from "../../lib/land/khatian";

const fields: Array<[keyof KhatianShareInput, string]> = [
  ["ana", "আনা"],
  ["gonda", "গণ্ডা"],
  ["kora", "কড়া"],
  ["kranti", "ক্রান্তি"],
  ["til", "তিল"],
];

export default function KhatianPage() {
  const [share, setShare] = useState<KhatianShareInput>({});
  const [totalArea, setTotalArea] = useState("100");
  const [error, setError] = useState("");

  const result = useMemo(() => {
    try {
      setError("");
      const calculated = calculateKhatianShare(share);
      return {
        ...calculated,
        physical: calculatePhysicalShare(Number(totalArea) || 0, share),
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : "ইনপুট যাচাই করুন");
      return null;
    }
  }, [share, totalArea]);

  function update(key: keyof KhatianShareInput, value: string) {
    setShare((current) => ({ ...current, [key]: value === "" ? 0 : Number(value) }));
  }

  return (
    <main className="page-shell">
      <div className="container narrow">
        <a className="back-link" href="/">← মূল পেজ</a>
        <section className="page-heading">
          <span className="eyebrow">LAND RECORD · KHATIAN</span>
          <h1>খতিয়ান হিসাব</h1>
          <p>আনা, গণ্ডা, কড়া, ক্রান্তি ও তিলকে একটি নির্ভুল ভগ্নাংশে রূপান্তর করুন।</p>
        </section>

        <section className="calculator-card">
          <div className="card-title-row">
            <div>
              <h2>মালিকানার অংশ</h2>
              <p>১৬ আনা = সম্পূর্ণ সম্পত্তি</p>
            </div>
            <span className="status-badge">Deterministic</span>
          </div>

          <div className="unit-grid">
            {fields.map(([key, label]) => (
              <label key={key} className="field">
                <span>{label}</span>
                <input
                  inputMode="decimal"
                  min="0"
                  step="any"
                  type="number"
                  value={share[key] ?? ""}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder="০"
                />
              </label>
            ))}
          </div>

          <label className="field area-field">
            <span>মোট জমি (যে এককে হিসাব করবেন)</span>
            <input
              inputMode="decimal"
              min="0"
              step="any"
              type="number"
              value={totalArea}
              onChange={(e) => setTotalArea(e.target.value)}
            />
          </label>

          {error && <p className="error-box">{error}</p>}

          {result && (
            <div className="result-panel">
              <div className="result-main">
                <span>আপনার অংশ</span>
                <strong>{result.percentage.toFixed(6)}%</strong>
              </div>
              <div className="result-grid">
                <div><span>সরল ভগ্নাংশ</span><b>{result.fractionNumerator} / {result.fractionDenominator}</b></div>
                <div><span>স্বাভাবিক রূপ</span><b>{result.normalized.ana} আনা {result.normalized.gonda} গণ্ডা {result.normalized.kora} কড়া {result.normalized.kranti} ক্রান্তি {result.normalized.til} তিল</b></div>
                <div><span>মোট ক্ষুদ্র একক</span><b>{result.totalTil.toLocaleString("bn-BD")} তিল</b></div>
                <div><span>মোট জমির অংশ</span><b>{result.physical.toFixed(6)}</b></div>
              </div>
            </div>
          )}
        </section>

        <div className="notice">
          <strong>তথ্য:</strong> এই হিসাব নির্ধারিত একক-রূপান্তর ও গাণিতিক অংশের ভিত্তিতে ফল দেয়। এটি সরকারি খতিয়ান বা আইনগত মালিকানার রেকর্ডের বিকল্প নয়।
        </div>
      </div>
    </main>
  );
}
