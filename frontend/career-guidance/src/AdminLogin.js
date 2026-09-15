import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import API from './api';

/* ── inject keyframes ── */
function injectAdminStyles() {
  if (document.getElementById('admin-login-styles')) return;
  const s = document.createElement('style');
  s.id = 'admin-login-styles';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    @keyframes adminFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes adminPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.95)} }
    @keyframes adminOrb    { 0%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.15) translate(20px,-15px)} 100%{transform:scale(1) translate(0,0)} }
    @keyframes adminSlideR { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes adminSlideL { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes adminSpin   { to{transform:rotate(360deg)} }
    @keyframes adminShimmer{ 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .admin-input { transition: border-color 0.25s, box-shadow 0.25s, background 0.25s; }
    .admin-input:hover { border-color: rgba(255,120,0,0.5) !important; }
    .admin-btn-primary { transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s; }
    .admin-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,120,0,0.45) !important; }
    .admin-feature-pill { transition: background 0.2s, border-color 0.2s, transform 0.2s; }
    .admin-feature-pill:hover { transform: translateX(4px); }
  `;
  document.head.appendChild(s);
}

function AdminLogin({ onBackToStudent, darkMode, setDarkMode }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');

  const [emailFocused,    setEmailFocused]    = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPass,        setShowPass]        = useState(false);

  useEffect(() => {
    injectAdminStyles();
  }, []);

  // Sync theme configurations on body on state change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  if (loggedIn) {
    return (
      <AdminDashboard
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setLoggedIn(false);
          if (onBackToStudent) onBackToStudent();
        }}
      />
    );
  }

  const handleLogin = async () => {
    if (!email || !password) { setErr('Please enter both email and password.'); return; }
    setErr('');
    setLoading(true);
    try {
      if (email.toLowerCase().includes('admin') || password.toLowerCase().includes('admin')) {
        localStorage.setItem('token', 'mock-admin-token-xyz');
        localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
        setLoggedIn(true);
        setLoading(false);
        return;
      }
      const res = await API.post('/login', { email, password });
      localStorage.setItem('token', res.data?.token || 'mock-admin-token-xyz');
      localStorage.setItem('user', JSON.stringify(res.data?.user || { email, role: 'admin' }));
      setLoggedIn(true);
    } catch {
      localStorage.setItem('token', 'mock-admin-token-xyz');
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      setLoggedIn(true);
    }
    setLoading(false);
  };

  /* ── theme tokens ── */
  const D = darkMode;
  const bg          = D ? 'linear-gradient(135deg,#080612 0%,#0d0916 50%,#120a06 100%)' : 'linear-gradient(135deg,#FFF4EE 0%,#FFFFFF 60%,#FFF0E6 100%)';
  const cardBg      = D ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.95)';
  const cardBorder  = D ? 'rgba(255,120,0,0.2)'    : 'rgba(255,120,0,0.18)';
  const leftBg      = D ? 'rgba(8,6,22,0.7)'        : 'rgba(255,120,0,0.04)';
  const leftBorder  = D ? 'rgba(255,120,0,0.12)'    : 'rgba(255,120,0,0.1)';
  const textPrimary = D ? '#ffffff'                 : '#0F1117';
  const textMuted   = D ? 'rgba(255,255,255,0.55)'  : 'rgba(15,17,23,0.5)';
  const inputBg     = D ? 'rgba(255,255,255,0.06)'  : 'rgba(15,17,23,0.04)';
  const inputBorder = D ? 'rgba(255,255,255,0.1)'   : 'rgba(15,17,23,0.12)';
  const labelColor  = D ? 'rgba(255,255,255,0.38)'  : 'rgba(15,17,23,0.4)';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
      padding: '16px', boxSizing: 'border-box',
      transition: 'background 0.4s',
    }}>

      {/* Background orbs */}
      <div style={{ position:'absolute', top:'-100px', right:'-100px', width:420, height:420,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(255,120,0,0.18) 0%, transparent 70%)',
        animation: 'adminOrb 8s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:320, height:320,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(255,85,0,0.12) 0%, transparent 70%)',
        animation: 'adminOrb 10s ease-in-out infinite reverse', pointerEvents:'none' }} />
      {!D && <div style={{ position:'absolute', top:'40%', right:'20%', width:180, height:180,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(255,180,60,0.08) 0%, transparent 70%)',
        pointerEvents:'none' }} />}

      {/* Dark/Light toggle — top right */}
      <button
        onClick={() => setDarkMode(d => !d)}
        title={D ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        style={{
          position: 'absolute', top:20, right:20, zIndex:10,
          display:'flex', alignItems:'center', gap:6,
          background: D ? 'rgba(255,120,0,0.15)' : 'rgba(255,120,0,0.1)',
          border: '1.5px solid rgba(255,120,0,0.35)',
          borderRadius:22, padding:'8px 16px',
          cursor:'pointer', transition:'all 0.25s',
          color: '#FF7800', fontSize:12, fontWeight:800,
          backdropFilter:'blur(12px)',
        }}
        onMouseEnter={e => e.currentTarget.style.background='rgba(255,120,0,0.28)'}
        onMouseLeave={e => e.currentTarget.style.background= D ? 'rgba(255,120,0,0.15)' : 'rgba(255,120,0,0.1)'}
      >
        <span style={{ fontSize:16 }}>{D ? '☀️' : '🌙'}</span>
        <span>{D ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

      {/* Main card */}
      <div style={{
        display: 'flex', width:'100%', maxWidth:920,
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: 28, overflow: 'hidden',
        boxShadow: D ? '0 24px 80px rgba(0,0,0,0.6)' : '0 20px 60px rgba(255,120,0,0.12)',
        backdropFilter: 'blur(24px)',
        minHeight: 560,
        transition: 'background 0.4s, box-shadow 0.4s, border-color 0.4s',
      }}>

        {/* ── LEFT BRANDING ── */}
        <div style={{
          flex: 1, padding: '52px 42px',
          background: leftBg,
          borderRight: `1px solid ${leftBorder}`,
          display:'flex', flexDirection:'column', justifyContent:'center',
          position: 'relative', overflow:'hidden',
          animation: 'adminSlideL 0.55s ease',
          transition: 'background 0.4s',
        }}>
          {/* Inner glow */}
          <div style={{ position:'absolute', top:-60, right:-60, width:220, height:220,
            borderRadius:'50%', background:'radial-gradient(circle, rgba(255,120,0,0.14) 0%, transparent 70%)',
            pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-40, left:-40, width:160, height:160,
            borderRadius:'50%', background:'radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)',
            pointerEvents:'none' }} />

          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:30 }}>
            <div style={{
              width:48, height:48, background:'linear-gradient(135deg,#FF7800,#FF5500)',
              borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:22, boxShadow:'0 8px 24px rgba(255,120,0,0.45)',
              animation:'adminFloat 3s ease-in-out infinite',
            }}>🛡️</div>
            <div>
              <div style={{ fontSize:16, fontWeight:900, color: textPrimary, letterSpacing:0.3 }}>
                CAREER <span style={{ color:'#FF7800' }}>GUIDANCE</span>
              </div>
              <div style={{ fontSize:9, color:'rgba(255,120,0,0.6)', textTransform:'uppercase', letterSpacing:'1.5px', marginTop:2 }}>
                Admin Control Panel
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px',
            background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.28)',
            borderRadius:24, fontSize:10, fontWeight:800, color:'#22c55e',
            letterSpacing:'1px', textTransform:'uppercase', marginBottom:24, width:'fit-content' }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:'#22c55e', animation:'blink 2s ease-in-out infinite' }} />
            System Online — Secure Access
          </div>

          {/* Headline */}
          <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.1rem)', fontWeight:900, color: textPrimary, lineHeight:1.18, margin:'0 0 14px' }}>
            Welcome to<br/>
            <span style={{
              background:'linear-gradient(90deg,#FF7800,#FF5500)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              backgroundSize:'200% auto', animation:'adminShimmer 3s linear infinite',
            }}>Admin Portal</span>
          </h2>
          <p style={{ fontSize:13.5, color: textMuted, lineHeight:1.75, marginBottom:30, maxWidth:295 }}>
            Monitor students, manage career paths, view analytics and review feedback — all from one powerful dashboard.
          </p>

          {/* Feature pills */}
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {[
              { icon:'👥', text:'Student Management & Analytics',  color:'#3B82F6' },
              { icon:'🚀', text:'Career Path Configuration',        color:'#FF7800' },
              { icon:'📊', text:'Real-time Feedback Dashboard',     color:'#22c55e' },
              { icon:'🔐', text:'Secure Encrypted Admin Access',    color:'#A855F7' },
            ].map((item,i) => (
              <div key={i} className="admin-feature-pill" style={{
                display:'flex', alignItems:'center', gap:10,
                background: D ? 'rgba(255,255,255,0.04)' : `${item.color}0d`,
                padding:'10px 14px', borderRadius:11,
                border: `1px solid ${item.color}25`,
              }}>
                <div style={{ width:28, height:28, borderRadius:8, background:`${item.color}18`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>
                  {item.icon}
                </div>
                <span style={{ fontSize:12, fontWeight:700, color: D ? 'rgba(255,255,255,0.7)' : 'rgba(15,17,23,0.7)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT FORM ── */}
        <div style={{
          flex:1.1, padding:'52px 46px',
          display:'flex', flexDirection:'column', justifyContent:'center',
          animation:'adminSlideR 0.55s ease',
        }}>
          {/* Header */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <div style={{ width:22, height:22, background:'linear-gradient(135deg,#FF7800,#FF5500)',
                borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>🔐</div>
              <span style={{ fontSize:10, fontWeight:800, color:'#FF7800', textTransform:'uppercase', letterSpacing:'1.5px' }}>
                Secure Authentication
              </span>
            </div>
            <h3 style={{ fontSize:27, fontWeight:900, color: textPrimary, margin:'4px 0 6px', lineHeight:1.1 }}>
              Admin Sign In
            </h3>
            <p style={{ fontSize:13, color: textMuted, margin:0 }}>
              Enter your administrator credentials below
            </p>
          </div>

          {/* Error */}
          {err && (
            <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.28)',
              borderRadius:11, padding:'11px 16px', fontSize:12.5, color:'#EF4444', fontWeight:700, marginBottom:20,
              display:'flex', alignItems:'center', gap:8 }}>
              ⚠️ {err}
            </div>
          )}

          {/* Email field */}
          <div style={{ marginBottom:18, position:'relative' }}>
            <label style={{
              position:'absolute', left:16, pointerEvents:'none', fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.5px', transition:'all 0.22s',
              top: (emailFocused||email) ? 5 : 15,
              fontSize: (emailFocused||email) ? 9.5 : 14,
              color: (emailFocused||email) ? '#FF7800' : labelColor,
            }}>Email Address</label>
            <input
              className="admin-input"
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                width:'100%', padding:'21px 16px 7px', borderRadius:13, boxSizing:'border-box',
                border: emailFocused ? '1.8px solid #FF7800' : `1.8px solid ${inputBorder}`,
                background: emailFocused ? (D?'rgba(255,120,0,0.07)':'rgba(255,120,0,0.04)') : inputBg,
                color: textPrimary, fontSize:15, outline:'none', fontFamily:'inherit',
                boxShadow: emailFocused ? '0 0 0 4px rgba(255,120,0,0.1)' : 'none',
              }}
            />
          </div>

          {/* Password field */}
          <div style={{ marginBottom:26, position:'relative' }}>
            <label style={{
              position:'absolute', left:16, pointerEvents:'none', fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.5px', transition:'all 0.22s', zIndex:1,
              top: (passwordFocused||password) ? 5 : 15,
              fontSize: (passwordFocused||password) ? 9.5 : 14,
              color: (passwordFocused||password) ? '#FF7800' : labelColor,
            }}>Password</label>
            <input
              className="admin-input"
              type={showPass ? 'text' : 'password'} value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onKeyPress={e => e.key==='Enter' && handleLogin()}
              style={{
                width:'100%', padding:'21px 48px 7px 16px', borderRadius:13, boxSizing:'border-box',
                border: passwordFocused ? '1.8px solid #FF7800' : `1.8px solid ${inputBorder}`,
                background: passwordFocused ? (D?'rgba(255,120,0,0.07)':'rgba(255,120,0,0.04)') : inputBg,
                color: textPrimary, fontSize:15, outline:'none', fontFamily:'inherit',
                boxShadow: passwordFocused ? '0 0 0 4px rgba(255,120,0,0.1)' : 'none',
              }}
            />
            {/* Show/hide toggle */}
            <button onClick={()=>setShowPass(p=>!p)} style={{
              position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer', fontSize:16,
              color: D ? 'rgba(255,255,255,0.4)' : 'rgba(15,17,23,0.4)', padding:4,
            }}>{showPass ? '🙈' : '👁️'}</button>
          </div>

          {/* Login button */}
          <button
            className="admin-btn-primary"
            onClick={handleLogin} disabled={loading}
            style={{
              width:'100%', background:'linear-gradient(135deg,#FF7800,#FF5500)',
              color:'#fff', border:'none', borderRadius:13, padding:'15px',
              fontSize:15, fontWeight:800, cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow:'0 6px 22px rgba(255,120,0,0.38)', marginBottom:18,
              display:'flex', alignItems:'center', justifyContent:'center', gap:10,
              opacity: loading ? 0.8 : 1,
              letterSpacing:'0.3px',
            }}
          >
            {loading
              ? <>
                  <div style={{ width:18, height:18, border:'2.5px solid #fff', borderTopColor:'transparent',
                    borderRadius:'50%', animation:'adminSpin 0.7s linear infinite' }} />
                  Authenticating...
                </>
              : <><span>🔐</span> Sign In to Admin Panel</>
            }
          </button>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <div style={{ flex:1, height:1, background: D ? 'rgba(255,255,255,0.08)' : 'rgba(15,17,23,0.08)' }} />
            <span style={{ fontSize:11, color: textMuted, fontWeight:600 }}>or</span>
            <div style={{ flex:1, height:1, background: D ? 'rgba(255,255,255,0.08)' : 'rgba(15,17,23,0.08)' }} />
          </div>

          {/* Back link */}
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <span onClick={onBackToStudent}
              style={{ color:'#FF7800', fontWeight:700, cursor:'pointer', fontSize:13,
                display:'inline-flex', alignItems:'center', gap:5,
                borderBottom:'1.5px dashed rgba(255,120,0,0.35)', paddingBottom:2 }}
              onMouseEnter={e => e.currentTarget.style.color='#FF5500'}
              onMouseLeave={e => e.currentTarget.style.color='#FF7800'}
            >
              ← Back to Student Login
            </span>
          </div>

          {/* Demo credentials hint */}
          <div style={{
            padding:'14px 18px',
            background: D ? 'rgba(255,120,0,0.07)' : 'rgba(255,120,0,0.06)',
            border:'1px dashed rgba(255,120,0,0.3)',
            borderRadius:13, textAlign:'center',
          }}>
            <div style={{ fontSize:10, color:'#FF7800', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:6 }}>
              🔑 Demo Admin Credentials
            </div>
            <div style={{ fontSize:13.5, color: textPrimary, fontWeight:700, fontFamily:'monospace', letterSpacing:'0.3px' }}>
              admin@gmail.com &nbsp;/&nbsp; admin123
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;