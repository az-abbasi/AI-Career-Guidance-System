import React, { useState, useEffect } from 'react';
import API from './api';
import { coursesData } from './Courses';

const careerIcons = {
  'Software Engineer': '💻',
  'Data Scientist': '📊',
  'AI Engineer': '🤖',
  'Cybersecurity Expert': '🔐',
  'Web Developer': '🌐',
  'Mobile App Developer': '📱',
  'Network Engineer': '🔌',
  'Database Administrator': '🗄️',
  'Cloud Engineer': '☁️',
  'Game Developer': '🎮',
  'UI/UX Designer': '🎨',
  'Business Analyst': '📈',
  'Accountant / Financial Analyst': '💰',
  'Marketing Manager': '📣',
  'Doctor / Surgeon': '🩺',
  'Pharmacist': '💊',
  'Teacher / Professor': '📚',
  'Electrical Engineer': '⚡',
  'Mechanical Engineer': '⚙️',
  'Civil Engineer': '🏗️',
  'Psychologist / Counselor': '🧠',
  'Lawyer / Legal Advisor': '⚖️',
};

const ORANGE = '#FF7800';
const ORANGE2 = '#FF5500';
const DARK_BG = '#0a0814';
const SIDEBAR_BG = 'rgba(8,6,20,0.97)';
const CARD_BG = '#ffffff';
const BORDER = 'rgba(255,120,0,0.15)';

const TABS = [
  { key: 'overview',  icon: '📊', label: 'Overview'  },
  { key: 'students',  icon: '👥', label: 'Students'  },
  { key: 'courses',   icon: '🎓', label: 'Courses'   },
  { key: 'careers',   icon: '🚀', label: 'Careers'   },
  { key: 'analytics', icon: '📈', label: 'Analytics' },
  { key: 'feedback',  icon: '💬', label: 'Student Feedback' },
  { key: 'messages',  icon: '✉️', label: 'Contact Messages' },
];

const careerStats = [
  { career: 'AI Engineer',         count: 15, color: ORANGE },
  { career: 'Software Engineer',   count: 12, color: '#3B82F6' },
  { career: 'Web Developer',       count: 10, color: '#22c55e' },
  { career: 'Data Scientist',      count: 8,  color: '#A855F7' },
  { career: 'Civil Engineer',      count: 8,  color: '#F59E0B' },
  { career: 'Doctor / Surgeon',    count: 9,  color: '#EF4444' },
  { career: 'Teacher / Professor', count: 7,  color: '#06B6D4' },
  { career: 'Cybersecurity Expert',count: 6,  color: '#10B981' },
];

