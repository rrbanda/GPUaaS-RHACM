// Red Hat AI Theme - Ultra Rich Design System
export const theme = {
  // Primary backgrounds
  background: '#0D0D0F',
  backgroundLight: '#161618',
  backgroundCard: '#1C1C1F',
  backgroundElevated: '#232326',
  
  // Red Hat Brand
  redHatRed: '#EE0000',
  redHatRedDark: '#A30000',
  redHatRedLight: '#FF4D4D',
  redHatRedGlow: 'rgba(238, 0, 0, 0.4)',
  
  // AI Purple Spectrum
  purple: '#7B2D8E',
  purpleLight: '#A855F7',
  purpleDark: '#581C87',
  purpleGlow: 'rgba(168, 85, 247, 0.3)',
  magenta: '#D946EF',
  
  // Accent Colors
  cyan: '#22D3EE',
  cyanGlow: 'rgba(34, 211, 238, 0.3)',
  teal: '#2DD4BF',
  amber: '#F59E0B',
  amberGlow: 'rgba(245, 158, 11, 0.3)',
  
  // Semantic Colors
  gpuGreen: '#10B981',
  gpuGreenLight: '#34D399',
  gpuGreenGlow: 'rgba(16, 185, 129, 0.3)',
  cpuBlue: '#3B82F6',
  cpuBlueGlow: 'rgba(59, 130, 246, 0.3)',
  goldAmber: '#F59E0B',
  goldGlow: 'rgba(245, 158, 11, 0.4)',
  
  // Text Colors
  white: '#FFFFFF',
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  textDim: '#6B7280',
  
  // Grays
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Gradients
  gradientRedGold: 'linear-gradient(135deg, #EE0000 0%, #F59E0B 100%)',
  gradientPurpleCyan: 'linear-gradient(135deg, #7B2D8E 0%, #22D3EE 100%)',
  gradientGreenCyan: 'linear-gradient(135deg, #10B981 0%, #22D3EE 100%)',
  gradientRedPurple: 'linear-gradient(135deg, #EE0000 0%, #A855F7 100%)',
  gradientDarkCard: 'linear-gradient(180deg, #1C1C1F 0%, #161618 100%)',
  
  // Glass effects
  glassBg: 'rgba(28, 28, 31, 0.8)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassHighlight: 'rgba(255, 255, 255, 0.05)',
};

// Animation presets
export const animations = {
  springStiff: { type: 'spring', stiffness: 400, damping: 30 },
  springBouncy: { type: 'spring', stiffness: 300, damping: 20 },
  springSmooth: { type: 'spring', stiffness: 200, damping: 25 },
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slideUp: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  slideDown: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
  slideLeft: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  slideRight: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  scaleIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
  staggerChildren: { staggerChildren: 0.1 },
};

// Shadows
export const shadows = {
  glow: (color: string) => `0 0 40px ${color}`,
  card: '0 4px 24px rgba(0, 0, 0, 0.4)',
  elevated: '0 8px 40px rgba(0, 0, 0, 0.5)',
  inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
};
