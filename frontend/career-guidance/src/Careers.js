import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';

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
  'QA Engineer': '🧪',
  'UI/UX Designer': '🎨',
  'Business Analyst': '📈',
  'Accountant / Financial Analyst': '💰',
  'Marketing Manager': '📣',
  'Entrepreneur': '🚀',
  'HR Manager': '👥',
  'Supply Chain Manager': '🚚',
  'E-Commerce Specialist': '🛒',
  'Doctor / Surgeon': '🩺',
  'Pharmacist': '💊',
  'Nurse / Healthcare Worker': '🏥',
  'Biologist / Research Scientist': '🔬',
  'Chemist / Lab Scientist': '⚗️',
  'Physicist / Research Scientist': '🔭',
  'Mathematician / Statistician': '📐',
  'Biotechnologist': '🧬',
  'Environmental Scientist': '🌍',
  'Electrical Engineer': '⚡',
  'Mechanical Engineer': '⚙️',
  'Civil Engineer': '🏗️',
  'Chemical Engineer': '🧪',
  'Teacher / Professor': '📚',
  'Psychologist / Counselor': '🧠',
  'Lawyer / Legal Advisor': '⚖️',
  'Journalist / Media Professional': '📰',
  'Animator / Visual Artist': '🎬',
  'Architect / Interior Designer': '🏛️',
  'Social Worker / NGO Professional': '🤝',
  'Graphic & Product Designer': '🎨',
};

const categoryMap = {
  'Software Engineer': 'Computer Science',
  'Data Scientist': 'Computer Science',
  'AI Engineer': 'Computer Science',
  'Cybersecurity Expert': 'Computer Science',
  'Web Developer': 'Computer Science',
  'Mobile App Developer': 'Computer Science',
  'Network Engineer': 'Computer Science',
  'Database Administrator': 'Computer Science',
  'Cloud Engineer': 'Computer Science',
  'Game Developer': 'Computer Science',
  'QA Engineer': 'Computer Science',
  'UI/UX Designer': 'Computer Science',
  'Business Analyst': 'Business',
  'Accountant / Financial Analyst': 'Business',
  'Marketing Manager': 'Business',
  'Entrepreneur': 'Business',
  'HR Manager': 'Business',
  'Supply Chain Manager': 'Business',
  'E-Commerce Specialist': 'Business',
  'Doctor / Surgeon': 'Medical & Science',
  'Pharmacist': 'Medical & Science',
  'Nurse / Healthcare Worker': 'Medical & Science',
  'Biologist / Research Scientist': 'Medical & Science',
  'Chemist / Lab Scientist': 'Medical & Science',
  'Physicist / Research Scientist': 'Medical & Science',
  'Mathematician / Statistician': 'Medical & Science',
  'Biotechnologist': 'Medical & Science',
  'Environmental Scientist': 'Medical & Science',
  'Electrical Engineer': 'Engineering',
  'Mechanical Engineer': 'Engineering',
  'Civil Engineer': 'Engineering',
  'Chemical Engineer': 'Engineering',
  'Teacher / Professor': 'Education & Arts',
  'Psychologist / Counselor': 'Education & Arts',
  'Lawyer / Legal Advisor': 'Education & Arts',
  'Journalist / Media Professional': 'Education & Arts',
  'Animator / Visual Artist': 'Education & Arts',
  'Architect / Interior Designer': 'Education & Arts',
  'Social Worker / NGO Professional': 'Education & Arts',
  'Graphic & Product Designer': 'Education & Arts',
};

