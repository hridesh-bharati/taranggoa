export default function StatsCounter() {
  const stats = [
    { number: '150+', label: 'Exhibitions Organized' },
    { number: '5000+', label: 'Entrepreneurs Connected' },
    { number: '2000+', label: 'Artisans Supported' },
    { number: '50,000+', label: 'Visitors & Customers' },
    { number: '100+', label: 'Industry Partners' }
  ];

  return (
    <section className="py-5 text-white" style={{ backgroundColor: '#4C1D95', backgroundImage: 'radial-gradient(circle at top right, #6B21A8, #3B0764)' }}>
      <div className="container-fluid  py-4 text-center">
        <small className="text-warning fw-bold text-uppercase tracking-wider d-block mb-1">OUR IMPACT</small>
        <h2 className="fw-bold mb-5">Empowering Businesses. Enriching Communities.</h2>

        <div className="row g-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg border-end border-purple-subtle last-border-none">
              <h1 className="display-5 fw-black text-warning mb-1">{stat.number}</h1>
              <small className="text-light opacity-75 fw-medium d-block">{stat.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}