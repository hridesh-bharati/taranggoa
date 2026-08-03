'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileController } from '@/controllers/profile.controller';
import { showToast } from '@/utils/toast';
import { Camera, Save, User, Mail, Phone, FileText, Loader2 } from 'lucide-react';

export default function UserProfilePage() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    about: '',
    description: '',
    photoURL: ''
  });

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setProfileData(cached);

      profileController.fetchProfile(user.uid, user.email, (freshData) => {
        setProfileData(freshData);
      });
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await profileController.uploadImage(file, user.uid);
      const updatedProfile = { ...profileData, photoURL: uploadedUrl };
      setProfileData(updatedProfile);
      await profileController.saveProfile(user.uid, updatedProfile);
      showToast('success', 'Profile picture updated!');
    } catch (err) {
      showToast('error', err.message || 'Failed to upload photo');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileController.saveProfile(user.uid, profileData);
      showToast('success', 'Profile saved successfully!');
    } catch (err) {
      showToast('error', err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white border-top border-4 border-primary">
      <h5 className="fw-bold text-dark border-bottom pb-3 mb-4 d-flex align-items-center gap-2">
        <User className="text-primary" size={20} /> Personal Profile Settings
      </h5>

      <form onSubmit={handleSaveProfile}>
        <div className="row g-4">
          <div className="col-12 text-center mb-2">
            <div className="position-relative d-inline-block">
              <div 
                className="rounded-circle overflow-hidden border border-4 border-primary shadow-sm mx-auto bg-light d-flex align-items-center justify-content-center"
                style={{ width: 110, height: 110 }}
              >
                {uploadingImage ? (
                  <Loader2 className="spinner-border text-primary" size={24} />
                ) : profileData.photoURL ? (
                  <img src={profileData.photoURL} alt="Profile" className="w-100 h-100 object-fit-cover" />
                ) : (
                  <span className="fw-bold text-primary fs-3">{profileData.name?.charAt(0) || 'U'}</span>
                )}
              </div>

              <label 
                htmlFor="userPhotoUpload" 
                className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle shadow border cursor-pointer"
                title="Change Photo"
              >
                <Camera size={16} />
                <input 
                  type="file" 
                  id="userPhotoUpload" 
                  accept="image/*" 
                  className="d-none" 
                  disabled={uploadingImage}
                  onChange={handleImageChange} 
                />
              </label>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-bold fs-7 text-dark">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><User size={16} className="text-muted" /></span>
              <input
                type="text"
                className="form-control bg-light border-0 py-2.5 fs-7 fw-medium"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-bold fs-7 text-dark">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><Mail size={16} className="text-muted" /></span>
              <input type="email" className="form-control bg-light border-0 py-2.5 fs-7 fw-medium text-muted" value={profileData.email || user?.email || ''} disabled />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-bold fs-7 text-dark">Mobile Number</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><Phone size={16} className="text-muted" /></span>
              <input
                type="tel"
                className="form-control bg-light border-0 py-2.5 fs-7 fw-medium"
                placeholder="+91 98765 43210"
                value={profileData.mobile}
                onChange={(e) => setProfileData({ ...profileData, mobile: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-bold fs-7 text-dark">Profession / Designation</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><FileText size={16} className="text-muted" /></span>
              <input
                type="text"
                className="form-control bg-light border-0 py-2.5 fs-7 fw-medium"
                placeholder="Senior Director / Member"
                value={profileData.about}
                onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12">
            <label className="form-label fw-bold fs-7 text-dark">Bio / About</label>
            <textarea
              rows="3"
              className="form-control bg-light border-0 p-3 fs-7 fw-medium"
              placeholder="Write a brief overview about yourself..."
              value={profileData.description}
              onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
            />
          </div>

          <div className="col-12 text-end">
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="btn bg-logo-orange text-white rounded-pill px-5 py-2.5 fw-bold fs-7 shadow-sm d-inline-flex align-items-center gap-2"
            >
              {saving ? <Loader2 size={16} className="spinner-border spinner-border-sm" /> : <Save size={16} />} Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}