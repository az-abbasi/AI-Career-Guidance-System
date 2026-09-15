import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';

function GoalSetting() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editGoal, setEditGoal] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', career: '', deadline: '', status: 'pending', progress: 0 });

  useEffect(() => { 
    fetchGoals(); 
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await API.get('/goals');
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!form.title) return alert('Please enter a goal title!');
    try {
      if (editGoal) {
        await API.put(`/goals/${editGoal.id}`, form);
      } else {
        await API.post('/goals', form);
      }
      setShowForm(false);
      setEditGoal(null);
      setForm({ title: '', description: '', career: '', deadline: '', status: 'pending', progress: 0 });
      fetchGoals();
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  const handleEdit = (goal) => {
    setEditGoal(goal);
    setForm({ 
      title: goal.title, 
      description: goal.description || '', 
      career: goal.career || '', 
      deadline: goal.deadline || '', 
      status: goal.status, 
      progress: goal.progress 
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    await API.delete(`/goals/${id}`);
    fetchGoals();
  };

  const handleProgress = async (goal, progress) => {
    const status = progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'pending';
    await API.put(`/goals/${goal.id}`, { ...goal, progress, status });
    fetchGoals();
  };

  const statusColors = { pending: '#F59E0B', in_progress: '#3B82F6', completed: '#10B981' };
  const statusLabels = { pending: '⏳ Pending', in_progress: '🔄 In Progress', completed: '✅ Completed' };

  const completedCount = goals.filter(g => g.status === 'completed').length;
  const inProgressCount = goals.filter(g => g.status === 'in_progress').length;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600' }}>Syncing career objectives...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '840px', margin: '0 auto' }}>

      {/* Header Panel */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ width: '70px', height: '70px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px', boxShadow: theme.shadowGlow }}>🎯</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Career Goal Setting</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Formulate milestones and target metric logs to gauge progression rate</p>
      </div>

      {/* Numerical Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Vectors Set', value: goals.length, color: theme.primary, icon: '🎯' },
          { label: 'Active Pipeline', value: inProgressCount, color: '#3B82F6', icon: '🔄' },
          { label: 'Resolved Targets', value: completedCount, color: '#10B981', icon: '✅' },
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '16px', padding: '20px', border: `1px solid ${theme.border}`, textAlign: 'center', boxShadow: theme.shadowSm }}>
            <div style={{ fontSize: '26px', marginBottom: '6px' }}>{s.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: s.color, marginBottom: '2px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Action Pipeline Trigger */}
      {!showForm && (
        <button
          onClick={() => { setShowForm(true); setEditGoal(null); setForm({ title: '', description: '', career: '', deadline: '', status: 'pending', progress: 0 }); }}
          style={{ width: '100%', padding: '16px', background: theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginBottom: '32px', boxShadow: theme.shadowGlow }}
        >
          + Initialize New Career Objective
        </button>
      )}

      {/* Form Interface Context */}
      {showForm && (
        <div style={{ backgroundColor: 'var(--bg-card, #ffffff)', borderRadius: '20px', padding: '32px', border: `2px solid ${theme.primary}`, marginBottom: '32px', boxShadow: theme.shadowMd }}>
          <h3 style={{ margin: '0 0 24px', fontWeight: '800', fontSize: '18px', color: theme.text }}>{editGoal ? '✏️ Modify Parameter Logs' : '➕ Core Target Provision'}</h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.text, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Goal Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Attain Full-Stack Competency Certification" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text }} onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.text, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Target Career Vector</label>
            <input value={form.career} onChange={(e) => setForm({ ...form, career: e.target.value })} placeholder="e.g. AI Systems Engineer" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text }} onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.text, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Functional Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Enlist programmatic execution plans or sub-tasks..." rows={3} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', outline: 'none', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text }} onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: theme.text, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Target Target Line (Deadline)</label>
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${theme.border}`, fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', backgroundColor: 'var(--input-bg, #ffffff)', color: theme.text }} onFocus={(e) => e.target.style.borderColor = theme.primary} onBlur={(e) => e.target.style.borderColor = theme.border} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleSubmit} style={{ flex: 1, padding: '14px', background: theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: theme.shadowSm }}>
              {editGoal ? 'Commit Modifications' : 'Store Objective'}
            </button>
            <button onClick={() => setShowForm(false)} style={{ padding: '14px 24px', background: 'var(--bg-secondary, #f5f5f7)', color: theme.textSecondary, border: `1px solid ${theme.border}`, borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Abort
            </button>
          </div>
        </div>
      )}

      {/* Core Objective Registry View */}
      {goals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px', backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '20px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
          <div style={{ fontSize: '44px', marginBottom: '12px' }}>🎯</div>
          <p style={{ color: theme.textSecondary, fontSize: '15px', fontWeight: '600', margin: 0 }}>No tracking records active in database registry. Initialize a milestone entry.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {goals.map((goal) => (
            <div key={goal.id} style={{ backgroundColor: 'var(--bg-secondary, #ffffff)', borderRadius: '20px', padding: '28px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowMd }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '800', color: theme.text }}>{goal.title}</h3>
                  {goal.career && <p style={{ margin: '0 0 6px', fontSize: '13px', color: theme.primary, fontWeight: '700' }}>💼 Vector: {goal.career}</p>}
                  {goal.deadline && <p style={{ margin: 0, fontSize: '12.5px', color: theme.textSecondary, fontWeight: '500' }}>📅 Execution Boundary: {goal.deadline}</p>}
                </div>
                <span style={{ backgroundColor: `${statusColors[goal.status]}12`, color: statusColors[goal.status], padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', whiteSpace: 'nowrap', border: `1px solid ${statusColors[goal.status]}30` }}>
                  {statusLabels[goal.status]}
                </span>
              </div>

              {goal.description && <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: theme.textSecondary, lineHeight: '1.6' }}>{goal.description}</p>}

              {/* Progress Slider Interface Container */}
              <div style={{ marginBottom: '20px', backgroundColor: 'var(--bg-primary, rgba(255,120,0,0.04))', padding: '16px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: theme.text, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Resolution Index</span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: theme.primary }}>{goal.progress}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'rgba(255,120,0,0.1)', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{ height: '100%', width: `${goal.progress}%`, background: theme.gradientPrimary, borderRadius: '8px', transition: 'width 0.30s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </div>
                <input type="range" min="0" max="100" value={goal.progress} onChange={(e) => handleProgress(goal, parseInt(e.target.value))} style={{ width: '100%', margin: 0, accentColor: theme.primary, cursor: 'pointer' }} />
              </div>

              {/* Record Context Operators */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEdit(goal)} style={{ flex: 1, padding: '10px', background: 'var(--bg-secondary, #ffffff)', color: theme.primary, border: `1px solid ${theme.border}`, borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.15s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,120,0,0.08)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary, #ffffff)'}>✏️ Edit Configuration</button>
                <button onClick={() => handleDelete(goal.id)} style={{ padding: '10px 20px', background: 'rgba(239,68,68,0.04)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.15s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.04)'}>🗑️ Purge Entry</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalSetting;