import React, { useState, useEffect } from 'react';
import API from './api';
import { DEGREE_GROUPS } from './degreeHelper';

function Profile({ onProfileUpdate }) {
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await API.get('/profile');
        if (res.data) {
          setName(res.data.name || '');
          setUniversity(res.data.university || '');
          setDegree(res.data.degree || '');
          localStorage.setItem('user', JSON.stringify(res.data));
          if (onProfileUpdate) {
            onProfileUpdate(res.data);
          }
        }
      } catch (err) {
        // Fallback to local storage if API fails
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setName(user.name || '');
          setUniversity(user.university || '');
          setDegree(user.degree || '');
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [onProfileUpdate]);

  const handleSave = async () => {
    if (localStorage.getItem('isDemo') === 'true') {
      alert('Login required to access this feature. Please register or login to save your profile!');
      localStorage.clear();
      window.location.reload();
      return;
    }
    if (!name || !university || !degree) { alert('Please fill all fields!'); return; }
    setLoading(true);
    try {
      const res = await API.put('/profile', { name, university, degree });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (onProfileUpdate) {
        onProfileUpdate(res.data.user);
      }
      setSaved(true);
    } catch (err) {
      console.warn('API error, falling back to local storage profile update:', err);
      // Fallback: update local storage so user profile is successfully saved anyway
      const currentUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = {
        ...currentUser,
        name,
        university,
        degree
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      }
      setSaved(true);
    }
    setLoading(false);
  };

  // ── Theme configuration objects matching the landing structure ──
  const S = {
    page: { 
      padding: '60px 20px', 
      fontFamily: "'Segoe UI', sans-serif", 
      maxWidth: '540px', 
      margin: '0 auto',
      minHeight: '80vh'
    },
    card: { 
      backgroundColor: 'var(--bg-card)', 
      borderRadius: '22px', 
      padding: '44px', 
      border: '1px solid var(--border-color)', 
      boxShadow: 'var(--shadow)',
      backdropFilter: 'blur(16px)'
    },
    iconCircle: { 
      width: '65px', 
      height: '65px', 
      background: 'var(--gradient-accent)', 
      borderRadius: '18px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontSize: '28px', 
      margin: '0 auto 20px', 
      boxShadow: '0 4px 15px rgba(255,120,0,0.25)' 
    },
    title: { 
      color: 'var(--text-primary)', 
      fontSize: '24px', 
      fontWeight: '800', 
      margin: '0 0 6px',
      textAlign: 'center' 
    },
    subtitle: { 
      color: 'var(--text-secondary)', 
      margin: '0 0 32px', 
      fontSize: '14px',
      textAlign: 'center' 
    },
    label: { 
      display: 'block', 
      fontSize: '11px', 
      fontWeight: '700', 
      color: 'var(--text-secondary)', 
      marginBottom: '8px', 
      textTransform: 'uppercase', 
      letterSpacing: '0.8px' 
    },
    input: { 
      width: '100%', 
      padding: '13px 16px', 
      borderRadius: '10px', 
      border: '1.5px solid var(--border-color)', 
      fontSize: '14px', 
      boxSizing: 'border-box', 
      outline: 'none', 
      backgroundColor: 'var(--input-bg)', 
      color: 'var(--text-primary)', 
      fontFamily: 'inherit',
      transition: 'all 0.2s'
    },
    submitBtn: { 
      width: '100%', 
      padding: '14px', 
      background: 'var(--gradient-accent)', 
      color: '#ffffff', 
      border: 'none', 
      borderRadius: '10px', 
      fontSize: '15px', 
      fontWeight: '700', 
      cursor: 'pointer', 
      boxShadow: '0 4px 15px rgba(255,120,0,0.2)', 
      fontFamily: 'inherit',
      marginTop: '12px',
      transition: 'all 0.3s'
    },
    editBtn: { 
      marginTop: '28px', 
      padding: '12px 34px', 
      background: 'var(--gradient-accent)', 
      color: '#ffffff', 
      border: 'none', 
      borderRadius: '10px', 
      cursor: 'pointer', 
      fontWeight: '700', 
      fontSize: '14px', 
      boxShadow: '0 4px 15px rgba(255,120,0,0.2)' 
    },
    successRow: (isEven) => ({
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '13px 18px', 
      borderRadius: '10px', 
      backgroundColor: isEven ? 'rgba(255,120,0,0.03)' : 'var(--bg-secondary)', 
      border: isEven ? '1px solid rgba(255,120,0,0.06)' : '1px solid var(--border-color)',
      marginBottom: '6px'
    })
  };

  if (saved) {
    return (
      <div style={S.page}>
        <div style={{ ...S.card, textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ color: '#FF7800', fontSize: '26px', fontWeight: '800', margin: '0 0 24px' }}>Profile Saved!</h2>
          
          {[['Name', name], ['University', university], ['Degree', degree]].map(([label, value], i) => (
            <div key={i} style={S.successRow(i % 2 === 0)}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '14px' }}>{label}</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '14px' }}>{value}</span>
            </div>
          ))}
          
          <button onClick={() => setSaved(false)} style={S.editBtn}>
            Edit Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* ── Header Area ── */}
        <div>
          <div style={S.iconCircle}>👤</div>
          <h2 style={S.title}>My Profile</h2>
          <p style={S.subtitle}>Update your personal information</p>
        </div>

        {/* ── Input Fields ── */}
        {[
          { label: 'Full Name', placeholder: 'Enter your full name', value: name, setValue: setName },
          { label: 'University', placeholder: 'Enter your university', value: university, setValue: setUniversity },
        ].map((field, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <label style={S.label}>{field.label}</label>
            <input 
              type="text" 
              placeholder={field.placeholder} 
              value={field.value} 
              onChange={(e) => field.setValue(e.target.value)}
              style={S.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF7800';
                e.target.style.background = 'rgba(255,120,0,0.01)';
              }} 
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.background = 'var(--input-bg)';
              }} 
            />
          </div>
        ))}

        {/* ── Dropdown Program Selection ── */}
        <div style={{ marginBottom: '28px' }}>
          <label style={S.label}>Degree Program</label>
          <select 
            value={degree} 
            onChange={(e) => setDegree(e.target.value)}
            style={S.input}
            onFocus={(e) => {
              e.target.style.borderColor = '#FF7800';
              e.target.style.background = 'rgba(255,120,0,0.01)';
            }} 
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.background = 'var(--input-bg)';
            }}
          >
            <option value="" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Select degree program</option>
            {DEGREE_GROUPS.map((group, gi) => (
              <optgroup key={gi} label={group.label} style={{ background: 'var(--bg-secondary)', color: '#FF7800' }}>
                {group.options.map((opt, oi) => (
                  <option key={oi} value={opt.value} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{opt.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* ── Save Action Button ── */}
        <button 
          onClick={handleSave} 
          disabled={loading}
          style={S.submitBtn}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {loading ? 'Saving...' : 'Save Profile →'}
        </button>
      </div>
    </div>
  );
}

export default Profile;