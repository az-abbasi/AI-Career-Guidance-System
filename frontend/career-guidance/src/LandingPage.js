import React, { useState, useEffect, useRef } from 'react';
import API from './api';

// ── CUSTOM INJECTED STYLES ──
const GLOBAL_STYLE = `
  @keyframes marqueeAnim {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  @keyframes floatUpEmoji {
    0% { transform: translate(-50%, -50%) scale(0.5) rotate(0deg); opacity: 0; }
    10% { opacity: 0.95; }
    100% { transform: translate(-50%, -120px) scale(1.1) rotate(var(--rot)); opacity: 0; }
  }
  @keyframes fadeInUpAnim {
    from { opacity: 0; transform: translateY(35px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes textPulseGold {
    0%, 100% { text-shadow: 0 0 10px rgba(255,120,0,0); }
    50% { text-shadow: 0 0 25px rgba(255,120,0,0.45); }
  }
  .fade-in-section {
    opacity: 0;
    transform: translateY(35px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marqueeAnim 35s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
  .spawner-emoji {
    position: absolute;
    pointer-events: none;
    font-size: 26px;
    animation: floatUpEmoji 1s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
    z-index: 50;
  }
  .btn-gold {
    background: linear-gradient(135deg, #FF7800, #FF5500);
    color: #FFFFFF;
    border: none;
    border-radius: 50px;
    padding: 15px 36px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(255,120,0,0.3);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
  }
  .btn-gold:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255,120,0,0.5);
  }
  .btn-outline-gold {
    background: transparent;
    border: 2px solid #FF7800;
    border-radius: 50px;
    padding: 14px 34px;
    font-size: 15px;
    font-weight: 700;
    color: #FF7800;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
  }
  .btn-outline-gold:hover {
    background: rgba(255,120,0,0.08);
    transform: translateY(-3px);
  }
  .card-hover-box {
    border-radius: 20px;
    padding: 34px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .card-hover-box:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 35px rgba(255,120,0,0.09);
  }

`;

