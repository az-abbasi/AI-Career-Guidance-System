import React, { useState } from 'react';
import API from './api';

function Register({ onRegister, darkMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const D = darkMode;

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm || !university || !degree) {
      alert('Please fill out all mandatory fields.'); 
      return;
    }
    if (password !== confirm) { 
      alert('Passwords do not match.'); 
      return; 
    }
    setLoading(true);
    try {
      await API.post('/register', { name, email, password, university, degree });
      setDone(true);
    } catch (err) {
      alert('Registration failed. Email might already exist in database.');
    }
    setLoading(false);
  };

  const S = {
    card: {
      display: 'flex',
      width: '100%',
      maxWidth: '920px',
      background: D ? '#141724' : '#FFFFFF',
      border: D ? '1px solid rgba(255, 120, 0, 0.25)' : '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '24px',
      backdropFilter: 'blur(16px)',
      overflow: 'hidden',
      boxShadow: D ? '0 20px 50px rgba(0,0,0,0.6)' : '0 15px 40px rgba(0,0,0,0.06)',
      minHeight: '600px',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease'
    },
    leftPanel: {
      flex: 1,
      background: D ? '#0A0818' : '#FFF8F2',
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      color: D ? '#ffffff' : '#0F1117',
      justifyContent: 'center',
      borderRight: D ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease'
    },
    badge: {
      background: 'rgba(255, 120, 0, 0.15)',
      border: '1px solid rgba(255, 120, 0, 0.35)',
      borderRadius: '20px',
      padding: '4px 12px',
      fontSize: '11px',
      color: '#FF7800',
      fontWeight: '700',
      width: 'fit-content',
      marginBottom: '24px',
      letterSpacing: '0.8px',
      textTransform: 'uppercase',
    },
    leftTitle: {
      fontSize: '32px',
      fontWeight: '900',
      lineHeight: '1.2',
      margin: '0 0 16px 0',
      color: D ? '#ffffff' : '#0F1117',
      fontFamily: 'var(--font-display)',
    },
    leftDesc: {
      fontSize: '14.5px',
      color: D ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 17, 23, 0.65)',
      lineHeight: '1.6',
      marginBottom: '4px',
      maxWidth: '360px',
    },
    rightPanel: {
      flex: 1.2,
      padding: '40px 48px',
      background: D ? '#141724' : '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box',
    },
    inputLabel: {
      fontSize: '11px',
      fontWeight: '700',
      color: D ? '#ffffff' : '#0F1117',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '6px',
      display: 'block',
    },
    inputNode: {
      width: '100%',
      padding: '11px 14px',
      borderRadius: '10px',
      border: D ? '1.5px solid rgba(255, 255, 255, 0.15)' : '1.5px solid rgba(0, 0, 0, 0.12)',
      background: D ? '#0A0818' : '#FAFAF7',
      color: D ? '#ffffff' : '#0F1117',
      fontSize: '14.5px',
      outline: 'none',
      boxSizing: 'border-box',
      marginBottom: '14px',
      transition: 'all 0.2s ease',
      fontFamily: 'var(--font-body)',
    },
    submitBtn: {
      width: '100%',
      background: 'var(--gradient-accent)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      padding: '14px',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 6px 18px rgba(255, 120, 0, 0.3)',
      marginTop: '8px',
      marginBottom: '16px',
      transition: 'transform 0.1s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  if (done) {
    return (
      <div
        style={{
          textAlign: 'center',
          background: D ? '#141724' : '#FFFFFF',
          backdropFilter: 'blur(16px)',
          border: D ? '1px solid rgba(255, 120, 0, 0.25)' : '1px solid rgba(0, 0, 0, 0.08)',
          padding: '50px 40px',
          borderRadius: '24px',
          boxShadow: D ? '0 20px 50px rgba(0,0,0,0.6)' : '0 15px 45px rgba(0,0,0,0.06)',
          maxWidth: '460px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: D ? '#ffffff' : '#1C1C1E', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
          Profile Created!
        </h2>
        <p style={{ color: D ? 'rgba(255,255,255,0.7)' : 'rgba(28,28,30,0.7)', marginBottom: '32px', fontSize: '14.5px', lineHeight: '1.6' }}>
          Welcome <b style={{ color: '#FF7800' }}>{name}</b>! Your student record node has been successfully seeded. You can now access your assessments.
        </p>
        <button
          onClick={onRegister}
          className="btn-primary"
          style={{ width: 'auto', padding: '12px 36px', borderRadius: '8px' }}
        >
          Go to Sign In ›
        </button>
      </div>
    );
  }

  return (
    <div style={S.card}>
      {/* Left panel */}
      <div style={S.leftPanel}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: '800', fontSize: '16px' }}>
          <span>🎓</span> Career Guidance
        </div>
        <div style={S.badge}>✦ Registration Node</div>

        <h2 style={S.leftTitle}>
          Join the Next <br />
          Generation of <br />
          <span style={{
            background: 'var(--gradient-accent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Smart Thinkers</span>
        </h2>
        <p style={S.leftDesc}>
          Register your academic details to trigger personalized career recommendations and interactive roadmaps immediately.
        </p>
      </div>

      {/* Right form panel */}
      <div style={S.rightPanel}>
        <h3 style={{ fontSize: '24px', fontWeight: '900', color: D ? '#ffffff' : '#1C1C1E', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
          Create Profile
        </h3>
        <p style={{ fontSize: '14px', color: D ? 'rgba(255,255,255,0.6)' : 'rgba(28,28,30,0.65)', marginBottom: '24px' }}>
          Provide details to calibrate assessments
        </p>

        {/* Input fields */}
        {[
          { label: 'Full Name', placeholder: 'e.g. Zain Ahmed', value: name, setValue: setName, type: 'text' },
          { label: 'Email Address', placeholder: 'e.g. name@domain.com', value: email, setValue: setEmail, type: 'email' },
          { label: 'University / Institute', placeholder: 'e.g. FAST NUCES', value: university, setValue: setUniversity, type: 'text' },
        ].map((field, idx) => (
          <div key={idx}>
            <label style={S.inputLabel}>{field.label}</label>
            <input 
              type={field.type} 
              placeholder={field.placeholder} 
              value={field.value} 
              onChange={(e) => field.setValue(e.target.value)}
              style={S.inputNode}
              onFocus={(e) => e.target.style.borderColor = '#FF7800'} 
              onBlur={(e) => e.target.style.borderColor = D ? 'rgba(255,255,255,0.15)' : 'rgba(0, 0, 0, 0.08)'} 
            />
          </div>
        ))}

        {/* Degree Selection Dropdown */}
        <div>
          <label style={S.inputLabel}>Degree Track Node</label>
          <select 
            value={degree} 
            onChange={(e) => setDegree(e.target.value)}
            style={S.inputNode}
            onFocus={(e) => e.target.style.borderColor = '#FF7800'} 
            onBlur={(e) => e.target.style.borderColor = D ? 'rgba(255,255,255,0.15)' : 'rgba(0, 0, 0, 0.08)'}
          >
            <option value="" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>Select degree program / career track...</option>
            
            <optgroup label="💻 Computer Science & IT Tracks" style={{ background: D ? '#1A1D2E' : '#ffffff', color: '#FF7800', fontWeight: 'bold' }}>
              <option value="BSCS - Computer Science" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BSCS - Computer Science</option>
              <option value="BSSE - Software Engineering" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BSSE - Software Engineering</option>
              <option value="BSIT - Information Technology" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BSIT - Information Technology</option>
              <option value="BSAI - Artificial Intelligence" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BSAI - Artificial Intelligence</option>
              <option value="BSDS - Data Science" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BSDS - Data Science</option>
              <option value="BSCyS - Cybersecurity" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BSCyS - Cybersecurity</option>
              <option value="BS Cloud & DevOps Engineering" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Cloud & DevOps Engineering</option>
              <option value="BS Game & Interactive Media Design" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Game & Interactive Media Design</option>
            </optgroup>

            <optgroup label="⚙️ Engineering & Technology" style={{ background: D ? '#1A1D2E' : '#ffffff', color: '#FF7800', fontWeight: 'bold' }}>
              <option value="BS Electrical Engineering" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Electrical Engineering</option>
              <option value="BS Mechanical Engineering" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Mechanical Engineering</option>
              <option value="BS Civil Engineering" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Civil Engineering</option>
              <option value="BS Chemical Engineering" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Chemical Engineering</option>
            </optgroup>

            <optgroup label="🩺 Medical & Health Sciences" style={{ background: D ? '#1A1D2E' : '#ffffff', color: '#FF7800', fontWeight: 'bold' }}>
              <option value="MBBS - Medicine & Surgery" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>MBBS - Medicine & Surgery</option>
              <option value="Pharm-D - Pharmacy" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>Pharm-D - Pharmacy</option>
              <option value="BS Nursing & Healthcare" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Nursing & Healthcare</option>
              <option value="BS Allied Health Sciences" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Allied Health Sciences</option>
            </optgroup>

            <optgroup label="📈 Business & Management" style={{ background: D ? '#1A1D2E' : '#ffffff', color: '#FF7800', fontWeight: 'bold' }}>
              <option value="BBA - Business Administration" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BBA - Business Administration</option>
              <option value="BS Accounting & Finance" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Accounting & Finance</option>
              <option value="BS Marketing & Digital Media" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Marketing & Digital Media</option>
              <option value="BS Entrepreneurship & Innovation" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Entrepreneurship & Innovation</option>
              <option value="BS HR Management" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS HR Management</option>
              <option value="BS Supply Chain & Logistics" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Supply Chain & Logistics</option>
            </optgroup>

            <optgroup label="🔬 Natural & Applied Sciences" style={{ background: D ? '#1A1D2E' : '#ffffff', color: '#FF7800', fontWeight: 'bold' }}>
              <option value="BS Biotechnology & Bioinformatics" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Biotechnology & Bioinformatics</option>
              <option value="BS Biological Sciences" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Biological Sciences</option>
              <option value="BS Chemistry & Lab Science" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Chemistry & Lab Science</option>
              <option value="BS Physics & Astronomy" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Physics & Astronomy</option>
              <option value="BS Mathematics & Statistics" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Mathematics & Statistics</option>
              <option value="BS Environmental Science" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Environmental Science</option>
            </optgroup>

            <optgroup label="🎨 Social Sciences, Arts & Law" style={{ background: D ? '#1A1D2E' : '#ffffff', color: '#FF7800', fontWeight: 'bold' }}>
              <option value="BS Graphic & Product Design" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Graphic & Product Design</option>
              <option value="BS Psychology & Counseling" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Psychology & Counseling</option>
              <option value="LLB - Law & Legal Studies" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>LLB - Law & Legal Studies</option>
              <option value="BS Media & Mass Communication" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Media & Mass Communication</option>
              <option value="BFA - Fine Arts & Animation" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BFA - Fine Arts & Animation</option>
              <option value="B.Arch - Architecture" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>B.Arch - Architecture</option>
              <option value="BS Education & Pedagogy" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Education & Pedagogy</option>
              <option value="BS Social Work & NGO Studies" style={{ background: D ? '#1A1D2E' : '#ffffff', color: D ? '#ffffff' : '#1C1C1E' }}>BS Social Work & NGO Studies</option>
            </optgroup>
          </select>
        </div>

        {/* Passwords */}
        {[
          { label: 'Password', placeholder: '••••••••••••', value: password, setValue: setPassword },
          { label: 'Confirm Password', placeholder: '••••••••••••', value: confirm, setValue: setConfirm },
        ].map((field, idx) => (
          <div key={idx}>
            <label style={S.inputLabel}>{field.label}</label>
            <input 
              type="password" 
              placeholder={field.placeholder} 
              value={field.value} 
              onChange={(e) => field.setValue(e.target.value)}
              style={S.inputNode}
              onFocus={(e) => e.target.style.borderColor = '#FF7800'} 
              onBlur={(e) => e.target.style.borderColor = D ? 'rgba(255,255,255,0.15)' : 'rgba(0, 0, 0, 0.08)'} 
            />
          </div>
        ))}

        {/* Register Submit button */}
        <button 
          onClick={handleRegister} 
          disabled={loading}
          className="btn-primary"
          style={S.submitBtn}
        >
          {loading ? (
            <div style={{ width: '18px', height: '18px', border: '2.5px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
          ) : (
            'Register Profile Node ›'
          )}
        </button>

        {/* Redirect */}
        <div style={{ textAlign: 'center', fontSize: '13.5px', color: D ? 'rgba(255,255,255,0.6)' : 'rgba(28,28,30,0.65)' }}>
          Already have an account?{' '}
          <span 
            onClick={onRegister} 
            style={{ color: '#FF7800', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;