'use client';

import { useState, useEffect } from 'react';
import { exhibitionsController } from '@/controllers/exhibitions.controller';
import { paymentController } from '@/controllers/payment.controller';
import { showToast } from '@/utils/toast';
import { 
  X, 
  Loader2, 
  Building2, 
  ShieldCheck, 
  CreditCard, 
  Phone, 
  QrCode, 
  Copy, 
  Check, 
  FileText,
  AlertCircle
} from 'lucide-react';

const STALL_TYPES = [
  {
    id: 'octo_3x2',
    name: '3x2 Mtr Octonorm Stall',
    price: 15000,
    desc: '2 Tables (6x2 ft), 2 Chairs, Light & Plug point provided.',
    color: '#dc3545'
  },
  {
    id: 'octo_2x2',
    name: '2x2 Mtr Octonorm Stall',
    price: 12000,
    desc: '2 Tables (4x2 ft), 2 Chairs, Light & Plug point provided.',
    color: '#fd7e14'
  },
  {
    id: 'table_space',
    name: 'Table Space (Single Table)',
    price: 8000,
    desc: 'Single 6x2 ft Table with 1 Chair.',
    color: '#198754'
  }
];

export default function UpcomingExhibitions() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking Modal States
  const [bookingExhibition, setBookingExhibition] = useState(null);
  const [selectedStall, setSelectedStall] = useState(STALL_TYPES[0]);
  const [addFan, setAddFan] = useState(false);
  const [fanDays, setFanDays] = useState(5);
  const [paymentMode, setPaymentMode] = useState('gateway'); // 'gateway' | 'qr'
  const [paying, setPaying] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  const [vendorForm, setVendorForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    category: 'Fashion & Handicrafts',
    utrNumber: ''
  });

  useEffect(() => {
    async function loadDynamicExhibitions() {
      try {
        const dbExhibitions = await exhibitionsController.fetchExhibitions();
        setUpcomingEvents(dbExhibitions || []);
      } catch (err) {
        console.error('Failed to load exhibitions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDynamicExhibitions();
  }, []);

  const totalAmount = selectedStall.price + (addFan ? fanDays * (bookingExhibition?.fanPricePerDay || 300) : 0);

  const handleOpenBooking = (exhibition) => {
    setBookingExhibition(exhibition);
    setPaymentMode('gateway');
  };

  const copyBankDetails = () => {
    const text = `Bank: Axis Bank\nA/C: 923020020267889\nIFSC: UTIB0000078\nName: TARANG GOA`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    showToast('success', 'Bank details copied to clipboard!');
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleProcessBooking = async (e) => {
    e.preventDefault();
    if (!vendorForm.name || !vendorForm.email || !vendorForm.phone || !vendorForm.businessName) {
      showToast('error', 'Please fill all required vendor details');
      return;
    }

    if (paymentMode === 'qr') {
      if (!vendorForm.utrNumber) {
        showToast('error', 'Please enter UPI Transaction ID / UTR Number after payment');
        return;
      }
      setPaying(true);
      setTimeout(() => {
        setPaying(false);
        showToast('success', 'Booking submitted! Our team will verify and confirm your stall.');
        setBookingExhibition(null);
      }, 1200);
      return;
    }

    // Razorpay Online Gateway
    setPaying(true);
    try {
      await paymentController.initiateMembershipPayment({
        userDetails: {
          fullName: vendorForm.name,
          email: vendorForm.email,
          phone: vendorForm.phone,
          businessName: vendorForm.businessName,
          type: 'Stall Booking',
          exhibitionId: bookingExhibition.id,
          exhibitionBadge: bookingExhibition.badge,
          stallType: selectedStall.name,
          extraFan: addFan ? `${fanDays} Days` : 'No',
          amount: totalAmount
        },
        amount: totalAmount,
        onSuccess: () => {
          showToast('success', 'Payment successful! Stall confirmed.');
          setBookingExhibition(null);
          setPaying(false);
        },
        onError: (err) => {
          showToast('error', err.message || 'Payment failed');
          setPaying(false);
        }
      });
    } catch (err) {
      showToast('error', err.message || 'Payment initiation failed');
      setPaying(false);
    }
  };

  return (
    <section className="py-4 bg-light w-100" id="exhibitions">
      <div className="container-fluid px-2 px-md-4">

        {/* Section Header */}
        <div className="card border-0 shadow-sm mb-4 rounded-3 overflow-hidden">
          <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center py-2 fs-7">
            <span><i className="bi bi-shop me-2"></i>Upcoming Festive Expos & Exhibitions</span>
            <span className="badge bg-warning text-dark">Session 2026</span>
          </div>
          <div className="card-body text-center py-3">
            <h4 className="fw-bold text-dark mb-1">TARANG UTSAV 2026</h4>
            <p className="small fw-semibold text-danger mb-0">
              Goa’s Biggest Exhibition cum Sale is back with GRAND FESTIVE EVENTS! 🎉
            </p>
          </div>
        </div>

        {/* Dynamic Exhibitions List */}
        {loading ? (
          <div className="text-center py-5 bg-white rounded-3 border">
            <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
            <span className="text-muted fw-bold small">Loading Expos...</span>
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="card p-4 text-center text-muted fw-bold my-3">
            No active exhibitions found right now.
          </div>
        ) : (
          <div className="row g-3 mb-4">
            {upcomingEvents.map((item, idx) => {
              const daysList = Array.isArray(item.days)
                ? item.days
                : (item.daysInput ? item.daysInput.split(',').map(d => d.trim()) : []);

              return (
                <div key={item.id || idx} className="col-12 col-xl-6">
                  <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
                    <div className="bg-primary text-white text-center fw-bold py-1.5 fs-8 text-uppercase">
                      {item.badge}
                    </div>

                    <div className="p-3">
                      <div className="row g-3 align-items-center">
                        {item.image && (
                          <div className="col-12 col-md-6 text-center">
                            <div
                              className="border rounded-2 bg-white cursor-pointer overflow-hidden p-0 position-relative"
                              onClick={() => setSelectedImage(item.image)}
                            >
                              <img
                                src={item.image}
                                alt={item.badge}
                                className="w-100 object-fit-cover object-fit-md-contain rounded-1"
                                style={{ maxHeight: '380px', display: 'block' }}
                              />
                              <span className="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-2 fs-9">
                                Click Layout Blueprint
                              </span>
                            </div>
                          </div>
                        )}

                        <div className={`col-12 ${item.image ? 'col-md-6' : 'col-12'} d-flex flex-column justify-content-between h-100 my-1`}>
                          <div className="d-flex flex-column gap-2">
                            <div className="bg-light p-2 rounded-2 border fs-8">
                              <div className="fw-bold text-dark mb-1 text-truncate">
                                <i className="bi bi-geo-alt-fill text-danger me-1"></i>{item.location}
                              </div>
                              <div className="fw-semibold text-primary mb-1">
                                <i className="bi bi-calendar-check me-1"></i>{item.dates}
                              </div>
                              <div className="text-secondary small">
                                <i className="bi bi-clock me-1"></i>{item.timing}
                              </div>
                            </div>

                            {/* Date Chips */}
                            {daysList.length > 0 && (
                              <div className="d-flex gap-1 flex-wrap my-1">
                                {daysList.map((day, dIdx) => (
                                  <span key={dIdx} className="badge bg-primary-subtle text-primary border border-primary-subtle fs-9 flex-grow-1 py-1">
                                    {day}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Categories */}
                            {item.categories && (
                              <div className="fw-bold text-dark fs-9 bg-warning-subtle p-1.5 rounded border border-warning-subtle text-center text-truncate my-1">
                                🏷️ {item.categories}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 border-top mt-2 d-flex flex-column gap-2">
                            <button
                              onClick={() => handleOpenBooking(item)}
                              className="btn btn-sm text-white fw-bold rounded-pill w-100 py-2 fs-7 shadow-sm d-flex align-items-center justify-content-center gap-1.5"
                              style={{ backgroundColor: '#800020' }}
                            >
                              <CreditCard size={16} />
                              <span>Book Stall Online / Scan QR</span>
                            </button>

                            {item.contact && (
                              <a 
                                href={`tel:${item.contact.split('|')[0].trim()}`} 
                                className="btn btn-sm btn-outline-secondary rounded-pill w-100 py-1 fs-8 text-truncate"
                              >
                                <Phone size={13} className="me-1" /> Call: {item.contact}
                              </a>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

     {/* --- REAL-LIFE STALL BOOKING & QR MODAL (SCROLLABLE & RESPONSIVE) --- */}
      {bookingExhibition && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-75 p-2 p-md-3" 
          style={{ zIndex: 1060 }}
        >
          <div 
            className="bg-white rounded-4 shadow-lg overflow-hidden w-100 d-flex flex-column" 
            style={{ 
              maxWidth: '680px', 
              maxHeight: 'min(90vh, 750px)'
            }}
          >
            {/* 1. Fixed Modal Header (Never cuts off) */}
            <div 
              className="p-3 text-white d-flex align-items-center justify-content-between flex-shrink-0" 
              style={{ backgroundColor: '#800020' }}
            >
              <div className="overflow-hidden pe-2">
                <h6 className="fw-bold m-0 text-truncate">{bookingExhibition.badge || 'Tarang Utsav'} - Stall Booking</h6>
                <small className="text-white-50 fs-9 d-block text-truncate">
                  {bookingExhibition.location} • {bookingExhibition.dates}
                </small>
              </div>
              <button 
                type="button"
                onClick={() => setBookingExhibition(null)} 
                className="btn btn-sm btn-light rounded-circle p-1 flex-shrink-0"
                style={{ width: '30px', height: '30px' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* 2. Scrollable Body Content */}
            <form onSubmit={handleProcessBooking} className="d-flex flex-column flex-grow-1 overflow-hidden m-0">
              <div 
                className="p-3 p-md-4 d-flex flex-column gap-3 fs-8 overflow-y-auto flex-grow-1"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                
                {/* 1. Stall Category Selection */}
                <div>
                  <label className="fw-bold text-dark mb-2 d-block">1. Select Stall Type (5 Days Pass):</label>
                  <div className="d-flex flex-column gap-2">
                    {STALL_TYPES.map((stall) => (
                      <div 
                        key={stall.id} 
                        onClick={() => setSelectedStall(stall)}
                        className={`p-2.5 p-md-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center ${selectedStall.id === stall.id ? 'border-2 border-danger bg-danger-subtle' : 'bg-light'}`}
                      >
                        <div>
                          <div className="fw-bold text-dark fs-7 d-flex align-items-center gap-2">
                            <span className="badge rounded-pill" style={{ backgroundColor: stall.color, width: 9, height: 9 }}> </span>
                            {stall.name}
                          </div>
                          <small className="text-muted d-block fs-9">{stall.desc}</small>
                        </div>
                        <div className="text-end ps-2 flex-shrink-0">
                          <span className="fw-black text-danger fs-6 fw-bold">₹{stall.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Extra Add-on (Fan Option) */}
                <div className="p-2.5 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold text-dark d-block">Add Cooling Fan (+₹300 / Day)</span>
                    <small className="text-muted fs-9">Advance booking only. You can also bring your own fan.</small>
                  </div>
                  <div className="form-check form-switch fs-5 m-0">
                    <input 
                      className="form-check-input cursor-pointer" 
                      type="checkbox" 
                      checked={addFan} 
                      onChange={(e) => setAddFan(e.target.checked)} 
                    />
                  </div>
                </div>

                {/* 3. Vendor Registration Details */}
                <div>
                  <label className="fw-bold text-dark mb-2 d-block">2. Vendor / Business Details:</label>
                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <input 
                        type="text" 
                        required 
                        placeholder="Your Full Name *" 
                        className="form-control fs-8 py-2"
                        value={vendorForm.name}
                        onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input 
                        type="tel" 
                        required 
                        placeholder="WhatsApp Mobile Number *" 
                        className="form-control fs-8 py-2"
                        value={vendorForm.phone}
                        onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input 
                        type="email" 
                        required 
                        placeholder="Email Address *" 
                        className="form-control fs-8 py-2"
                        value={vendorForm.email}
                        onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input 
                        type="text" 
                        required 
                        placeholder="Shop / Business Name *" 
                        className="form-control fs-8 py-2"
                        value={vendorForm.businessName}
                        onChange={(e) => setVendorForm({ ...vendorForm, businessName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Payment Mode Choice */}
                <div>
                  <label className="fw-bold text-dark mb-2 d-block">3. Choose Payment Method:</label>
                  <div className="row g-2">
                    <div className="col-6">
                      <div 
                        onClick={() => setPaymentMode('gateway')}
                        className={`p-2.5 rounded-3 border text-center cursor-pointer ${paymentMode === 'gateway' ? 'border-primary bg-primary-subtle text-primary fw-bold' : 'bg-light'}`}
                      >
                        <CreditCard size={18} className="d-block mx-auto mb-1" />
                        <span>Razorpay Online</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div 
                        onClick={() => setPaymentMode('qr')}
                        className={`p-2.5 rounded-3 border text-center cursor-pointer ${paymentMode === 'qr' ? 'border-primary bg-primary-subtle text-primary fw-bold' : 'bg-light'}`}
                      >
                        <QrCode size={18} className="d-block mx-auto mb-1" />
                        <span>Scan BharatQR</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR / Bank Info Section */}
                {paymentMode === 'qr' && (
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="row g-3 align-items-center">
                      <div className="col-12 col-md-5 text-center">
                        <div className="bg-white p-2 border rounded-3 d-inline-block shadow-sm">
                          <img 
                            src="/images/tarang-axis-qr.png" 
                            alt="Axis Bank BharatQR" 
                            className="img-fluid rounded" 
                            style={{ maxHeight: '160px' }}
                            onError={(e) => {
                              e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                                `upi://pay?pa=923020020267889@axisbank&pn=TARANG%20GOA&am=${totalAmount}&cu=INR`
                              )}`;
                            }}
                          />
                          <span className="d-block text-muted fs-9 mt-1 fw-bold">Scan to Pay via Any UPI App</span>
                        </div>
                      </div>

                      <div className="col-12 col-md-7">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="fw-bold text-dark">Axis Bank Direct:</span>
                          <button type="button" onClick={copyBankDetails} className="btn btn-sm btn-outline-primary py-0 px-2 fs-9 d-flex align-items-center gap-1">
                            {copiedBank ? <Check size={12} /> : <Copy size={12} />}
                            <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="text-secondary bg-white p-2 rounded-2 border mb-2 font-monospace fs-9">
                          <div>Name: <strong>TARANG GOA</strong></div>
                          <div>A/C: <strong>923020020267889</strong></div>
                          <div>IFSC: <strong>UTIB0000078</strong></div>
                        </div>

                        <div>
                          <label className="form-label text-dark fw-bold mb-1 fs-9">Enter UPI Ref / UTR No *</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. 4289XXXXXXXX" 
                            className="form-control fs-8 py-1.5"
                            value={vendorForm.utrNumber}
                            onChange={(e) => setVendorForm({ ...vendorForm, utrNumber: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Terms & Guidelines Summary */}
                <div className="p-2.5 rounded-2 bg-warning-subtle text-dark fs-9 border border-warning-subtle">
                  <div className="d-flex align-items-center gap-1 fw-bold mb-1">
                    <AlertCircle size={14} className="text-warning-emphasis" />
                    <span>Important Guidelines:</span>
                  </div>
                  <ul className="mb-0 ps-3">
                    <li>100% advance payment required for booking confirmation[cite: 8].</li>
                    <li>Stall setup can be done on 27th Oct, after 7:00 PM[cite: 8].</li>
                    <li>No refund in case of cancellation[cite: 8].</li>
                  </ul>
                </div>

              </div>

              {/* 3. Sticky Bottom Checkout Bar (Always Visible) */}
              <div 
                className="p-3 bg-white border-top d-flex align-items-center justify-content-between flex-shrink-0 shadow-sm"
              >
                <div>
                  <small className="text-muted d-block fs-9">Total Payable Amount:</small>
                  <strong className="fs-5 text-danger">₹{totalAmount.toLocaleString('en-IN')}.00</strong>
                </div>

                <button 
                  type="submit" 
                  disabled={paying}
                  className="btn text-white rounded-pill px-4 py-2 fw-bold fs-7 shadow-sm d-flex align-items-center gap-2"
                  style={{ backgroundColor: '#800020' }}
                >
                  {paying ? (
                    <Loader2 size={16} className="spinner-border spinner-border-sm" />
                  ) : (
                    <ShieldCheck size={18} />
                  )}
                  <span>{paymentMode === 'gateway' ? 'Pay with Razorpay' : 'Confirm QR Booking'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-75" style={{ zIndex: 1070 }} onClick={() => setSelectedImage(null)}>
          <div className="position-relative p-2" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="btn btn-sm btn-dark rounded-circle position-absolute top-0 end-0 m-2">
              <X size={18} />
            </button>
            <img src={selectedImage} alt="Full View" className="img-fluid rounded-3" style={{ maxHeight: '85vh' }} />
          </div>
        </div>
      )}
    </section>
  );
}