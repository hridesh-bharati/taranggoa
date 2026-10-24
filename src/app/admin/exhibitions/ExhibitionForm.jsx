'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { exhibitionsController } from '@/controllers/exhibitions.controller';
import { showToast } from '@/utils/toast';
import { Plus, Loader2, Upload, X, Edit2, Tag, FileText, CheckCircle2 } from 'lucide-react';

const FORM_FIELDS = [
  { name: 'badge', label: 'Festive Badge *', type: 'text', placeholder: 'e.g. DIWALI SPECIAL EXHIBITION 🪔', required: true, col: 'col-12 col-md-6' },
  { name: 'location', label: 'Venue Location *', type: 'text', placeholder: 'e.g. Kranti Maidan, Ponda, Goa', required: true, col: 'col-12 col-md-6' },
  { name: 'startDate', label: 'Start Date *', type: 'date', required: true, col: 'col-12 col-md-6' },
  { name: 'endDate', label: 'End Date *', type: 'date', required: true, col: 'col-12 col-md-6' },
  { name: 'dates', label: 'Date Display Text *', type: 'text', placeholder: 'e.g. 28th OCT to 1st Nov 2026', required: true, col: 'col-12 col-md-6' },
  { name: 'daysInput', label: 'Date Chips (Comma Separated)', type: 'text', placeholder: '28 WED, 29 THU, 30 FRI, 31 SAT, 01 SUN', required: false, col: 'col-12 col-md-6' },
  { name: 'timing', label: 'Timing Hours', type: 'text', placeholder: '10:30 AM to 09:30 PM', required: false, col: 'col-12 col-md-6' },
  { name: 'contact', label: 'Contact Numbers *', type: 'tel', placeholder: '9158063030 | 8329539407', required: true, col: 'col-12 col-md-6' }
];

const DEFAULT_TERMS = `1. Layout is subject to change.
2. Booking Confirmation on 100% advance payment only.
3. Dates of the event: 28th OCT to 1st Nov 2026.
4. Stalls setup can be done 27TH OCT, AFTER 7PM.
5. You can leave your stock at the venue covering it properly at night.
6. Prices mentioned for the stalls are fixed.
7. To book, please complete payment and save transaction receipt.
8. No Refund in case of cancellation of the stall.`;

