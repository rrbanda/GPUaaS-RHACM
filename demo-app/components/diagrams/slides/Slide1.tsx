'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Server rack icon
const ServerRack = ({ count = 4, variant = 'cpu' }: { count?: number; variant?: 'cpu' | 'gpu' | 'gold' }) => {
  const colors = {
    cpu: { bg: '#E2E8F0', accent: '#94A3B8' },
    gpu: { bg: '#D1FAE5', accent: '#34D399' },
    gold: { bg: '#FEF3C7', accent: '#F59E0B' },
  };
  const c = colors[variant];

  return (
    <div className="grid grid-cols-4 gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          {/* Server unit */}
          <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: c.bg, border: `1px solid ${c.accent}` }}>
            <div className="w-1 h-1 rounded-full bg-green-500 ml-0.5 mt-0.5" />
          </div>
          {variant !== 'cpu' && (
            <div className="w-7 h-3 rounded-sm" style={{ backgroundColor: variant === 'gold' ? '#FBBF24' : '#6B7280', border: `1px solid ${c.accent}` }}>
              <div className="w-2 h-1 rounded-sm ml-0.5 mt-0.5" style={{ backgroundColor: variant === 'gold' ? '#F59E0B' : '#374151' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Cluster label
const ClusterLabel = ({ name, variant = 'default' }: { name: string; variant?: 'default' | 'blue' | 'green' | 'gold' | 'disabled' }) => {
  const styles = {
    default: 'bg-gray-800/80 border-gray-600 text-gray-300',
    blue: 'bg-blue-900/40 border-blue-500/60 text-blue-200',
    green: 'bg-green-900/40 border-green-500/60 text-green-200',
    gold: 'bg-amber-900/40 border-amber-500/60 text-amber-200',
    disabled: 'bg-gray-900/40 border-gray-600 text-gray-500',
  };

  return (
    <div className={`px-4 py-2 rounded-lg border ${styles[variant]} text-sm font-medium backdrop-blur-sm`}>
      {name}
    </div>
  );
};

// Hub Admin icon
const HubAdminIcon = () => (
  <div className="flex flex-col items-center">
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Head */}
      <circle cx="28" cy="16" r="10" fill="#FEEBC8" stroke="#92400E" strokeWidth="1"/>
      {/* Glasses */}
      <rect x="21" y="13" width="6" height="4" rx="1" stroke="#1F2937" strokeWidth="1.5" fill="none"/>
      <rect x="29" y="13" width="6" height="4" rx="1" stroke="#1F2937" strokeWidth="1.5" fill="none"/>
      <line x1="27" y1="15" x2="29" y2="15" stroke="#1F2937" strokeWidth="1.5"/>
      {/* Body */}
      <path d="M14 52 L16 34 Q28 28 40 34 L42 52" fill={theme.redHatRed} stroke={theme.redHatRedDark} strokeWidth="1"/>
      {/* Collar */}
      <path d="M24 34 L28 38 L32 34" fill="white"/>
      {/* Tie */}
      <path d="M28 38 L26 44 L28 52 L30 44 Z" fill="#1F2937"/>
    </svg>
    <span className="text-xs text-gray-400 mt-1 font-medium">Hub Admin</span>
  </div>
);

export default function Slide1() {
  return (
    <div 
      className="w-full h-full flex flex-col p-8"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `radial-gradient(ellipse at top right, ${theme.purple}15 0%, transparent 50%),
                          radial-gradient(ellipse at bottom left, ${theme.redHatRed}10 0%, transparent 50%)`
      }}
    >
      {/* Title area */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white">
          MultiKueue with <span style={{ color: theme.redHatRed }}>RHACM</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">Infrastructure Overview</p>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-between">
        {/* Hub Cluster + Admin */}
        <div className="flex items-start gap-8">
          {/* RHACM Hub Cluster Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div 
              className="w-[440px] h-[160px] rounded-xl border-2 flex items-center justify-center"
              style={{ 
                backgroundColor: theme.backgroundCard,
                borderColor: theme.redHatRed,
              }}
            >
              <span className="text-gray-500 text-sm">Hub Cluster - Ready for configuration</span>
            </div>
            {/* Label */}
            <div 
              className="absolute -top-3 left-4 px-3 py-0.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: theme.background, color: theme.redHatRed }}
            >
              RHACM Hub Cluster
            </div>
          </motion.div>

          {/* Hub Admin */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HubAdminIcon />
          </motion.div>
        </div>

        {/* Worker Clusters */}
        <div className="flex items-end gap-5">
          {/* Cheap CPUs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <ServerRack count={16} variant="cpu" />
            <ClusterLabel name="Cheap CPUs" variant="blue" />
          </motion.div>

          {/* Workhorse GPUs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <ServerRack count={8} variant="gpu" />
            <ClusterLabel name="Workhorse GPUs" variant="green" />
          </motion.div>

          {/* Mixed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="grid grid-cols-3 gap-1">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="flex flex-col gap-0.5">
                  <div className="w-6 h-4 rounded-sm bg-gray-300 border border-gray-400">
                    <div className="w-1 h-1 rounded-full bg-green-500 ml-0.5 mt-0.5" />
                  </div>
                  {i % 2 === 0 && (
                    <div className="w-7 h-3 rounded-sm bg-gray-500 border border-gray-600" />
                  )}
                </div>
              ))}
            </div>
            <ClusterLabel name="Mixed" variant="default" />
          </motion.div>

          {/* Test Cluster - Disabled */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-3 relative"
          >
            <div className="opacity-40">
              <ServerRack count={8} variant="gpu" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-red-500 text-4xl font-bold">✕</span>
            </div>
            <ClusterLabel name="Test Cluster No Use" variant="disabled" />
          </motion.div>

          {/* Creme of the Crop - Gold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-3"
          >
            <ServerRack count={6} variant="gold" />
            <ClusterLabel name="Creme of the crop" variant="gold" />
          </motion.div>
        </div>
      </div>

    </div>
  );
}