// ── FLOATING PARTICLES CANVAS ──
function ParticlesCanvas({ darkMode }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    
    const handleResize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height,
      radius: Math.random() * 2 + 0.6,
      vy: -(Math.random() * 0.7 + 0.3),
      vx: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = darkMode ? 'rgba(255, 120, 0, 0.5)' : 'rgba(255, 120, 0, 0.3)';
      
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        
        // Loop back up from the bottom if particle goes off top boundary
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 120, 0, ${p.alpha})`;
        ctx.fill();
      });
      
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}

// ── FADE-IN SCROLL OBSERVER WRAPPER ──
function ScrollObserver({ children }) {
  const domRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
}

// ── STATS COUNTER COMPONENT ──
function StatsCounter({ targetValue, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const domRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      });
    }, { threshold: 0.2 });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [triggered, targetValue, duration]);

  return (
    <span ref={domRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function LandingPage({ onGetStarted, onTryDemo, onLogin, onAdminLogin }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [cursorEmojis, setCursorEmojis] = useState([]);
  const [hoveredTab, setHoveredTab] = useState(null);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactStatus, setContactStatus] = useState(null); // null | 'loading' | 'success'
  const [loginRequiredItem, setLoginRequiredItem] = useState(null);
  
  const careersRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Parallax Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Injected CSS block
  useEffect(() => {
    const id = 'landing-injected-global-style';
    if (!document.getElementById(id)) {
      const styleEl = document.createElement('style');
      styleEl.id = id;
      styleEl.textContent = GLOBAL_STYLE;
      document.head.appendChild(styleEl);
    }
  }, []);

  // Testimonials Auto-scroll Carousel
  const testimonials = [
    {
      text: "The AI Career Recommendations mapped my interests to software architecture perfectly. Following the roadmap helped me secure an internship!",
      name: "Ahmed Hassan",
      uni: "FAST NUCES, Islamabad",
      avatar: "👨‍💻"
    },
    {
      text: "I was extremely confused between medical research and molecular biology. The assessment analyzer broke down GPA and subject interests instantly.",
      name: "Sara Khan",
      uni: "Aga Khan University, Karachi",
      avatar: "👩‍⚕️"
    },
    {
      text: "A highly robust system. The goal setting slider kept me on track throughout my final semester, providing direct links to major Pakistani universities.",
      name: "Zainab Malik",
      uni: "NUST, Islamabad",
      avatar: "👩‍🎓"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Color Theme definitions based on Gold (#C9A84C), Dark (#1C1C1E), Background Light (#FAFAF7)
  const T = {
    gold: '#FF7800',
    bg: darkMode ? '#1C1C1E' : '#FAFAF7',
    bgSec: darkMode ? '#121214' : '#F2F2EC',
    text: darkMode ? '#FAFAF7' : '#1C1C1E',
    textSub: darkMode ? 'rgba(250, 250, 247, 0.7)' : 'rgba(28, 28, 30, 0.7)',
    border: darkMode ? 'rgba(201, 168, 76, 0.15)' : 'rgba(201, 168, 76, 0.25)',
    cardBg: darkMode ? 'rgba(28, 28, 30, 0.6)' : '#FFFFFF',
    navBg: darkMode ? 'rgba(28, 28, 30, 0.55)' : 'rgba(250, 250, 247, 0.55)'
  };

  const getMegaMenuContent = (tab) => {
    if (tab === 'Features') {
      const allFeatures = [
        { icon: '🤖', title: 'AI Recommendations Engine', desc: 'Neural matching of academic grades & interests.' },
        { icon: '🎯', title: 'Target Goal Setting', desc: 'Milestone planner and semester metric tracker.' },
        { icon: '📚', title: 'Academic Records Vault', desc: 'Track CGPA, degree programs, and transcripts.' },
        { icon: '🧪', title: 'Skill Assessment Suite', desc: 'Rate core technical & soft skills (1-5).' },
        { icon: '🎓', title: 'Courses Portal', desc: 'Hand-picked courses from Coursera, Udemy & Harvard.' },
        { icon: '🗺️', title: 'Career Roadmaps', desc: 'Step-by-step career progression timelines.' },
        { icon: '⚖️', title: 'Career Comparison', desc: 'Side-by-side salary, growth & skill gap analysis.' },
        { icon: '🏫', title: 'University Matcher', desc: 'AI-aligned Pakistani & global universities.' },
        { icon: '📈', title: 'Progress Tracker', desc: '7-day streak & achievement badges.' },
        { icon: '📄', title: 'Career Report Export', desc: 'Generate comprehensive PDF career reports.' },
      ];

      return (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#FF7800', letterSpacing: '1px', textTransform: 'uppercase' }}>✦ SYSTEM FEATURES MATRIX</span>
            <span style={{ fontSize: '10px', color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(15,17,23,0.45)', fontWeight: '700' }}>10 Modules</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {allFeatures.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '8px 10px', 
                  borderRadius: '10px', 
                  cursor: 'pointer', 
                  transition: 'background 0.2s ease',
                  backgroundColor: 'transparent'
                }} 
                onClick={() => setLoginRequiredItem(item.title)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,120,0,0.12)' : 'rgba(255,120,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ fontSize: '18px', width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(255,120,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: darkMode ? '#ffffff' : '#1C1C1E' }}>{item.title}</div>
                  <div style={{ fontSize: '10.5px', color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(28,28,30,0.65)', marginTop: '1px', lineHeight: '1.3' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (tab === 'Careers') {
      const allCareers = [
        { icon: '💻', title: 'Computer Science & Software', desc: 'Full Stack, Web Dev, Mobile & QA Engineering.' },
        { icon: '🤖', title: 'AI, ML & Data Science', desc: 'Neural network training, Big Data & Analytics.' },
        { icon: '🔐', title: 'Cybersecurity & Networks', desc: 'Ethical hacking, cloud & network security.' },
        { icon: '⚙️', title: 'Engineering & Technology', desc: 'Electrical, Mechanical, Civil & Chemical.' },
        { icon: '🩺', title: 'Medical & Healthcare', desc: 'MBBS Doctor, Surgeon, Pharmacist & Nursing.' },
        { icon: '📈', title: 'Business & Finance', desc: 'Business Analyst, Accounting, Marketing & HR.' },
        { icon: '🎨', title: 'Arts, Media & Design', desc: 'Graphic & Product Designer, UI/UX & Animation.' },
        { icon: '🔬', title: 'Natural & Applied Sciences', desc: 'Biotechnology, Chemistry, Physics & Math.' },
      ];

      return (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#FF7800', letterSpacing: '1px', textTransform: 'uppercase' }}>✦ CAREER PATHWAYS</span>
            <span style={{ fontSize: '10px', color: darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(15,17,23,0.45)', fontWeight: '700' }}>39 Roles</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {allCareers.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '8px 10px', 
                  borderRadius: '10px', 
                  cursor: 'pointer', 
                  transition: 'background 0.2s ease',
                  backgroundColor: 'transparent'
                }} 
                onClick={() => setLoginRequiredItem(item.title)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,120,0,0.12)' : 'rgba(255,120,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ fontSize: '18px', width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(255,120,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: darkMode ? '#ffffff' : '#1C1C1E' }}>{item.title}</div>
                  <div style={{ fontSize: '10.5px', color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(28,28,30,0.65)', marginTop: '1px', lineHeight: '1.3' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    return null;
  };

  const marqueeItems = [
    { name: 'Software Engineer', icon: '💻' },
    { name: 'Doctor', icon: '🩺' },
    { name: 'AI Engineer', icon: '🤖' },
    { name: 'Teacher', icon: '📚' },
    { name: 'Business Analyst', icon: '📈' },
    { name: 'Civil Engineer', icon: '🏗️' },
    { name: 'Lawyer', icon: '⚖️' },
    { name: 'Data Scientist', icon: '📊' },
    { name: 'Pharmacist', icon: '💊' },
    { name: 'Psychologist', icon: '🧠' },
    { name: 'Architect', icon: '🏛️' },
    { name: 'Accountant', icon: '💰' }
  ];

  // Mouse cursor emoji spawner handler in Careers Section
  const handleMouseMove = (e) => {
    if (!careersRef.current) return;
    const rect = careersRef.current.getBoundingClientRect();
    
    // Add particle logic on mouse move
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    // Throttle spawning
    if (Math.random() < 0.12) {
      const randomItem = marqueeItems[Math.floor(Math.random() * marqueeItems.length)];
      const randomRotation = (Math.random() - 0.5) * 60; // -30 to 30 deg
      const newParticle = {
        id: Date.now() + Math.random(),
        emoji: randomItem.icon,
        x: relativeX,
        y: relativeY,
        rot: randomRotation
      };

      setCursorEmojis(prev => [...prev.slice(-15), newParticle]); // keep last 15 elements to avoid leak
    }
  };

  const steps = [
    { icon: '📝', num: '01', title: 'Take Assessment', desc: 'Answer smart interactive questions about your raw interests, strengths and capabilities.' },
    { icon: '🤖', num: '02', title: 'AI Analysis', desc: 'Our advanced neural logic parses your inputs, GPA parameters, and skill matrices.' },
    { icon: '🎯', num: '03', title: 'Get Recommendations', desc: 'Receive a curated list of career paths matching your interest profiles with dynamic scoring.' },
    { icon: '🗺️', num: '04', title: 'Follow Roadmap', desc: 'Acquire access to personalized, step-by-step milestone roadmaps leading to final career success.' }
  ];

  const categories = [
    { title: "Computer Science", desc: "Software engineering, Artificial intelligence architectures, Web systems, and Cybersecurity networks.", count: "7 paths" },
    { title: "Business", desc: "Global product marketing, financial modeling, accounting operations, and enterprise metrics analysis.", count: "5 paths" },
    { title: "Medical", desc: "Clinical surgery routes, pharmaceutical research paths, lab biology, and professional psychology.", count: "6 paths" },
    { title: "Engineering", desc: "Structural infrastructure builds, electrical microcontroller designs, robot dynamics, and process layouts.", count: "5 paths" },
    { title: "Education & Arts", desc: "Curriculum designs, legal constitutional arguments, visual illustration timelines, and public administration.", count: "6 paths" }
  ];

  return (
    <div style={{ backgroundColor: T.bg, color: T.text, transition: 'background-color 0.6s ease, color 0.6s ease', overflowX: 'hidden', minHeight: '100vh', scrollBehavior: 'smooth' }}>

      {/* ── DARK GLASSMORPHIC NAVIGATION BAR ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '76px',
        zIndex: 1000,
        backgroundColor: darkMode ? 'rgba(8, 6, 20, 0.95)' : 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(24px)',
        borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(24px, 5vw, 80px)',
        transition: 'all 0.4s'
      }}>
        {/* Left Side logo + nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              background: 'linear-gradient(135deg, #FF7800, #FF5500)', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '18px', 
              boxShadow: '0 4px 15px rgba(255, 120, 0, 0.25)' 
            }}>
              🎓
            </div>
            <span style={{ 
              fontWeight: '800', 
              fontSize: '18px', 
              letterSpacing: '-0.3px', 
              fontFamily: "'Outfit', sans-serif",
              color: darkMode ? '#ffffff' : '#1C1C1E',
              transition: 'color 0.3s ease'
            }}>
              Career<span style={{ color: '#FF7800' }}>Guidance</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {['Home', 'Features', 'Careers', 'Contact Us'].map((nav, i) => (
              <div
                key={i}
                onMouseEnter={() => {
                  if (nav !== 'Contact Us' && nav !== 'Home') setHoveredTab(nav);
                }}
                onMouseLeave={() => setHoveredTab(null)}
                style={{ position: 'relative', padding: '12px 0' }}
              >
                <span 
                  style={{ 
                    color: hoveredTab === nav ? T.gold : (darkMode ? '#ffffff' : '#1C1C1E'), 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    cursor: 'pointer', 
                    transition: 'color 0.25s',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: hoveredTab === nav ? (darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)') : 'transparent'
                  }}
                  onClick={() => {
                    if (nav === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
                    else if (nav === 'Features') featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
                    else if (nav === 'Careers') careersRef.current?.scrollIntoView({ behavior: 'smooth' });
                    else if (nav === 'Contact Us') ctaRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {nav}
                </span>

                {/* Dropdown Mega Menu */}
                {hoveredTab === nav && nav !== 'Contact Us' && nav !== 'Home' && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '-20px',
                      width: '350px',
                      maxHeight: '460px',
                      overflowY: 'auto',
                      backgroundColor: darkMode ? 'rgba(8, 6, 20, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(24px)',
                      border: darkMode ? '1px solid rgba(255, 120, 0, 0.25)' : '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '14px',
                      padding: '16px',
                      boxShadow: darkMode ? '0 16px 40px rgba(0,0,0,0.65)' : '0 12px 30px rgba(0,0,0,0.08)',
                      zIndex: 1100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      textAlign: 'left',
                      animation: 'fadeInUpAnim 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}
                  >
                    {getMegaMenuContent(nav)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side admin portal link + sign in portal button + theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span 
            onClick={onAdminLogin}
            style={{ 
              color: darkMode ? '#ffffff' : '#1C1C1E', 
              fontSize: '14px', 
              fontWeight: '650', 
              cursor: 'pointer', 
              transition: 'color 0.25s',
              marginRight: '8px'
            }}
            onMouseEnter={e => e.target.style.color = T.gold}
            onMouseLeave={e => e.target.style.color = darkMode ? '#ffffff' : '#1C1C1E'}
          >
            Admin Portal
          </span>

          <span 
            onClick={onLogin}
            style={{ 
              color: darkMode ? '#ffffff' : '#1C1C1E', 
              fontSize: '14px', 
              fontWeight: '650', 
              cursor: 'pointer', 
              transition: 'all 0.25s',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = T.gold;
              e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = darkMode ? '#ffffff' : '#1C1C1E';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Sign In / Register
          </span>

          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: darkMode ? '#ffffff' : '#1C1C1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              transition: 'color 0.3s ease'
            }}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <header style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        {/* Fullscreen Background Video (Unfiltered, clear, and visible) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.12}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Overlay (Light, transparent overlay to keep video visible) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(5, 3, 15, 0.3) 0%, rgba(5, 3, 15, 0.65) 100%)',
          zIndex: 1
        }} />

        {/* Float Particles Canvas */}
        <ParticlesCanvas darkMode={darkMode} />

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 24px',
          maxWidth: '850px',
          transform: `translateY(${scrollY * 0.28}px)`,
          opacity: Math.max(1 - scrollY * 0.0022, 0),
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(38px, 6vw, 76px)',
            fontWeight: '900',
            color: '#FAFAF7',
            lineHeight: '1.1',
            margin: '0 0 20px 0',
            letterSpacing: '-2px',
            animation: 'fadeInUpAnim 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            Discover Your <span style={{ color: T.gold, animation: 'textPulseGold 4s infinite' }}>Perfect Career</span> Path
          </h1>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(16px, 2.5vw, 21px)',
            color: 'rgba(250, 250, 247, 0.85)',
            maxWidth: '620px',
            margin: '0 auto 46px',
            lineHeight: '1.6',
            animation: 'fadeInUpAnim 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            AI-Powered Career Guidance for Students. Align your academics, skills, and values into a step-by-step roadmap to professional heights.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '18px',
            flexWrap: 'wrap',
            animation: 'fadeInUpAnim 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            <button className="btn-gold" onClick={onGetStarted}>
              Get Started Free →
            </button>
            <button className="btn-outline-gold" onClick={onTryDemo}>
              Try Demo Console
            </button>
          </div>
        </div>
        
      </header>

      {/* ── MARQUEE SECTION ── */}
      <section style={{
        background: '#121214',
        borderTop: `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
        padding: '24px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div 
              key={i} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0 45px',
                color: '#FAFAF7',
                fontSize: '16px',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}
            >
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <span style={{ color: T.gold }}>{item.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.15)', marginLeft: '30px' }}>✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section ref={featuresRef} style={{ padding: '120px 24px', backgroundColor: T.bgSec, transition: 'background-color 0.6s' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <ScrollObserver>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(201,168,76,0.1)', border: `1px solid ${T.gold}`, borderRadius: '20px', padding: '6px 16px', marginBottom: '16px' }}>
                <span style={{ color: T.gold, fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>✦ SYSTEM WORKFLOW</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '900', color: T.text, letterSpacing: '-1px', margin: 0 }}>
                Start In <span style={{ color: T.gold }}>4 Simple Steps</span>
              </h2>
            </div>
          </ScrollObserver>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
            {steps.map((step, i) => (
              <ScrollObserver key={i}>
                <div 
                  className="card-hover-box" 
                  style={{
                    backgroundColor: T.cardBg,
                    border: `1.5px solid ${T.border}`,
                    height: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ fontSize: '32px' }}>{step.icon}</div>
                    <span style={{ 
                      fontSize: '22px', 
                      fontWeight: '900', 
                      fontFamily: "'Outfit', sans-serif", 
                      color: '#FF7800',
                      backgroundColor: darkMode ? 'rgba(255,120,0,0.18)' : 'rgba(255,120,0,0.12)',
                      border: '1.5px solid rgba(255,120,0,0.35)',
                      padding: '4px 14px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(255,120,0,0.12)'
                    }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', color: T.text }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', color: T.textSub, lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
                </div>
              </ScrollObserver>
            ))}
          </div>

        </div>
      </section>

      {/* ── CAREERS SECTION (WITH MOUSE SPARKLES SPAWNER) ── */}
      <section 
        ref={careersRef} 
        onMouseMove={handleMouseMove}
        style={{ 
          padding: '120px 24px', 
          backgroundColor: T.bg, 
          position: 'relative',
          transition: 'background-color 0.6s'
        }}
      >
        {/* Render Spawner Emojis */}
        {cursorEmojis.map((e) => (
          <span 
            key={e.id} 
            className="spawner-emoji" 
            style={{ 
              left: `${e.x}px`, 
              top: `${e.y}px`,
              '--rot': `${e.rot}deg`
            }}
          >
            {e.emoji}
          </span>
        ))}

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <ScrollObserver>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(201,168,76,0.1)', border: `1px solid ${T.gold}`, borderRadius: '20px', padding: '6px 16px', marginBottom: '16px' }}>
                <span style={{ color: T.gold, fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>✦ CAREER MATRIX</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '900', color: T.text, letterSpacing: '-1px', margin: '0 0 16px 0' }}>
                Explore <span style={{ color: T.gold }}>20+ Career Paths</span>
              </h2>
              <p style={{ color: T.textSub, fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
                Move your cursor over this section to unleash dynamic path elements. Select category fields to view.
              </p>
            </div>
          </ScrollObserver>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {categories.map((cat, i) => (
              <ScrollObserver key={i}>
                <div 
                  className="card-hover-box" 
                  style={{
                    backgroundColor: T.cardBg,
                    border: `1.5px solid ${T.border}`,
                    borderLeft: `4px solid ${T.gold}`,
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '19px', fontWeight: '900', color: T.text, margin: 0 }}>{cat.title}</h3>
                    <span style={{ color: T.gold, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{cat.count}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: T.textSub, lineHeight: '1.6', margin: 0 }}>{cat.desc}</p>
                </div>
              </ScrollObserver>
            ))}
          </div>

        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section style={{ padding: '100px 24px', backgroundColor: T.bgSec, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, transition: 'background-color 0.6s' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            
            <ScrollObserver>
              <div>
                <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: '900', color: T.gold, margin: '0 0 8px' }}>
                  <StatsCounter targetValue={20} suffix="+" />
                </h2>
                <p style={{ color: T.textSub, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Career Paths Mapped</p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div>
                <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: '900', color: T.gold, margin: '0 0 8px' }}>
                  <StatsCounter targetValue={15} />
                </h2>
                <p style={{ color: T.textSub, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Smart Matrix Questions</p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div>
                <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: '900', color: T.gold, margin: '0 0 8px' }}>
                  <StatsCounter targetValue={100} suffix="%" />
                </h2>
                <p style={{ color: T.textSub, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>AI recommendation Engine</p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div>
                <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: '900', color: T.gold, margin: '0 0 8px' }}>
                  FREE
                </h2>
                <p style={{ color: T.textSub, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>No Hidden Subscriptions</p>
              </div>
            </ScrollObserver>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section style={{ padding: '120px 24px', backgroundColor: T.bg, transition: 'background-color 0.6s' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          
          <ScrollObserver>
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(201,168,76,0.1)', border: `1px solid ${T.gold}`, borderRadius: '20px', padding: '6px 16px', marginBottom: '16px' }}>
                <span style={{ color: T.gold, fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>✦ SUCCESS STORIES</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '900', color: T.text, letterSpacing: '-1px', margin: 0 }}>
                What Our <span style={{ color: T.gold }}>Students Say</span>
              </h2>
            </div>
          </ScrollObserver>

          {/* Testimonial Active Display Slide */}
          <ScrollObserver>
            <div 
              style={{
                backgroundColor: T.bgSec,
                border: `1.5px solid ${T.border}`,
                borderRadius: '26px',
                padding: '50px 30px',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                transition: 'all 0.4s ease'
              }}
            >
              <div style={{ fontSize: '48px', color: T.gold, opacity: 0.15, position: 'absolute', top: '15px', left: '25px', fontFamily: 'serif' }}>“</div>
              
              <p style={{
                fontSize: '17px',
                lineHeight: '1.75',
                color: T.text,
                fontStyle: 'italic',
                margin: '0 auto 24px',
                maxWidth: '680px'
              }}>
                {testimonials[activeTestimonial].text}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                <span style={{ fontSize: '32px' }}>{testimonials[activeTestimonial].avatar}</span>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ margin: 0, fontWeight: '800', fontSize: '14.5px', color: T.text }}>{testimonials[activeTestimonial].name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: T.gold, fontWeight: '600' }}>{testimonials[activeTestimonial].uni}</p>
                </div>
              </div>
            </div>

            {/* Testimonials Dots Indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: activeTestimonial === i ? T.gold : T.border,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                />
              ))}
            </div>
          </ScrollObserver>

        </div>
      </section>

      {/* ── CONTACT US SECTION ── */}
      <section ref={ctaRef} style={{ padding: '100px 24px', backgroundColor: T.bgSec, transition: 'background-color 0.6s' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollObserver>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
              
              {/* Left Column: Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,120,0,0.1)', border: `1px solid ${T.gold}`, borderRadius: '20px', padding: '6px 16px', marginBottom: '16px', width: 'fit-content' }}>
                  <span style={{ color: T.gold, fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>✦ CONNECT WITH US</span>
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '900', color: T.text, letterSpacing: '-1px', margin: '0 0 20px', lineHeight: 1.15 }}>
                  Let's Shape Your <span style={{ color: T.gold }}>Career Pathway</span> Together
                </h2>
                <p style={{ fontSize: '15px', color: T.textSub, lineHeight: '1.7', marginBottom: '40px' }}>
                  Have questions about our AI assessment engines, university matching criteria, or roadmap milestones? Reach out directly and our guidance counselors will assist you.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,120,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: T.gold }}>✉️</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: T.textSub, fontWeight: '700', letterSpacing: '0.5px' }}>Support Email</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600', color: T.text }}>support@careerguidance.ai</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,120,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: T.gold }}>📍</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: T.textSub, fontWeight: '700', letterSpacing: '0.5px' }}>Headquarters</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600', color: T.text }}>NUST Campus, H-12, Islamabad, PK</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,120,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: T.gold }}>🕒</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: T.textSub, fontWeight: '700', letterSpacing: '0.5px' }}>Working Hours</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600', color: T.text }}>Mon - Fri, 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact form box */}
              <div style={{
                background: darkMode ? 'rgba(25, 25, 28, 0.6)' : '#FFFFFF',
                border: `1.5px solid ${T.border}`,
                borderRadius: '32px',
                padding: '40px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
                color: T.text
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px', color: T.text }}>Send Us A Message</h3>
                <p style={{ fontSize: '14px', color: T.textSub, marginBottom: '30px', lineHeight: 1.5 }}>
                  Drop your inquiry below and we'll get back to you within 24 hours.
                </p>

                {contactStatus === 'success' ? (
                  <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    border: '1.5px solid rgba(34, 197, 94, 0.3)',
                    textAlign: 'center',
                    animation: 'fadeInUpAnim 0.3s ease'
                  }}>
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>🎉</div>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#22c55e', margin: '0 0 8px 0' }}>Message Dispatched!</h4>
                    <p style={{ fontSize: '13.5px', color: T.textSub, margin: 0, lineHeight: 1.6 }}>
                      Thank you for contacting us! Your inquiry has been submitted successfully. Our guidance team will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setContactStatus(null)} 
                      style={{ marginTop: '16px', padding: '8px 18px', borderRadius: '8px', background: 'none', border: '1px solid #22c55e', color: '#22c55e', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!contactName || !contactEmail || !contactMsg) return;
                    setContactStatus('loading');
                    try {
                      await API.post('/feedback', {
                        name: contactName,
                        email: contactEmail,
                        comment: contactMsg,
                        rating: 5,
                        category: 'Contact Us Inquiry'
                      });
                    } catch (err) {}
                    setContactStatus('success');
                    setContactName('');
                    setContactEmail('');
                    setContactMsg('');
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: T.textSub, marginBottom: '6px', letterSpacing: '0.5px' }}>Name</label>
                      <input 
                        required 
                        placeholder="Your name" 
                        type="text" 
                        value={contactName} 
                        onChange={e => setContactName(e.target.value)} 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: `1.5px solid ${T.border}`, background: darkMode ? '#101012' : '#FAFAF7', color: T.text, outline: 'none', transition: 'border-color 0.3s' }} 
                        onFocus={e => e.target.style.borderColor = T.gold}
                        onBlur={e => e.target.style.borderColor = T.border}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: T.textSub, marginBottom: '6px', letterSpacing: '0.5px' }}>Email Address</label>
                      <input 
                        required 
                        placeholder="you@example.com" 
                        type="email" 
                        value={contactEmail} 
                        onChange={e => setContactEmail(e.target.value)} 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: `1.5px solid ${T.border}`, background: darkMode ? '#101012' : '#FAFAF7', color: T.text, outline: 'none', transition: 'border-color 0.3s' }} 
                        onFocus={e => e.target.style.borderColor = T.gold}
                        onBlur={e => e.target.style.borderColor = T.border}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: T.textSub, marginBottom: '6px', letterSpacing: '0.5px' }}>Message</label>
                      <textarea 
                        required 
                        placeholder="Write your inquiry or question here..." 
                        rows={4} 
                        value={contactMsg} 
                        onChange={e => setContactMsg(e.target.value)} 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: `1.5px solid ${T.border}`, background: darkMode ? '#101012' : '#FAFAF7', color: T.text, outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} 
                        onFocus={e => e.target.style.borderColor = T.gold}
                        onBlur={e => e.target.style.borderColor = T.border}
                      />
                    </div>
                    <button type="submit" disabled={contactStatus === 'loading'} className="btn-gold" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '14.5px', fontWeight: '750', marginTop: '10px', opacity: contactStatus === 'loading' ? 0.7 : 1 }}>
                      {contactStatus === 'loading' ? 'Sending Message...' : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </ScrollObserver>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        backgroundColor: darkMode ? '#121214' : '#EBEBE5',
        padding: '50px 24px 40px',
        borderTop: `1px solid ${T.border}`,
        textAlign: 'center',
        transition: 'background-color 0.6s'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
            <div style={{ width: '28px', height: '28px', background: T.gold, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#1C1C1E' }}>🎓</div>
            <span style={{ fontWeight: '800', fontSize: '15px', color: T.text }}>Career<span style={{ color: T.gold }}>Guidance</span></span>
          </div>
          <p style={{ fontSize: '13px', color: T.textSub, margin: '0 0 10px 0' }}>© 2026 Student Career Guidance System. Developed with modern React and interactive visual controls.</p>
          <p style={{ fontSize: '12px', color: T.gold, margin: 0, fontWeight: '700' }}>Precision AI Recommendation Console v1.2</p>
        </div>
      </footer>

      {/* ── CUSTOM LOGIN REQUIRED MODAL (Replaces ugly browser alert) ── */}
      {loginRequiredItem && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          animation: 'fadeInUpAnim 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <div style={{
            width: '100%', maxWidth: '440px',
            backgroundColor: darkMode ? '#0d0a1a' : '#ffffff',
            border: '1.5px solid rgba(255,120,0,0.35)',
            borderRadius: '24px',
            padding: '32px 28px',
            textAlign: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            color: darkMode ? '#ffffff' : '#0F1117',
            position: 'relative'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,120,0,0.2), rgba(255,85,0,0.1))',
              border: '2px solid #FF7800',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', margin: '0 auto 18px',
              boxShadow: '0 8px 24px rgba(255,120,0,0.3)',
              animation: 'pulseGlowOrg 2s infinite'
            }}>
              🔒
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 10px', color: darkMode ? '#ffffff' : '#0F1117', fontFamily: "'Outfit', sans-serif" }}>
              Authentication Required
            </h3>
            <p style={{ fontSize: '14px', color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(15,17,23,0.65)', lineHeight: 1.6, margin: '0 0 26px' }}>
              Please sign in or register an account to access <strong>{loginRequiredItem}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => { setLoginRequiredItem(null); onLogin(); }}
                style={{
                  flex: 1, padding: '12px 18px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #FF7800, #FF5500)',
                  color: '#fff', border: 'none', fontWeight: '800', fontSize: '13.5px',
                  cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,120,0,0.35)',
                  transition: 'all 0.2s'
                }}
              >
                Sign In Now →
              </button>
              <button
                onClick={() => setLoginRequiredItem(null)}
                style={{
                  padding: '12px 20px', borderRadius: '14px',
                  background: 'transparent',
                  color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(15,17,23,0.5)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)',
                  fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
