import React, { useState } from 'react';
import Recommendations from './Recommendations';
import API from './api';
import { theme } from './Theme';

const questions = [
  { id: 1, question: "Which subject do you enjoy the most?", options: ["Mathematics", "Biology/Chemistry", "Computer Science", "Business Studies", "Arts & Humanities"] },
  { id: 2, question: "What type of work environment do you prefer?", options: ["Office/Corporate", "Hospital/Lab", "Remote/Freelance", "Outdoor/Field", "Classroom/Education"] },
  { id: 3, question: "Which activity do you enjoy most in free time?", options: ["Coding or building apps", "Reading or writing", "Helping people", "Solving puzzles/math", "Drawing or designing"] },
  { id: 4, question: "What is your strongest skill?", options: ["Technical/Programming", "Communication", "Analytical thinking", "Creativity", "Leadership"] },
  { id: 5, question: "Which field excites you the most?", options: ["Technology & AI", "Medicine & Health", "Business & Finance", "Engineering", "Education & Social Work"] },
  { id: 6, question: "How do you prefer to solve problems?", options: ["Through logic and code", "Through research and experiments", "Through teamwork and planning", "Through creativity and design", "Through teaching and explaining"] },
  { id: 7, question: "What kind of impact do you want to make?", options: ["Build technology solutions", "Save lives and improve health", "Grow businesses and economy", "Design and create things", "Educate and inspire others"] },
  { id: 8, question: "Which course would you enjoy most at university?", options: ["Data Structures & Algorithms", "Human Anatomy", "Financial Accounting", "Circuit Design", "Child Psychology"] },
  { id: 9, question: "How comfortable are you with numbers and data?", options: ["Very comfortable - I love data", "Comfortable for basic use", "Prefer words over numbers", "Only for engineering calculations", "Not much - I prefer people skills"] },
  { id: 10, question: "What motivates you the most at work?", options: ["Innovation and new technology", "Helping patients recover", "Making profit and growing", "Building and creating things", "Making a difference in society"] },
  { id: 11, question: "Which tool would you most like to master?", options: ["Python / Machine Learning", "Medical equipment / Lab tools", "Excel / Financial software", "AutoCAD / Engineering tools", "Teaching methods / Curriculum design"] },
  { id: 12, question: "What is your preferred way of learning?", options: ["Online courses and coding", "Practical labs and experiments", "Case studies and projects", "Hands-on building", "Reading books and discussions"] },
  { id: 13, transitionFast: '0.2s', question: "Which career sounds most appealing to you?", options: ["Software Engineer / AI Developer", "Doctor / Pharmacist", "Accountant / Business Analyst", "Civil / Mechanical Engineer", "Teacher / Psychologist"] },
  { id: 14, question: "How do you handle pressure?", options: ["I focus and debug problems", "I stay calm in emergencies", "I make quick business decisions", "I follow systematic processes", "I seek support and communicate"] },
  { id: 15, question: "Where do you see yourself in 10 years?", options: ["Leading a tech startup", "Working in a top hospital", "Running my own business", "Managing large-scale projects", "Teaching at a university"] },
];

