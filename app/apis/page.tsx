"use client";

import { useEffect, useState } from "react";

type Api = { id: string; name: string; nameBn: string; kind: string; visibility: string; enabled: boolean; description: string };

export default function ApiRegistryPage() {
  const [apis, setApis] = useState<Api[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/apis", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("API registry load failed");
        return response.json() as Promise<{ data: Api[] }>;
      })
      .then((payload) => setApis(payload.data))
      .catch((cause) => setError(cause instanceof Error ? cause.message : "তথ্য পাওয়া যায়নি"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page-shell"><div className="container narrow">
      <a className="back-link" href="/">← মূল পেজ</a>
      <section className="page-heading"><span className="eyebrow">API REGISTRY</span><h1>API রেজিস্ট্রি</h1><p>LandBD-তে ব্যবহৃত উৎসগুলো আলাদা করে চিহ্নিত করা হয়। গোপন token বা credential কখনও এই তালিকায় প্রকাশ করা হয় না।</p></section>
      <section className="calculator-card">
        {loading && <p>লোড হচ্ছে…</p>}
        {error && <p className="error-box">{error}</p>}
        {!loading && !error && <div className="result-grid">{apis.map((api) => <div key={api.id}><span>{api.nameBn}</span><b>{api.enabled ? "সক্রিয়" : "কনফিগার করা হয়নি"}</b><small>{api.kind} · {api.visibility}</small><p>{api.description}</p></div>)}</div>}
      </section>
    </div></main>
  );
}