function Careers() {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await API.get('/careers');
        setCareers(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchCareers();
  }, []);

  const categories = ['All', 'Computer Science', 'Business', 'Medical & Science', 'Engineering', 'Education & Arts'];

  const filtered = careers.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || categoryMap[c.title] === activeCategory;
    return matchSearch && matchCategory;
  });

  // ── INITIAL DATA LOADING STATE ──
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600' }}>Populating professional vectors...</p>
      </div>
    );
  }

  // ── DETAILED SINGLE CAREER VIEW ──
  if (selected) {
    const skills = typeof selected.required_skills === 'string'
      ? JSON.parse(selected.required_skills)
      : selected.required_skills;

    const icon = careerIcons[selected.title] || '💼';

    return (
      <div style={{ maxWidth: '620px', margin: '60px auto', padding: '44px', backgroundColor: theme.surface, borderRadius: theme.radiusXl, boxShadow: theme.shadowLg, border: `1px solid ${theme.border}`, fontFamily: "'Segoe UI', sans-serif" }}>
        <button 
          onClick={() => setSelected(null)} 
          style={{ marginBottom: '28px', padding: '10px 22px', background: 'none', border: `1.5px solid ${theme.border}`, color: theme.text, borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', transition: 'all 0.2s', outline: 'none' }}
          onMouseOver={e => e.currentTarget.style.borderColor = theme.primary}
          onMouseOut={e => e.currentTarget.style.borderColor = theme.border}
        >
          ← Back to Matrices
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</div>
          <h2 style={{ color: theme.text, fontWeight: '800', margin: '0 0 12px', fontSize: '26px' }}>{selected.title}</h2>
          <p style={{ color: theme.textSecondary, marginBottom: '32px', fontSize: '14.5px', lineHeight: '1.65' }}>{selected.description}</p>
        </div>

        {/* Salary and Demand Indicator Stats Matrix */}
        <div style={{ backgroundColor: 'rgba(255, 120, 0, 0.01)', borderRadius: theme.radiusLg, padding: '24px', marginBottom: '32px', border: `1.5px solid ${theme.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 6px', fontSize: '10.5px', color: theme.textMuted, fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase' }}>💼 Expected Baseline</p>
              <p style={{ margin: 0, fontSize: '16px', color: theme.primary, fontWeight: '800' }}>{selected.salary_range}</p>
            </div>
            <div style={{ width: '1.5px', height: '35px', backgroundColor: theme.border }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 6px', fontSize: '10.5px', color: theme.textMuted, fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase' }}>📈 Market Affinity</p>
              <p style={{ margin: 0, fontSize: '16px', color: theme.primary, fontWeight: '800' }}>{selected.demand_level}</p>
            </div>
          </div>
        </div>

        <div>
          <p style={{ margin: '0 0 14px', fontWeight: '800', color: theme.text, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>🛠 Required Core Prerequisite Competencies:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills && skills.map((skill, i) => (
              <span key={i} style={{ backgroundColor: 'rgba(255,120,0,0.05)', color: theme.primary, padding: '8px 16px', borderRadius: '24px', fontSize: '12.5px', fontWeight: '700', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN ALL CAREERS GRID LIST VIEW ──
  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", backgroundColor: theme.bgDark, minHeight: '100vh' }}>
      
      {/* Search Header Group */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow }}>🚀</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 8px' }}>Explore Career Paths</h2>
        <p style={{ color: theme.textSecondary, margin: '0 0 26px', fontSize: '14.5px' }}>Deconstruct industry verticals to match your technical profile configurations</p>
        <input
          type="text"
          placeholder="🔍 Query specific domains or career nodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '14px 28px', width: '100%', maxWidth: '400px', borderRadius: '30px', border: `1.5px solid ${theme.border}`, fontSize: '14px', outline: 'none', fontFamily: 'inherit', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text, boxShadow: theme.shadowSm, transition: 'all 0.2s' }}
          onFocus={(e) => { e.target.style.borderColor = theme.primary; e.target.style.boxShadow = '0 4px 15px rgba(255,120,0,0.08)'; }}
          onBlur={(e) => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = theme.shadowSm; }}
        />
      </div>

      {/* Category Pill Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '44px' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '24px',
                border: '1.5px solid',
                borderColor: isActive ? theme.primary : theme.border,
                backgroundColor: isActive ? theme.primary : 'var(--bg-secondary, rgba(255,120,0,0.06))',
                color: isActive ? 'white' : theme.text,
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: isActive ? theme.shadowGlow : 'none',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onMouseOver={e => { if(!isActive) e.currentTarget.style.borderColor = theme.primary; }}
              onMouseOut={e => { if(!isActive) e.currentTarget.style.borderColor = theme.border; }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Careers Results Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', maxWidth: '1140px', margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: theme.textSecondary, fontSize: '15px', fontWeight: '700' }}>No vector profiles intersected with your specific search query.</p>
          </div>
        ) : (
          filtered.map((career, index) => {
            const icon = careerIcons[career.title] || '💼';
            return (
              <div
                key={index}
                onClick={() => setSelected(career)}
                style={{ backgroundColor: theme.surface, borderRadius: '18px', padding: '28px 24px', border: `1.5px solid ${theme.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.boxShadow = '0 12px 24px rgba(255,120,0,0.06)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.01)'; }}
              >
                <div style={{ fontSize: '42px', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{ margin: '0 0 10px', color: theme.text, fontWeight: '800', fontSize: '16.5px', lineHeight: '1.35' }}>{career.title}</h3>
                <p style={{ fontSize: '13px', color: theme.textSecondary, margin: '0 0 20px', lineHeight: '1.55', flexGrow: 1 }}>
                  {career.description && career.description.substring(0, 72)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1.5px solid ${theme.border}`, paddingTop: '14px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '12px', color: theme.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2px' }}>📈 {career.demand_level}</span>
                  <span style={{ fontSize: '12.5px', color: theme.primary, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>Analyze Matrix →</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Careers;