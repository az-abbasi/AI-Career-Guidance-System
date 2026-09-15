import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';
import { getDegreeCategory, DEGREE_SKILLS } from './degreeHelper';

function SkillAssessment() {
  const [ratings, setRatings] = useState({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userDegree = user.degree || 'BSCS';
  const category = getDegreeCategory(userDegree);
  const skillsList = DEGREE_SKILLS[category] || DEGREE_SKILLS.computing;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get('/skill-assessment');
        if (res.data && res.data.ratings) {
          setRatings(res.data.ratings);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, []);

  const handleRating = (skill, rating) => setRatings({ ...ratings, [skill]: rating });

  const handleSave = async () => {
    if (localStorage.getItem('isDemo') === 'true') {
      alert('Login required to access this feature. Please register or login to save skill ratings!');
      localStorage.clear();
      window.location.reload();
      return;
    }
    if (Object.keys(ratings).length < 4) { 
      alert('Please rate at least 4 core skills to complete your profile assessment!'); 
      return; 
    }
    setLoading(true);
    try {
      await API.post('/skill-assessment', { ratings });
      setSaved(true);
    } catch (err) {
      alert('Error saving your skill assessment metrics!');
    }
    setLoading(false);
  };

  // ── SUCCESS VIEW (SAVED STATE) ──
  if (saved) {
    return (
      <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: theme.surface, borderRadius: theme.radiusXl, padding: '44px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg, textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '18px' }}>🎯</div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 10px' }}>Assessment Profile Saved!</h2>
          <p style={{ color: theme.textSecondary, marginBottom: '32px', fontSize: '14.5px' }}>Your subjective skill proficiency indices have been structured into the system backend.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px', textAlign: 'left' }}>
            {Object.entries(ratings).map(([skill, rating], i) => {
              const matchedIcon = skillsList.find(s => s.key === skill)?.icon || '✨';
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderRadius: '14px', backgroundColor: 'var(--bg-secondary, #ffffff)', border: `1.5px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
                  <span style={{ color: theme.text, fontWeight: '700', fontSize: '14px' }}>{matchedIcon} {skill}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} style={{ color: s <= rating ? theme.primary : 'rgba(200,200,210,0.4)', fontSize: '20px' }}>★</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={() => setSaved(false)} 
            style={{ padding: '12px 32px', background: 'none', border: `2px solid ${theme.border}`, color: theme.text, borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'inherit', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.borderColor = theme.primary}
            onMouseOut={e => e.currentTarget.style.borderColor = theme.border}
          >
            Update Assessment Ratings
          </button>
        </div>
      </div>
    );
  }

  // ── RATING ASSESSMENT FORM VIEW ──
  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: theme.surface, borderRadius: theme.radiusXl, padding: '44px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow }}>🎯</div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Skill Assessment</h2>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '12px', background: 'rgba(255,120,0,0.1)', border: '1px solid rgba(255,120,0,0.25)', color: '#FF7800', fontSize: '12px', fontWeight: '800', marginBottom: '8px' }}>
            🎓 Program: {userDegree}
          </div>
          <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Rate your skill proficiency metrics tailored to {userDegree}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {skillsList.map((skill, i) => {
            const currentRating = ratings[skill.key] || ratings[skill.label] || 0;
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderRadius: '16px', backgroundColor: 'var(--bg-secondary, #ffffff)', border: `1.5px solid ${theme.border}`, boxShadow: '0 2px 6px rgba(0,0,0,0.01)', transition: 'all 0.2s' }}>
                <span style={{ color: theme.text, fontWeight: '700', fontSize: '14.5px' }}>{skill.icon} &nbsp;{skill.label}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      onClick={() => handleRating(skill.key, star)}
                      style={{ 
                        fontSize: '26px', 
                        cursor: 'pointer', 
                        color: star <= currentRating ? theme.primary : 'rgba(200,200,210,0.4)', 
                        transition: 'transform 0.1s, color 0.15s',
                        userSelect: 'none'
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={handleSave} 
          disabled={loading}
          style={{ width: '100%', padding: '16px', background: theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: theme.shadowGlow, fontFamily: 'inherit', transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.95'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          {loading ? 'Processing Profiles...' : 'Save Assessment Profile →'}
        </button>
      </div>
    </div>
  );
}

export default SkillAssessment;