import React, { useState, useEffect, useRef } from 'react';
import Dashboard from './Dashboard';
import Register from './Register';
import AdminLogin from './AdminLogin';
import API from './api';
import LandingPage from './LandingPage';

// CountUp Component for premium stat counting
const CountUp = ({ value, duration = 1500 }) => {
  const numericVal = parseInt(value, 10);
  const isNumeric = !isNaN(numericVal);
  const [count, setCount] = useState(isNumeric ? 0 : value);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isNumeric) return;

    let start = 0;
    const end = numericVal;
    if (start === end) return;

    const incrementTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
};

// ── ORIGINAL GALAXY BRAIN CANVAS (With transparent background so video shows through) ──
function GalaxyBrainCanvas() {
  return null;
}
// eslint-disable-next-line no-unused-vars
const DummyGalaxyBrainCanvas = ({ brainXPercent = 0.68, brainYPercent = 0.48, isLightMode = false }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, t = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars Twinkle Nodes
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Brain orbit nodes
    const rings = [
      { rx: 200, ry: 80,  tilt: 0.25,  speed: 0.004,  icon: '🎓', angle: 0 },
      { rx: 200, ry: 80,  tilt: 0.25,  speed: 0.004,  icon: '🚀', angle: Math.PI },
      { rx: 185, ry: 65,  tilt: -0.3,  speed: -0.003, icon: '💼', angle: Math.PI/2 },
      { rx: 185, ry: 65,  tilt: -0.3,  speed: -0.003, icon: '📊', angle: Math.PI*1.5 },
      { rx: 220, ry: 55,  tilt: 1.1,   speed: 0.005,  icon: '🤖', angle: Math.PI/3 },
      { rx: 220, ry: 55,  tilt: 1.1,   speed: 0.005,  icon: '💡', angle: Math.PI*1.3 },
      { rx: 170, ry: 90,  tilt: 0.7,   speed: -0.004, icon: '📈', angle: Math.PI*0.7 },
      { rx: 170, ry: 90,  tilt: 0.7,   speed: -0.004, icon: '🧠', angle: Math.PI*1.7 },
    ];

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      if (W === 0 || H === 0) return;
      ctx.clearRect(0, 0, W, H);

      const cx = W * brainXPercent, cy = H * brainYPercent;

      // ── GALAXY BACKGROUND ──
      // Solid background color is removed here to keep canvas transparent and reveal the cinematic video!

      // Nebula clouds
      [[cx + 30, cy - 80, 280, isLightMode ? 'rgba(255,120,0,0.06)' : 'rgba(80,30,120,0.12)'],
       [cx - 100, cy + 50, 200, isLightMode ? 'rgba(255,160,50,0.05)' : 'rgba(30,60,120,0.1)'],
       [cx + 100, cy + 100, 160, isLightMode ? 'rgba(255,120,0,0.04)' : 'rgba(100,20,80,0.09)'],
       [cx - 200, cy - 120, 220, isLightMode ? 'rgba(255,160,50,0.04)' : 'rgba(20,40,100,0.08)'],
      ].forEach(([x, y, r, color]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Stars twinkle
      stars.forEach(s => {
        const alpha = s.alpha * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode ? `rgba(255,120,0,${alpha * 0.3})` : `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      // Orange tinted stars
      Array.from({ length: 15 }, (_, i) => ({
        x: ((i * 137) % 100) / 100,
        y: ((i * 97) % 100) / 100,
        r: 1.2,
      })).forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode ? `rgba(255,100,0,${0.3 * (0.4 + 0.3 * Math.sin(t * 0.015))})` : `rgba(255,160,50,${0.4 + 0.3 * Math.sin(t * 0.015)})`;
        ctx.fill();
      });

      // ── BRAIN ANIMATION ──
      // Big outer glow
      [[300,'rgba(255,120,0,0.06)'],[200,'rgba(255,80,0,0.08)'],[120,'rgba(255,140,0,0.1)']].forEach(([r, c]) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, c); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });

      // Orbit ring paths
      rings.forEach((ring, i) => {
        if (i % 2 !== 0) return;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,160,50,${0.15 + 0.05 * Math.sin(t * 0.02 + i)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      });

      // Brain glow layers
      [[140,0.08],[100,0.14],[70,0.22],[50,0.35]].forEach(([r, a]) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(255,160,50,${a})`);
        g.addColorStop(0.6, `rgba(255,100,0,${a*0.4})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Brain circle
      ctx.beginPath(); ctx.arc(cx, cy, 68, 0, Math.PI * 2);
      const bf = ctx.createRadialGradient(cx-15, cy-15, 5, cx, cy, 68);
      bf.addColorStop(0, 'rgba(255,180,60,0.5)');
      bf.addColorStop(0.5, 'rgba(255,100,0,0.25)');
      bf.addColorStop(1, 'rgba(60,20,0,0.15)');
      ctx.fillStyle = bf; ctx.fill();
      ctx.strokeStyle = `rgba(255,150,0,${0.5 + 0.2 * Math.sin(t * 0.03)})`;
      ctx.lineWidth = 2.5; ctx.stroke();

      // Brain emoji with glow
      ctx.save();
      ctx.shadowColor = '#FF7800'; ctx.shadowBlur = 25;
      ctx.font = `${48 + 2 * Math.sin(t * 0.02)}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🧠', cx, cy);
      ctx.restore();

      // Orbiting icon nodes
      rings.forEach((ring) => {
        ring.angle += ring.speed;
        const cosT = ring.tilt;
        const nx = cx + Math.cos(ring.angle) * ring.rx * Math.cos(cosT * 0.6) - Math.sin(ring.angle) * ring.ry * Math.sin(cosT * 0.4);
        const ny = cy + Math.cos(ring.angle) * ring.rx * Math.sin(cosT * 0.6) + Math.sin(ring.angle) * ring.ry * Math.cos(cosT * 0.4);

        // Connecting line
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny);
        ctx.strokeStyle = `rgba(255,150,50,${0.1 + 0.05 * Math.sin(t * 0.04)})`;
        ctx.lineWidth = 0.8; ctx.stroke();

        // Node glow
        const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, 26);
        ng.addColorStop(0, 'rgba(255,120,0,0.45)');
        ng.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(nx, ny, 26, 0, Math.PI * 2);
        ctx.fillStyle = ng; ctx.fill();

        // Node circle
        ctx.beginPath(); ctx.arc(nx, ny, 16, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode ? '#ffffff' : 'rgba(5,3,15,0.9)';
        ctx.strokeStyle = `rgba(255,150,0,${0.6 + 0.2 * Math.sin(t*0.05)})`;
        ctx.lineWidth = 1.8; ctx.fill(); ctx.stroke();

        // Icon
        ctx.save();
        if (!isLightMode) {
          ctx.shadowColor = '#FF7800'; ctx.shadowBlur = 8;
        }
        ctx.font = '12px serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = isLightMode ? '#1E293B' : '#fff';
        ctx.fillText(ring.icon, nx, ny);
        ctx.restore();
      });

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize); 
    };
  }, [brainXPercent, brainYPercent, isLightMode]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

// ── FLOATING SPARKLES ──
const FloatingSparkles = () => {
  const sparkleIcons = ['✨', '⭐', '💫', '🎓'];
  
  const sparkles = useRef(
    Array.from({ length: 10 }).map((_, idx) => ({
      left: 5 + (idx * 9) + Math.random() * 5,
      icon: sparkleIcons[idx % sparkleIcons.length],
      delay: idx * 0.8,
      duration: 7 + Math.random() * 4,
    }))
  ).current;

  const dots = useRef(
    Array.from({ length: 15 }).map((_, idx) => ({
      left: Math.random() * 92 + 4,
      top: Math.random() * 92 + 4,
      delay: Math.random() * 3,
    }))
  ).current;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {sparkles.map((sparkle, idx) => (
        <div
          key={`sparkle-${idx}`}
          style={{
            position: 'absolute',
            left: `${sparkle.left}%`,
            bottom: '-30px',
            fontSize: `${18 + Math.random() * 8}px`,
            pointerEvents: 'none',
            animation: `riseSparkle ${sparkle.duration}s linear infinite`,
            animationDelay: `${sparkle.delay}s`,
            opacity: 0,
          }}
        >
          {sparkle.icon}
        </div>
      ))}

      {dots.map((dot, idx) => (
        <div
          key={`dot-${idx}`}
          style={{
            position: 'absolute',
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            fontSize: '12px',
            color: '#FF7800',
            opacity: 0.35,
            pointerEvents: 'none',
            animation: 'twinkleStatic 3s ease-in-out infinite',
            animationDelay: `${dot.delay}s`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
};

const Navbar = ({ view, setView, darkMode, setDarkMode, theme }) => {
  if (view === 'welcome-dashboard' || view === 'admin-dashboard' || view === 'admin') return null;
  const brandGradient = 'linear-gradient(135deg, #FF7800, #FF5500)';
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '66px',
        background: darkMode ? 'rgba(5, 3, 15, 0.75)' : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${darkMode ? 'rgba(255, 120, 0, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 80px)',
        zIndex: 1000,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        boxSizing: 'border-box',
      }}
    >
      <div 
        onClick={() => setView('landing')}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            background: brandGradient,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 4px 14px rgba(255, 120, 0, 0.35)',
          }}
        >
          🎓
        </div>
        <span
          style={{
            fontSize: '19px',
            fontWeight: '800',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
            color: darkMode ? '#ffffff' : '#0F1117',
          }}
        >
          Career<span style={{
            background: brandGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Guidance</span>
        </span>
      </div>

      {view === 'landing' && (
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {[
            { label: 'Home', href: '#' },
            { label: 'Features', href: '#' },
            { label: 'Contact', href: '#' }
          ].map((link, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '14.5px',
                fontWeight: '600',
                color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 17, 23, 0.7)',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.target.style.color = '#FF7800'}
              onMouseLeave={e => e.target.style.color = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 17, 23, 0.7)'}
            >
              {link.label}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255, 120, 0, 0.1)'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {view !== 'dashboard' && (
          <button
            onClick={() => setView(view === 'login' ? 'landing' : 'login')}
            className="btn-primary"
            style={{
              padding: '10px 22px',
              borderRadius: '50px',
              fontSize: '13.5px',
              fontWeight: '700',
            }}
          >
            {view === 'login' ? 'Back to Home' : 'Portal Sign In'}
          </button>
        )}
      </div>
    </nav>
  );
};

const Login = () => {
  const [view, setView] = useState('landing');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  const T = {
    light: {
      bgMain: '#FAF8F5',
      bgSection: '#ffffff',
      bgCard: '#ffffff',
      text: '#1A1A2E',
      textSub: '#555555',
      border: '#E8D5A3',
      navBg: 'rgba(255, 255, 255, 0.75)',
      inputBg: '#ffffff'
    },
    dark: {
      bgMain: '#05030F',
      bgSection: '#0A0818',
      bgCard: 'rgba(255, 255, 255, 0.03)',
      text: '#ffffff',
      textSub: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 120, 0, 0.18)',
      navBg: 'rgba(5, 3, 15, 0.88)',
      inputBg: '#100C20'
    }
  };

  const theme = darkMode ? T.dark : T.light;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Floating label active states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Forgot password modal views
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Parallax scroll variable
  const [scrollY, setScrollY] = useState(0);

  // Carousel slider state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Feature hover references
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);

  // Figurine Toonhub Carousel State & Logic
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselAnimating, setCarouselAnimating] = useState(false);
  const [carouselMobile, setCarouselMobile] = useState(window.innerWidth < 640);

  const CAROUSEL_IMAGES = [
    { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
    { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
    { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
    { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
  ];

  useEffect(() => {
    CAROUSEL_IMAGES.forEach(img => {
      const newImg = new Image();
      newImg.src = img.src;
    });

    const handleResize = () => {
      setCarouselMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateCarousel = (direction) => {
    if (carouselAnimating) return;
    setCarouselAnimating(true);
    if (direction === 'next') {
      setCarouselIndex(prev => (prev + 1) % 4);
    } else {
      setCarouselIndex(prev => (prev + 3) % 4);
    }
    setTimeout(() => {
      setCarouselAnimating(false);
    }, 650);
  };

  const featuresRef = useRef(null);
  const footerRef = useRef(null);

  // Sync theme configurations on state change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Handle scroll trigger for parallax & reveal animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver reveal effect hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  // Testimonial auto scroll effect loop
  useEffect(() => {
    if (view !== 'landing') return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, [view]);

  // Auto session verification on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setView('dashboard');
    }
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill out all credentials fields.');
      return;
    }
    setLoading(true);

    try {
      const res = await API.post('/login', { email, password });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('isDemo', 'false');
        setView('welcome-dashboard');
      } else {
        alert('Invalid email or password!');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errMsg = err.response?.data?.message || 'Invalid email or password!';
      alert(errMsg);
    }
    setLoading(false);
  };

  const handleSocialLogin = (platform) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('token', `mock-${platform}-token-xyz`);
      localStorage.setItem('user', JSON.stringify({ email: `demo-${platform}@example.com`, name: `Social ${platform} User` }));
      setView('welcome-dashboard');
      setLoading(false);
    }, 1200);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSuccess(true);
    }, 1500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    alert(`Thank you! '${newsletterEmail}' has been successfully subscribed to our newsletter pipeline.`);
    setNewsletterEmail('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setView('landing');
  };

  // Rendering Functions
  const renderLanding = () => {
    const testimonials = [
      { name: 'Ayesha Khan', role: 'BSCS Student, NUST', text: 'The AI recommendations pointed me toward cloud engineering. The roadmaps are incredibly detailed and saved me months of research!', stars: 5 },
      { name: 'Zain Ahmed', role: 'Software Engineer, Systems Ltd', text: 'Used CareerGuidance to switch from QA to DevOps. The skill assessment pinpointed my gaps, and the target goals kept me accountable.', stars: 5 },
      { name: 'M. Ali', role: 'FSc Pre-Engineering Student', text: 'As a high school graduate, I was confused about university admissions. The university database and recommendation engine made decisions simple.', stars: 5 }
    ];

    return (
      <>
        {/* Cinematic Video Hero Layout */}
        <div
          style={{
            position: 'relative',
            minHeight: 'calc(100vh - 66px)',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '0 clamp(24px, 6vw, 100px)',
            boxSizing: 'border-box',
          }}
        >
          <GalaxyBrainCanvas brainXPercent={0.68} brainYPercent={0.48} />
          <FloatingSparkles />

          {/* Parallax Content Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '560px',
              transform: `translateY(${scrollY * 0.15}px)`,
              animation: 'fadeInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: '40px 0',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(255, 120, 0, 0.15)',
                border: '1px solid rgba(255, 120, 0, 0.35)',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#FF7800',
                marginBottom: '24px',
              }}
            >
              🇵🇰 Pakistan's #1 AI Career Platform
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: '900',
                color: '#ffffff',
                lineHeight: 1.1,
                margin: '0 0 20px 0',
                fontFamily: 'var(--font-display)',
              }}
            >
              Shape Your Career<br />
              With <span style={{
                background: 'var(--gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255, 120, 0, 0.35)',
              }}>AI Guidance</span>
            </h1>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: '16px',
                lineHeight: 1.75,
                maxWidth: '480px',
                margin: '0 0 36px 0',
              }}
            >
              Discover your perfect career path with intelligent recommendations, personalized roadmaps, and real-time skill assessments tailored for Pakistani students.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setView('login')}
                className="btn-primary"
                style={{ borderRadius: '50px', padding: '15px 34px', fontSize: '15px' }}
              >
                Get Started Free →
              </button>
              <button
                onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
                style={{ borderRadius: '50px', padding: '15px 34px', fontSize: '15px', borderColor: 'rgba(255,255,255,0.25)', color: '#ffffff' }}
              >
                Explore Features
              </button>
            </div>

            {/* Stats countups in a single horizontal row */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', flexWrap: 'wrap', marginTop: '20px' }}>
              {[
                { value: '500+', label: 'STUDENTS ENROLLED' },
                { value: '50+', label: 'CAREERS CATALOGED' },
                { value: '96%', label: 'MATCH ACCURACY RATE' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    animation: 'countUp 0.6s ease-out forwards',
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: '34px',
                      fontWeight: '900',
                      color: '#ffffff',
                      fontFamily: 'var(--font-display)',
                      lineHeight: '1.1',
                    }}
                  >
                    <CountUp value={stat.value} />
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '6px', whiteSpace: 'nowrap' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features grid */}
        <section
          ref={featuresRef}
          style={{
            background: 'var(--bg-secondary)',
            padding: '90px 40px',
            boxSizing: 'border-box',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                Everything You Need to Plan Your <span style={{
                  background: 'var(--gradient-accent)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Career</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                A dynamic career system leveraging deep machine evaluations to outline your potential matches.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                { icon: '🤖', title: 'AI Recommendations', desc: 'LLM-powered recommendations calibrated based on your academic profile and interests.' },
                { icon: '🗺️', title: 'Personalized Roadmaps', desc: 'Interactive step-by-step tracks highlighting courses, projects and targets.' },
                { icon: '📊', title: 'Skill Assessment', desc: 'Detailed assessments to evaluate coding, logical, and business aptitudes.' },
                { icon: '🏫', title: 'Universities Database', desc: 'Find top Pakistani educational institutes, fee ranges and admission linkages.' },
                { icon: '🎯', title: 'Goal Trajectory', desc: 'Configure milestones and target dates, tracking progress scores on a live board.' },
                { icon: '💬', title: 'Feedback Node', desc: 'Submit system reviews or access live admin suggestions dashboard panel.' }
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="reveal-on-scroll"
                  style={{
                    background: 'var(--bg-primary)',
                    border: `1px solid ${hoveredCard === idx ? 'var(--accent-start)' : 'var(--border-color)'}`,
                    borderRadius: '20px',
                    padding: '32px',
                    cursor: 'pointer',
                    transform: hoveredCard === idx ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: hoveredCard === idx ? 'var(--shadow)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      background: 'var(--gradient-accent)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      marginBottom: '20px',
                      boxShadow: '0 6px 15px rgba(255, 120, 0, 0.25)',
                    }}
                  >
                    {feat.icon}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          style={{
            background: 'var(--bg-primary)',
            padding: '90px 40px',
            boxSizing: 'border-box',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                Start in <span style={{
                  background: 'var(--gradient-accent)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>4 Simple Steps</span>
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '28px',
              }}
            >
              {[
                { step: '01', title: 'Configure Account', desc: 'Create profile nodes, mapping degree parameters and high school GPAs.' },
                { step: '02', title: 'Complete Quiz', desc: 'Perform aptitude evaluations and rate core interest preferences.' },
                { step: '03', title: 'Process AI Recommendations', desc: 'Unlock curated career trajectories scored specifically for your matrix.' },
                { step: '04', title: 'Deploy Roadmaps', desc: 'Track curriculum steps, add timeline milestones, and build project arrays.' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="reveal-on-scroll"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${hoveredStep === idx ? 'var(--accent-start)' : 'var(--border-color)'}`,
                    borderRadius: '20px',
                    padding: '32px',
                    textAlign: 'center',
                    transform: hoveredStep === idx ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: hoveredStep === idx ? 'var(--shadow)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div
                    style={{
                      fontSize: '48px',
                      fontWeight: '800',
                      background: 'var(--gradient-accent)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      opacity: 0.3,
                      fontFamily: 'monospace',
                      marginBottom: '12px',
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Auto-scroll Carousel */}
        <section
          style={{
            background: 'var(--bg-secondary)',
            padding: '90px 40px',
            boxSizing: 'border-box',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '45px' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
                Success Stories
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                See how other student thinkers have mapped out their paths.
              </p>
            </div>

            {/* Testimonials Slider */}
            <div
              className="reveal-on-scroll"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: 'var(--shadow)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                key={activeTestimonial}
                style={{
                  animation: 'viewAnim 0.5s ease-out',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: '#F59E0B', fontSize: '20px', marginBottom: '16px' }}>
                  {'★'.repeat(testimonials[activeTestimonial].stars)}
                </div>
                <p style={{ fontSize: '16px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '24px' }}>
                  "{testimonials[activeTestimonial].text}"
                </p>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--accent-start)', margin: '0 0 4px 0' }}>
                  {testimonials[activeTestimonial].name}
                </h4>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                  {testimonials[activeTestimonial].role}
                </span>
              </div>

              {/* Slider dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: activeTestimonial === idx ? 'var(--accent-start)' : 'var(--border-color)',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pulsing Gradient CTA Banner */}
        <section
          style={{
            background: 'var(--bg-primary)',
            padding: '90px 40px',
            boxSizing: 'border-box',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div
              className="reveal-on-scroll"
              style={{
                position: 'relative',
                padding: '64px 40px',
                background: 'linear-gradient(-45deg, #0F0820, #080512, #FF7800, #FF5500)',
                backgroundSize: '400% 400%',
                animation: 'shiftBackground 12s ease infinite',
                borderRadius: '26px',
                textAlign: 'center',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(255, 120, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ position: 'relative', zIndex: 5 }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎓</div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '900', color: '#ffffff', margin: '0 0 16px 0' }}>
                  Ready to Plan Your Perfect Career?
                </h2>
                <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                  Join thousands of Pakistani student thinkers configuring their roadmap trajectories today. It's completely free.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setView('login')}
                    className="btn-primary"
                    style={{ background: '#ffffff', color: '#0F1117', padding: '14px 32px', borderRadius: '50px', boxShadow: 'none' }}
                  >
                    Start Free Now →
                  </button>
                  <button
                    onClick={() => setView('login')}
                    className="btn-outline"
                    style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', padding: '14px 32px', borderRadius: '50px' }}
                  >
                    Portal Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Organized Columns and Newsletter Input */}
        <footer
          ref={footerRef}
          style={{
            background: '#04020C',
            padding: '80px 40px 30px',
            color: '#ffffff',
            borderTop: '1px solid rgba(255, 120, 0, 0.15)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '40px',
                marginBottom: '50px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'var(--gradient-accent)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}
                  >
                    🎓
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                    Career<span style={{ color: '#FF7800' }}>Guidance</span>
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.6, margin: 0 }}>
                  Intelligent career planning pipelines leveraging state-of-the-art assessments to steer student futures in Pakistan.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#FF7800', margin: '0 0 20px 0' }}>
                  Features
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  {['AI Recommendations', 'Skill Assessments', 'Interactive Roadmaps', 'University Database'].map(f => (
                    <span
                      key={f}
                      onClick={() => setView('login')}
                      style={{ color: 'rgba(255,255,255,0.65)', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#FF7800'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact column */}
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#FF7800', margin: '0 0 20px 0' }}>
                  Contact Info
                </h4>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '0 0 8px 0' }}>
                  ✉️ support@careerguidance.pk
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '0 0 8px 0' }}>
                  📍 Islamabad, Pakistan
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                  🚀 Final Year Project 2026
                </p>
              </div>

              {/* Newsletter columns */}
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#FF7800', margin: '0 0 20px 0' }}>
                  Newsletter Pipeline
                </h4>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', marginBottom: '14px', lineHeight: 1.5 }}>
                  Subscribe to receive system features updates and admissions schedules alerts.
                </p>
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#ffffff',
                      fontSize: '13px',
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '10px 16px', borderRadius: '8px', boxShadow: 'none' }}
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '24px',
                textAlign: 'center',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              &copy; {new Date().getFullYear()} CareerGuidance PK. Developed as a secure smart portal.
            </div>
          </div>
        </footer>
      </>
    );
  };

  const renderLogin = () => {
    return (
      <div
        style={{
          display: 'flex',
          minHeight: 'calc(100vh - 66px)',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          background: darkMode ? '#05030F' : '#ffffff',
          transition: 'all 0.3s ease',
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        {/* Left Side: Canvas + Why choose us overlay list */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', boxSizing: 'border-box' }}>
          <GalaxyBrainCanvas brainXPercent={0.5} brainYPercent={0.5} isLightMode={!darkMode} />
          <FloatingSparkles />
          
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '440px', animation: 'fadeInLeft 0.8s ease', margin: 'auto 0' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: darkMode ? '#ffffff' : '#1E293B', fontFamily: "'Outfit', sans-serif", marginBottom: '28px' }}>
              Evaluate Your <span style={{
                background: 'var(--gradient-accent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Trajectory</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                '🤖 AI-Powered Career Recommendations',
                '🗺️ 50+ Career Paths & Interactive Roadmaps',
                '📊 Real-Time Skill & Aptitude Assessment',
                '🏫 Complete Universities Databases'
              ].map((text, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: darkMode ? '#111827' : '#ffffff',
                    border: darkMode ? '1px solid rgba(255, 120, 0, 0.25)' : '1px solid rgba(255, 120, 0, 0.15)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: darkMode ? '#F3F4F6' : '#1E293B',
                    fontSize: '15px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(255, 120, 0, 0.05)',
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2px Divider */}
        <div style={{ width: '2px', background: 'linear-gradient(180deg, transparent, var(--accent-start), transparent)', position: 'relative', zIndex: 5 }} />

        {/* Right Side: Frosted Glass Login Panel */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            boxSizing: 'border-box',
          }}
        >
          {/* Frosted Glass Login Card */}
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              animation: 'viewAnim 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              background: darkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.92)',
              border: darkMode ? '1px solid rgba(255, 120, 0, 0.25)' : '1px solid rgba(0, 0, 0, 0.06)',
              borderRadius: '24px',
              backdropFilter: 'blur(16px)',
              padding: '40px',
              boxSizing: 'border-box',
              boxShadow: darkMode ? '0 10px 45px rgba(0,0,0,0.5)' : '0 10px 40px rgba(255,120,0,0.08)',
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '30px', fontWeight: '900', color: darkMode ? '#ffffff' : '#1E293B', fontFamily: "'Outfit', sans-serif", marginBottom: '8px' }}>
                Welcome Back
              </h2>
              <p style={{ fontSize: '14.5px', color: darkMode ? 'rgba(255, 255, 255, 0.65)' : '#475569', margin: 0 }}>
                Sign in to continue your career journey
              </p>
            </div>

            {/* Floating input Email */}
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={{
                  width: '100%',
                  padding: '20px 16px 6px 16px',
                  borderRadius: '12px',
                  border: emailFocused ? '1.5px solid #FF7800' : (darkMode ? '1.5px solid rgba(255, 255, 255, 0.15)' : '1.5px solid rgba(0, 0, 0, 0.08)'),
                  backgroundColor: darkMode ? '#1F2937' : '#FFFDFB',
                  color: darkMode ? '#ffffff' : '#1E293B',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  boxShadow: emailFocused ? '0 0 10px rgba(255, 120, 0, 0.25)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: (emailFocused || email) ? '4px' : '14px',
                  fontSize: (emailFocused || email) ? '11px' : '14px',
                  color: (emailFocused || email) ? '#FF7800' : (darkMode ? 'rgba(255, 255, 255, 0.45)' : '#64748B'),
                  transition: 'all 0.2s ease',
                  pointerEvents: 'none',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}
              >
                Email Address
              </label>
            </div>

            {/* Floating input Password */}
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onKeyPress={e => e.key === 'Enter' && handleSignIn()}
                style={{
                  width: '100%',
                  padding: '20px 16px 6px 16px',
                  borderRadius: '12px',
                  border: passwordFocused ? '1.5px solid #FF7800' : (darkMode ? '1.5px solid rgba(255, 255, 255, 0.15)' : '1.5px solid rgba(0, 0, 0, 0.08)'),
                  backgroundColor: darkMode ? '#1F2937' : '#FFFDFB',
                  color: darkMode ? '#ffffff' : '#1E293B',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  boxShadow: passwordFocused ? '0 0 10px rgba(255, 120, 0, 0.25)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: (passwordFocused || password) ? '4px' : '14px',
                  fontSize: (passwordFocused || password) ? '11px' : '14px',
                  color: (passwordFocused || password) ? '#FF7800' : (darkMode ? 'rgba(255, 255, 255, 0.45)' : '#64748B'),
                  transition: 'all 0.2s ease',
                  pointerEvents: 'none',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}
              >
                Password
              </label>
            </div>

            {/* Remember Me switch & forgot password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setRememberMe(!rememberMe)}
                  style={{
                    width: '38px',
                    height: '20px',
                    borderRadius: '20px',
                    background: rememberMe ? 'var(--gradient-accent)' : 'rgba(0,0,0,0.08)',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                  }}
                >
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      position: 'absolute',
                      top: '3px',
                      left: rememberMe ? '21px' : '3px',
                      transition: 'left 0.2s ease',
                    }}
                  />
                </button>
                <span style={{ fontSize: '13px', color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#475569', fontWeight: '600' }}>
                  Remember me
                </span>
              </div>

              <span
                onClick={() => setShowForgotModal(true)}
                style={{ fontSize: '13.5px', color: '#FF7800', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }}
              >
                Forgot Password?
              </span>
            </div>

            {/* Sign In CTA */}
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '16px',
                marginBottom: '16px',
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? (
                <div style={{ width: '18px', height: '18px', border: '2.5px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              ) : (
                'Sign In →'
              )}
            </button>

            {/* Demo Mode Button */}
            <button
              onClick={() => {
                localStorage.setItem('token', 'mock-demo-token');
                localStorage.setItem('user', JSON.stringify({ 
                  email: 'demo@guest.com', 
                  name: 'Guest User', 
                  university: 'Demo University', 
                  degree: 'BSCS' 
                }));
                localStorage.setItem('isDemo', 'true');
                setView('welcome-dashboard');
              }}
              style={{
                width: '100%',
                padding: '14px',
                background: 'transparent',
                color: '#FF7800',
                border: '2px solid #FF7800',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '20px',
                marginTop: '12px',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(255, 120, 0, 0.08)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >
              Demo Mode
            </button>

            {/* Social Logins */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
              <span style={{ fontSize: '12.5px', color: darkMode ? 'rgba(255,255,255,0.6)' : '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Social Sign In</span>
              <div style={{ flex: 1, height: '1px', background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => handleSocialLogin('Google')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: darkMode ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid rgba(0,0,0,0.08)',
                  borderRadius: '10px',
                  color: darkMode ? '#ffffff' : '#1E293B',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#FF7800';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,120,0,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.55 0 2.96.57 4.05 1.51l3.1-3.1C18.99 1.91 15.86 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c6.8 0 12.24-5.44 12.24-12.24 0-.75-.08-1.49-.24-2.21H12.24z"/>
                </svg>
                Google
              </button>
              <button
                onClick={() => handleSocialLogin('GitHub')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: darkMode ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid rgba(0,0,0,0.08)',
                  borderRadius: '10px',
                  color: darkMode ? '#ffffff' : '#1E293B',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#FF7800';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,120,0,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Switch view triggers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
              <p style={{ fontSize: '13px', color: darkMode ? 'rgba(255,255,255,0.75)' : '#475569' }}>
                Don't have an account?{' '}
                <span
                  onClick={() => setView('register')}
                  style={{ color: '#FF7800', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Create one
                </span>
              </p>

              <div
                onClick={() => setView('admin')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: 'rgba(255, 120, 0, 0.06)',
                  border: '1px solid rgba(255, 120, 0, 0.15)',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: '#FF7800',
                  fontWeight: '700',
                  textAlign: 'center',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 120, 0, 0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 120, 0, 0.06)'}
              >
                🛡️ Admin Portal Login →
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderWelcomeDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const studentName = user.name || 'Student';

    const getRoleStyles = (index) => {
      const isMobile = carouselMobile;
      const centerIdx = carouselIndex;
      const leftIdx = (carouselIndex + 3) % 4;
      const rightIdx = (carouselIndex + 1) % 4;
      const backIdx = (carouselIndex + 2) % 4;

      if (index === centerIdx) {
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : '0'
        };
      } else if (index === leftIdx) {
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%'
        };
      } else if (index === rightIdx) {
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%'
        };
      } else {
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%'
        };
      }
    };

    const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;
    const ghostWords = ['WELCOME', 'PLANNER', 'ROADMAP', 'FUTURE'];

    return (
      <div
        style={{
          backgroundColor: CAROUSEL_IMAGES[carouselIndex].bg,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: "'Inter', sans-serif",
          position: 'relative',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
          {/* Grain overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 50,
              opacity: 0.4,
              backgroundImage: `url("${grainSvg}")`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat'
            }}
          />

          {/* Giant ghost text */}
          <div
            style={{
              position: 'absolute',
              insetInline: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 2,
              top: '18%',
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(80px, 20vw, 340px)',
              fontWeight: '900',
              color: '#ffffff',
              opacity: 0.12,
              lineHeight: '1',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap'
            }}
          >
            WELCOME
          </div>

          {/* Top-left brand label */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: carouselMobile ? '16px' : '32px',
              zIndex: 60,
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: '#ffffff',
              opacity: 0.9,
              letterSpacing: '0.18em'
            }}
          >
            Welcome Dashboard
          </div>

          {/* Carousel figurines */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            {CAROUSEL_IMAGES.map((img, idx) => {
              const itemStyle = getRoleStyles(idx);
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    aspectRatio: '0.6 / 1',
                    willChange: 'transform, filter, opacity',
                    transition: 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                    ...itemStyle
                  }}
                >
                  <img
                    src={img.src}
                    alt={`Figurine ${idx + 1}`}
                    draggable="false"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'bottom center'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom-left text + nav buttons */}
          <div
            style={{
              position: 'absolute',
              bottom: carouselMobile ? '24px' : '80px',
              left: carouselMobile ? '16px' : '96px',
              zIndex: 60,
              maxWidth: '360px',
              color: '#ffffff'
            }}
          >
            <p
              style={{
                fontWeight: '800',
                textTransform: 'uppercase',
                fontSize: carouselMobile ? '18px' : '24px',
                margin: '0 0 12px 0',
                letterSpacing: '0.02em',
                lineHeight: '1.2'
              }}
            >
              WELCOME, {studentName.toUpperCase()}!
            </p>
            <p
              style={{
                display: carouselMobile ? 'none' : 'block',
                fontSize: '13.5px',
                opacity: 0.85,
                lineHeight: '1.6',
                margin: '0 0 20px 0'
              }}
            >
              Your personalized AI guidance portal compiles your academic profiles, assessment vectors, and skill configurations into a unified trajectory. Ready to discover your future?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => navigateCarousel('prev')}
                style={{
                  width: carouselMobile ? '48px' : '64px',
                  height: carouselMobile ? '48px' : '64px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '2px solid #ffffff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 150ms, background-color 150ms'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <button
                onClick={() => navigateCarousel('next')}
                style={{
                  width: carouselMobile ? '48px' : '64px',
                  height: carouselMobile ? '48px' : '64px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '2px solid #ffffff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 150ms, background-color 150ms'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          {/* Bottom-right link */}
          <div
            onClick={() => setView('dashboard')}
            style={{
              position: 'absolute',
              bottom: carouselMobile ? '24px' : '80px',
              right: carouselMobile ? '16px' : '40px',
              zIndex: 60,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'opacity 200ms',
              opacity: 0.95
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '1'}
            onMouseOut={e => e.currentTarget.style.opacity = '0.95'}
          >
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(20px, 4vw, 48px)',
                lineHeight: '1',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em'
              }}
            >
              ENTER DASHBOARD
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: carouselMobile ? '20px' : '32px',
                height: carouselMobile ? '20px' : '32px'
              }}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // Switch routing cases
  if (view === 'dashboard') {
    return <Dashboard onLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  if (view === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setView('register')}
        onTryDemo={() => {
          localStorage.setItem('token', 'demo-token-12345');
          localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Demo User', email: 'demo@test.com', role: 'student' }));
          localStorage.setItem('isDemo', 'true');
          setView('welcome-dashboard');
        }}
        onLogin={() => setView('login')}
        onAdminLogin={() => setView('admin')}
      />
    );
  }

  return (
    <div
      key={view}
      style={{
        backgroundColor: view === 'dashboard' ? theme.bgMain : 'transparent',
        color: theme.text,
        minHeight: '100vh',
        fontFamily: 'var(--font-body), sans-serif',
        transition: 'background-color 0.3s, color 0.3s',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Background loop cinematic video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
          pointerEvents: 'none',
          display: (view === 'login' || view === 'welcome-dashboard') ? 'none' : 'block',
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Lighter, clear overlay so cinematic background shows beautifully */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: (view === 'login' || view === 'welcome-dashboard') ? 'transparent' : 'rgba(5, 3, 15, 0.45)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* NAVBAR */}
      <Navbar view={view} setView={setView} darkMode={darkMode} setDarkMode={setDarkMode} theme={theme} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: (view === 'welcome-dashboard' || view === 'admin' ? '0px' : '66px'), position: 'relative', zIndex: 10 }}>
        {view === 'landing' && renderLanding()}
        {view === 'login' && renderLogin()}
        {view === 'welcome-dashboard' && renderWelcomeDashboard()}

        {view === 'register' && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            background: darkMode 
              ? 'linear-gradient(135deg, #0F1117 0%, #1A1D2E 50%, #0D0A1A 100%)' 
              : 'linear-gradient(135deg, #FAF8F5 0%, #F0EDE6 100%)',
            transition: 'background 0.3s ease',
          }}>
            <Register onRegister={() => setView('login')} darkMode={darkMode} />
          </div>
        )}

        {view === 'admin' && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            background: darkMode 
              ? 'linear-gradient(45deg, #0F1117, #1A1D2E, #FF7800, #FF5500)' 
              : 'linear-gradient(45deg, #F8F9FA, #E9ECEF, #FF7800, #FF5500)',
            backgroundSize: '400% 400%',
            animation: 'shiftBackground 16s ease infinite',
          }}>
            <AdminLogin onBackToStudent={() => setView('login')} darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        )}
      </div>

      {/* Interactive Forgot Password Modal Popup */}
      {showForgotModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'viewAnim 0.3s ease-out',
          }}
        >
          <div
            style={{
              background: '#1A1D2E',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '40px',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              position: 'relative',
            }}
          >
            <span
              onClick={() => { setShowForgotModal(false); setForgotSuccess(false); setForgotEmail(''); }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              ✕
            </span>

            {!forgotSuccess ? (
              <form onSubmit={handleForgotSubmit}>
                <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
                  Reset Password
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '24px' }}>
                  Enter your email address and we will dispatch a verification recovery link.
                </p>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      backgroundColor: 'rgba(15,17,23,0.4)',
                      color: '#ffffff',
                      fontSize: '15px',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="btn-primary"
                  style={{ width: '100%', borderRadius: '10px', padding: '14px', fontSize: '15px' }}
                >
                  {forgotLoading ? (
                    <div style={{ width: '18px', height: '18px', border: '2.5px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                  ) : (
                    'Send Reset Link →'
                  )}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
                <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff', marginBottom: '12px' }}>
                  Check Your Inbox
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '28px' }}>
                  We have successfully generated a reset credential token for <b style={{ color: '#FF7800' }}>{forgotEmail}</b>. Please check your spam folder if it doesn't arrive shortly.
                </p>
                <button
                  onClick={() => { setShowForgotModal(false); setForgotSuccess(false); setForgotEmail(''); }}
                  className="btn-primary"
                  style={{ borderRadius: '10px', padding: '12px 28px', fontSize: '14px' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;