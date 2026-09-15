import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';

function Settings({ onLogout }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) { 
      setName(user.name || ''); 
      setEmail(user.email || ''); 
    }
  }, []);

  const handleSave = async () => {
    try {
      await API.put('/profile', { name });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Error saving settings!');
    }
  };

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '600px', margin: '0 auto' }}>

      {/* Success Alert Banner */}
      {saved && (
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: `1.5px solid ${theme.success || '#10b981'}`, borderRadius: '12px', padding: '14px 20px', marginBottom: '24px', textAlign: 'center', color: theme.success || '#10b981', fontWeight: '700', fontSize: '14.5px', transition: 'all 0.3s' }}>
          ✅ System preferences compiled and saved successfully!
        </div>
      )}

      {/* Header Panel */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow }}>⚙️</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Settings</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Configure your account access nodes and data channels</p>
      </div>

      {/* Profile Section Box */}
      <div style={{ background: theme.surface, borderRadius: theme.radiusXl || '24px', padding: '32px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg, marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 24px', color: theme.text, fontWeight: '800', fontSize: '16.5px' }}>👤 Profile Settings</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.textMuted || theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: `2px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#ffffff', color: theme.text, fontFamily: 'inherit', transition: 'all 0.15s' }}
            onFocus={(e) => { e.target.style.borderColor = theme.primary; e.target.style.boxShadow = '0 0 0 4px rgba(255,120,0,0.06)'; }} 
            onBlur={(e) => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none'; }} 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.textMuted || theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Email Address</label>
          <input 
            type="email" 
            value={email} 
            disabled
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: `1.5px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: theme.surfaceAlt || '#fafafb', color: theme.textSecondary, fontFamily: 'inherit', cursor: 'not-allowed' }} 
          />
        </div>
      </div>

      {/* Notifications Configuration Box */}
      <div style={{ background: theme.surface, borderRadius: theme.radiusXl || '24px', padding: '32px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg, marginBottom: '28px' }}>
        <h3 style={{ margin: '0 0 20px', color: theme.text, fontWeight: '800', fontSize: '16.5px' }}>🔔 Notifications</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: theme.text, fontSize: '14.5px', fontWeight: '700' }}>Enable Email Notifications</span>
          
          {/* Custom iOS Style Switch */}
          <div 
            onClick={() => setNotifications(!notifications)}
            style={{ width: '52px', height: '28px', borderRadius: '14px', background: notifications ? theme.gradientPrimary : theme.border, cursor: 'pointer', position: 'relative', transition: 'all 0.25s', boxShadow: notifications ? theme.shadowGlow : 'none' }}
          >
            <div style={{ position: 'absolute', top: '3px', left: notifications ? '27px' : '3px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ffffff', transition: 'all 0.2s', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}></div>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <button 
        onClick={handleSave}
        style={{ width: '100%', padding: '16px', background: theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: theme.shadowGlow, fontFamily: 'inherit', marginBottom: '14px', transition: 'opacity 0.2s' }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.95'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
      >
        Save Preferences Vector →
      </button>

      <button 
        onClick={onLogout}
        style={{ width: '100%', padding: '15px', background: 'rgba(239, 68, 68, 0.04)', color: theme.danger || '#ef4444', border: `1.5px solid ${theme.danger || 'rgba(239, 68, 68, 0.2)'}`, borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
        onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; e.currentTarget.style.borderColor = theme.danger || '#ef4444'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.04)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'; }}
      >
        Logout Secure Session
      </button>
    </div>
  );
}

export default Settings;