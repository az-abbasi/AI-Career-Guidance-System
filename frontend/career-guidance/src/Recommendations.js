import React, { useState, useEffect } from 'react';
import Roadmap from './Roadmap';
import API from './api';
import { theme } from './Theme';

const careerData = {
  // Computer Science
  'Programming & Coding': { career: 'Software Engineer', match: '95%', description: 'Build software applications and systems.', icon: '💻' },
  'Data Analysis': { career: 'Data Scientist', match: '92%', description: 'Analyze data to find useful insights.', icon: '📊' },
  'Graphic Design': { career: 'UI/UX Designer', match: '90%', description: 'Design beautiful user interfaces.', icon: '🎨' },
  'Cybersecurity': { career: 'Cybersecurity Expert', match: '94%', description: 'Protect systems from cyber attacks.', icon: '🔐' },
  'Artificial Intelligence': { career: 'AI Engineer', match: '96%', description: 'Build intelligent AI systems.', icon: '🤖' },
  'Web Development': { career: 'Web Developer', match: '93%', description: 'Build websites and web applications.', icon: '🌐' },
  'Mobile App Development': { career: 'Mobile App Developer', match: '91%', description: 'Build iOS and Android applications.', icon: '📱' },
  'Networking': { career: 'Network Engineer', match: '89%', description: 'Design and manage computer networks.', icon: '🔌' },
  'Database Management': { career: 'Database Administrator', match: '87%', description: 'Manage and organize databases.', icon: '🗄️' },
  'Cloud Computing': { career: 'Cloud Engineer', match: '92%', description: 'Build and manage cloud infrastructure.', icon: '☁️' },
  'Game Development': { career: 'Game Developer', match: '90%', description: 'Design and develop video games.', icon: '🎮' },
  'Software Testing': { career: 'QA Engineer', match: '85%', description: 'Test and ensure software quality.', icon: '🧪' },
  // Business
  'Business & Management': { career: 'Business Analyst', match: '88%', description: 'Analyze and improve business processes.', icon: '📈' },
  'Accounting & Finance': { career: 'Accountant / Financial Analyst', match: '90%', description: 'Manage financial records and analysis.', icon: '💰' },
  'Marketing & Sales': { career: 'Marketing Manager', match: '87%', description: 'Plan and execute marketing strategies.', icon: '📣' },
  'Entrepreneurship': { career: 'Entrepreneur', match: '89%', description: 'Start and grow your own business.', icon: '🚀' },
  'Human Resources': { career: 'HR Manager', match: '86%', description: 'Manage people and organizational culture.', icon: '👥' },
  'Supply Chain & Logistics': { career: 'Supply Chain Manager', match: '85%', description: 'Manage flow of goods and services.', icon: '🚚' },
  'E-Commerce': { career: 'E-Commerce Specialist', match: '88%', description: 'Manage online business and sales.', icon: '🛒' },
  // Medical & Science
  'Medicine & Surgery': { career: 'Doctor / Surgeon', match: '95%', description: 'Diagnose and treat patients.', icon: '🩺' },
  'Pharmacy': { career: 'Pharmacist', match: '92%', description: 'Dispense medicines and advise patients.', icon: '💊' },
  'Nursing & Healthcare': { career: 'Nurse / Healthcare Worker', match: '91%', description: 'Provide patient care and support.', icon: '🏥' },
  'Biology & Life Sciences': { career: 'Biologist / Research Scientist', match: '88%', description: 'Study living organisms and life processes.', icon: '🔬' },
  'Chemistry': { career: 'Chemist / Lab Scientist', match: '87%', description: 'Research and develop chemical solutions.', icon: '⚗️' },
  'Physics': { career: 'Physicist / Research Scientist', match: '86%', description: 'Study matter, energy and the universe.', icon: '🔭' },
  'Mathematics & Statistics': { career: 'Mathematician / Statistician', match: '88%', description: 'Solve complex mathematical problems.', icon: '📐' },
  'Biotechnology': { career: 'Biotechnologist', match: '90%', description: 'Apply biology to develop new technologies.', icon: '🧬' },
  'Environmental Science': { career: 'Environmental Scientist', match: '85%', description: 'Study and protect the environment.', icon: '🌍' },
  // Engineering
  'Electrical Engineering': { career: 'Electrical Engineer', match: '91%', description: 'Design electrical systems and circuits.', icon: '⚡' },
  'Mechanical Engineering': { career: 'Mechanical Engineer', match: '90%', description: 'Design and build mechanical systems.', icon: '⚙️' },
  'Civil Engineering': { career: 'Civil Engineer', match: '89%', description: 'Design and build infrastructure.', icon: '🏗️' },
  'Chemical Engineering': { career: 'Chemical Engineer', match: '88%', description: 'Apply chemistry to industrial processes.', icon: '🧪' },
  // Education & Arts
  'Teaching & Education': { career: 'Teacher / Professor', match: '92%', description: 'Educate and inspire the next generation.', icon: '📚' },
  'Psychology': { career: 'Psychologist / Counselor', match: '89%', description: 'Help people with mental health and behavior.', icon: '🧠' },
  'Law & Legal Studies': { career: 'Lawyer / Legal Advisor', match: '88%', description: 'Provide legal advice and representation.', icon: '⚖️' },
  'Media & Journalism': { career: 'Journalist / Media Professional', match: '86%', description: 'Report news and create media content.', icon: '📰' },
  'Graphic Arts & Animation': { career: 'Animator / Visual Artist', match: '87%', description: 'Create animations and visual content.', icon: '🎬' },
  'Architecture & Design': { career: 'Architect / Interior Designer', match: '90%', description: 'Design buildings and living spaces.', icon: '🏛️' },
  'Social Work': { career: 'Social Worker / NGO Professional', match: '85%', description: 'Support communities and vulnerable people.', icon: '🤝' },
};

