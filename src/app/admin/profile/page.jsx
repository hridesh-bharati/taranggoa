'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileController } from '@/controllers/profile.controller';
import { showToast } from '@/utils/toast';
import { User, Phone, FileText, Info, Save, Edit3, X, ShieldCheck, Camera, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    mobile: '',
    about: '',
    description: '',
    photoURL: ''
  });

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setFormData((prev) => ({ ...prev, ...cached }));

      profileController.fetchProfile(user.uid, user.email, (freshData) => {
        setFormData((prev) => ({ ...prev, ...freshData }));
      }).catch((err) => showToast('error', err.message));
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.uid) return;

    setUploadingImage(true);
    try {
      const cloudinaryUrl = await profileController.uploadImage(file, user.uid);
      const updatedData = { ...formData, photoURL: cloudinaryUrl };
      setFormData(updatedData);

      await profileController.saveProfile(user.uid, updatedData);
      showToast('success', 'Profile photo updated!');
    } catch (err) {
      showToast('error', err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const fields = [
    { label: 'User Name *', name: 'name', icon: User, required: true, iconBg: 'bg-primary text-white' },
    { label: 'Mobile Number *', name: 'mobile', icon: Phone, required: true, iconBg: 'bg-success text-white' },
    { label: 'About (Optional)', name: 'about', icon: Info, iconBg: 'bg-info text-white' },
    { label: 'Description (Optional)', name: 'description', icon: FileText, type: 'textarea', iconBg: 'bg-warning text-dark' },
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await profileController.saveProfile(user.uid, formData);
      setIsEditing(false);
      showToast('success', res.message || 'Profile saved successfully!');
    } catch (err) {
      showToast('error', err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid py-3 px-3 px-lg-4">
      <form onSubmit={handleSubmit}>
        
        {/* HEADER SECTION */}
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-2 border-danger">
          <div>
            <h4 className="fw-black text-primary fw-bolder mb-1 fs-3">User Profile</h4>
            <small className="text-secondary fw-semibold">Manage your personal details and public info</small>
          </div>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn btn-primary rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 fs-7 shadow"
              >
                <Edit3 size={16} /> Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline-danger bg-white rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-1.5 fs-7 shadow-sm"
                >
                  <X size={16} /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="btn btn-success text-white rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 fs-7 shadow"
                >
                  {saving ? <Loader2 size={16} className="spinner-border spinner-border-sm" /> : <Save size={16} />} Save Profile
                </button>
              </>
            )}
          </div>
        </div>

        {/* CARDS CONTAINER */}
        <div className="row g-4">
          
          {/* LEFT COLORFUL AVATAR CARD */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 rounded-4 shadow p-4 text-center bg-white border-top border-4 border-primary">
              <div className="mx-auto mb-3 position-relative" style={{ width: 110, height: 110 }}>
                {formData.photoURL ? (
                  <img
                    src={formData.photoURL}
                    alt="Profile"
                    className="rounded-circle w-100 h-100 object-fit-cover border border-3 border-primary shadow"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div 
                    className="text-white rounded-circle w-100 h-100 d-flex align-items-center justify-content-center fw-bold fs-1 shadow bg-gradient"
                    style={{ backgroundColor: '#f15a24' }}
                  >
                    {formData.name ? formData.name.charAt(0).toUpperCase() : 'H'}
                  </div>
                )}

                {isEditing && (
                  <label htmlFor="pic-input" className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 border border-2 border-white shadow cursor-pointer" style={{ cursor: 'pointer' }}>
                    {uploadingImage ? <Loader2 size={14} className="spinner-border spinner-border-sm" /> : <Camera size={14} />}
                    <input id="pic-input" type="file" accept="image/*" className="d-none" disabled={uploadingImage} onChange={handleImageUpload} />
                  </label>
                )}
              </div>

              <h4 className="fw-bold mb-1 text-primary">{formData.name || 'Hridesh'}</h4>
              <p className="text-secondary fs-7 mb-3 fw-bold">{formData.email}</p>

              <div className="pt-2">
                <span className="badge bg-success text-white border-0 rounded-pill px-3 py-2 fw-bold fs-8 d-inline-flex align-items-center gap-1 shadow-sm">
                  <ShieldCheck size={14} /> Active Admin
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLORFUL FORM CARD */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 rounded-4 shadow p-4 bg-white border-top border-4 border-danger">
              <h6 className="fw-bold text-dark border-bottom pb-3 mb-4 fs-6 d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark p-2 rounded-circle"><Info size={16} /></span>
                <span className="text-primary fw-bold fs-5">Personal Details</span>
              </h6>

              <div className="row g-3">
                {fields.map(({ label, name, icon: Icon, type, required, iconBg }) => (
                  <div key={name} className={`col-12 ${name === 'name' || name === 'mobile' ? 'col-md-6' : ''}`}>
                    <label className="form-label fw-bold fs-7 text-dark">{label}</label>
                    <div className="input-group shadow-sm rounded-3 overflow-hidden">
                      <span className={`input-group-text border-0 ${iconBg}`}>
                        <Icon size={16} />
                      </span>
                      {type === 'textarea' ? (
                        <textarea
                          name={name}
                          rows="3"
                          value={formData[name]}
                          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                          disabled={!isEditing}
                          className="form-control bg-light border-0 py-2 fs-7 fw-semibold text-dark"
                          placeholder={`Enter ${label}`}
                        />
                      ) : (
                        <input
                          type={name === 'mobile' ? 'tel' : 'text'}
                          name={name}
                          value={formData[name]}
                          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                          disabled={!isEditing}
                          required={required}
                          className="form-control bg-light border-0 py-2 fs-7 fw-semibold text-dark"
                          placeholder={`Enter ${label}`}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </form>
    </div>
  );
}