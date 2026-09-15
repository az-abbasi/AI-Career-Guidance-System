import React, { useState } from 'react';
import API from './api';
import { theme } from './Theme';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'UI', label: '🎨 User Interface' },
    { value: 'Features', label: '⚙️ Features' },
    { value: 'AI', label: '🤖 AI Recommendation' },
    { value: 'General', label: '💬 General' },
  ];

  const handleSubmit = async () => {
    if (localStorage.getItem('isDemo') === 'true') {
      alert('Login required to access this feature. Please register or login to submit feedback!');
      localStorage.clear();
      window.location.reload();
      return;
    }
    if (!rating) return setError('Please select a rating!');
    if (!category) return setError('Please select a category!');
    if (!comment.trim()) return setError('Please write a comment!');

    setLoading(true);
    setError('');

    try {
      await API.post('/feedback', { rating, category, comment });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 10px' }}>Thank You!</h2>
        <p style={{ color: theme.textSecondary, fontSize: '15px', fontWeight: '500' }}>Your telemetry data and structural review updates have been recorded.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '640px', margin: '0 auto' }}>

      {/* Header Context */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ width: '70px', height: '70px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px', boxShadow: theme.shadowGlow }}>💬</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Share Your Feedback</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Optimize ecosystem performance vectors with your review parameters</p>
      </div>

      {/* Star Component Engine */}
      <div style={{ backgroundColor: theme.surface || '#ffffff', borderRadius: '16px', padding: '28px 24px', border: `1px solid ${theme.border}`, marginBottom: '20px', boxShadow: theme.shadowSm }}>
        <p style={{ margin: '0 0 16px', fontWeight: '800', color: theme.text, fontSize: '15px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.4px' }}>How would you rate your experience?</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseOver={() => setHoveredRating(star)}
              onMouseOut={() => setHoveredRating(0)}
              style={{ 
                fontSize: '42px', 
                cursor: 'pointer', 
                transition: theme.transitionBase || 'transform 0.2s ease', 
                transform: (hoveredRating || rating) >= star ? 'scale(1.25)' : 'scale(1)', 
                filter: (hoveredRating || rating) >= star ? 'none' : 'grayscale(100%) opacity(0.35)'
              }}
            >
              ⭐
            </span>
          ))}
        </div>
        {rating > 0 && (
          <p style={{ textAlign: 'center', margin: '14px 0 0', color: theme.primary,尊称: '700', fontSize: '14.5px', fontWeight: '800', textTransform: 'uppercase' }}>
            {['', '⚡ Poor Matrix', '⚖️ Fair Performance', '📈 Good Operations', '🚀 Very Good Stack', '🔮 Excellent Engine!'][rating]}
          </p>
        )}
      </div>

      {/* Category Node Selection */}
      <div style={{ backgroundColor: theme.surface || '#ffffff', borderRadius: '16px', padding: '28px 24px', border: `1px solid ${theme.border}`, marginBottom: '20px', boxShadow: theme.shadowSm }}>
        <p style={{ margin: '0 0 16px', fontWeight: '800', color: theme.text, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>What are you giving feedback about?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {categories.map((cat) => {
            const isSelected = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                style={{ 
                  padding: '12px 20px', 
                  borderRadius: '12px', 
                  border: `2px solid ${isSelected ? theme.primary : theme.border}`, 
                  backgroundColor: isSelected ? 'rgba(255,120,0,0.12)' : 'var(--bg-secondary, #ffffff)', 
                  color: isSelected ? theme.primary : theme.text, 
                  fontWeight: '700', 
                  fontSize: '13px', 
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? theme.shadowSm : 'none'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Text Logs Context */}
      <div style={{ backgroundColor: theme.surface || '#ffffff', borderRadius: '16px', padding: '28px 24px', border: `1px solid ${theme.border}`, marginBottom: '20px', boxShadow: theme.shadowSm }}>
        <p style={{ margin: '0 0 16px', fontWeight: '800', color: theme.text, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Your Structural Review Logs</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enlist programmatic feedback or general system performance suggestions here..."
          rows={4}
          style={{ 
            width: '100%', 
            padding: '14px', 
            borderRadius: '12px', 
            border: `2px solid ${theme.border}`, 
            fontSize: '14px', 
            fontFamily: 'inherit', 
            resize: 'vertical', 
            outline: 'none', 
            boxSizing: 'border-box', 
            backgroundColor: 'var(--input-bg, #ffffff)',
            color: theme.text,
            lineHeight: '1.6'
          }}
          onFocus={(e) => e.target.style.borderColor = theme.primary}
          onBlur={(e) => e.target.style.borderColor = theme.border}
        />
      </div>

      {/* Error Boundary Notice */}
      {error && (
        <p style={{ color: '#EF4444', fontSize: '13.5px', textAlign: 'center', marginBottom: '16px', fontWeight: '700' }}>⚠️ Exception: {error}</p>
      )}

      {/* Action Trigger Node */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ 
          width: '100%', 
          padding: '16px', 
          background: loading ? theme.border : theme.gradientPrimary, 
          color: 'white', 
          border: 'none', 
          borderRadius: '14px', 
          fontSize: '16px', 
          fontWeight: '700', 
          cursor: loading ? 'not-allowed' : 'pointer', 
          boxShadow: loading ? 'none' : theme.shadowGlow, 
          fontFamily: 'inherit' 
        }}
      >
        {loading ? '⏳ Dispatching Logs...' : '💬 Submit Feedback Entry'}
      </button>
    </div>
  );
}

export default Feedback;