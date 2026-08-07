'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { exhibitionsController } from '@/controllers/exhibitions.controller';
import { showToast } from '@/utils/toast';
import { Plus, Loader2, Upload, X, Edit2 } from 'lucide-react';

const FORM_FIELDS = [
  { name: 'badge', label: 'Festive Badge *', type: 'text', placeholder: 'e.g. Raksha Bandhan Special 🎁', required: true, col: 'col-12 col-md-6' },
  { name: 'location', label: 'Venue Location *', type: 'text', placeholder: 'e.g. Kala Academy Goa, Darya Sangam', required: true, col: 'col-12 col-md-6' },
  { name: 'startDate', label: 'Start Date *', type: 'date', required: true, col: 'col-12 col-md-6' },
  { name: 'endDate', label: 'End Date *', type: 'date', required: true, col: 'col-12 col-md-6' },
  { name: 'dates', label: 'Date Display Text *', type: 'text', placeholder: 'e.g. 12th – 16th August 2026', required: true, col: 'col-12 col-md-6' },
  { name: 'daysInput', label: 'Date Chips (Comma Separated)', type: 'text', placeholder: '12 WED, 13 THU, 14 FRI, 15 SAT', required: false, col: 'col-12 col-md-6' },
  { name: 'timing', label: 'Timing Hours', type: 'text', placeholder: '11:00 AM to 09:00 PM', required: false, col: 'col-12 col-md-6' },
  { name: 'contact', label: 'Contact Numbers *', type: 'tel', placeholder: '9158063030 | 8329539407', required: true, col: 'col-12 col-md-6' }
];

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
    categories: 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Much More',
    contact: ''
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
              categories: data.categories || 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Much More',
              contact: data.contact || ''
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
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      showToast('error', 'Please select or upload a poster image');
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
        {isEdit ? 'Edit Exhibition Details' : 'Add New Exhibition / Poster'}
      </h6>

      <form onSubmit={handleSubmit} className="row g-3 fs-8">
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

        <div className="col-12">
          <label className="form-label fw-bold text-secondary mb-1">Poster Image File *</label>

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
                <span className="fw-bold text-dark d-block fs-8">Click to upload Poster Image</span>
                <small className="text-muted fs-9">Supports PNG, JPG, WEBP up to 5MB</small>
              </label>
            </div>
          ) : (
            <div className="position-relative d-inline-block border rounded-3 overflow-hidden bg-light p-1">
              <img
                src={imagePreview}
                alt="Selected Poster"
                className="rounded-2 object-fit-contain"
                style={{ maxHeight: '160px', maxWidth: '100%' }}
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

        <div className="col-12 text-end pt-2">
          <button type="submit" disabled={saving} className="btn btn-primary rounded-pill px-4 py-2 fw-bold fs-8 shadow-sm">
            {saving ? <Loader2 size={16} className="spinner-border spinner-border-sm me-1" /> : (isEdit ? <Edit2 size={16} className="me-1" /> : <Plus size={16} className="me-1" />)}
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