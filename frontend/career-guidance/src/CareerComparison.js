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

function CareerComparison() {
  const [careers, setCareers] = useState([]);
  const [career1, setCareer1] = useState('');
  const [career2, setCareer2] = useState('');
  const [loading, setLoading] = useState(true);
  const [compared, setCompared] = useState(false);

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

  const getCareer = (title) => careers.find(c => c.title === title);

  const getSalaryScore = (salary) => {
    if (!salary) return 0;
    const match = salary.match(/\$(\d+),000/);
    return match ? parseInt(match[1]) : 0;
  };

  const getDemandScore = (demand) => {
    if (!demand) return 0;
    if (demand === 'Very High') return 100;
    if (demand === 'High') return 75;
    if (demand === 'Medium') return 50;
    return 25;
  };

  const getSkills = (career) => {
    if (!career?.required_skills) return [];
    return typeof career.required_skills === 'string'
      ? JSON.parse(career.required_skills)
      : career.required_skills;
  };

  const c1 = getCareer(career1);
  const c2 = getCareer(career2);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600' }}>Loading career matrices...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '960px', margin: '0 auto' }}>

      {/* Header Panel */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px', boxShadow: theme.shadowGlow }}>⚖️</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Career Comparison Matrix</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Cross-examine industry vectors side-by-side to analyze market stability</p>
      </div>

      {/* Selectors Form Layout */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Primary Career Node</label>
          <select
            value={career1}
            onChange={(e) => { setCareer1(e.target.value); setCompared(false); }}
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: `2px solid ${theme.border}`, fontSize: '14px', outline: 'none', fontFamily: 'inherit', backgroundColor: '#ffffff', color: theme.text, cursor: 'pointer', transition: 'all 0.15s' }}
            onFocus={(e) => e.target.style.borderColor = theme.primary}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          >
            <option value="">-- Select Career 1 --</option>
            {careers.map((c, i) => (
              <option key={i} value={c.title}>{careerIcons[c.title] || '💼'} {c.title}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px' }}>
          <span style={{ fontSize: '20px', fontWeight: '900', color: theme.primary, alpha: 0.6 }}>VS</span>
        </div>

        <div style={{ flex: 1, minWidth: '240px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Target Comparison Node</label>
          <select
            value={career2}
            onChange={(e) => { setCareer2(e.target.value); setCompared(false); }}
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: `2px solid ${theme.border}`, fontSize: '14px', outline: 'none', fontFamily: 'inherit', backgroundColor: '#ffffff', color: theme.text, cursor: 'pointer', transition: 'all 0.15s' }}
            onFocus={(e) => e.target.style.borderColor = theme.primary}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          >
            <option value="">-- Select Career 2 --</option>
            {careers.map((c, i) => (
              <option key={i} value={c.title}>{careerIcons[c.title] || '💼'} {c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Compare Action Button */}
      <button
        onClick={() => {
          if (!career1 || !career2) { alert('Please select both careers!'); return; }
          if (career1 === career2) { alert('Please select different careers!'); return; }
          setCompared(true);
        }}
        style={{ width: '100%', padding: '16px', background: theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: theme.shadowGlow, fontFamily: 'inherit', marginBottom: '36px', transition: 'opacity 0.2s' }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.95'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
      >
        ⚖️ Execute Comparative Processing
      </button>

      {/* Comparison Results Area */}
      {compared && c1 && c2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Section Headers Block */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'stretch' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: `2px solid ${theme.primary}`, textAlign: 'center', boxShadow: theme.shadowMd }}>
              <div style={{ fontSize: '44px', marginBottom: '10px' }}>{careerIcons[c1.title] || '💼'}</div>
              <h3 style={{ margin: '0 0 6px', color: theme.text, fontWeight: '800', fontSize: '17px' }}>{c1.title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: theme.textSecondary, lineHeight: '1.5' }}>{c1.description}</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: theme.textSecondary }}>VS</span>
            </div>
            
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: `1px solid ${theme.border}`, textAlign: 'center', boxShadow: theme.shadowMd }}>
              <div style={{ fontSize: '44px', marginBottom: '10px' }}>{careerIcons[c2.title] || '💼'}</div>
              <h3 style={{ margin: '0 0 6px', color: theme.text, fontWeight: '800', fontSize: '17px' }}>{c2.title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: theme.textSecondary, lineHeight: '1.5' }}>{c2.description}</p>
            </div>
          </div>

          {/* Salary Comparison metrics */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
            <h4 style={{ margin: '0 0 20px', color: theme.text, fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>💰 Capital Distribution Range</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 6px', fontSize: '13px', color: theme.textSecondary, fontWeight: '700' }}>{c1.title}</p>
                <p style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: '800', color: theme.primary }}>{c1.salary_range}</p>
                <div style={{ height: '8px', backgroundColor: theme.surfaceAlt || '#f5f5f7', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                  <div style={{ height: '100%', width: `${Math.min((getSalaryScore(c1.salary_range) / 150) * 100, 100)}%`, background: theme.gradientPrimary, borderRadius: '10px' }} />
                </div>
                {getSalaryScore(c1.salary_range) > getSalaryScore(c2.salary_range) && (
                  <span style={{ display: 'inline-block', marginTop: '12px', padding: '4px 12px', backgroundColor: 'rgba(255,120,0,0.05)', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: theme.primary, border: `1px solid ${theme.border}` }}>🏆 Higher Compensation Node</span>
                )}
              </div>
              <div style={{ textAlign: 'center', borderLeft: `1px solid ${theme.border}`, paddingLeft: '32px' }}>
                <p style={{ margin: '0 0 6px', fontSize: '13px', color: theme.textSecondary, fontWeight: '700' }}>{c2.title}</p>
                <p style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: '800', color: theme.text }}>{c2.salary_range}</p>
                <div style={{ height: '8px', backgroundColor: theme.surfaceAlt || '#f5f5f7', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                  <div style={{ height: '100%', width: `${Math.min((getSalaryScore(c2.salary_range) / 150) * 100, 100)}%`, backgroundColor: theme.text, borderRadius: '10px' }} />
                </div>
                {getSalaryScore(c2.salary_range) > getSalaryScore(c1.salary_range) && (
                  <span style={{ display: 'inline-block', marginTop: '12px', padding: '4px 12px', backgroundColor: 'rgba(28,28,30,0.05)', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: theme.text, border: `1px solid ${theme.border}` }}>🏆 Higher Compensation Node</span>
                )}
              </div>
            </div>
          </div>

          {/* Demand Vector Metrics */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
            <h4 style={{ margin: '0 0 20px', color: theme.text, fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>📈 Market Allocation Velocity</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 6px', fontSize: '13px', color: theme.textSecondary, fontWeight: '700' }}>{c1.title}</p>
                <p style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: '800', color: theme.primary }}>{c1.demand_level}</p>
                <div style={{ height: '8px', backgroundColor: theme.surfaceAlt || '#f5f5f7', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                  <div style={{ height: '100%', width: `${getDemandScore(c1.demand_level)}%`, background: theme.gradientPrimary, borderRadius: '10px' }} />
                </div>
                {getDemandScore(c1.demand_level) > getDemandScore(c2.demand_level) && (
                  <span style={{ display: 'inline-block', marginTop: '12px', padding: '4px 12px', backgroundColor: 'rgba(255,120,0,0.05)', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: theme.primary, border: `1px solid ${theme.border}` }}>🏆 Dominant Market Scale</span>
                )}
              </div>
              <div style={{ textAlign: 'center', borderLeft: `1px solid ${theme.border}`, paddingLeft: '32px' }}>
                <p style={{ margin: '0 0 6px', fontSize: '13px', color: theme.textSecondary, fontWeight: '700' }}>{c2.title}</p>
                <p style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: '800', color: theme.text }}>{c2.demand_level}</p>
                <div style={{ height: '8px', backgroundColor: theme.surfaceAlt || '#f5f5f7', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                  <div style={{ height: '100%', width: `${getDemandScore(c2.demand_level)}%`, backgroundColor: theme.text, borderRadius: '10px' }} />
                </div>
                {getDemandScore(c2.demand_level) > getDemandScore(c1.demand_level) && (
                  <span style={{ display: 'inline-block', marginTop: '12px', padding: '4px 12px', backgroundColor: 'rgba(28,28,30,0.05)', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: theme.text, border: `1px solid ${theme.border}` }}>🏆 Dominant Market Scale</span>
                )}
              </div>
            </div>
          </div>

          {/* Required Skills Matrix */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
            <h4 style={{ margin: '0 0 20px', color: theme.text, fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>🛠 Core Competency Pre-requisites</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: theme.textSecondary, fontWeight: '700', textAlign: 'center' }}>{c1.title}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                  {getSkills(c1).map((skill, i) => (
                    <span key={i} style={{ backgroundColor: 'rgba(255,120,0,0.04)', color: theme.primary, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: `1px solid ${theme.border}` }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div style={{ borderLeft: `1px solid ${theme.border}`, paddingLeft: '24px' }}>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: theme.textSecondary, fontWeight: '700', textAlign: 'center' }}>{c2.title}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                  {getSkills(c2).map((skill, i) => (
                    <span key={i} style={{ backgroundColor: '#f5f5f7', color: theme.text, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: `1px solid ${theme.border}` }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Algorithmic Winner Recommendation Box */}
          <div style={{ backgroundColor: 'rgba(255,120,0,0.02)', borderRadius: theme.radiusXl || '24px', padding: '32px', border: `2px solid ${theme.primary}`, textAlign: 'center', boxShadow: theme.shadowGlow }}>
            <h4 style={{ margin: '0 0 12px', color: theme.text, fontWeight: '800', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>🏆 Engine System Selection</h4>
            {getSalaryScore(c1.salary_range) + getDemandScore(c1.demand_level) >= getSalaryScore(c2.salary_range) + getDemandScore(c2.demand_level) ? (
              <div>
                <p style={{ fontSize: '36px', margin: '0 0 8px' }}>{careerIcons[c1.title] || '💼'}</p>
                <p style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '800', color: theme.primary }}>{c1.title}</p>
                <p style={{ margin: 0, fontSize: '13.5px', color: theme.textSecondary, fontWeight: '600' }}>Optimized distribution density detected across salary benchmarks and market capacity!</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '36px', margin: '0 0 8px' }}>{careerIcons[c2.title] || '💼'}</p>
                <p style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '800', color: theme.primary }}>{c2.title}</p>
                <p style={{ margin: 0, fontSize: '13.5px', color: theme.textSecondary, fontWeight: '600' }}>Optimized distribution density detected across salary benchmarks and market capacity!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerComparison;