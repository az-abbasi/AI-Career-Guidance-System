import React, { useState } from 'react';
import { theme } from './Theme';

export const coursesData = {
  'Software Engineer': [
    { name: 'Full Stack Web Development', platform: 'Coursera', duration: '6 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'Data Structures & Algorithms', platform: 'Udemy', duration: '3 months', level: 'Intermediate', link: 'https://udemy.com' },
    { name: 'React & Node.js Bootcamp', platform: 'Udemy', duration: '4 months', level: 'Intermediate', link: 'https://udemy.com' },
  ],
  'Data Scientist': [
    { name: 'Python for Data Science', platform: 'Coursera', duration: '4 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'Machine Learning A-Z', platform: 'Udemy', duration: '5 months', level: 'Intermediate', link: 'https://udemy.com' },
    { name: 'Deep Learning Specialization', platform: 'Coursera', duration: '6 months', level: 'Advanced', link: 'https://coursera.org' },
  ],
  'AI Engineer': [
    { name: 'AI For Everyone', platform: 'Coursera', duration: '1 month', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'TensorFlow Developer Certificate', platform: 'Coursera', duration: '4 months', level: 'Intermediate', link: 'https://coursera.org' },
    { name: 'NLP with Deep Learning', platform: 'Stanford Online', duration: '3 months', level: 'Advanced', link: 'https://online.stanford.edu' },
  ],
  'Web Developer': [
    { name: 'The Web Developer Bootcamp', platform: 'Udemy', duration: '3 months', level: 'Beginner', link: 'https://udemy.com' },
    { name: 'Advanced CSS & Sass', platform: 'Udemy', duration: '2 months', level: 'Intermediate', link: 'https://udemy.com' },
    { name: 'JavaScript Advanced Concepts', platform: 'Udemy', duration: '2 months', level: 'Advanced', link: 'https://udemy.com' },
  ],
  'Cybersecurity Expert': [
    { name: 'Introduction to Cybersecurity', platform: 'Cisco', duration: '2 months', level: 'Beginner', link: 'https://cisco.com' },
    { name: 'Ethical Hacking Bootcamp', platform: 'Udemy', duration: '4 months', level: 'Intermediate', link: 'https://udemy.com' },
    { name: 'CompTIA Security+ Prep', platform: 'Coursera', duration: '3 months', level: 'Advanced', link: 'https://coursera.org' },
  ],
  'Mobile App Developer': [
    { name: 'iOS App Development with Swift', platform: 'Coursera', duration: '5 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'Android Kotlin Developer', platform: 'Udacity', duration: '4 months', level: 'Intermediate', link: 'https://udacity.com' },
    { name: 'Flutter & Dart Bootcamp', platform: 'Udemy', duration: '3 months', level: 'Intermediate', link: 'https://udemy.com' },
  ],
  'Network Engineer': [
    { name: 'Cisco CCNA 200-301 Certification', platform: 'Udemy', duration: '4 months', level: 'Beginner', link: 'https://udemy.com' },
    { name: 'Computer Networking Specialization', platform: 'Coursera', duration: '3 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'Database Administrator': [
    { name: 'Database Management Systems', platform: 'Coursera', duration: '4 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'SQL & Database Design Masterclass', platform: 'Udemy', duration: '2 months', level: 'Beginner', link: 'https://udemy.com' },
  ],
  'Cloud Engineer': [
    { name: 'AWS Certified Solutions Architect Associate', platform: 'Udemy', duration: '3 months', level: 'Intermediate', link: 'https://udemy.com' },
    { name: 'Google Cloud Associate Engineer Prep', platform: 'Coursera', duration: '2 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'Game Developer': [
    { name: 'Complete C# Unity Game Developer 3D', platform: 'Udemy', duration: '4 months', level: 'Beginner', link: 'https://udemy.com' },
    { name: 'Unreal Engine 5 C++ Developer', platform: 'Udemy', duration: '5 months', level: 'Intermediate', link: 'https://udemy.com' },
  ],
  'QA Engineer': [
    { name: 'Software Testing Fundamentals', platform: 'Udemy', duration: '2 months', level: 'Beginner', link: 'https://udemy.com' },
    { name: 'Selenium WebDriver with Java', platform: 'Udemy', duration: '3 months', level: 'Intermediate', link: 'https://udemy.com' },
  ],
  'UI/UX Designer': [
    { name: 'Google UX Design Certificate', platform: 'Coursera', duration: '6 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'Figma UI/UX Design Advanced Course', platform: 'Udemy', duration: '3 months', level: 'Intermediate', link: 'https://udemy.com' },
  ],
  'Business Analyst': [
    { name: 'Business Analysis Foundations', platform: 'LinkedIn Learning', duration: '1 month', level: 'Beginner', link: 'https://linkedin.com' },
    { name: 'Agile Analysis and Scrum Guide', platform: 'Coursera', duration: '2 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'Accountant / Financial Analyst': [
    { name: 'Financial Accounting Fundamentals', platform: 'Coursera', duration: '3 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'Chartered Financial Analyst Prep', platform: 'Kaplan', duration: '6 months', level: 'Advanced', link: 'https://kaplan.com' },
  ],
  'Marketing Manager': [
    { name: 'Google Digital Marketing Specialization', platform: 'Coursera', duration: '6 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'Social Media Marketing Essentials', platform: 'Coursera', duration: '3 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'Entrepreneur': [
    { name: 'How to Build a Startup', platform: 'Udacity', duration: '1 month', level: 'Beginner', link: 'https://udacity.com' },
    { name: 'Entrepreneurship Specialization', platform: 'Coursera', duration: '4 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'HR Manager': [
    { name: 'Human Resource Management Specialist', platform: 'Coursera', duration: '4 months', level: 'Beginner', link: 'https://coursera.org' },
    { name: 'Strategic HR Leadership', platform: 'LinkedIn Learning', duration: '2 months', level: 'Intermediate', link: 'https://linkedin.com' },
  ],
  'Supply Chain Manager': [
    { name: 'Supply Chain Management Principles', platform: 'Coursera', duration: '6 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'E-Commerce Specialist': [
    { name: 'E-Commerce Business Masterclass', platform: 'Udemy', duration: '2 months', level: 'Beginner', link: 'https://udemy.com' },
  ],
  'Doctor / Surgeon': [
    { name: 'Anatomy & Physiology Certificate', platform: 'Harvard Online', duration: '4 months', level: 'Beginner', link: 'https://online-learning.harvard.edu' },
    { name: 'Clinical Terminology for Students', platform: 'Coursera', duration: '2 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'Pharmacist': [
    { name: 'Introduction to Pharmacology', platform: 'Coursera', duration: '3 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Nurse / Healthcare Worker': [
    { name: 'Basic Nursing Skills Caregiving', platform: 'Alison', duration: '2 months', level: 'Beginner', link: 'https://alison.com' },
  ],
  'Biologist / Research Scientist': [
    { name: 'Biology & Life Sciences Principles', platform: 'MIT OCW', duration: '4 months', level: 'Beginner', link: 'https://ocw.mit.edu' },
  ],
  'Chemist / Lab Scientist': [
    { name: 'General Chemistry Concepts', platform: 'Coursera', duration: '3 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Physicist / Research Scientist': [
    { name: 'Classical & Quantum Physics Principles', platform: 'Stanford Online', duration: '4 months', level: 'Intermediate', link: 'https://online.stanford.edu' },
  ],
  'Mathematician / Statistician': [
    { name: 'Data Science & Statistical Analysis', platform: 'Coursera', duration: '3 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'Biotechnologist': [
    { name: 'Biotech & Gene Editing Fundamentals', platform: 'Coursera', duration: '4 months', level: 'Intermediate', link: 'https://coursera.org' },
  ],
  'Environmental Scientist': [
    { name: 'Introduction to Environmental Science', platform: 'Coursera', duration: '2 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Electrical Engineer': [
    { name: 'Circuits & Electronics Introduction', platform: 'edX', duration: '4 months', level: 'Beginner', link: 'https://edx.org' },
  ],
  'Mechanical Engineer': [
    { name: 'Mechanical Design & CAD Modeling', platform: 'Coursera', duration: '3 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Civil Engineer': [
    { name: 'Civil Engineering Design Fundamentals', platform: 'Coursera', duration: '4 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Chemical Engineer': [
    { name: 'Chemical Process Engineering Principles', platform: 'edX', duration: '3 months', level: 'Intermediate', link: 'https://edx.org' },
  ],
  'Teacher / Professor': [
    { name: 'Foundations of Teaching Certificate', platform: 'Coursera', duration: '3 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Psychologist / Counselor': [
    { name: 'Introduction to Psychology Yale', platform: 'Coursera', duration: '3 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Lawyer / Legal Advisor': [
    { name: 'Introduction to Law & Contracts', platform: 'Harvard Online', duration: '2 months', level: 'Beginner', link: 'https://online-learning.harvard.edu' },
  ],
  'Journalist / Media Professional': [
    { name: 'Journalism Standards & Copywriting', platform: 'Coursera', duration: '3 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Animator / Visual Artist': [
    { name: '3D Modeling & Animation with Blender', platform: 'Udemy', duration: '3 months', level: 'Beginner', link: 'https://udemy.com' },
  ],
  'Architect / Interior Designer': [
    { name: 'Architectural Design AutoCAD', platform: 'Coursera', duration: '4 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Social Worker / NGO Professional': [
    { name: 'Social Work & Community Welfare Foundations', platform: 'Coursera', duration: '2 months', level: 'Beginner', link: 'https://coursera.org' },
  ],
  'Graphic & Product Designer': [
    { name: 'UI/UX & Graphic Design Masterclass', platform: 'Udemy', duration: '4 months', level: 'Beginner', link: 'https://udemy.com' },
    { name: 'Adobe Creative Cloud Suite Bootcamp', platform: 'Coursera', duration: '3 months', level: 'Intermediate', link: 'https://coursera.org' },
    { name: 'Figma & Product Design Systems', platform: 'Udemy', duration: '2 months', level: 'Advanced', link: 'https://udemy.com' },
  ],
};

// Unified alert context badges mapping to global Theme colors
const levelConfig = {
  'Beginner': { color: theme.primary, bg: 'rgba(255,120,0,0.06)' },
  'Intermediate': { color: theme.warning, bg: 'rgba(245,158,107,0.08)' },
  'Advanced': { color: theme.success, bg: 'rgba(5,150,105,0.06)' }
};

function Courses() {
  const [selectedCareer, setSelectedCareer] = useState('Software Engineer');
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const handleEnroll = (course) => {
    setEnrolledCourse(course);
  };

  return (
    <div style={{ padding: '60px 30px', fontFamily: "'Segoe UI', sans-serif", backgroundColor: theme.bgDark, minHeight: '100vh' }}>

      {/* Header Segment */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow }}>🎓</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Courses & Institutes</h2>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px' }}>Explore premium educational resources curated for your career timeline</p>
      </div>

      {/* Career Filtering Tabs Selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '36px' }}>
        {Object.keys(coursesData).map((career, i) => {
          const isActive = selectedCareer === career;
          return (
            <button
              key={i}
              onClick={() => setSelectedCareer(career)}
              style={{ 
                padding: '10px 24px', 
                borderRadius: '30px', 
                border: isActive ? 'none' : `1.5px solid ${theme.border}`, 
                cursor: 'pointer', 
                fontWeight: '700', 
                fontSize: '13.5px', 
                fontFamily: 'inherit', 
                background: isActive ? theme.gradientPrimary : theme.surface, 
                color: isActive ? 'white' : theme.textSecondary, 
                boxShadow: isActive ? theme.shadowGlow : 'none', 
                transition: 'all 0.2s',
                outline: 'none'
              }}
            >
              {career}
            </button>
          );
        })}
      </div>

      {/* Rendered Course Items Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '750px', margin: '0 auto' }}>
        {coursesData[selectedCareer].map((course, i) => {
          const currentLevel = levelConfig[course.level] || levelConfig['Beginner'];
          return (
            <div 
              key={i} 
              style={{ 
                background: theme.surface, 
                borderRadius: theme.radiusXl, 
                padding: '26px 30px', 
                border: `1px solid ${theme.border}`, 
                boxShadow: theme.shadowSm, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flexWrap: 'wrap', 
                gap: '20px',
                transition: 'transform 0.2s, boxShadow 0.2s'
              }}
            >
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h3 style={{ margin: '0 0 10px', color: theme.text, fontSize: '16.5px', fontWeight: '800', lineHeight: '1.4' }}>
                  {course.name}
                </h3>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: theme.textSecondary, fontWeight: '600' }}>🏫 {course.platform}</span>
                  <span style={{ fontSize: '13px', color: theme.textSecondary, fontWeight: '600' }}>⏱ {course.duration}</span>
                  <span style={{ 
                    fontSize: '11px', 
                    color: currentLevel.color, 
                    backgroundColor: currentLevel.bg,
                    padding: '3px 10px',
                    borderRadius: '8px',
                    fontWeight: '800', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    ● {course.level}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => handleEnroll(course)}
                style={{ 
                  padding: '12px 26px', 
                  background: theme.gradientPrimary, 
                  color: 'white', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  fontSize: '13.5px', 
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: theme.shadowGlow, 
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.95'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}
              >
                Enroll Now →
              </button>
            </div>
          );
        })}
          {/* Gorgeous detailed enrollment success modal takeover */}
      {enrolledCourse && (() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const studentName = user.name || 'Demo Student';
        const studentUni = user.university || 'Not Specified';
        const studentDegree = user.degree || 'Not Specified';
        const regCode = `REG-${selectedCareer.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

        return (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(5, 3, 15, 0.75)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.25s'
          }}>
            <div style={{
              background: theme.surface, 
              border: `1.5px solid rgba(255, 120, 0, 0.3)`,
              borderRadius: '24px', 
              padding: '40px', 
              maxWidth: '560px', 
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top Watermark Orb */}
              <div style={{ position: 'absolute', right: -40, top: -40, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,120,0,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span style={{ 
                  background: 'rgba(34, 197, 94, 0.08)', 
                  border: '1.5px solid rgba(34, 197, 94, 0.3)', 
                  color: '#22c55e', 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  padding: '6px 16px', 
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'inline-inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '16px'
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Verified Course Registration
                </span>
                <h3 style={{ color: theme.text, fontWeight: '900', margin: '8px 0 4px', fontSize: '24px' }}>Enrollment Details</h3>
                <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0 }}>Reference Code: <strong style={{ color: theme.primary }}>{regCode}</strong></p>
              </div>

              {/* Grid with parameters */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                
                {/* Student Info Group */}
                <div style={{ borderBottom: `1px solid ${theme.border}`, paddingBottom: '12px', marginBottom: '8px' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '800', color: theme.primary, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Student Profile Info</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '8px', fontSize: '13.5px' }}>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>Student Name:</span>
                    <strong style={{ color: theme.text }}>{studentName}</strong>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>University:</span>
                    <strong style={{ color: theme.text }}>{studentUni}</strong>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>Degree Path:</span>
                    <strong style={{ color: theme.text }}>{studentDegree}</strong>
                  </div>
                </div>

                {/* Course Details Group */}
                <div>
                  <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '800', color: theme.primary, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Course Track Info</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '8px', fontSize: '13.5px' }}>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>Course Title:</span>
                    <strong style={{ color: theme.text }}>{enrolledCourse.name}</strong>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>Platform:</span>
                    <strong style={{ color: theme.text }}>{enrolledCourse.platform}</strong>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>Duration:</span>
                    <strong style={{ color: theme.text }}>{enrolledCourse.duration}</strong>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>Difficulty:</span>
                    <strong style={{ color: theme.text }}>{enrolledCourse.level}</strong>
                    <span style={{ color: theme.textSecondary, fontWeight: '600' }}>Career Goal:</span>
                    <strong style={{ color: theme.text }}>{selectedCareer}</strong>
                  </div>
                </div>

              </div>

              {/* Instructions Callout */}
              <div style={{ 
                backgroundColor: 'rgba(255, 120, 0, 0.05)', 
                border: '1.5px dashed rgba(255, 120, 0, 0.25)', 
                borderRadius: '12px', 
                padding: '16px 20px', 
                marginBottom: '28px',
                textAlign: 'left'
              }}>
                <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '800', color: theme.primary }}>🚀 Next Steps Instructions:</p>
                <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: theme.textSecondary, lineHeight: '1.5' }}>
                  <li>Navigate to the course website.</li>
                  <li>Log in to {enrolledCourse.platform} to start the course lectures.</li>
                  <li>Upon completion, post your certification badge on your dashboard tracker.</li>
                </ol>
              </div>

              <a 
                href={enrolledCourse.link}
                target="_self"
                onClick={() => setEnrolledCourse(null)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  background: theme.gradientPrimary, 
                  color: 'white', 
                  border: 'none',
                  padding: '14px', 
                  borderRadius: '12px', 
                  fontWeight: '800',
                  cursor: 'pointer', 
                  boxShadow: theme.shadowGlow, 
                  width: '100%',
                  fontSize: '14px', 
                  fontFamily: 'inherit',
                  transition: 'opacity 0.2s',
                  boxSizing: 'border-box'
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}
              >
                Continue to Course →
              </a>
            </div>
          </div>
        );
      })()}
      </div>
    </div>
  );
}

export default Courses;