function Recommendations({ selectedInterests = [] }) {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [interests, setInterests] = useState(selectedInterests || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If we have selected interests passed as props, use them
    if (selectedInterests && selectedInterests.length > 0) {
      setInterests(selectedInterests);
      return;
    }

    // Otherwise fetch the saved interests from the backend database
    const fetchSavedInterests = async () => {
      setLoading(true);
      try {
        const res = await API.get('/assessment');
        if (res.data && res.data.interests) {
          setInterests(res.data.interests);
        }
      } catch (err) {
        console.warn('Error loading AI Recommendations, trying local storage:', err);
        const localAssess = JSON.parse(localStorage.getItem('assessment'));
        if (localAssess && localAssess.interests) {
          setInterests(localAssess.interests);
        }
      }
      setLoading(false);
    };

    fetchSavedInterests();
  }, [selectedInterests]);

  if (selectedCareer) {
    return <Roadmap career={selectedCareer} onBack={() => setSelectedCareer(null)} />;
  }

  // Fallback to default interests if none are set yet so the page is never blank
  const activeInterests = interests && interests.length > 0 
    ? interests 
    : ['Programming & Coding', 'Artificial Intelligence', 'Data Analysis', 'Web Development'];

  const recommendations = activeInterests.map((interest) => careerData[interest]).filter(Boolean);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ fontSize: '44px', marginBottom: '16px', animation: 'spin 1.5s linear infinite' }}>⏳</div>
        <p style={{ color: theme.textSecondary, fontWeight: '600' }}>AI is compiling your recommendations...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header Box */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow }}>🤖</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>AI Career Recommendations</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Analytical vectors plotted from your core profile parameters</p>
        {recommendations.length > 0 && (
          <p style={{ color: theme.primary, margin: '10px 0 0', fontSize: '13.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            🎯 {recommendations.length} Predictive Nodes Compiled Successfully
          </p>
        )}
        {(!interests || interests.length === 0) && (
          <div style={{ 
            backgroundColor: 'rgba(255,120,0,0.06)', 
            border: '1px solid rgba(255,120,0,0.25)', 
            borderRadius: '12px', 
            padding: '12px 20px', 
            marginTop: '18px',
            fontSize: '13px',
            color: '#FF7800',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            💡 Showing popular recommendations. Complete the <strong>AI Assessment</strong> quiz to personalize your results!
          </div>
        )}
      </div>

      {/* Grid Allocation Layout */}
      {recommendations.length === 0 ? (
        <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '40px', textAlign: 'center', boxShadow: theme.shadowSm }}>
          <p style={{ color: theme.textSecondary, marginBottom: '20px', fontWeight: '600', fontSize: '15px' }}>
            No interactive interest nodes detected. Please evaluate your initial Assessment parameters.
          </p>
          <p style={{ color: theme.textMuted, fontSize: '13.5px', margin: '0 0 24px' }}>
            To get recommendations, please take the AI career assessment quiz.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', width: '100%' }}>
          {recommendations.map((rec, index) => (
            <div
              key={index}
              onClick={() => setSelectedCareer(rec.career)}
              style={{ 
                backgroundColor: theme.surface, 
                border: `1px solid ${theme.border}`, 
                borderRadius: '20px', 
                padding: '32px 24px', 
                cursor: 'pointer', 
                textAlign: 'center', 
                boxShadow: theme.shadowMd, 
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.borderColor = theme.primary; 
                e.currentTarget.style.transform = 'translateY(-6px)'; 
                e.currentTarget.style.boxShadow = theme.shadowLg; 
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.borderColor = theme.border; 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = theme.shadowMd; 
              }}
            >
              <div>
                <div style={{ width: '52px', height: '52px', background: theme.gradientPrimary, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px', boxShadow: theme.shadowSm }}>
                  {rec.icon}
                </div>
                <h3 style={{ margin: '0 0 4px', color: theme.text, fontSize: '15.5px', fontWeight: '800', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {rec.career}
                </h3>
                <p style={{ fontSize: '32px', fontWeight: '900', color: theme.primary, margin: '12px 0 8px' }}>
                  {rec.match}
                </p>
                <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '0 0 20px', lineHeight: '1.5', minHeight: '36px' }}>
                  {rec.description}
                </p>
              </div>
              
              <span style={{ 
                background: theme.gradientPrimary, 
                color: '#ffffff', 
                padding: '8px 18px', 
                borderRadius: '20px', 
                fontSize: '11px', 
                fontWeight: '700', 
                width: '80%', 
                display: 'block', 
                boxShadow: theme.shadowSm 
              }}>
                View Roadmap →
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;