const interestCategories = [
  { label: '💻 Computer Science', items: ['Programming & Coding', 'Data Analysis', 'Cybersecurity', 'Artificial Intelligence', 'Web Development', 'Mobile App Development', 'Networking', 'Database Management', 'Cloud Computing', 'Game Development', 'Software Testing'] },
  { label: '💼 Business', items: ['Business & Management', 'Accounting & Finance', 'Marketing & Sales', 'Entrepreneurship', 'Human Resources', 'Supply Chain & Logistics', 'E-Commerce'] },
  { label: '🔬 Medical & Science', items: ['Medicine & Surgery', 'Pharmacy', 'Nursing & Healthcare', 'Biology & Life Sciences', 'Chemistry', 'Physics', 'Mathematics & Statistics', 'Biotechnology', 'Environmental Science'] },
  { label: '⚙️ Engineering', items: ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering'] },
  { label: '🎓 Education & Arts', items: ['Teaching & Education', 'Psychology', 'Law & Legal Studies', 'Media & Journalism', 'Graphic Arts & Animation', 'Architecture & Design', 'Social Work'] },
];

const careerMap = {
  'Programming & Coding': 'Software Engineer',
  'Data Analysis': 'Data Scientist',
  'Cybersecurity': 'Cybersecurity Expert',
  'Artificial Intelligence': 'AI Engineer',
  'Web Development': 'Web Developer',
  'Mobile App Development': 'Mobile App Developer',
  'Networking': 'Network Engineer',
  'Database Management': 'Database Administrator',
  'Cloud Computing': 'Cloud Engineer',
  'Game Development': 'Game Developer',
  'Software Testing': 'QA Engineer',
  'Business & Management': 'Business Analyst',
  'Accounting & Finance': 'Accountant / Financial Analyst',
  'Marketing & Sales': 'Marketing Manager',
  'Entrepreneurship': 'Entrepreneur',
  'Human Resources': 'HR Manager',
  'Supply Chain & Logistics': 'Supply Chain Manager',
  'E-Commerce': 'E-Commerce Specialist',
  'Medicine & Surgery': 'Doctor / Surgeon',
  'Pharmacy': 'Pharmacist',
  'Nursing & Healthcare': 'Nurse',
  'Biology & Life Sciences': 'Biologist',
  'Chemistry': 'Chemist',
  'Physics': 'Physicist',
  'Mathematics & Statistics': 'Mathematician',
  'Biotechnology': 'Biotechnologist',
  'Environmental Science': 'Environmental Scientist',
  'Electrical Engineering': 'Electrical Engineer',
  'Mechanical Engineering': 'Mechanical Engineer',
  'Civil Engineering': 'Civil Engineer',
  'Chemical Engineering': 'Chemical Engineer',
  'Teaching & Education': 'Teacher / Professor',
  'Psychology': 'Psychologist',
  'Law & Legal Studies': 'Lawyer',
  'Media & Journalism': 'Journalist',
  'Graphic Arts & Animation': 'Animator',
  'Architecture & Design': 'Architect',
  'Social Work': 'Social Worker',
};

function Assessment() {
  const [step, setStep] = useState('choose'); // 'choose', 'quiz', 'interests'
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('interests');
    }
  };

  const toggleInterest = (item) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const handleSubmit = async () => {
    if (localStorage.getItem('isDemo') === 'true') {
      alert('Login required to access this feature. Please register or login to take the career assessment!');
      localStorage.clear();
      window.location.reload();
      return;
    }
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest!');
      return;
    }
    setLoading(true);
    try {
      const recommended_career = careerMap[selectedInterests[0]] || 'Software Engineer';
      await API.post('/assessment', {
        interests: selectedInterests,
        skills: answers,
        recommended_career,
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('API error saving assessment, falling back to local storage:', err);
      // Fallback: save assessment locally so app functions perfectly in offline/demo mode
      const mockAssessment = {
        interests: selectedInterests,
        skills: answers,
        recommended_career: careerMap[selectedInterests[0]] || 'Software Engineer'
      };
      localStorage.setItem('assessment', JSON.stringify(mockAssessment));
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return <Recommendations selectedInterests={selectedInterests} />;
  }

  // Common Layout Styling Objects
  const S = {
    pageContainer: { padding: '60px 20px', fontFamily: "'Segoe UI', sans-serif", maxWidth: '720px', margin: '0 auto' },
    card: { backgroundColor: theme.surface, borderRadius: theme.radiusXl, padding: '44px', border: `1px solid ${theme.border}`, boxShadow: theme.shadowLg },
    mainIconCircle: { width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 18px', boxShadow: theme.shadowGlow },
    miniIconCircle: { width: '52px', height: '52px', background: theme.gradientPrimary, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 },
    title: { fontSize: '25px', fontWeight: '800', color: theme.text, margin: '0 0 8px', textAlign: 'center' },
    subtitle: { color: theme.textSecondary, margin: 0, fontSize: '14px', textAlign: 'center' },
    optionRow: { padding: '24px', borderRadius: theme.radiusLg, border: `2px solid ${theme.border}`, backgroundColor: theme.surface, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '16px' },
    badgeTime: { display: 'inline-block', marginTop: '10px', padding: '4px 12px', backgroundColor: 'rgba(255,120,0,0.08)', border: '1px solid rgba(255,120,0,0.2)', borderRadius: '20px', fontSize: '11px', fontWeight: '700', color: theme.primary },
    quizItem: { padding: '15px 20px', borderRadius: '12px', cursor: 'pointer', border: `1.8px solid ${theme.border}`, backgroundColor: 'var(--bg-secondary, #ffffff)', fontWeight: '600', fontSize: '14px', color: theme.text, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '14px' },
    letterIcon: { width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,120,0,0.08)', border: '1px solid rgba(255,120,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: theme.primary, flexShrink: 0 },
    backBtn: { background: 'none', border: `1.5px solid ${theme.border}`, borderRadius: '10px', padding: '12px 24px', cursor: 'pointer', color: theme.textSecondary, fontWeight: '700', fontSize: '13px', transition: 'all 0.2s' },
    primarySubmitBtn: { flex: 1, padding: '14px', background: theme.gradientPrimary, color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: theme.shadowGlow, fontFamily: 'inherit', transition: 'all 0.2s' }
  };

  // STEP 1: Choose Method
  if (step === 'choose') {
    return (
      <div style={S.pageContainer}>
        <div style={S.card}>

          <div style={{ marginBottom: '38px' }}>
            <div style={S.mainIconCircle}>🎓</div>
            <h2 style={S.title}>Career Assessment</h2>
            <p style={S.subtitle}>Choose how you want to discover your career path</p>
          </div>

          <div>
            {/* Quiz Option */}
            <div
              onClick={() => setStep('quiz')}
              style={S.optionRow}
              onMouseOver={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.backgroundColor = 'rgba(255,120,0,0.08)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.backgroundColor = theme.surface; }}
            >
              <div style={S.miniIconCircle}>🎯</div>
              <div>
                <h3 style={{ margin: '0 0 5px', fontSize: '17px', fontWeight: '700', color: theme.text }}>Take Career Quiz</h3>
                <p style={{ margin: 0, fontSize: '13px', color: theme.textSecondary, lineHeight: '1.4' }}>Answer 15 smart questions to discover your best career match</p>
                <span style={S.badgeTime}>⏱ ~5 minutes</span>
              </div>
            </div>

            {/* Direct Interests Option */}
            <div
              onClick={() => setStep('interests')}
              style={S.optionRow}
              onMouseOver={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.backgroundColor = 'rgba(255,120,0,0.08)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.backgroundColor = theme.surface; }}
            >
              <div style={S.miniIconCircle}>📋</div>
              <div>
                <h3 style={{ margin: '0 0 5px', fontSize: '17px', fontWeight: '700', color: theme.text }}>Browse Interests Directly</h3>
                <p style={{ margin: 0, fontSize: '13px', color: theme.textSecondary, lineHeight: '1.4' }}>Skip the quiz and select your interests from all fields</p>
                <span style={S.badgeTime}>⚡ Quick & Easy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Quiz Engine
  if (step === 'quiz') {
    const q = questions[currentQ];
    const progress = (currentQ / questions.length) * 100;
    return (
      <div style={S.pageContainer}>
        <div style={S.card}>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ ...S.mainIconCircle, width: '55px', height: '55px', fontSize: '24px' }}>🎯</div>
            <h2 style={{ ...S.title, fontSize: '22px' }}>Career Quiz</h2>
          </div>

          {/* Clean Orange Progress Bar Mechanics */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: theme.primary }}>Question {currentQ + 1} of {questions.length}</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted }}>{Math.round(progress)}% Complete</span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'rgba(255,120,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: theme.gradientPrimary, borderRadius: '10px', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.text, marginBottom: '24px', lineHeight: '1.45' }}>{q.question}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {q.options.map((option, i) => (
              <div
                key={i}
                onClick={() => handleAnswer(option)}
                style={S.quizItem}
                onMouseOver={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.backgroundColor = 'rgba(255,120,0,0.12)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.backgroundColor = 'var(--bg-secondary, #ffffff)'; }}
              >
                <span style={S.letterIcon}>
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </div>
            ))}
          </div>

          {/* Control Triggers */}
          <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
            {currentQ > 0 && (
              <button 
                onClick={() => { setCurrentQ(currentQ - 1); setAnswers(answers.slice(0, -1)); }} 
                style={S.backBtn}
                onMouseOver={e => e.currentTarget.style.borderColor = theme.primary}
                onMouseOut={e => e.currentTarget.style.borderColor = theme.border}
              >
                ← Back
              </button>
            )}
            <button 
              onClick={() => setStep('choose')} 
              style={S.backBtn}
              onMouseOver={e => e.currentTarget.style.borderColor = '#ef4444'}
              onMouseOut={e => e.currentTarget.style.borderColor = theme.border}
            >
              ✕ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: Interests Selection Grid
  return (
    <div style={S.pageContainer}>
      <div style={S.card}>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ ...S.mainIconCircle, width: '55px', height: '55px', fontSize: '24px' }}>📝</div>
          <h2 style={{ ...S.title, fontSize: '22px' }}>Select Your Interests</h2>
          <p style={S.subtitle}>
            {answers.length > 0 ? '🎉 Quiz complete! Now select your interests' : 'Select fields that interest you below'}
          </p>
        </div>

        {/* Top complete rule helper */}
        {answers.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ height: '6px', backgroundColor: 'rgba(255,120,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', background: theme.gradientPrimary, borderRadius: '10px' }} />
            </div>
          </div>
        )}

        {interestCategories.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: '26px' }}>
            <h4 style={{ color: theme.text, fontSize: '14px', fontWeight: '800', marginBottom: '12px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '6px' }}>{cat.label}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {cat.items.map((item, index) => {
                const isSelected = selectedInterests.includes(item);
                return (
                  <div
                    key={index}
                    onClick={() => toggleInterest(item)}
                    style={{ 
                      padding: '10px 18px', 
                      borderRadius: '24px', 
                      cursor: 'pointer', 
                      backgroundColor: isSelected ? theme.primary : 'var(--bg-secondary, rgba(255,120,0,0.06))', 
                      color: isSelected ? 'white' : theme.text, 
                      fontWeight: '600', 
                      border: isSelected ? `2px solid ${theme.primary}` : `1.5px solid ${theme.border}`, 
                      fontSize: '12.5px', 
                      boxShadow: isSelected ? '0 4px 12px rgba(255,120,0,0.2)' : 'none',
                      transition: 'all 0.2s' 
                    }}
                    onMouseOver={e => { if(!isSelected) e.currentTarget.style.borderColor = theme.primary; }}
                    onMouseOut={e => { if(!isSelected) e.currentTarget.style.borderColor = theme.border; }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Action Bottom Layout */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '28px' }}>
          <button onClick={() => setStep('choose')} style={S.backBtn}>
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={S.primarySubmitBtn}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Processing...' : 'Get Career Recommendations →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assessment;