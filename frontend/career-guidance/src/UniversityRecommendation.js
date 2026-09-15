import React, { useState, useEffect } from 'react';
import API from './api';
import { theme } from './Theme';

const universityData = {
  'Software Engineer': [
    { name: 'FAST-NUCES', city: 'Lahore/Karachi/Islamabad', ranking: '#1 CS Pakistan', fee: '3-4 Lakh/year', link: 'https://www.nu.edu.pk' },
    { name: 'NUST', city: 'Islamabad', ranking: '#2 Engineering Pakistan', fee: '2-3 Lakh/year', link: 'https://www.nust.edu.pk' },
    { name: 'COMSATS University', city: 'Multiple Campuses', ranking: 'Top 5 CS Pakistan', fee: '1.5-2.5 Lakh/year', link: 'https://www.comsats.edu.pk' },
    { name: 'UET Lahore', city: 'Lahore', ranking: 'Top Engineering University', fee: '1-2 Lakh/year', link: 'https://www.uet.edu.pk' },
    { name: 'ITU Punjab', city: 'Lahore', ranking: 'Rising Tech University', fee: '2-3 Lakh/year', link: 'https://www.itu.edu.pk' },
  ],
  'Data Scientist': [
    { name: 'FAST-NUCES', city: 'Lahore/Karachi/Islamabad', ranking: '#1 CS Pakistan', fee: '3-4 Lakh/year', link: 'https://www.nu.edu.pk' },
    { name: 'NUST', city: 'Islamabad', ranking: '#2 Engineering Pakistan', fee: '2-3 Lakh/year', link: 'https://www.nust.edu.pk' },
    { name: 'Lahore University of Management Sciences (LUMS)', city: 'Lahore', ranking: '#1 Business & Tech', fee: '5-7 Lakh/year', link: 'https://www.lums.edu.pk' },
    { name: 'COMSATS University', city: 'Multiple Campuses', ranking: 'Top 5 CS Pakistan', fee: '1.5-2.5 Lakh/year', link: 'https://www.comsats.edu.pk' },
    { name: 'University of Karachi', city: 'Karachi', ranking: 'Top Public University', fee: '0.5-1 Lakh/year', link: 'https://www.uok.edu.pk' },
  ],
  'AI Engineer': [
    { name: 'FAST-NUCES', city: 'Lahore/Karachi/Islamabad', ranking: '#1 CS Pakistan', fee: '3-4 Lakh/year', link: 'https://www.nu.edu.pk' },
    { name: 'NUST', city: 'Islamabad', ranking: '#2 Engineering Pakistan', fee: '2-3 Lakh/year', link: 'https://www.nust.edu.pk' },
    { name: 'ITU Punjab', city: 'Lahore', ranking: 'Best AI Programs', fee: '2-3 Lakh/year', link: 'https://www.itu.edu.pk' },
    { name: 'LUMS', city: 'Lahore', ranking: '#1 Business & Tech', fee: '5-7 Lakh/year', link: 'https://www.lums.edu.pk' },
    { name: 'Bahria University', city: 'Islamabad/Karachi', ranking: 'Top Private University', fee: '2-3 Lakh/year', link: 'https://www.bahria.edu.pk' },
  ],
  'Doctor / Surgeon': [
    { name: 'King Edward Medical University', city: 'Lahore', ranking: '#1 Medical Pakistan', fee: '0.5-1 Lakh/year', link: 'https://www.kemu.edu.pk' },
    { name: 'Aga Khan University', city: 'Karachi', ranking: 'Best Private Medical', fee: '10-15 Lakh/year', link: 'https://www.aku.edu' },
    { name: 'Dow University of Health Sciences', city: 'Karachi', ranking: 'Top Medical University', fee: '1-2 Lakh/year', link: 'https://www.duhs.edu.pk' },
    { name: 'Allama Iqbal Medical College', city: 'Lahore', ranking: 'Top Medical College', fee: '0.5-1 Lakh/year', link: 'https://www.aimc.edu.pk' },
    { name: 'Rawalpindi Medical University', city: 'Rawalpindi', ranking: 'Top Medical University', fee: '1-2 Lakh/year', link: 'https://www.rmu.edu.pk' },
  ],
  'Business Analyst': [
    { name: 'LUMS', city: 'Lahore', ranking: '#1 Business Pakistan', fee: '5-7 Lakh/year', link: 'https://www.lums.edu.pk' },
    { name: 'IBA Karachi', city: 'Karachi', ranking: '#2 Business Pakistan', fee: '3-4 Lakh/year', link: 'https://www.iba.edu.pk' },
    { name: 'NUST Business School', city: 'Islamabad', ranking: 'Top Business School', fee: '2-3 Lakh/year', link: 'https://www.nust.edu.pk' },
    { name: 'University of Punjab', city: 'Lahore', ranking: 'Largest University Pakistan', fee: '0.5-1 Lakh/year', link: 'https://www.pu.edu.pk' },
    { name: 'Bahria University', city: 'Islamabad/Karachi', ranking: 'Top Private University', fee: '2-3 Lakh/year', link: 'https://www.bahria.edu.pk' },
  ],
  'Electrical Engineer': [
    { name: 'UET Lahore', city: 'Lahore', ranking: '#1 Engineering Pakistan', fee: '1-2 Lakh/year', link: 'https://www.uet.edu.pk' },
    { name: 'NUST', city: 'Islamabad', ranking: '#2 Engineering Pakistan', fee: '2-3 Lakh/year', link: 'https://www.nust.edu.pk' },
    { name: 'NED University', city: 'Karachi', ranking: 'Top Engineering Karachi', fee: '1-1.5 Lakh/year', link: 'https://www.neduet.edu.pk' },
    { name: 'COMSATS University', city: 'Multiple Campuses', ranking: 'Top Engineering University', fee: '1.5-2.5 Lakh/year', link: 'https://www.comsats.edu.pk' },
    { name: 'University of Engineering Taxila', city: 'Taxila', ranking: 'Top Public Engineering', fee: '0.5-1 Lakh/year', link: 'https://www.uettaxila.edu.pk' },
  ],
  'Teacher / Professor': [
    { name: 'University of Punjab', city: 'Lahore', ranking: 'Largest University Pakistan', fee: '0.5-1 Lakh/year', link: 'https://www.pu.edu.pk' },
    { name: 'Quaid-i-Azam University', city: 'Islamabad', ranking: 'Top Research University', fee: '0.3-0.8 Lakh/year', link: 'https://www.qau.edu.pk' },
    { name: 'University of Karachi', city: 'Karachi', ranking: 'Top Public University', fee: '0.3-0.8 Lakh/year', link: 'https://www.uok.edu.pk' },
    { name: 'Allama Iqbal Open University', city: 'Islamabad', ranking: 'Distance Learning Leader', fee: '0.2-0.5 Lakh/year', link: 'https://www.aiou.edu.pk' },
    { name: 'University of Education', city: 'Lahore', ranking: 'Best Education University', fee: '0.3-0.7 Lakh/year', link: 'https://www.ue.edu.pk' },
  ],
};

