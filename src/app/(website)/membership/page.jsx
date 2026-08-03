'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { profileController } from '@/controllers/profile.controller';
import { showToast } from '@/utils/toast';
import { 
  Camera, 
  Save, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Loader2, 
  LogOut, 
  ShieldCheck, 
  Award, 
  Headphones 
} from 'lucide-react';

export default function MembershipPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

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
    if (!loading && !user) {
      router.push('/admin/auth/login');
      return;
    }

    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setProfileData(cached);

      profileController.fetchProfile(user.uid, user.email, (freshData) => {
        setProfileData(freshData);
      });
    }
  }, [user, loading, router]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const uploadedUrl = await profileController.uploadImage(file, user.uid);
      const updatedProfile = { ...profileData, photoURL: uploadedUrl };
      
      setProfileData(updatedProfile);
      await profileController.saveProfile(user.uid, updatedProfile);
      showToast('success', 'Profile picture updated successfully!');
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

  if (loading || !user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  return (
    <main className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div className="container py-5 flex-grow-1" style={{ maxWidth: 960 }}>
        
        {/* HEADER CARD */}
        <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4 border-top border-4 border-warning">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <span className="badge bg-warning text-dark px-3 py-1 rounded-pill mb-2 fw-bold">
                MEMBER DASHBOARD
              </span>
              <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>
                Welcome, {profileData.name || user.email.split('@')[0]}
              </h3>
              <small className="text-muted fw-medium">{user.email}</small>
            </div>

            <button 
              onClick={logout} 
              className="btn btn-outline-danger rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm align-self-start align-self-md-auto"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border d-flex align-items-center gap-3">
                <div className="bg-warning-subtle text-warning p-2.5 rounded-circle">
                  <Award size={22} />
                </div>
                <div>
                  <span className="text-muted fw-bold fs-8 d-block text-uppercase">Exhibitions</span>
                  <span className="fs-6 fw-bold text-dark">02 Active Registered</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border d-flex align-items-center gap-3">
                <div className="bg-success-subtle text-success p-2.5 rounded-circle">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className="text-muted fw-bold fs-8 d-block text-uppercase">Member Status</span>
                  <span className="fs-6 fw-bold text-success">Verified Entrepreneur</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border d-flex align-items-center gap-3">
                <div className="bg-primary-subtle text-primary p-2.5 rounded-circle">
                  <Headphones size={22} />
                </div>
                <div>
                  <span className="text-muted fw-bold fs-8 d-block text-uppercase">Support Desk</span>
                  <span className="fs-6 fw-bold text-primary">Priority Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE FORM */}
        <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
          <h5 className="fw-bold text-dark border-bottom pb-3 mb-4 d-flex align-items-center gap-2">
            <User className="text-warning" size={20} /> Personal Profile Settings
          </h5>

          <form onSubmit={handleSaveProfile}>
            <div className="row g-4">
              
              <div className="col-12 text-center mb-2">
                <div className="position-relative d-inline-block">
                  <div 
                    className="rounded-circle overflow-hidden border border-4 border-warning shadow-sm mx-auto bg-light d-flex align-items-center justify-content-center"
                    style={{ width: 110, height: 110 }}
                  >
                    {uploadingImage ? (
                      <Loader2 className="spinner-border text-warning" size={24} />
                    ) : profileData.photoURL ? (
                      <img src={profileData.photoURL} alt="Profile" className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <span className="fw-bold text-primary fs-3">{profileData.name?.charAt(0) || 'M'}</span>
                    )}
                  </div>

                  <label 
                    htmlFor="photoUpload" 
                    className="position-absolute bottom-0 end-0 bg-warning text-dark p-2 rounded-circle shadow border cursor-pointer"
                    title="Change Profile Photo"
                  >
                    <Camera size={16} />
                    <input 
                      type="file" 
                      id="photoUpload" 
                      accept="image/*" 
                      className="d-none" 
                      disabled={uploadingImage}
                      onChange={handleImageChange} 
                    />
                  </label>
                </div>
                <small className="d-block text-muted mt-2 fw-medium">Click camera icon to change profile picture</small>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-bold fs-7 text-dark">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><User size={16} className="text-muted" /></span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2.5 fs-7 fw-medium"
                    placeholder="Enter your full name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-bold fs-7 text-dark">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><Mail size={16} className="text-muted" /></span>
                  <input
                    type="email"
                    className="form-control bg-light border-0 py-2.5 fs-7 fw-medium text-muted"
                    value={profileData.email || user.email}
                    disabled
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-bold fs-7 text-dark">Mobile / WhatsApp Number</label>
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
                <label className="form-label fw-bold fs-7 text-dark">Designation / Profession</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><FileText size={16} className="text-muted" /></span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2.5 fs-7 fw-medium"
                    placeholder="e.g. Senior Technical Director / Entrepreneur"
                    value={profileData.about}
                    onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label fw-bold fs-7 text-dark">About / Bio</label>
                <textarea
                  rows="3"
                  className="form-control bg-light border-0 p-3 fs-7 fw-medium"
                  placeholder="Share a brief overview about your business or expertise..."
                  value={profileData.description}
                  onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                />
              </div>

              <div className="col-12 text-end pt-2">
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

      </div>

      <Footer />
    </main>
  );
}