function ExhibitionFormContent({ onSuccess }) {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const isEdit = Boolean(editId);

  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [form, setForm] = useState({
    badge: '',
    title: 'TARANG UTSAV 2026',
    location: '',
    startDate: '',
    endDate: '',
    dates: '',
    daysInput: '',
    timing: '11:00 AM to 09:00 PM',
    categories: 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Food Court',
    contact: '9158063030 | 8329539407',
    price3x2: 15000,
    price2x2: 12000,
    priceTable: 8000,
    fanPricePerDay: 300,
    terms: DEFAULT_TERMS,
    bankAccount: '923020020267889',
    bankIfsc: 'UTIB0000078',
    bankName: 'Axis Bank'
  });

  useEffect(() => {
    if (isEdit) {
      setLoadingData(true);
      exhibitionsController.fetchExhibitionById(editId)
        .then((data) => {
          if (data) {
            setForm({
              badge: data.badge || '',
              title: data.title || 'TARANG UTSAV 2026',
              location: data.location || '',
              startDate: data.startDate || '',
              endDate: data.endDate || '',
              dates: data.dates || '',
              daysInput: Array.isArray(data.days) ? data.days.join(', ') : (data.daysInput || ''),
              timing: data.timing || '11:00 AM to 09:00 PM',
              categories: data.categories || 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Food Court',
              contact: data.contact || '9158063030 | 8329539407',
              price3x2: data.price3x2 ?? 15000,
              price2x2: data.price2x2 ?? 12000,
              priceTable: data.priceTable ?? 8000,
              fanPricePerDay: data.fanPricePerDay ?? 300,
              terms: data.terms || DEFAULT_TERMS,
              bankAccount: data.bankAccount || '923020020267889',
              bankIfsc: data.bankIfsc || 'UTIB0000078',
              bankName: data.bankName || 'Axis Bank'
            });
            if (data.image) {
              setImagePreview(data.image);
            }
          }
        })
        .catch(() => showToast('error', 'Failed to load exhibition details'))
        .finally(() => setLoadingData(false));
    }
  }, [editId, isEdit]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('error', 'File size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !imagePreview) {
      showToast('error', 'Please upload a layout blueprint or poster image');
      return;
    }

    setSaving(true);
    try {
      const payload = { ...form, imageFile, image: imagePreview };
      if (isEdit) {
        await exhibitionsController.updateExhibition(editId, payload);
        showToast('success', 'Exhibition updated successfully!');
      } else {
        await exhibitionsController.createExhibition(payload);
        showToast('success', 'Exhibition published successfully!');
      }

      if (onSuccess) onSuccess();
    } catch {
      showToast('error', isEdit ? 'Failed to update exhibition' : 'Failed to publish exhibition');
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <div className="card border-0 rounded-3 bg-white p-5 text-center shadow-sm">
        <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
        <span className="text-muted fw-bold small">Loading exhibition for editing...</span>
      </div>
    );
  }

  return (
    <div className="card border-0 rounded-3 bg-white p-3 p-md-4 shadow-sm">
      <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2 border-bottom pb-2">
        {isEdit ? <Edit2 size={18} className="text-primary" /> : <Plus size={18} className="text-primary" />}
        {isEdit ? 'Edit Exhibition & Stall System' : 'Add New Exhibition / Stall Layout'}
      </h6>

      <form onSubmit={handleSubmit} className="row g-3 fs-8">
        
        {/* Basic Fields */}
        {FORM_FIELDS.map((field) => (
          <div key={field.name} className={field.col}>
            <label className="form-label fw-bold text-secondary mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="form-control fs-8 fw-semibold"
              required={field.required}
              placeholder={field.placeholder || ''}
              value={form[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* --- SECTION 1: STALL RATES & PRICING CONFIGURATION --- */}
        <div className="col-12 mt-3">
          <div className="p-3 bg-light rounded-3 border">
            <label className="fw-bold text-dark d-flex align-items-center gap-2 mb-2 fs-7">
              <Tag size={16} className="text-danger" />
              <span>Stall Rates & Pricing Settings (₹)</span>
            </label>

            <div className="row g-3">
              <div className="col-12 col-md-3">
                <label className="form-label text-muted fw-semibold mb-1">3x2 Mtr Octonorm (₹)</label>
                <input
                  type="number"
                  name="price3x2"
                  className="form-control fs-8 fw-bold text-danger"
                  value={form.price3x2}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted fs-9">Includes 2 Tables (6x2ft), 2 Chairs[cite: 10]</small>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label text-muted fw-semibold mb-1">2x2 Mtr Octonorm (₹)</label>
                <input
                  type="number"
                  name="price2x2"
                  className="form-control fs-8 fw-bold text-warning"
                  value={form.price2x2}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted fs-9">Includes 2 Tables (4x2ft), 2 Chairs[cite: 10]</small>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label text-muted fw-semibold mb-1">Table Space (₹)</label>
                <input
                  type="number"
                  name="priceTable"
                  className="form-control fs-8 fw-bold text-success"
                  value={form.priceTable}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted fs-9">Includes Single 6x2ft Table[cite: 10]</small>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label text-muted fw-semibold mb-1">Extra Fan Rate / Day (₹)</label>
                <input
                  type="number"
                  name="fanPricePerDay"
                  className="form-control fs-8 fw-bold text-primary"
                  value={form.fanPricePerDay}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted fs-9">Advance booking extra charge[cite: 10]</small>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: TERMS & CONDITIONS MANAGER --- */}
        <div className="col-12">
          <div className="p-3 bg-light rounded-3 border">
            <label className="fw-bold text-dark d-flex align-items-center gap-2 mb-2 fs-7">
              <FileText size={16} className="text-primary" />
              <span>Exhibition Terms & Conditions (Shown on Checkout)</span>
            </label>
            <textarea
              name="terms"
              rows="6"
              className="form-control fs-8 font-monospace text-secondary"
              value={form.terms}
              onChange={handleChange}
              placeholder="Enter stall booking rules & terms..."
            />
            <small className="text-muted fs-9 mt-1 d-block">
              Vendors will see these guidelines before making the payment.
            </small>
          </div>
        </div>

        {/* Poster / Stall Layout Blueprint Upload */}
        <div className="col-12">
          <label className="form-label fw-bold text-secondary mb-1">Stall Layout / Exhibition Poster Image *</label>

          {!imagePreview ? (
            <div className="border border-2 border-dashed rounded-3 p-4 text-center bg-light cursor-pointer">
              <input
                type="file"
                accept="image/*"
                required={!isEdit}
                id="exhibition-poster-input"
                className="d-none"
                onChange={handleImageChange}
              />
              <label htmlFor="exhibition-poster-input" className="cursor-pointer mb-0">
                <Upload size={24} className="text-primary mb-2 d-block mx-auto" />
                <span className="fw-bold text-dark d-block fs-8">Click to upload Stall Blueprint or Poster</span>
                <small className="text-muted fs-9">Supports PNG, JPG, WEBP up to 5MB</small>
              </label>
            </div>
          ) : (
            <div className="position-relative d-inline-block border rounded-3 overflow-hidden bg-light p-1">
              <img
                src={imagePreview}
                alt="Selected Poster"
                className="rounded-2 object-fit-contain"
                style={{ maxHeight: '180px', maxWidth: '100%' }}
              />
              <button
                type="button"
                onClick={removeImage}
                className="btn btn-sm btn-danger rounded-circle position-absolute top-0 end-0 m-2 p-1 d-flex align-items-center justify-content-center shadow"
                title="Remove Image"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Banking Reference */}
        <div className="col-12">
          <div className="p-3 bg-light rounded-3 border">
            <span className="fw-bold text-dark d-block mb-1">🏦 Configured Official Banking Details (For Manual Payee):</span>
            <div className="row g-2 fs-8 text-secondary">
              <div className="col-md-4">A/C: <strong>{form.bankAccount}</strong> ({form.bankName})[cite: 11]</div>
              <div className="col-md-4">IFSC: <strong>{form.bankIfsc}</strong>[cite: 11]</div>
              <div className="col-md-4">Helpdesk: <strong>{form.contact.split('|')[0].trim()}</strong>[cite: 13]</div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-12 text-end pt-2">
          <button type="submit" disabled={saving} className="btn btn-primary rounded-pill px-4 py-2 fw-bold fs-8 shadow-sm">
            {saving ? (
              <Loader2 size={16} className="spinner-border spinner-border-sm me-1" />
            ) : isEdit ? (
              <Edit2 size={16} className="me-1" />
            ) : (
              <Plus size={16} className="me-1" />
            )}
            {isEdit ? 'Update Exhibition' : 'Publish Exhibition'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default function ExhibitionForm(props) {
  return (
    <Suspense fallback={
      <div className="card border-0 rounded-3 bg-white p-5 text-center shadow-sm">
        <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
        <span className="text-muted fw-bold small">Loading form...</span>
      </div>
    }>
      <ExhibitionFormContent {...props} />
    </Suspense>
  );
}