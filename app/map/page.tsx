export default function MapPage() {
  return (
    <main className="page-shell"><div className="container narrow">
      <a className="back-link" href="/">← মূল পেজ</a>
      <section className="page-heading"><span className="eyebrow">LAND MAP · GIS</span><h1>ম্যাপ ও GIS</h1><p>মৌজা, দাগ ও ভূমি-পার্সেলের স্থানিক তথ্যের জন্য LandBD-এর GIS স্তরগুলো এখানে যুক্ত হবে।</p></section>
      <section className="calculator-card map-placeholder">
        <div className="map-grid-background"><div className="map-crosshair" /></div>
        <div className="map-overlay"><span className="status-badge">GIS প্রস্তুত</span><h2>মানচিত্র স্তর সংযুক্তির স্থান</h2><p>পরবর্তী ধাপে সরকারি/অনুমোদিত ArcGIS স্তর, দাগ অনুসন্ধান, মৌজা নির্বাচন এবং parcel inspection যুক্ত করা হবে।</p></div>
      </section>
      <div className="result-grid map-features"><div><span>স্তর</span><b>RS · MS</b></div><div><span>অনুসন্ধান</span><b>মৌজা · দাগ</b></div><div><span>পরিদর্শন</span><b>Parcel info</b></div><div><span>ডেটা</span><b>Source-aware</b></div></div>
      <div className="notice"><strong>নিরাপত্তা:</strong> ব্যক্তিগত বা সংবেদনশীল GIS credential ব্রাউজারে প্রকাশ করা হবে না। ব্যক্তিগত API token থাকলে server-side route-এর মাধ্যমে ব্যবহার করতে হবে।</div>
    </div></main>
  );
}
