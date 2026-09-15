import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';
import { getDegreeCategory, DEGREE_SUBJECTS } from './degreeHelper';

function AcademicRecord() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userDegree = user.degree || 'BSCS';
  const category = getDegreeCategory(userDegree);
  const activeSubjectNames = DEGREE_SUBJECTS[category] || DEGREE_SUBJECTS.computing;

  const [gpa, setGpa] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState(
    activeSubjectNames.map(name => ({ name, grade: '' }))
  );
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await API.get('/academic-record');
        if (res.data) {
          setGpa(res.data.gpa || '');
          setSemester(res.data.semester || '');
          setSubjects(res.data.subjects || subjects);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGradeChange = (index, value) => {
    const updated = [...subjects];
    updated[index].grade = value;
    setSubjects(updated);
  };

  const handleSave = async () => {
    if (localStorage.getItem('isDemo') === 'true') {
      alert('Login required to access this feature. Please register or login to save academic records!');
      localStorage.clear();
      window.location.reload();
      return;
    }
    if (!gpa || !semester) { 
      alert('Please fill GPA and Semester fields!'); 
      return; 
    }
    setLoading(true);
    try {
      await API.post('/academic-record', { gpa, semester, subjects });
      setSaved(true);
    } catch (err) {
      alert('Error saving academic record!');
    }
    setLoading(false);
  };

  // ── SUCCESS VIEW (SAVED STATE) ──
  if (saved) {
    return (
      <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: theme.surface, borderRadius: theme.radiusXl, padding: '44px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg, textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '18px' }}>✅</div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 10px' }}>Academic Record Saved!</h2>
          <p style={{ color: theme.textSecondary, marginBottom: '28px', fontSize: '14.5px' }}>Your verified academic tracking history has been successfully synchronized.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '28px' }}>
            <div style={{ background: 'var(--bg-secondary, #ffffff)', border: `1.5px solid ${theme.border}`, borderRadius: '16px', padding: '18px 28px', flex: 1, boxShadow: theme.shadowSm }}>
              <p style={{ margin: '0 0 6px', color: theme.textMuted, fontSize: '11px', fontWeight: '800', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Current GPA</p>
              <h3 style={{ margin: 0, color: theme.primary, fontSize: '30px', fontWeight: '800' }}>{gpa}</h3>
            </div>
            <div style={{ background: 'var(--bg-secondary, #ffffff)', border: `1.5px solid ${theme.border}`, borderRadius: '16px', padding: '18px 28px', flex: 1, boxShadow: theme.shadowSm }}>
              <p style={{ margin: '0 0 6px', color: theme.textMuted, fontSize: '11px', fontWeight: '800', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Semester</p>
              <h3 style={{ margin: 0, color: theme.text, fontSize: '30px', fontWeight: '800' }}>{semester}</h3>
            </div>
          </div>

          <div style={{ border: `1px solid ${theme.border}`, borderRadius: '14px', overflow: 'hidden', marginBottom: '28px' }}>
            {subjects.filter(s => s.grade).map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', backgroundColor: i % 2 === 0 ? 'rgba(255,120,0,0.04)' : 'var(--bg-secondary, #ffffff)', borderBottom: i === subjects.filter(s => s.grade).length - 1 ? 'none' : `1px solid ${theme.border}` }}>
                <span style={{ color: theme.text, fontWeight: '700', fontSize: '14px' }}>{s.name}</span>
                <span style={{ color: theme.primary, fontWeight: '800', fontSize: '14px' }}>{s.grade}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setSaved(false)} 
            style={{ padding: '12px 32px', background: 'none', border: `2px solid ${theme.border}`, color: theme.text, borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'inherit', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.borderColor = theme.primary}
            onMouseOut={e => e.currentTarget.style.borderColor = theme.border}
          >
            Edit Record Details
          </button>
        </div>
      </div>
    );
  }

  // ── FORM INPUT VIEW ──
  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: theme.surface, borderRadius: theme.radiusXl, padding: '44px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow }}>📚</div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Academic Record</h2>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '12px', background: 'rgba(255,120,0,0.1)', border: '1px solid rgba(255,120,0,0.25)', color: '#FF7800', fontSize: '12px', fontWeight: '800', marginBottom: '8px' }}>
            🎓 Program: {userDegree}
          </div>
          <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Subject grades tailored to {userDegree}</p>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.text, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Current GPA</label>
            <input 
              type="number" 
              placeholder="e.g. 3.5" 
              min="0" 
              max="4" 
              step="0.1" 
              value={gpa} 
              onChange={(e) => setGpa(e.target.value)}
              style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: `2px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text, fontFamily: 'inherit', transition: 'all 0.2s' }}
              onFocus={(e) => { e.target.style.borderColor = theme.primary; e.target.style.boxShadow = '0 0 0 4px rgba(255,120,0,0.08)'; }} 
              onBlur={(e) => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none'; }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.text, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Semester</label>
            <select 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)}
              style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: `2px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text, fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s' }}
              onFocus={(e) => { e.target.style.borderColor = theme.primary; e.target.style.boxShadow = '0 0 0 4px rgba(255,120,0,0.08)'; }} 
              onBlur={(e) => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none'; }}
            >
              <option value="" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Select</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Semester {s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.text, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Subject Specific Grades</label>
          {subjects.map((subject, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--bg-secondary, #ffffff)', borderRadius: '14px', padding: '12px 18px', marginBottom: '10px', border: `1.5px solid ${theme.border}`, transition: 'all 0.2s' }}>
              <span style={{ flex: 1, color: theme.text, fontWeight: '700', fontSize: '14px' }}>{subject.name}</span>
              <select 
                value={subject.grade} 
                onChange={(e) => handleGradeChange(index, e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: `2px solid ${theme.border}`, fontSize: '13px', outline: 'none', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text, fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = theme.primary} 
                onBlur={(e) => e.target.style.borderColor = theme.border}
              >
                <option value="" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Grade</option>
                {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F'].map(g => <option key={g} value={g} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{g}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={loading}
          style={{ width: '100%', padding: '16px', background: theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: theme.shadowGlow, fontFamily: 'inherit', transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.95'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          {loading ? 'Saving Records...' : 'Save Academic Record →'}
        </button>
      </div>
    </div>
  );
}

export default AcademicRecord;