const defaultUniversities = [
  { name: 'FAST-NUCES', city: 'Lahore/Karachi/Islamabad', ranking: '#1 CS Pakistan', fee: '3-4 Lakh/year', link: 'https://www.nu.edu.pk' },
  { name: 'NUST', city: 'Islamabad', ranking: '#2 Engineering Pakistan', fee: '2-3 Lakh/year', link: 'https://www.nust.edu.pk' },
  { name: 'LUMS', city: 'Lahore', ranking: '#1 Business & Tech', fee: '5-7 Lakh/year', link: 'https://www.lums.edu.pk' },
  { name: 'COMSATS University', city: 'Multiple Campuses', ranking: 'Top 5 Pakistan', fee: '1.5-2.5 Lakh/year', link: 'https://www.comsats.edu.pk' },
  { name: 'UET Lahore', city: 'Lahore', ranking: 'Top Engineering', fee: '1-2 Lakh/year', link: 'https://www.uet.edu.pk' },
  { name: 'UCP', city: 'Lahore', ranking: 'Top Private University', fee: '2-3 Lakh/semester', link: 'https://www.ucp.edu.pk' }
];

function UniversityRecommendation() {
  const [career, setCareer] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await API.get('/assessment');
        setCareer(res?.data?.recommended_career || '');
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchCareer();
  }, []);

  const universities = universityData[career] || defaultUniversities;

  // Custom positioning/gradients based on rank index
  const getRankBadgeStyles = (index) => {
    if (index === 0) return { background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#ffffff' }; // Gold
    if (index === 1) return { background: 'linear-gradient(135deg, #9FA6B2, #C0C0C0)', color: '#ffffff' }; // Silver
    if (index === 2) return { background: 'linear-gradient(135deg, #CD7F32, #B87333)', color: '#ffffff' }; // Bronze
    return { background: '#f5f5f7', color: theme.textSecondary };
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600' }}>Filtering premium institutes...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '840px', margin: '0 auto' }}>

      {/* Header Segment */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '70px', height: '70px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px', boxShadow: theme.shadowGlow }}>🏫</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>University Recommendations</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Top-tier academic pathways listed by specialization metrics</p>
        
        {career && (
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,120,0,0.04)', border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '6px 18px', marginTop: '14px' }}>
            <span style={{ color: theme.primary, fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.4px' }}>💼 Vector Mapping: {career}</span>
          </div>
        )}
      </div>

      {/* Universities Registry Wrapper */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {universities.map((uni, i) => {
          const badgeStyle = getRankBadgeStyles(i);
          return (
            <div 
              key={i} 
              style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '20px', 
                padding: '28px', 
                border: `1px solid ${theme.border}`, 
                boxShadow: theme.shadowSm, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '24px',
                flexWrap: 'wrap'
              }}
            >
              {/* Dynamic Rank Badge Indicator */}
              <div style={{ 
                width: '52px', 
                height: '52px', 
                borderRadius: '16px', 
                background: badgeStyle.background, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0, 
                boxShadow: i < 3 ? '0 4px 14px rgba(0,0,0,0.1)' : 'none' 
              }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: badgeStyle.color }}>#{i + 1}</span>
              </div>

              {/* Main Institute Description Segment */}
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '800', color: theme.text }}>{uni.name}</h3>
                    <p style={{ margin: '0 0 6px', fontSize: '13.5px', color: theme.textSecondary, fontWeight: '500' }}>📍 {uni.city}</p>
                    <p style={{ margin: 0, fontSize: '12.5px', color: theme.primary, fontWeight: '700' }}>🏆 Tier Parameter: {uni.ranking}</p>
                  </div>
                  
                  {/* Operations and External Redirection Links */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ backgroundColor: 'rgba(255,120,0,0.03)', border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '6px 14px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: '800', color: theme.primary }}>💰 {uni.fee}</span>
                    </div>
                    <a 
                      href={uni.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        display: 'inline-block', 
                        padding: '8px 16px', 
                        background: theme.gradientPrimary, 
                        color: 'white', 
                        borderRadius: '10px', 
                        fontSize: '12px', 
                        fontWeight: '700', 
                        textDecoration: 'none',
                        boxShadow: theme.shadowSm,
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      Visit Website →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structural Notice/Caveat Panel */}
      <div style={{ marginTop: '32px', padding: '20px', backgroundColor: 'rgba(255,120,0,0.02)', borderRadius: '16px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowSm }}>
        <p style={{ margin: 0, fontSize: '13.5px', color: theme.textSecondary, lineHeight: '1.6', fontWeight: '500' }}>
          💡 <strong>Deployment Note:</strong> Fee structures are current approximation matrices and are subject to cyclical structure changes. Confirm with institutional evaluation offices for precise operational admission criteria and real-time ledger updates.
        </p>
      </div>
    </div>
  );
}

export default UniversityRecommendation;