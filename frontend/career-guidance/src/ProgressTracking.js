import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';

function ProgressTracking() {
  const [data, setData] = useState({
    profile: null,
    assessment: null,
    academic: null,
    skills: null,
    goals: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, assessmentRes, academicRes, skillRes, goalRes] = await Promise.all([
          API.get('/profile').catch(() => null),
          API.get('/assessment').catch(() => null),
          API.get('/academic-record').catch(() => null),
          API.get('/skill-assessment').catch(() => null),
          API.get('/goals').catch(() => null),
        ]);
        setData({
          profile: profileRes?.data,
          assessment: assessmentRes?.data,
          academic: academicRes?.data,
          skills: skillRes?.data,
          goals: goalRes?.data || [],
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600' }}>Compiling telemetry metrics...</p>
      </div>
    );
  }

  // Parse internal array dependencies cleanly
  const getInterestCount = () => {
    if (!data.assessment?.interests) return 0;
    try {
      const parsed = typeof data.assessment.interests === 'string' 
        ? JSON.parse(data.assessment.interests) 
        : data.assessment.interests;
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  };

  const getSkillsCount = () => {
    if (!data.skills?.ratings) return 0;
    try {
      const parsed = typeof data.skills.ratings === 'string' 
        ? JSON.parse(data.skills.ratings) 
        : data.skills.ratings;
      return parsed ? Object.keys(parsed).length : 0;
    } catch {
      return 0;
    }
  };

  const steps = [
    {
      icon: '👤',
      title: 'Profile Setup',
      desc: 'Add your personal information',
      done: !!(data.profile?.name && data.profile?.degree),
      detail: data.profile?.name ? `${data.profile.name} — ${data.profile.degree || 'Degree not set'}` : 'Not completed',
    },
    {
      icon: '📝',
      title: 'Interest Assessment',
      desc: 'Select your interests',
      done: getInterestCount() > 0,
      detail: data.assessment?.interests ? `${getInterestCount()} interests selected` : 'Not completed',
    },
    {
      icon: '📚',
      title: 'Academic Record',
      desc: 'Enter your GPA and subjects',
      done: !!(data.academic?.gpa),
      detail: data.academic?.gpa ? `GPA: ${data.academic.gpa} | Semester: ${data.academic.semester || 'N/A'}` : 'Not completed',
    },
    {
      icon: '⭐',
      title: 'Skill Assessment',
      desc: 'Rate your skills',
      done: getSkillsCount() > 0,
      detail: data.skills?.ratings ? `${getSkillsCount()} skills rated` : 'Not completed',
    },
    {
      icon: '🎯',
      title: 'Career Goals',
      desc: 'Set your career goals',
      done: data.goals.length > 0,
      detail: data.goals.length > 0
        ? `${data.goals.length} goal${data.goals.length > 1 ? 's' : ''} set | ${data.goals.filter(g => g.status === 'completed').length} completed`
        : 'No goals set yet',
    },
    {
      icon: '🤖',
      title: 'AI Recommendation',
      desc: 'Get AI career advice',
      done: !!(data.assessment?.recommended_career),
      detail: data.assessment?.recommended_career ? `Recommended: ${data.assessment.recommended_career}` : 'Not taken yet',
    },
  ];

  const completedCount = steps.filter(s => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const getLevel = () => {
    if (progressPercent === 100) return { label: '🏆 Champion Matrix', color: '#10B981' };
    if (progressPercent >= 70) return { label: '🚀 Advanced Stack', color: '#3B82F6' };
    if (progressPercent >= 40) return { label: '📈 Progressing', color: '#F59E0B' };
    return { label: '🌱 Beginner Phase', color: theme.primary };
  };

  const level = getLevel();

  // Goal sub-metrics compilation
  const completedGoals = data.goals.filter(g => g.status === 'completed').length;
  const inProgressGoals = data.goals.filter(g => g.status === 'in_progress').length;
  const avgGoalProgress = data.goals.length > 0
    ? Math.round(data.goals.reduce((sum, g) => sum + g.progress, 0) / data.goals.length)
    : 0;

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '840px', margin: '0 auto' }}>

      {/* Header Context */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ width: '70px', height: '70px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px', boxShadow: theme.shadowGlow }}>📊</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Your Progress Tracker</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Analyze your profile completion vectors across the career stack</p>
      </div>

      {/* Overall Master Metrics Panel */}
      <div style={{ backgroundColor: theme.surface || '#ffffff', borderRadius: '20px', padding: '32px', border: `1px solid ${theme.border}`, marginBottom: '32px', boxShadow: theme.shadowMd }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: theme.text }}>Overall Completion Index</h3>
            <span style={{ backgroundColor: `${level.color}12`, color: level.color, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', border: `1px solid ${level.color}30`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {level.label}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '46px', fontWeight: '900', color: theme.primary, lineHeight: 1 }}>{progressPercent}%</div>
            <div style={{ fontSize: '12.5px', color: theme.textSecondary, fontWeight: '600', marginTop: '4px' }}>{completedCount} / {steps.length} Parameters Synced</div>
          </div>
        </div>

        {/* Core Progress Component Track */}
        <div style={{ height: '14px', backgroundColor: '#eef0f2', borderRadius: '14px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ height: '100%', width: `${progressPercent}%`, background: theme.gradientPrimary, borderRadius: '14px', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: theme.shadowSm }} />
        </div>

        {progressPercent === 100 && (
          <div style={{ backgroundColor: 'rgba(16,185,129,0.06)', border: '1px solid #10B981', borderRadius: '12px', padding: '14px', textAlign: 'center', marginTop: '20px' }}>
            <p style={{ margin: 0, color: '#10B981', fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2px' }}>
              🎉 Target 100% Resolved! Full Evaluation Portfolio is ready for generation.
            </p>
          </div>
        )}
      </div>

      {/* Structural Sequential Steps Registry */}
      <h3 style={{ fontSize: '16px', fontWeight: '800', color: theme.text, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📋 Sequential Parameter Log</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
        {steps.map((step, i) => (
          <div 
            key={i} 
            style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '16px', 
              padding: '20px 24px', 
              border: `1px solid ${step.done ? theme.primary : theme.border}`, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              boxShadow: step.done ? '0 4px 14px rgba(255,120,0,0.03)' : 'none',
              transition: theme.transitionBase || 'all 0.2s ease'
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: step.done ? 'rgba(255,120,0,0.04)' : '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, border: `1px solid ${step.done ? 'rgba(255,120,0,0.15)' : 'transparent'}` }}>
              {step.done ? '✅' : step.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '800', color: theme.text }}>{step.title}</h4>
                <span style={{ fontSize: '11px', fontWeight: '800', color: step.done ? '#10B981' : '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  {step.done ? 'Resolved' : 'Pending'}
                </span>
              </div>
              <p style={{ margin: '0 0 4px', fontSize: '12.5px', color: theme.textSecondary, lineHeight: '1.4' }}>{step.desc}</p>
              <p style={{ margin: 0, fontSize: '12px', color: step.done ? theme.primary : '#9ca3af', fontWeight: '700' }}>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Target Nodes Detailed Progression Logs */}
      {data.goals.length > 0 && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '28px', border: `1px solid ${theme.border}`, marginBottom: '32px', boxShadow: theme.shadowSm }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '800', color: theme.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🎯 Target Milestone Status Logs</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Total Logs', value: data.goals.length, color: theme.primary },
              { label: 'Active', value: inProgressGoals, color: '#3B82F6' },
              { label: 'Resolved', value: completedGoals, color: '#10B981' },
              { label: 'Mean Velocity', value: `${avgGoalProgress}%`, color: '#F59E0B' },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: `${s.color}08`, borderRadius: '12px', padding: '14px 8px', textAlign: 'center', border: `1px solid ${s.color}20` }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: s.color, marginBottom: '2px' }}>{s.value}</div>
                <div style={{ fontSize: '10.5px', color: theme.textSecondary, fontWeight: '700', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {data.goals.map((goal, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', gap: '16px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: '700', color: theme.text }}>{goal.title}</span>
                <span style={{ fontSize: '12.5px', color: theme.primary, fontWeight: '800' }}>{goal.progress}%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#eef0f2', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${goal.progress}%`, background: theme.gradientPrimary, borderRadius: '8px' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Conditional Next Actions Blueprint */}
      {completedCount < steps.length && (
        <div style={{ backgroundColor: 'rgba(255,120,0,0.02)', borderRadius: '16px', padding: '24px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: theme.text, textTransform: 'uppercase', letterSpacing: '0.4px' }}>💡 Next Optimization Vectors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {steps.filter(s => !s.done).slice(0, 3).map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px', lineHeight: '1' }}>{step.icon}</span>
                <span style={{ fontSize: '13.5px', color: theme.textSecondary, lineHeight: '1.4' }}>
                  Complete <strong>{step.title}</strong> — <span style={{ fontSize: '13px' }}>{step.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressTracking;