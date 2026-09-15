import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Assessment from './Assessment';
import Careers from './Careers';
import Analytics from './Analytics';
import AcademicRecord from './AcademicRecord';
import SkillAssessment from './SkillAssessment';
import Courses from './Courses';
import Settings from './Settings';
import Report from './Report';
import API from './api';
import AIRecommendation from './AIRecommendation';
import CareerComparison from './CareerComparison';
import Recommendations from './Recommendations';
import Roadmap from './Roadmap';
import GoalSetting from './GoalSetting';
import Feedback from './Feedback';
import ProgressTracking from './ProgressTracking';
import UniversityRecommendation from './UniversityRecommendation';

/* ── Injected CSS keyframes & classes ────────────────────────────────────── */
const DASH_STYLES = `
@keyframes dashFadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes shimmerBar   { 0%,100%{opacity:0} 50%{opacity:1} }
@keyframes pulseGlowOrg { 0%,100%{box-shadow:0 0 0 0 rgba(255,120,0,0)} 50%{box-shadow:0 0 22px 6px rgba(255,120,0,0.25)} }
@keyframes floatUp      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes rippleOut    { to{transform:scale(4);opacity:0} }
@keyframes sideSlideIn  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
@keyframes scanLine     { 0%{top:-4px} 100%{top:100%} }
@keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0.3} }

.dash-nav-item {
  display:flex; align-items:center; gap:11px;
  padding:10px 14px; border-radius:10px; cursor:pointer;
  font-size:13px; font-weight:600;
  color:rgba(255,255,255,0.6);
  border:1px solid transparent;
  transition:all 0.2s ease;
  margin-bottom:3px;
  white-space:nowrap; overflow:hidden;
  text-overflow:ellipsis;
  position:relative;
}
.dash-nav-item:hover {
  background:rgba(255,120,0,0.1);
  color:#FF7800;
  border-color:rgba(255,120,0,0.25);
}
.dash-nav-item.active {
  background: linear-gradient(90deg, #FF5500, #FF7800);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 18px rgba(255, 85, 0, 0.45);
}
.dash-feature-btn {
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,120,0,0.18);
  border-radius:16px;
  padding:22px 18px 18px;
  cursor:pointer;
  text-align:center;
  transition:transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s, background 0.2s, border-color 0.2s;
  opacity:0;
  animation:dashFadeUp 0.5s ease forwards;
  position:relative; overflow:hidden;
}
.dash-feature-btn:hover {
  transform:translateY(-7px) scale(1.03);
  background:rgba(255,120,0,0.09);
  border-color:#FF7800;
  box-shadow:0 12px 30px rgba(255,120,0,0.2);
}
.dash-feature-btn .ripple {
  position:absolute; border-radius:50%;
  transform:scale(0);
  background:rgba(255,120,0,0.15);
  animation:rippleOut 0.55s linear;
  pointer-events:none;
}
.dash-stat-card {
  transition:transform 0.22s, box-shadow 0.22s;
  cursor:default;
}
.dash-stat-card:hover {
  transform:translateY(-5px);
  box-shadow:0 12px 28px rgba(255,120,0,0.15) !important;
}
`;

function injectDashStyles() {
  if (document.getElementById('dash-premium-styles')) return;
  const el = document.createElement('style');
  el.id = 'dash-premium-styles';
  el.textContent = DASH_STYLES;
  document.head.appendChild(el);
}

/* ── Orbital Nodes Canvas ─────────────────────────────────────────────────── */
function OrbitalNodesCanvas() {
  return null;
}




/* ── Nav config ───────────────────────────────────────────────────────────── */
const NAV_GROUPS = [
  { label:'SYSTEM MODULE MANAGEMENT', items:[
    { icon:'🏠', title:'Dashboard Home',     page:'dashboard' },
    { icon:'👤', title:'Student Profile',    page:'profile' },
    { icon:'🤖', title:'AI Assessments',     page:'assessment' },
    { icon:'🚀', title:'Browse Careers',     page:'careers' },
    { icon:'🎯', title:'Target Goals',       page:'goals' },
    { icon:'📚', title:'Academic Records',   page:'academic' },
    { icon:'📈', title:'Analytics View',     page:'analytics' },
    { icon:'🎯', title:'Skill Assessment',   page:'skills' },
    { icon:'🎓', title:'Courses Portal',     page:'courses' },
    { icon:'💡', title:'AI Recommendations', page:'ai' },
  ]},
  { label:'ADVANCED TOOLS', items:[
    { icon:'📊', title:'Progress Tracker',   page:'progress' },
    { icon:'🗺️', title:'Career Roadmap',    page:'roadmap' },
    { icon:'⚖️', title:'Career Compare',    page:'compare' },
    { icon:'🏫', title:'Universities',       page:'universities' },
    { icon:'📄', title:'Career Report',      page:'report' },
    { icon:'💬', title:'Feedback',           page:'feedback' },
  ]},
  { label:'SYSTEM', items:[
    { icon:'⚙️', title:'Settings',          page:'settings' },
  ]},
];

