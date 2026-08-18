const modules = [
  { href: '#khatian', icon: 'খ', title: 'খতিয়ান হিসাব', description: 'আনা, গন্ডা, কড়া, ক্রান্তি ও তিলের অংশকে নির্ভুল ভগ্নাংশে রূপান্তর করুন।', tag: 'হিসাব' },
  { href: '#measurement', icon: 'মা', title: 'জমি পরিমাপ', description: 'শতক, একর, কাঠা, বিঘা ও বর্গফুটের মধ্যে দ্রুত রূপান্তর।', tag: 'পরিমাপ' },
  { href: '#faraez', icon: 'ফা', title: 'ফারায়েজ', description: 'উত্তরাধিকারীদের অংশ নির্ধারণে নিয়মভিত্তিক হিসাব ও ব্যাখ্যা।', tag: 'উত্তরাধিকার' },
  { href: '#map', icon: 'মা', title: 'ম্যাপ ও GIS', description: 'মৌজা, দাগ ও ভূমি-পার্সেলের স্থানিক তথ্য এক জায়গায় দেখুন।', tag: 'GIS' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LandBD হোম">
          <span className="brand-mark">L</span>
          <span><strong>LandBD</strong><small>সঠিক জমির হিসাব</small></span>
        </a>
        <nav aria-label="প্রধান নেভিগেশন">
          <a href="#modules">সেবা</a>
          <a href="#about">কীভাবে কাজ করে</a>
          <a href="#sources">উৎস ও যাচাই</a>
        </nav>
        <button className="language-button" type="button" aria-label="ভাষা পরিবর্তন">বাংলা</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> বাংলাদেশ ভূমি তথ্য ও হিসাব</div>
          <h1>জমির হিসাব,<br /><em>আরও সহজ।</em></h1>
          <p>খতিয়ান, জমির পরিমাপ, ফারায়েজ ও GIS তথ্য—একটি পরিষ্কার, যাচাইযোগ্য এবং বাংলা-কেন্দ্রিক প্ল্যাটফর্মে।</p>
          <div className="hero-actions">
            <a className="primary-button" href="#modules">সেবা দেখুন <span>→</span></a>
            <a className="secondary-button" href="#about">কীভাবে কাজ করে</a>
          </div>
          <div className="trust-row" aria-label="ডেটা নীতি">
            <span>✓ সূত্রভিত্তিক</span><span>✓ নিয়মভিত্তিক হিসাব</span><span>✓ বাংলা প্রথম</span>
          </div>
        </div>
        <div className="hero-panel" aria-label="LandBD overview">
          <div className="panel-top"><span>LAND INTELLIGENCE</span><span className="live-dot">● তথ্য কাঠামো</span></div>
          <div className="land-card">
            <div><span className="muted">উদাহরণ জমি</span><strong>২.৫০ শতক</strong></div>
            <div className="mini-stat"><span>খতিয়ান</span><b>RS-১২৩৪</b></div>
            <div className="mini-stat"><span>দাগ</span><b>৪৫৬</b></div>
            <div className="share-bar"><i /><i /><i /><i /></div>
            <small>গণনা ও উৎস আলাদাভাবে সংরক্ষণযোগ্য</small>
          </div>
          <div className="panel-grid"><div><span>৪</span><small>মূল সেবা</small></div><div><span>GIS</span><small>স্থানিক তথ্য</small></div><div><span>AI</span><small>ডকুমেন্ট সহায়তা</small></div></div>
        </div>
      </section>

      <section className="section" id="modules">
        <div className="section-heading"><div><span className="eyebrow">মূল সেবা</span><h2>যে কাজগুলো<br /><em>এক জায়গায়।</em></h2></div><p>প্রতিটি মডিউল আলাদা নিয়ম ও ডেটা উৎস অনুসরণ করবে, যাতে হিসাব বোঝা ও পুনরায় যাচাই করা যায়।</p></div>
        <div className="module-grid">
          {modules.map((module) => <a className="module-card" id={module.href.slice(1)} href={module.href} key={module.title}>
            <div className="module-icon">{module.icon}</div><span className="module-tag">{module.tag}</span><h3>{module.title}</h3><p>{module.description}</p><span className="card-arrow">→</span>
          </a>)}
        </div>
      </section>

      <section className="statement" id="about">
        <div><span className="eyebrow">LandBD নীতি</span><h2>AI সাহায্য করবে,<br /><em>হিসাবের নিয়ম সিদ্ধান্ত নেবে।</em></h2></div>
        <p>ডকুমেন্ট পড়া, তথ্য খোঁজা ও ফলাফল ব্যাখ্যায় AI ব্যবহার করা যাবে। কিন্তু জমির পরিমাণ, জ্যামিতিক ক্ষেত্রফল বা উত্তরাধিকার অংশের মূল গণনা হবে নির্ধারিত, পরীক্ষাযোগ্য নিয়মে।</p>
      </section>

      <section className="source-strip" id="sources"><span>ডেটা ও নিয়মের উৎস</span><strong>সরকারি রেকর্ড</strong><strong>আইন ও বিধি</strong><strong>GIS ডেটাসেট</strong><strong>গণনা সূত্র</strong></section>

      <footer><span>© {new Date().getFullYear()} LandBD</span><span>বাংলাদেশের ভূমি তথ্য ও হিসাব প্ল্যাটফর্ম</span><a href="#top">উপরে ↑</a></footer>
    </main>
  );
}
