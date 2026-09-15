// Premium Orange & Crisp White Dynamic Theme Configuration
export const theme = {
  // Primary Colors (Bright Premium Orange)
  primary: 'var(--accent-start, #FF7800)',
  primaryLight: '#FF9E43',
  primaryDark: '#CC6000',
  
  // Secondary Colors (Warm Amber/Gold Accent)
  secondary: '#FFB347',
  secondaryLight: '#FFCD85',
  secondaryDark: '#C68323',
  
  // Accent Colors
  accent: '#FF6200',
  accentLight: '#FF8B43',
  accentDark: '#B34500',
  
  // Gradients (Directly matching your Login & Hero section)
  gradientPrimary: 'var(--gradient-accent, linear-gradient(135deg, #FF7800, #FFB347))',
  gradientAccent: 'var(--gradient-accent, linear-gradient(135deg, #FF6200, #FF9E43))',
  gradientCard: 'linear-gradient(135deg, rgba(255, 120, 0, 0.04), rgba(255, 179, 71, 0.04))',
  gradientHero: 'linear-gradient(135deg, #000000, #110600)',
  
  // Neutral Colors - Adapts dynamically via body theme classes
  bg: 'var(--bg-primary, #FFFFFF)',
  bgDark: 'var(--bg-primary, #F8FAFC)',
  surface: 'var(--bg-card, #FFFFFF)',
  surfaceAlt: 'rgba(255, 120, 0, 0.03)', // Subtle orange tint for alternate rows
  text: 'var(--text-primary, #1A1A1A)',
  textSecondary: 'var(--text-secondary, #475569)',
  textMuted: 'var(--text-secondary, #64748B)',
  border: 'var(--border-color, #E2E8F0)',
  
  // Functional Colors
  success: '#059669',
  warning: '#D97706',
  danger: '#DC2626',
  info: 'var(--accent-start, #FF7800)',
  
  // Shadows (Soft premium shadows with a touch of orange glow)
  shadowSm: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  shadowMd: 'var(--shadow)',
  shadowLg: 'var(--shadow)',
  shadowXl: 'var(--shadow)',
  shadowGlow: '0 4px 15px rgba(255, 120, 0, 0.25)',
  
  // Border Radius
  radiusSm: '6px',
  radiusMd: '10px',
  radiusLg: '12px',
  radiusXl: '22px',
  radiusFull: '9999px',
  
  // Transitions
  transitionFast: '0.2s ease',
  transitionBase: '0.3s ease',
  transitionSlow: '0.5s ease',
};

export const getGradientByColor = (colorName) => {
  const gradients = {
    red: '#EF4444',
    orange: 'var(--accent-start, #FF7800)',
    yellow: '#FBBF24',
    green: '#10B981',
    blue: '#3B82F6',
    indigo: '#6366F1',
    purple: '#8B5CF6',
    pink: '#EC4899',
  };
  return gradients[colorName] || gradients.orange;
};