/* ── Dashboard Main ───────────────────────────────────────────────────────── */
function Dashboard({ onLogout, darkMode, setDarkMode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('Student');
  const SIDEBAR_W = sidebarOpen ? 230 : 66;

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
    const fetchUserData = async () => {
      try {
        const res = await API.get('/profile');
        if (res.data) {
          setUserName(res.data.name || 'Student');
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      } catch (e) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserName(user.name || 'Student');
        }
      }
    };
    fetchUserData();
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile onProfileUpdate={(updatedUser) => setUserName(updatedUser.name || 'Student')} />;
      case 'assessment':
        return <Assessment />;
      case 'careers':
        return <Careers />;
      case 'analytics':
        return <Analytics />;
      case 'academic':
        return <AcademicRecord />;
      case 'skills':
        return <SkillAssessment />;
      case 'courses':
        return <Courses />;
      case 'settings':
        return <Settings onLogout={onLogout} />;
      case 'report':
        return <Report />;
      case 'ai':
        return <AIRecommendation />;
      case 'compare':
        return <CareerComparison />;
      case 'recommendations':
        return <Recommendations selectedInterests={selectedInterests} />;
      case 'roadmap':
        return <Roadmap />;
      case 'goals':
        return <GoalSetting />;
      case 'feedback':
        return <Feedback />;
      case 'progress':
        return <ProgressTracking />;
      case 'universities':
        return <UniversityRecommendation />;
      case 'dashboard':
      default:
        return (
          <div style={{ animation: 'dashFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            {/* ── HERO WELCOME BANNER ── */}
            <div style={{
              margin: '28px 36px 0',
              borderRadius: 22,
              background: darkMode
                ? 'linear-gradient(135deg, rgba(255,120,0,0.14) 0%, rgba(8,6,20,0.95) 50%, rgba(255,85,0,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,120,0,0.08) 0%, #FFFFFF 50%, rgba(255,85,0,0.04) 100%)',
              border: darkMode ? '1px solid rgba(255,120,0,0.25)' : '1px solid rgba(255,120,0,0.18)',
              boxShadow: darkMode ? '0 16px 48px rgba(0,0,0,0.4)' : '0 12px 32px rgba(255,120,0,0.08)',
              padding: '44px 52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              flexWrap: 'wrap',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative gradient orb */}
              <div style={{ position:'absolute', right:-60, top:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,120,0,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
              <div style={{ position:'absolute', left:-40, bottom:-40, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

              <div style={{ position:'relative', zIndex:2, flex:'1 1 380px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px rgba(34,197,94,0.7)', animation:'blink 2s ease-in-out infinite' }} />
                  <span style={{ fontSize:10, fontWeight:800, color:'#FF7800', letterSpacing:'2px', textTransform:'uppercase' }}>Career Guidance System — Active Session</span>
                </div>
                <h1 style={{ margin:'0 0 14px', fontSize:'clamp(1.8rem,3.2vw,2.6rem)', fontWeight:900, color: darkMode ? '#ffffff' : '#0F1117', fontFamily:"'Outfit',sans-serif", lineHeight:1.2 }}>
                  Welcome back, <span style={{ color:'#FF7800' }}>{userName}</span>! 👋
                </h1>
                <p style={{ margin:'0 0 28px', fontSize:14, color: darkMode ? 'rgba(255,255,255,0.65)' : 'rgba(15,17,23,0.6)', lineHeight:1.8, maxWidth:520 }}>
                  Your AI-powered career guidance platform is ready. Explore personalized career recommendations, track your academic progress, take skill assessments, and build your roadmap to success — all in one place.
                </p>
                <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                  <button onClick={()=>setCurrentPage('assessment')} style={{ background:'linear-gradient(135deg,#FF7800,#FF5500)', color:'#fff', border:'none', padding:'12px 24px', borderRadius:24, fontSize:13, fontWeight:800, cursor:'pointer', boxShadow:'0 6px 20px rgba(255,120,0,0.35)', transition:'all 0.2s' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
                  >
                    🤖 Start AI Assessment
                  </button>
                  <button onClick={()=>setCurrentPage('ai')} style={{ background:'transparent', color: darkMode ? '#FF7800' : '#FF5500', border:'2px solid rgba(255,120,0,0.4)', padding:'12px 24px', borderRadius:24, fontSize:13, fontWeight:800, cursor:'pointer', transition:'all 0.2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,120,0,0.08)';e.currentTarget.style.borderColor='#FF7800'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(255,120,0,0.4)'}}
                  >
                    💡 View Recommendations
                  </button>
                </div>
              </div>

              {/* Right side stats column */}
              <div style={{ display:'flex', flexDirection:'column', gap:12, flex:'0 0 auto', position:'relative', zIndex:2 }}>
                {[
                  { label:'Career Match', value:'96%', icon:'🎯', color:'#22c55e' },
                  { label:'GPA Index', value:'3.82', icon:'📈', color:'#3B82F6' },
                  { label:'Semester', value:'6th', icon:'🎓', color:'#FF7800' },
                ].map((s,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', border:`1px solid ${s.color}33`, borderRadius:12, padding:'10px 18px', backdropFilter:'blur(10px)' }}>
                    <span style={{ fontSize:20 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize:9, fontWeight:700, color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(15,17,23,0.45)', textTransform:'uppercase', letterSpacing:'0.8px' }}>{s.label}</div>
                      <div style={{ fontSize:16, fontWeight:900, color:s.color }}>{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── AI CAREER PATH METER ── */}
            <div style={{ margin:'28px 36px 0', display:'flex', gap:20, flexWrap:'wrap' }}>
              {/* Career Readiness Score */}
              <div style={{ flex:'1 1 320px', background: darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff', border: darkMode ? '1px solid rgba(255,120,0,0.18)' : '1px solid rgba(0,0,0,0.06)', borderRadius:18, padding:'28px 30px', boxShadow: darkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
                  <div>
                    <div style={{ fontSize:10, fontWeight:800, color:'#FF7800', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:6 }}>🎯 Career Readiness Score</div>
                    <div style={{ fontSize:36, fontWeight:900, color: darkMode ? '#ffffff' : '#0F1117', lineHeight:1 }}>78<span style={{ fontSize:16, color:'rgba(255,120,0,0.7)', fontWeight:700 }}>/100</span></div>
                    <div style={{ fontSize:12, color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(15,17,23,0.5)', marginTop:4 }}>You're in the top 22% of students</div>
                  </div>
                  <div style={{ width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg,#FF7800,#FF5500)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:'0 8px 24px rgba(255,120,0,0.4)' }}>🚀</div>
                </div>
                {/* Progress bars */}
                {[
                  { label:'Skills & Assessment', pct:85, color:'#22c55e' },
                  { label:'Academic Performance', pct:76, color:'#3B82F6' },
                  { label:'Career Exploration', pct:60, color:'#FF7800' },
                  { label:'Goals & Milestones', pct:50, color:'#A855F7' },
                ].map((bar, bi) => (
                  <div key={bi} style={{ marginBottom:12 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:11, fontWeight:600, color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(15,17,23,0.6)' }}>{bar.label}</span>
                      <span style={{ fontSize:11, fontWeight:800, color:bar.color }}>{bar.pct}%</span>
                    </div>
                    <div style={{ height:6, borderRadius:10, background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${bar.pct}%`, background:`linear-gradient(90deg,${bar.color}99,${bar.color})`, borderRadius:10, transition:'width 1s ease' }} />
                    </div>
                  </div>
                ))}
                <button onClick={()=>setCurrentPage('assessment')} style={{ marginTop:8, width:'100%', background:'linear-gradient(135deg,#FF7800,#FF5500)', color:'#fff', border:'none', padding:'11px', borderRadius:12, fontSize:13, fontWeight:800, cursor:'pointer', boxShadow:'0 4px 16px rgba(255,120,0,0.3)' }}>
                  🤖 Improve My Score
                </button>
              </div>

              {/* Right column: AI Tip + Achievements */}
              <div style={{ flex:'1 1 280px', display:'flex', flexDirection:'column', gap:16 }}>
                {/* AI Tip of the Day */}
                <div style={{ background: darkMode ? 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.08))' : 'linear-gradient(135deg,#f5f0ff,#eff6ff)', border: darkMode ? '1px solid rgba(168,85,247,0.25)' : '1px solid rgba(168,85,247,0.15)', borderRadius:16, padding:'22px 24px', flex:'0 0 auto' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                    <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#A855F7,#7C3AED)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>💡</div>
                    <span style={{ fontSize:10, fontWeight:800, color:'#A855F7', textTransform:'uppercase', letterSpacing:'1px' }}>AI Tip of the Day</span>
                  </div>
                  <p style={{ fontSize:13, lineHeight:1.7, color: darkMode ? 'rgba(255,255,255,0.75)' : '#374151', margin:0, fontWeight:500 }}>
                    Students who complete skill assessments early are <strong style={{ color:'#A855F7' }}>3× more likely</strong> to land their dream career. Your profile needs 2 more skills to unlock top-tier recommendations!
                  </p>
                  <button onClick={()=>setCurrentPage('skills')} style={{ marginTop:14, background:'transparent', color:'#A855F7', border:'1.5px solid rgba(168,85,247,0.4)', padding:'8px 16px', borderRadius:20, fontSize:12, fontWeight:700, cursor:'pointer' }}>Add Skills Now →</button>
                </div>

                {/* Achievement Badges */}
                <div style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff', border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)', borderRadius:16, padding:'20px 22px', flex:1, boxShadow: darkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize:10, fontWeight:800, color: darkMode ? 'rgba(255,120,0,0.8)' : '#FF7800', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:14 }}>🏆 Your Achievements</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {[
                      { badge:'🎓', label:'Enrolled', color:'#22c55e' },
                      { badge:'🤖', label:'AI Assessed', color:'#3B82F6' },
                      { badge:'🗺️', label:'Roadmap Set', color:'#FF7800' },
                      { badge:'📚', label:'Records Added', color:'#F59E0B' },
                      { badge:'🎯', label:'Goal Setter', color:'#A855F7' },
                      { badge:'🔥', label:'7-Day Streak', color:'#EF4444' },
                    ].map((b, bi) => (
                      <div key={bi} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'10px 12px', borderRadius:10, background: darkMode ? `rgba(255,255,255,0.04)` : `${b.color}10`, border:`1px solid ${b.color}30`, minWidth:68 }}>
                        <span style={{ fontSize:20 }}>{b.badge}</span>
                        <span style={{ fontSize:9, fontWeight:700, color:b.color, textAlign:'center' }}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── WHAT'S NEXT CARDS ── */}
            <div style={{ margin:'20px 36px 36px' }}>
              <div style={{ marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:3, height:16, background:'linear-gradient(180deg,#FF7800,#FF5500)', borderRadius:4 }} />
                <span style={{ fontSize:11, fontWeight:800, color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(15,17,23,0.4)', textTransform:'uppercase', letterSpacing:'1.5px' }}>Recommended Next Steps</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:16 }}>
                {[
                  {
                    icon:'📊', color:'#06B6D4',
                    tag:'TRENDING',
                    title:'View Your Analytics Report',
                    desc:'See how your academic performance trends compare with top AI & CS students in Pakistan.',
                    cta:'Open Analytics', page:'analytics'
                  },
                  {
                    icon:'🚀', color:'#FF7800',
                    tag:'CAREER HUB',
                    title:'Explore 30+ Career Paths',
                    desc:'Detailed salaries, required skills, and job market trends for Software, AI, Medical, & Business.',
                    cta:'Explore Careers', page:'careers'
                  },
                  {
                    icon:'🎓', color:'#22c55e',
                    tag:'LEARNING',
                    title:'Enroll in Free Skill Courses',
                    desc:'Hand-picked courses from Coursera, Udemy, and Harvard Online to bridge your skill gaps.',
                    cta:'View Courses', page:'courses'
                  },
                  {
                    icon:'🗺️', color:'#A855F7',
                    tag:'ROADMAP',
                    title:'Interactive Career Roadmap',
                    desc:'Step-by-step milestone planner tailored to your university semester and target role.',
                    cta:'Open Roadmap', page:'roadmap'
                  },
                ].map((card, ci) => (
                  <div key={ci} className="dash-feature-btn" onClick={()=>setCurrentPage(card.page)} style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff', border: darkMode ? '1px solid rgba(255,120,0,0.18)' : '1px solid rgba(0,0,0,0.06)', animationDelay:`${ci*0.08}s`, textAlign:'left', boxShadow: darkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                      <span style={{ fontSize:28 }}>{card.icon}</span>
                      <span style={{ fontSize:9, fontWeight:800, color:card.color, background:`${card.color}15`, border:`1px solid ${card.color}35`, padding:'3px 8px', borderRadius:8, letterSpacing:'0.8px' }}>{card.tag}</span>
                    </div>
                    <div style={{ fontSize:15, fontWeight:800, color: darkMode ? '#ffffff' : '#0F1117', marginBottom:6 }}>{card.title}</div>
                    <div style={{ fontSize:12, color: darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(15,17,23,0.55)', lineHeight:1.6, marginBottom:16 }}>{card.desc}</div>
                    <div style={{ fontSize:12, fontWeight:800, color:'#FF7800', display:'flex', alignItems:'center', gap:4 }}>
                      <span>{card.cta}</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  useEffect(() => { injectDashStyles(); }, []);

  return (
    <div style={{ display:'flex', minHeight:'100vh', background: darkMode ? '#080614' : '#F8F9FA', fontFamily:"'Plus Jakarta Sans','Segoe UI',sans-serif", color: darkMode ? '#ffffff' : '#0F1117', transition:'background-color 0.3s, color 0.3s' }}>
      
      {/* ── SIDEBAR ── */}
      <div style={{
        position:'fixed', top:0, left:0, bottom:0,
        width:SIDEBAR_W,
        background: darkMode ? 'rgba(8,6,20,0.97)' : 'rgba(255,255,255,0.98)',
        borderRight: darkMode ? '1px solid rgba(255,120,0,0.18)' : '1px solid rgba(0,0,0,0.08)',
        display:'flex', flexDirection:'column', zIndex:150,
        transition:'width 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s',
        backdropFilter:'blur(20px)',
      }}>
        {/* Top: Brand */}
        <div style={{ padding:'20px 14px 16px', borderBottom: darkMode ? '1px solid rgba(255,120,0,0.12)' : '1px solid rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, overflow:'hidden' }}>
            <div style={{ width:34, height:34, background:'linear-gradient(135deg,#FF7800,#FF5500)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, boxShadow:'0 4px 14px rgba(255,120,0,0.4)', flexShrink:0 }}>🎓</div>
            {sidebarOpen && (
              <div style={{ whiteSpace:'nowrap', overflow:'hidden' }}>
                <div style={{ fontSize:13, fontWeight:900, color: darkMode ? '#ffffff' : '#0F1117' }}>
                  CAREER<span style={{ color:'#FF7800' }}>GUIDANCE</span>
                </div>
                <div style={{ fontSize:9, color:'rgba(255,120,0,0.6)', textTransform:'uppercase', letterSpacing:'1px', fontWeight:700 }}>AI Console Node</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(s => !s)}
            style={{ background:'transparent', border:'none', color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(15,17,23,0.5)', cursor:'pointer', fontSize:14, padding:4, borderRadius:6 }}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* User Badge */}
        {sidebarOpen && (
          <div style={{ padding:'12px 14px 4px' }}>
            <div style={{ background: darkMode ? 'rgba(255,120,0,0.08)' : 'rgba(255,120,0,0.05)', border: darkMode ? '1px solid rgba(255,120,0,0.2)' : '1px solid rgba(255,120,0,0.15)', borderRadius:10, padding:'8px 10px', display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px rgba(34,197,94,0.8)' }} />
              <div style={{ overflow:'hidden' }}>
                <div style={{ fontSize:11, fontWeight:800, color: darkMode ? '#ffffff' : '#0F1117', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap' }}>{userName}</div>
                <div style={{ fontSize:9, color:'#FF7800', fontWeight:600 }}>Active Student Session</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav groups */}
        <div style={{ flex:1, overflowY:'auto', padding:'10px 8px', scrollbarWidth:'thin', scrollbarColor:'rgba(255,120,0,0.3) transparent' }}>
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi} style={{ marginBottom:16 }}>
              {sidebarOpen && (
                <div style={{ fontSize:'8.5px', fontWeight:800, color: darkMode ? 'rgba(255,120,0,0.7)' : '#FF7800', textTransform:'uppercase', letterSpacing:'1.5px', padding:'0 6px 7px' }}>
                  {group.label}
                </div>
              )}
              {group.items.map((item, ii) => (
                <div
                  key={ii}
                  className={`dash-nav-item${currentPage===item.page?' active':''}`}
                  onClick={()=>setCurrentPage(item.page)}
                  title={!sidebarOpen ? item.title : ''}
                  style={{
                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                    color: currentPage === item.page ? '#ffffff' : (darkMode ? 'rgba(255,255,255,0.75)' : '#1E293B')
                  }}
                >
                  <span style={{ fontSize:16, flexShrink:0 }}>{item.icon}</span>
                  {sidebarOpen && <span>{item.title}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom: Sign Out button */}
        <div style={{ padding:'12px', borderTop: darkMode ? '1px solid rgba(255,120,0,0.15)' : '1px solid rgba(0,0,0,0.08)' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 10,
              background: darkMode ? 'rgba(255,80,80,0.12)' : 'rgba(255,80,80,0.08)',
              border: '1px solid rgba(255,80,80,0.25)',
              color: '#ff6b6b',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,80,80,0.22)';}}
            onMouseLeave={e=>{e.currentTarget.style.background= darkMode ? 'rgba(255,80,80,0.12)' : 'rgba(255,80,80,0.08)';}}
          >
            <span style={{ fontSize: 16 }}>🚪</span>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ marginLeft:SIDEBAR_W, flex:1, transition:'margin-left 0.3s cubic-bezier(0.16,1,0.3,1)', minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative', zIndex:10 }}>

        {/* Top Header */}
        <div style={{ position:'sticky', top:0, zIndex:100, background: darkMode ? 'rgba(8,6,20,0.88)' : 'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderBottom: darkMode ? '1px solid rgba(255,120,0,0.15)' : '1px solid rgba(0,0,0,0.06)', padding:'0 36px', height:64, display:'flex', justifyContent:'space-between', alignItems:'center', transition:'background-color 0.3s, border-color 0.3s' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:36,height:36,background:'linear-gradient(135deg,#FF7800,#FF5500)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 4px 14px rgba(255,120,0,0.35)',animation:'pulseGlowOrg 2.5s infinite' }}>🎓</div>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color: darkMode ? '#ffffff' : '#0F1117', letterSpacing:0.3 }}>STUDENT CONSOLE</div>
              <div style={{ fontSize:9, color: darkMode ? 'rgba(255,120,0,0.7)' : 'rgba(15,17,23,0.5)', textTransform:'uppercase', letterSpacing:'0.8px', fontWeight:700 }}>System Portal Node</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <button
              onClick={onLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
                borderRadius: 8, padding: '6px 14px',
                color: darkMode ? '#ffffff' : '#0F1117', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s', marginRight: 4
              }}
              onMouseEnter={e=>e.currentTarget.style.color='#FF7800'}
              onMouseLeave={e=>e.currentTarget.style.color=darkMode ? '#ffffff' : '#0F1117'}
              title="Return to Landing Page"
            >
              <span>←</span>
              <span>Back to Home</span>
            </button>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:14, fontWeight:700, color: darkMode ? '#ffffff' : '#0F1117' }}>{userName}</div>
              <div style={{ fontSize:10, color: darkMode ? 'rgba(255,120,0,0.7)' : 'rgba(15,17,23,0.5)', fontWeight:600 }}>System Operator Node Verified</div>
            </div>
            <div style={{ width:36,height:36,background:'linear-gradient(135deg,rgba(255,120,0,0.3),rgba(255,80,0,0.15))',border:'2px solid rgba(255,120,0,0.4)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700, color: darkMode ? '#ffffff' : '#1E293B' }}>
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* Dark / Light Mode Toggle - Icon only round button */}
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(d => !d)}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: darkMode ? 'rgba(255,120,0,0.15)' : 'rgba(255,120,0,0.08)',
                  border: '1.5px solid rgba(255,120,0,0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: 18,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,120,0,0.25)'}}
                onMouseLeave={e=>{e.currentTarget.style.background= darkMode ? 'rgba(255,120,0,0.15)' : 'rgba(255,120,0,0.08)'}}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Content Panel */}
        <div style={{ flex: 1, position: 'relative', paddingBottom: '40px' }}>
          {renderContent()}
        </div>

        {/* Footer */}
        <div style={{ textAlign:'center', padding:16, borderTop: darkMode ? '1px solid rgba(255,120,0,0.1)' : '1px solid rgba(0,0,0,0.05)', color: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(15,17,23,0.5)', fontSize:12, background: darkMode ? 'rgba(8,6,20,0.6)' : '#ffffff', backdropFilter:'blur(10px)', transition:'all 0.3s' }}>
          Career Guidance System — Final Year Project © 2026 | Powered by AI
        </div>
      </div>
    </div>
  );
}

export default Dashboard;