function AdminDashboard({ onLogout, darkMode = true, setDarkMode }) {
  const D = darkMode;
  const [tab, setTab]               = useState('overview');
  const [students, setStudents]     = useState([]);
  const [careers, setCareers]       = useState([]);
  const [feedbacks, setFeedbacks]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');

  /* ── theme tokens ── */
  const mainBg     = D ? '#0a0814'                    : '#F5F4F1';
  const sidebarBg  = D ? 'rgba(8,6,20,0.97)'          : 'rgba(255,255,255,0.98)';
  const sidebarBdr = D ? 'rgba(255,120,0,0.18)'        : 'rgba(255,120,0,0.15)';
  const topbarBg   = D ? 'rgba(8,6,20,0.92)'           : 'rgba(255,255,255,0.96)';
  const topbarBdr  = D ? 'rgba(255,120,0,0.12)'        : 'rgba(0,0,0,0.06)';
  const textPrim   = D ? '#ffffff'                    : '#0F1117';
  const textMuted  = D ? 'rgba(255,255,255,0.45)'     : 'rgba(15,17,23,0.45)';
  const cardBg2    = D ? 'rgba(255,255,255,0.04)'     : '#ffffff';
  const cardBdr    = D ? 'rgba(255,120,0,0.1)'         : 'rgba(0,0,0,0.06)';
  const tableSub   = D ? 'rgba(255,255,255,0.02)'     : '#FAFAF7';
  const tableBdr   = D ? 'rgba(255,255,255,0.05)'     : 'rgba(0,0,0,0.04)';
  const navTabCol  = D ? 'rgba(255,255,255,0.55)'     : 'rgba(15,17,23,0.5)';
  const inputBg2   = D ? 'rgba(255,255,255,0.06)'     : 'rgba(15,17,23,0.04)';
  const inputBdr2  = D ? 'rgba(255,120,0,0.25)'        : 'rgba(255,120,0,0.22)';
  const progressBg = D ? 'rgba(255,255,255,0.08)'     : 'rgba(0,0,0,0.06)';
  const barTrBg    = D ? 'rgba(255,255,255,0.06)'     : 'rgba(0,0,0,0.04)';
  const emptyCl    = D ? 'rgba(255,255,255,0.3)'      : 'rgba(15,17,23,0.4)';

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const sRes = await API.get('/admin/students');
        const studentArr = sRes.data?.students || (Array.isArray(sRes.data) ? sRes.data : []);
        setStudents(studentArr);
      } catch (err) {
        console.error('Error loading admin students:', err);
      }

      try {
        const cRes = await API.get('/careers');
        setCareers(Array.isArray(cRes.data) ? cRes.data : []);
      } catch (err) {
        console.error('Error loading admin careers:', err);
      }

      try {
        const fRes = await API.get('/admin/feedback');
        setFeedbacks(Array.isArray(fRes.data) ? fRes.data : []);
      } catch (err) {
        console.error('Error loading admin feedback:', err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this student?')) return;
    try {
      await API.delete(`/admin/students/${id}`);
      setStudents(s => s.filter(x => x.id !== id));
    } catch { alert('Error deleting student!'); }
  };

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((a, f) => a + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0';

  const ratingCounts = [5,4,3,2,1].map(star => ({
    star, count: feedbacks.filter(f => f.rating === star).length
  }));

  /* ─── Injected styles ─── */
  useEffect(() => {
    const el = document.getElementById('admin-dash-styles');
    if (el) el.remove(); // re-inject on theme change
    const s = document.createElement('style');
    s.id = 'admin-dash-styles';
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
      .adm-tab { display:flex; align-items:center; gap:8px; padding:10px 14px; border-radius:10px; cursor:pointer;
        font-size:13px; font-weight:700; color:${navTabCol}; border:1px solid transparent;
        transition:all 0.2s; margin-bottom:4px; }
      .adm-tab:hover { background:rgba(255,120,0,0.12); color:#FF7800; }
      .adm-tab.active { background:linear-gradient(90deg,#FF5500,#FF7800); color:#fff !important;
        box-shadow:0 4px 16px rgba(255,85,0,0.35); }
      .adm-card { background:${cardBg2}; border:1px solid ${cardBdr}; border-radius:16px;
        box-shadow: ${D ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.04)'};
        transition:transform 0.2s,box-shadow 0.2s,background 0.3s; }
      .adm-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(255,120,0,0.15); }
      @keyframes adFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      @keyframes adminSpin { to{transform:rotate(360deg)} }
    `;
    document.head.appendChild(s);
  }, [darkMode]); // re-run when darkMode changes

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
      background: mainBg, transition: 'background 0.3s',
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 230, background: sidebarBg,
        borderRight: `1px solid ${sidebarBdr}`,
        display: 'flex', flexDirection: 'column',
        height: '100%', overflow: 'hidden', flexShrink: 0,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {/* Brand */}
        <div style={{ padding: '22px 16px 18px', borderBottom: `1px solid ${D ? 'rgba(255,120,0,0.12)' : 'rgba(255,120,0,0.1)'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width:38, height:38, background:`linear-gradient(135deg,#FF7800,#FF5500)`,
              borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:18, boxShadow:`0 4px 14px rgba(255,120,0,0.4)` }}>🛡️</div>
            <div>
              <div style={{ fontSize:13, fontWeight:900, color: textPrim }}>
                CAREER <span style={{ color: '#FF7800' }}>ADMIN</span>
              </div>
              <div style={{ fontSize:9, color:'rgba(255,120,0,0.55)', textTransform:'uppercase', letterSpacing:'1px', marginTop:1 }}>
                Control Panel
              </div>
            </div>
          </div>
          <div style={{ marginTop:14, background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)',
            borderRadius:8, padding:'7px 10px', display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e',
              boxShadow:'0 0 6px rgba(34,197,94,0.7)' }} />
            <span style={{ fontSize:9, fontWeight:700, color:'#22c55e', textTransform:'uppercase', letterSpacing:'0.8px' }}>
              System Online
            </span>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex:1, overflowY:'auto', padding:'12px 8px', scrollbarWidth:'none' }}>
          <div style={{ fontSize:'8px', fontWeight:800, color:'rgba(255,120,0,0.5)', textTransform:'uppercase',
            letterSpacing:'1.5px', padding:'0 6px 8px' }}>Main Navigation</div>
          {TABS.map(t => (
            <div key={t.key} className={`adm-tab${tab===t.key?' active':''}`}
              onClick={() => setTab(t.key)}>
              <span style={{ fontSize:16 }}>{t.icon}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding:'10px 8px', borderTop:`1px solid ${D ? 'rgba(255,120,0,0.1)' : 'rgba(255,120,0,0.08)'}` }}>
          <div className="adm-tab" onClick={onLogout}
            style={{ color:'rgba(255,100,100,0.8)' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,80,80,0.12)'; e.currentTarget.style.color='#ff6b6b'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,100,100,0.8)'; }}>
            <span style={{ fontSize:16 }}>🚪</span>
            <span>Sign Out</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Top Bar */}
        <div style={{
          background: topbarBg, backdropFilter:'blur(20px)',
          borderBottom:`1px solid ${topbarBdr}`,
          padding:'0 32px', height:62,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexShrink:0, transition: 'background 0.3s',
        }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color: textPrim }}>
              {TABS.find(t=>t.key===tab)?.icon} {TABS.find(t=>t.key===tab)?.label}
            </div>
            <div style={{ fontSize:10, color: textMuted, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.8px' }}>
              Career Guidance System — Admin Panel
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <button
              onClick={onLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: D ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: D ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
                borderRadius: 8, padding: '6px 14px',
                color: textPrim, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FF7800'}
              onMouseLeave={e => e.currentTarget.style.color = textPrim}
              title="Return to Landing Page"
            >
              <span>←</span>
              <span>Back to Home</span>
            </button>
            {setDarkMode && (
              <button onClick={() => setDarkMode(d => !d)}
                style={{ display:'flex', alignItems:'center', gap:6,
                  background: D ? 'rgba(255,120,0,0.15)' : 'rgba(255,120,0,0.08)',
                  border:'1.5px solid rgba(255,120,0,0.35)', borderRadius:'50%', width:38, height:38,
                  alignItems:'center', justifyContent:'center',
                  cursor:'pointer', color:'#FF7800', fontSize:16, fontWeight:800, transition:'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,120,0,0.28)'}
                onMouseLeave={e => e.currentTarget.style.background= D ? 'rgba(255,120,0,0.15)' : 'rgba(255,120,0,0.08)'}
              >
                <span>{D ? '☀️' : '🌙'}</span>
              </button>
            )}
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:13, fontWeight:700, color: textPrim }}>Administrator</div>
              <div style={{ fontSize:10, color:'#FF7800', fontWeight:600 }}>Super Admin Access</div>
            </div>
            <div style={{ width:36, height:36, background:`linear-gradient(135deg,rgba(255,120,0,0.3),rgba(255,80,0,0.15))`,
              border:`2px solid rgba(255,120,0,0.4)`, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700 }}>🛡️</div>
          </div>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'28px 32px 40px', scrollbarWidth:'thin',
          scrollbarColor: D ? 'rgba(255,120,0,0.3) transparent' : 'rgba(255,120,0,0.2) transparent',
          background: D ? 'transparent' : '#F5F4F1', transition:'background 0.3s' }}>

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <div style={{ animation:'adFadeUp 0.35s ease' }}>
              {/* Stat cards */}
              <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:28 }}>
                {[
                  { label:'Total Students',   value: students.length, icon:'👥', color:'#3B82F6' },
                  { label:'Career Paths',     value: careers.length,  icon:'🚀', color: ORANGE },
                  { label:'Assessments Done', value: '45',            icon:'📋', color:'#22c55e' },
                  { label:'Feedback Received',value: feedbacks.length,icon:'💬', color:'#A855F7' },
                ].map((s, i) => (
                  <div key={i} className="adm-card" style={{
                    flex:'1 1 160px', padding:'22px 20px', textAlign:'center',
                    borderTop:`4px solid ${s.color}`,
                  }}>
                    <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                    <div style={{ fontSize:30, fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:11, color: textMuted, fontWeight:700, marginTop:5, textTransform:'uppercase', letterSpacing:'0.5px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Career Interest Chart */}
              <div className="adm-card" style={{ padding:'24px 28px', marginBottom:24 }}>
                <div style={{ fontSize:14, fontWeight:800, color: textPrim, marginBottom:18 }}>📊 Career Interest Analytics</div>
                {careerStats.map((item, i) => (
                  <div key={i} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:13, fontWeight:700, color: textPrim }}>
                        {careerIcons[item.career] || '💼'} {item.career}
                      </span>
                      <span style={{ fontSize:12, fontWeight:800, color: item.color }}>{item.count} students</span>
                    </div>
                    <div style={{ height:8, borderRadius:10, background: progressBg, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${(item.count/15)*100}%`,
                        background:`linear-gradient(90deg,${item.color}99,${item.color})`,
                        borderRadius:10, transition:'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Students table */}
              <div className="adm-card" style={{ overflow:'hidden' }}>
                <div style={{ padding:'16px 24px', borderBottom:`1px solid ${cardBdr}`, fontSize:14, fontWeight:800, color: textPrim }}>
                  👥 Recent Students
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:`linear-gradient(90deg,${ORANGE2},${ORANGE})` }}>
                      {['Name','Email','Degree','University'].map((h,i) => (
                        <th key={i} style={{ padding:'12px 16px', textAlign:'left', color:'#fff', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0,5).map((s,i) => (
                      <tr key={s.id} style={{ background: i%2===0 ? tableSub : cardBg2, borderBottom:`1px solid ${tableBdr}` }}>
                        <td style={{ padding:'12px 16px', fontWeight:700, fontSize:13, color: textPrim }}>{s.name}</td>
                        <td style={{ padding:'12px 16px', fontSize:12, color: textMuted }}>{s.email}</td>
                        <td style={{ padding:'12px 16px', fontSize:12, color: textMuted }}>{s.degree||'-'}</td>
                        <td style={{ padding:'12px 16px', fontSize:12, color: textMuted }}>{s.university||'-'}</td>
                      </tr>
                    ))}
                    {students.length === 0 && (
                      <tr><td colSpan={4} style={{ padding:30, textAlign:'center', color: emptyCl }}>No students yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── STUDENTS ── */}
          {tab === 'students' && (
            <div style={{ animation:'adFadeUp 0.35s ease' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
                <div style={{ fontSize:18, fontWeight:800, color: textPrim }}>
                  Manage Students <span style={{ color: ORANGE }}>({filtered.length})</span>
                </div>
                <input
                  type="text" placeholder="🔍 Search by name or email..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ padding:'10px 18px', borderRadius:24, border:`2px solid ${inputBdr2}`,
                    fontSize:13, outline:'none', fontFamily:'inherit', background: cardBg2, color: textPrim, width:240,
                    transition:'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = ORANGE}
                  onBlur={e => e.target.style.borderColor = inputBdr2}
                />
              </div>
              {loading ? (
                <div style={{ textAlign:'center', padding:60, color: emptyCl, fontSize:14 }}>Loading students...</div>
              ) : (
                <div className="adm-card" style={{ overflow:'hidden' }}>
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ background:`linear-gradient(90deg,${ORANGE2},${ORANGE})` }}>
                        {['#','Name','Email','Degree','University','Role','Action'].map((h,i)=>(
                          <th key={i} style={{ padding:'12px 16px', textAlign:'left', color:'#fff', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr><td colSpan={7} style={{ padding:30, textAlign:'center', color: emptyCl }}>No students found</td></tr>
                      ) : filtered.map((s,i) => (
                        <tr key={s.id} style={{ background: i%2===0 ? tableSub : cardBg2, borderBottom:`1px solid ${tableBdr}` }}>
                          <td style={{ padding:'12px 16px', fontSize:12, color: textMuted }}>{i+1}</td>
                          <td style={{ padding:'12px 16px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div style={{ width:30, height:30, borderRadius:'50%', background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,
                                display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:12 }}>
                                {s.name?.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontSize:13, fontWeight:700, color: textPrim }}>{s.name}</span>
                            </div>
                          </td>
                          <td style={{ padding:'12px 16px', fontSize:12, color: textMuted }}>{s.email}</td>
                          <td style={{ padding:'12px 16px', fontSize:12, color: textMuted }}>{s.degree||'-'}</td>
                          <td style={{ padding:'12px 16px', fontSize:12, color: textMuted }}>{s.university||'-'}</td>
                          <td style={{ padding:'12px 16px' }}>
                            <span style={{ background:`rgba(255,120,0,0.12)`, color:ORANGE, padding:'3px 10px', borderRadius:20,
                              fontSize:11, fontWeight:700, border:`1px solid ${D ? 'rgba(255,120,0,0.3)' : 'rgba(255,120,0,0.2)'}` }}>{s.role||'student'}</span>
                          </td>
                          <td style={{ padding:'12px 16px' }}>
                            {s.role !== 'admin' && (
                              <button onClick={()=>handleDelete(s.id)} style={{ padding:'5px 12px', background:'rgba(239,68,68,0.1)',
                                color:'#EF4444', border:'1px solid rgba(239,68,68,0.2)', borderRadius:6,
                                cursor:'pointer', fontWeight:600, fontSize:12 }}>🗑 Remove</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── COURSES ── */}
          {tab === 'courses' && (
            <div style={{ animation:'adFadeUp 0.35s ease' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: textPrim, marginBottom: 20 }}>
                Course Resources Catalog
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {Object.keys(coursesData).map((track, trackIdx) => (
                  <div key={trackIdx} className="adm-card" style={{ padding: '24px' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: '#FF7800' }}>
                      💼 {track} Track
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                      {coursesData[track].map((course, courseIdx) => (
                        <div key={courseIdx} style={{
                          background: D ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                          border: `1px solid ${tableBdr}`,
                          borderRadius: '12px',
                          padding: '16px'
                        }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '700', color: textPrim }}>
                            {course.name}
                          </h4>
                          <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: textMuted, fontWeight: '700' }}>
                            <span>🏫 {course.platform}</span>
                            <span>⏱ {course.duration}</span>
                            <span style={{ color: course.level === 'Beginner' ? '#10B981' : course.level === 'Intermediate' ? '#F59E0B' : '#EF4444' }}>
                              ● {course.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CAREERS ── */}
          {tab === 'careers' && (
            <div style={{ animation:'adFadeUp 0.35s ease' }}>
              <div style={{ fontSize:18, fontWeight:800, color: textPrim, marginBottom:20 }}>
                Career Paths <span style={{ color:ORANGE }}>({careers.length})</span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
                {careers.length === 0 ? (
                  <div style={{ color: emptyCl, padding:40 }}>No careers found.</div>
                ) : careers.map((c,i) => (
                  <div key={i} className="adm-card" style={{ width:200, padding:'20px 18px', borderLeft:`4px solid ${ORANGE}` }}>
                    <div style={{ fontSize:28, marginBottom:8 }}>{careerIcons[c.title]||'💼'}</div>
                    <div style={{ fontSize:13, fontWeight:800, color:ORANGE, marginBottom:5 }}>{c.title}</div>
                    <div style={{ fontSize:11, color: textMuted, marginBottom:8, lineHeight:1.5 }}>{c.description?.substring(0,60)}...</div>
                    <div style={{ fontSize:11, fontWeight:700, color: textPrim }}>💰 {c.salary_range}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#22c55e', marginTop:3 }}>📈 {c.demand_level}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {tab === 'analytics' && (
            <div style={{ animation:'adFadeUp 0.35s ease' }}>
              <div style={{ fontSize:18, fontWeight:800, color: textPrim, marginBottom:20 }}>System Analytics</div>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:24 }}>
                {[
                  { label:'Total Students',  value: students.length, icon:'👥', color:'#3B82F6' },
                  { label:'Total Careers',   value: careers.length,  icon:'💼', color: ORANGE },
                  { label:'Assessments',     value:'45',             icon:'📋', color:'#22c55e' },
                  { label:'Avg Match Score', value:'91%',            icon:'⭐', color:'#F59E0B' },
                  { label:'Top Field',       value:'CS',             icon:'💻', color:'#A855F7' },
                  { label:'Active Users',    value:'18',             icon:'✅', color:'#10B981' },
                ].map((s,i) => (
                  <div key={i} className="adm-card" style={{ flex:'1 1 130px', padding:'18px 16px', textAlign:'center', borderTop:`3px solid ${s.color}` }}>
                    <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
                    <div style={{ fontSize:22, fontWeight:900, color:s.color }}>{s.value}</div>
                    <div style={{ fontSize:10, color: textMuted, fontWeight:700, marginTop:4, textTransform:'uppercase', letterSpacing:'0.5px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="adm-card" style={{ padding:'24px 28px' }}>
                <div style={{ fontSize:14, fontWeight:800, color: textPrim, marginBottom:18 }}>🏆 Career Popularity Rankings</div>
                {careerStats.map((item,i) => (
                  <div key={i} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:13, fontWeight:700, color: textPrim }}>#{i+1} {careerIcons[item.career]||'💼'} {item.career}</span>
                      <span style={{ fontSize:12, fontWeight:800, color:item.color }}>{item.count} students</span>
                    </div>
                    <div style={{ height:10, borderRadius:10, background: progressBg, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${(item.count/15)*100}%`,
                        background:`linear-gradient(90deg,${item.color}99,${item.color})`,
                        borderRadius:10, transition:'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STUDENT FEEDBACK ── */}
          {tab === 'feedback' && (
            <div style={{ animation:'adFadeUp 0.35s ease' }}>
              <div style={{ fontSize:18, fontWeight:800, color: textPrim, marginBottom:20 }}>Student Feedback</div>
              <div style={{ display:'flex', gap:14, marginBottom:24, flexWrap:'wrap' }}>
                <div className="adm-card" style={{ flex:'0 0 140px', padding:'22px', textAlign:'center', border:`2px solid ${ORANGE}` }}>
                  <div style={{ fontSize:32, fontWeight:900, color:ORANGE }}>{avgRating}</div>
                  <div style={{ fontSize:18, margin:'4px 0' }}>{'⭐'.repeat(Math.round(Number(avgRating)))}</div>
                  <div style={{ fontSize:11, color: textMuted, fontWeight:700 }}>Average Rating</div>
                </div>
                <div className="adm-card" style={{ flex:'0 0 140px', padding:'22px', textAlign:'center' }}>
                  <div style={{ fontSize:32, fontWeight:900, color:ORANGE }}>{feedbacks.filter(f => !f.category?.toLowerCase().includes('contact')).length}</div>
                  <div style={{ fontSize:11, color: textMuted, fontWeight:700, marginTop:8 }}>Total Feedback</div>
                </div>
                <div className="adm-card" style={{ flex:'1 1 200px', padding:'22px' }}>
                  <div style={{ fontSize:13, fontWeight:800, color: textPrim, marginBottom:12 }}>Rating Breakdown</div>
                  {ratingCounts.map(r => (
                    <div key={r.star} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
                      <span style={{ fontSize:11, fontWeight:700, color: textMuted, width:22 }}>{r.star}⭐</span>
                      <div style={{ flex:1, height:7, background: progressBg, borderRadius:8, overflow:'hidden' }}>
                        <div style={{ height:'100%', width: feedbacks.length ? `${(r.count/feedbacks.length)*100}%` : '0%',
                          background:`linear-gradient(90deg,${ORANGE2},${ORANGE})`, borderRadius:8 }} />
                      </div>
                      <span style={{ fontSize:11, color: textMuted, width:18 }}>{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {feedbacks.filter(f => !f.category?.toLowerCase().includes('contact')).length === 0 ? (
                <div className="adm-card" style={{ textAlign:'center', padding:50 }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>💬</div>
                  <div style={{ color: emptyCl }}>No student feedback received yet</div>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {feedbacks.filter(f => !f.category?.toLowerCase().includes('contact')).map((fb,i) => (
                    <div key={i} className="adm-card" style={{ padding:'18px 22px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:34, height:34, borderRadius:'50%',
                            background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`,
                            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:13 }}>
                            {fb.user?.name?.charAt(0).toUpperCase()||'S'}
                          </div>
                          <div>
                            <div style={{ fontWeight:700, fontSize:13, color: textPrim }}>{fb.user?.name||'Student'}</div>
                            <div style={{ fontSize:10, color: textMuted }}>{fb.created_at?.substring(0,10)}</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ background:`rgba(255,120,0,0.12)`, color:ORANGE, padding:'3px 10px',
                            borderRadius:20, fontSize:11, fontWeight:700, border:`1px solid ${D ? 'rgba(255,120,0,0.3)' : 'rgba(255,120,0,0.2)'}` }}>{fb.category || 'Feedback'}</span>
                          <span style={{ fontSize:14 }}>{'⭐'.repeat(fb.rating || 5)}</span>
                        </div>
                      </div>
                      <p style={{ margin:0, fontSize:13, color: D ? 'rgba(255,255,255,0.85)' : '#1E293B', lineHeight:1.65, whiteSpace:'pre-line' }}>{fb.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── CONTACT US MESSAGES ── */}
          {tab === 'messages' && (
            <div style={{ animation:'adFadeUp 0.35s ease' }}>
              <div style={{ fontSize:18, fontWeight:800, color: textPrim, marginBottom:20 }}>✉️ Landing Page Contact Inquiries</div>
              
              {feedbacks.filter(f => f.category?.toLowerCase().includes('contact')).length === 0 ? (
                <div className="adm-card" style={{ textAlign:'center', padding:50 }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>📩</div>
                  <div style={{ color: emptyCl, fontSize:14, fontWeight:600 }}>No Contact Us messages received yet</div>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {feedbacks.filter(f => f.category?.toLowerCase().includes('contact')).map((msg,i) => (
                    <div key={i} className="adm-card" style={{ padding:'22px 26px', borderLeft:`4px solid ${ORANGE}` }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:40, height:40, borderRadius:'12px', background:'linear-gradient(135deg,#FF7800,#FF5500)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                            ✉️
                          </div>
                          <div>
                            <div style={{ fontSize:15, fontWeight:800, color: textPrim }}>{msg.user?.name || 'Inquiry Sender'}</div>
                            <div style={{ fontSize:11, color: ORANGE, fontWeight:700 }}>{msg.created_at?.substring(0,10) || 'Recent Message'}</div>
                          </div>
                        </div>
                        <span style={{ background:'rgba(255,120,0,0.15)', color:ORANGE, border:'1px solid rgba(255,120,0,0.3)', padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:800 }}>
                          📩 Contact Us Inquiry
                        </span>
                      </div>
                      <div style={{ background: D ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', padding:'14px 16px', borderRadius:12, border: D ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)' }}>
                        <p style={{ margin:0, fontSize:13.5, color: D ? 'rgba(255,255,255,0.9)' : '#1E293B', lineHeight:1.7, whiteSpace:'pre-line' }}>{msg.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;