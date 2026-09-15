import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';

function AIRecommendation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [userData, setUserData] = useState(null);
  const [academicData, setAcademicData] = useState(null);
  const [skillData, setSkillData] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const primary = '#FF7800';
  const primaryLight = 'rgba(255,120,0,0.08)';
  const border = theme.border;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, academicRes, skillRes, assessmentRes] = await Promise.all([
          API.get('/profile').catch(() => null),
          API.get('/academic-record').catch(() => null),
          API.get('/skill-assessment').catch(() => null),
          API.get('/assessment').catch(() => null),
        ]);
        setUserData(profileRes?.data);
        setAcademicData(academicRes?.data);
        setSkillData(skillRes?.data);
        setAssessmentData(assessmentRes?.data);
      } catch (err) {
        console.error(err);
      }
      setDataLoading(false);
    };
    fetchData();
  }, []);

  const getAIRecommendation = async () => {
    setLoading(true);
    setResult(null);

    const skills = skillData?.ratings
      ? typeof skillData.ratings === 'string'
        ? JSON.parse(skillData.ratings)
        : skillData.ratings
      : {};

    const interests = assessmentData?.interests
      ? typeof assessmentData.interests === 'string'
        ? JSON.parse(assessmentData.interests)
        : assessmentData.interests
      : [];

    try {
      const res = await API.post('/ai-recommendation', {
        name: userData?.name,
        degree: userData?.degree,
        university: userData?.university,
        gpa: academicData?.gpa,
        semester: academicData?.semester,
        skills: Object.entries(skills).map(([k, v]) => `${k}: ${v}/5`).join(', '),
        interests: interests.join(', '),
        recommended_career: assessmentData?.recommended_career,
      });
      setResult(res.data.recommendation);
    } catch (err) {
      console.error(err);
      setResult('Error getting AI recommendation. Please try again.');
    }
    setLoading(false);
  };

  const parseResult = (text) => {
    const sections = { careers: '', explanation: '', strengths: '', improve: '', advice: '' };
    if (text.includes('TOP 3 CAREERS:')) sections.careers = text.split('TOP 3 CAREERS:')[1]?.split('BEST MATCH EXPLANATION:')[0]?.trim();
    if (text.includes('BEST MATCH EXPLANATION:')) sections.explanation = text.split('BEST MATCH EXPLANATION:')[1]?.split('KEY STRENGTHS:')[0]?.trim();
    if (text.includes('KEY STRENGTHS:')) sections.strengths = text.split('KEY STRENGTHS:')[1]?.split('SKILLS TO IMPROVE:')[0]?.trim();
    if (text.includes('SKILLS TO IMPROVE:')) sections.improve = text.split('SKILLS TO IMPROVE:')[1]?.split('PERSONALIZED ADVICE:')[0]?.trim();
    if (text.includes('PERSONALIZED ADVICE:')) sections.advice = text.split('PERSONALIZED ADVICE:')[1]?.trim();
    return sections;
  };

  if (dataLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '18px' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600', fontSize: '15px' }}>Loading your profile data...</p>
      </div>
    );
  }

  const sections = result ? parseResult(result) : null;

  return (
    <div style={{ padding: '40px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '850px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '70px', height: '70px', background: `linear-gradient(135deg, ${primary}, #FF5500)`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px', boxShadow: `0 8px 24px rgba(255,120,0,0.3)` }}>🤖</div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>AI Career Recommendation</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14px' }}>AI analyzes your profile, skills, GPA and interests to give personalized career advice</p>
      </div>

      {/* Profile Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        {[
          { icon: '👤', label: 'Name', value: userData?.name || 'Not set' },
          { icon: '🎓', label: 'GPA', value: academicData?.gpa ? `${academicData.gpa} / 4.0` : 'Not set', highlight: true },
          { icon: '📚', label: 'Semester', value: academicData?.semester ? `Semester ${academicData.semester}` : 'Not set' },
          { icon: '🎯', label: 'Interests', value: assessmentData?.interests ? `${(typeof assessmentData.interests === 'string' ? JSON.parse(assessmentData.interests) : assessmentData.interests).length} selected` : 'Not set' },
          { icon: '⭐', label: 'Skills', value: skillData?.ratings ? `${Object.keys(typeof skillData.ratings === 'string' ? JSON.parse(skillData.ratings) : skillData.ratings).length} rated` : 'Not set' },
          { icon: '💼', label: 'Career Match', value: assessmentData?.recommended_career || 'Not set', highlight: true },
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '14px', padding: '14px 10px', border: `1.5px solid ${item.highlight ? 'rgba(255,120,0,0.35)' : theme.border}`, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
            <p style={{ margin: '0 0 4px', fontSize: '10px', color: theme.textMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{item.label}</p>
            <p style={{ margin: 0, fontSize: '12px', color: item.highlight ? primary : theme.text, fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={getAIRecommendation}
        disabled={loading}
        style={{ width: '100%', padding: '16px', background: loading ? 'rgba(255,120,0,0.3)' : `linear-gradient(135deg, ${primary}, #FF5500)`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 4px 20px rgba(255,120,0,0.35)', fontFamily: 'inherit', marginBottom: '24px', transition: 'all 0.2s' }}
      >
        {loading ? '🤖 AI is analyzing your profile...' : '🤖 Get AI Career Recommendation'}
      </button>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '30px', backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '24px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧠</div>
          <p style={{ color: primary, fontWeight: '700', fontSize: '15px', margin: '0 0 8px' }}>AI is analyzing your data...</p>
          <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0 }}>Checking GPA, skills, interests and generating personalized recommendations</p>
        </div>
      )}

      {/* Error */}
      {result && result.startsWith('Error') && (
        <div style={{ padding: '16px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', marginBottom: '24px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#EF4444', fontWeight: '600', fontSize: '14px' }}>⚠️ {result}</p>
        </div>
      )}

      {/* Results */}
      {sections && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sections.careers && (
            <div style={{ backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '16px', padding: '24px 28px', border: `2px solid ${primary}`, boxShadow: '0 4px 20px rgba(255,120,0,0.08)' }}>
              <h3 style={{ margin: '0 0 14px', color: theme.text, fontWeight: '800', fontSize: '16px' }}>🏆 Top 3 Career Recommendations</h3>
              <p style={{ margin: 0, color: theme.text, fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{sections.careers}</p>
            </div>
          )}
          {sections.explanation && (
            <div style={{ backgroundColor: primaryLight, borderRadius: '16px', padding: '24px 28px', border: `1px solid ${border}` }}>
              <h3 style={{ margin: '0 0 14px', color: theme.text, fontWeight: '800', fontSize: '16px' }}>🎯 Best Match Explanation</h3>
              <p style={{ margin: 0, color: theme.textSecondary, fontSize: '14px', lineHeight: '1.8' }}>{sections.explanation}</p>
            </div>
          )}
          {sections.strengths && (
            <div style={{ backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '16px', padding: '24px 28px', border: `1px solid ${border}` }}>
              <h3 style={{ margin: '0 0 14px', color: theme.text, fontWeight: '800', fontSize: '16px' }}>💪 Your Key Strengths</h3>
              <p style={{ margin: 0, color: theme.text, fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{sections.strengths}</p>
            </div>
          )}
          {sections.improve && (
            <div style={{ backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '16px', padding: '24px 28px', border: `1px solid ${border}` }}>
              <h3 style={{ margin: '0 0 14px', color: theme.text, fontWeight: '800', fontSize: '16px' }}>📈 Skills to Improve</h3>
              <p style={{ margin: 0, color: theme.text, fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{sections.improve}</p>
            </div>
          )}
          {sections.advice && (
            <div style={{ backgroundColor: primaryLight, borderRadius: '16px', padding: '24px 28px', border: `2px solid ${primary}` }}>
              <h3 style={{ margin: '0 0 14px', color: theme.text, fontWeight: '800', fontSize: '16px' }}>💡 Personalized Advice</h3>
              <p style={{ margin: 0, color: theme.textSecondary, fontSize: '14px', lineHeight: '1.8' }}>{sections.advice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIRecommendation;