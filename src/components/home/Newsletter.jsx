'use client';

export default function Newsletter() {
  return (
    <section className="py-5 text-white" style={{ backgroundColor: '#6B21A8' }}>
      <div className="container-fluid  py-3">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h3 className="fw-bold mb-1">Stay Updated</h3>
            <p className="text-light opacity-75 mb-0">
              Subscribe to our newsletter and never miss an update on exhibitions, events and opportunities.
            </p>
          </div>
          <div className="col-lg-6">
            <form onSubmit={(e) => e.preventDefault()} className="d-flex gap-2">
              <input type="email" className="form-control form-control-lg rounded-pill border-0 px-4" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-warning rounded-pill px-4 fw-bold text-dark text-nowrap">
                Subscribe Now <i className="bi bi-send ms-1"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}