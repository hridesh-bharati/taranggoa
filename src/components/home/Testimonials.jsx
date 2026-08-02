export default function Testimonials() {
  const reviews = [
    {
      quote: "Tarang Goa has given us the perfect platform to showcase our products and connect with the right audience.",
      name: "Priya Naik",
      role: "Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
    },
    {
      quote: "We got amazing exposure and business opportunities through their exhibitions.",
      name: "Ramesh Kamat",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
    },
    {
      quote: "A well-organized platform that truly supports local artisans and entrepreneurs.",
      name: "Anita Fernandes",
      role: "Artisan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container-fluid  py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">What People Say</h2>
        </div>

        <div className="row g-4">
          {reviews.map((rev, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white">
                <i className="bi bi-quote text-warning display-4 lh-1 mb-2"></i>
                <p className="text-muted fs-6 mb-4 flex-grow-1">{rev.quote}</p>
                <div className="d-flex align-items-center gap-3">
                  <img src={rev.avatar} alt={rev.name} className="rounded-circle object-fit-cover" style={{ width: 48, height: 48 }} />
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">{rev.name}</h6>
                    <small className="text-muted">{rev.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}