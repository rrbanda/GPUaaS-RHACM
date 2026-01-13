'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Slide 7: Job Flow Animation - showing how jobs move through the system

const RHBoKBadge = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
  <div 
    className={`flex items-center justify-center rounded-lg ${size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'}`}
    style={{ background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.redHatRedDark})` }}
  >
    <span className={`text-white font-bold ${size === 'sm' ? 'text-[6px]' : 'text-[7px]'}`}>RHBoK</span>
  </div>
);

const KueuePinwheel = ({ size = 20 }: { size?: number }) => (
  <motion.svg 
    width={size} height={size} viewBox="0 0 20 20" fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  >
    <path d="M10 2 L12 10 L10 10 Z" fill="#22C55E"/>
    <path d="M18 10 L10 12 L10 10 Z" fill="#4ADE80"/>
    <path d="M10 18 L8 10 L10 10 Z" fill="#16A34A"/>
    <path d="M2 10 L10 8 L10 10 Z" fill="#15803D"/>
    <circle cx="10" cy="10" r="2" fill="white" stroke="#22C55E" strokeWidth="0.5"/>
  </motion.svg>
);

const PersonaIcon = ({ type }: { type: 'admin' | 'scientist' }) => (
  <div className="flex flex-col items-center">
    <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="10" r="6" fill="#FEEBC8" stroke="#92400E" strokeWidth="0.8"/>
      {type === 'admin' ? (
        <>
          <rect x="14" y="8" width="3" height="2.5" rx="0.5" stroke="#1F2937" strokeWidth="0.6" fill="none"/>
          <rect x="19" y="8" width="3" height="2.5" rx="0.5" stroke="#1F2937" strokeWidth="0.6" fill="none"/>
          <path d="M9 32 L11 20 Q18 16 25 20 L27 32" fill={theme.redHatRed}/>
        </>
      ) : (
        <>
          <path d="M12 8 Q18 4 24 8" stroke="#4A3728" strokeWidth="1.5" fill="none"/>
          <path d="M9 32 L11 20 Q18 16 25 20 L27 32" fill="#3B82F6"/>
        </>
      )}
    </svg>
    <span className="text-[10px] text-gray-400">
      {type === 'admin' ? 'Hub Admin' : 'Data Scientist'}
    </span>
  </div>
);

// Animated job that flows through the system
const AnimatedJob = ({ delay, color, label }: { delay: number; color: string; label: string }) => (
  <motion.div
    className="absolute flex items-center gap-1 px-3 py-1.5 rounded-lg z-20"
    style={{ 
      backgroundColor: color,
      boxShadow: `0 0 15px ${color}80`,
      left: '10%',
      top: '42%',
    }}
    initial={{ opacity: 0, x: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 1, 1, 0],
      x: [0, 120, 240, 360, 450, 520],
      y: [0, 0, 20, 50, 100, 140],
    }}
    transition={{ 
      delay,
      duration: 4,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }}
  >
    <span className="text-white text-sm font-medium">📦 {label}</span>
  </motion.div>
);

const ClusterBox = ({ name, variant }: { name: string; variant: 'cpu' | 'gpu' | 'gold' }) => {
  const colors = {
    cpu: { bg: '#3B82F6', icon: '🖥️' },
    gpu: { bg: '#22C55E', icon: '🎮' },
    gold: { bg: '#F59E0B', icon: '✨' },
  };
  const c = colors[variant];

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div 
        className="w-20 h-16 rounded-xl flex flex-col items-center justify-center gap-1"
        style={{ backgroundColor: `${c.bg}20`, border: `2px solid ${c.bg}` }}
      >
        <span className="text-2xl">{c.icon}</span>
        <RHBoKBadge size="sm" />
      </div>
      <span className="text-xs text-gray-400 mt-1.5">{name}</span>
    </motion.div>
  );
};

export default function Slide7() {
  return (
    <div 
      className="w-full h-full flex flex-col p-4 relative overflow-hidden"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `radial-gradient(ellipse at top right, ${theme.purple}12 0%, transparent 50%)`
      }}
    >
      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white text-base font-semibold mb-3"
      >
        Job Flow Through the System
      </motion.h3>

      {/* Animated jobs */}
      <AnimatedJob delay={0} color="#22C55E" label="GPU Job" />
      <AnimatedJob delay={2} color="#3B82F6" label="CPU Job" />
      <AnimatedJob delay={4} color="#F59E0B" label="Gold Job" />

      {/* Main layout */}
      <div className="flex-1 flex">
        {/* Left: Data Scientist */}
        <div className="w-24 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <PersonaIcon type="scientist" />
            <div className="mt-2 text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded text-center">
              RHOAI / MCP / ETC
            </div>
          </motion.div>
        </div>

        {/* Center: Hub + flow */}
        <div className="flex-1 flex flex-col">
          {/* Hub cluster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 rounded-xl border-2 overflow-hidden flex flex-col"
            style={{ borderColor: theme.redHatRed }}
          >
            {/* Hub Header */}
            <div 
              className="flex items-center justify-center gap-3 px-3 py-2"
              style={{ backgroundColor: theme.backgroundCard }}
            >
              <RHBoKBadge />
              <span className="text-red-400 font-semibold text-sm">RHACM Hub</span>
              <span className="text-purple-400 text-sm">+ MultiKueue</span>
            </div>

            {/* Flow stages */}
            <div 
              className="flex-1 p-3 flex flex-col justify-between gap-2"
              style={{ backgroundColor: theme.backgroundLight }}
            >
              {/* Stage 1: Job arrives */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold shrink-0">1</div>
                <div className="flex-1 p-2 rounded-lg border border-gray-700 bg-gray-800/50">
                  <span className="text-sm text-gray-300">Job arrives → LocalQueue</span>
                </div>
              </div>

              {/* Stage 2: Admission Check */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">2</div>
                <div className="flex-1 p-2 rounded-lg border border-purple-700 bg-purple-900/30 flex items-center gap-2">
                  <KueuePinwheel size={18} />
                  <span className="text-sm text-gray-300">RHACM Controller evaluates Placement</span>
                </div>
              </div>

              {/* Stage 3: MultiKueue routes */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white text-sm font-bold shrink-0">3</div>
                <div className="flex-1 p-2 rounded-lg border border-cyan-700 bg-cyan-900/30">
                  <span className="text-sm text-gray-300">MultiKueue routes to best worker cluster</span>
                </div>
              </div>

              {/* Stage 4: Dispatch */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-sm font-bold shrink-0">4</div>
                <div className="flex-1 p-2 rounded-lg border border-amber-700 bg-amber-900/30">
                  <span className="text-sm text-gray-300">Job dispatched to worker cluster</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connection arrows */}
          <div className="flex justify-center gap-12 py-2">
            <motion.svg width="28" height="28" viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <path d="M12 4 L12 16 M8 12 L12 16 L16 12" stroke="#3B82F6" strokeWidth="2.5" fill="none"/>
            </motion.svg>
            <motion.svg width="28" height="28" viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <path d="M12 4 L12 16 M8 12 L12 16 L16 12" stroke="#22C55E" strokeWidth="2.5" fill="none"/>
            </motion.svg>
            <motion.svg width="28" height="28" viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <path d="M12 4 L12 16 M8 12 L12 16 L16 12" stroke="#F59E0B" strokeWidth="2.5" fill="none"/>
            </motion.svg>
          </div>

          {/* Worker clusters */}
          <motion.div 
            className="flex justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ClusterBox name="CPU Workers" variant="cpu" />
            <ClusterBox name="GPU Workers" variant="gpu" />
            <ClusterBox name="Gold GPUs" variant="gold" />
          </motion.div>
        </div>

        {/* Right: Hub Admin */}
        <div className="w-24 flex flex-col items-center justify-start pt-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <PersonaIcon type="admin" />
            <div className="mt-1 text-xs text-gray-500 text-center">
              Creates<br/>Placements
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
