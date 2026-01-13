'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Slide 5: Job dispatching to worker clusters

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

const ClusterBox = ({ name, variant, highlighted = false }: { name: string; variant: 'cpu' | 'gpu' | 'gold'; highlighted?: boolean }) => {
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
        className={`w-20 h-16 rounded-xl flex flex-col items-center justify-center gap-1 ${highlighted ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
        style={{ backgroundColor: `${c.bg}20`, border: `2px solid ${c.bg}` }}
      >
        <span className="text-2xl">{c.icon}</span>
        <RHBoKBadge size="sm" />
      </div>
      <span className="text-xs text-gray-400 mt-1.5">{name}</span>
    </motion.div>
  );
};

export default function Slide5() {
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
        Jobs Dispatched to Clusters
      </motion.h3>

      {/* Main layout */}
      <div className="flex-1 flex">
        {/* Left: Data Scientist */}
        <div className="w-24 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <PersonaIcon type="scientist" />
          </motion.div>
        </div>

        {/* Center: Hub Cluster */}
        <div className="flex-1 flex flex-col">
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

            {/* Hub Content */}
            <div 
              className="flex-1 p-3 flex flex-col justify-between gap-2"
              style={{ backgroundColor: theme.backgroundLight }}
            >
              {/* Placements - LARGER */}
              <div className="flex gap-2 justify-center">
                <div className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-green-600">
                  GPU Placement
                </div>
                <div className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-blue-600">
                  CPU Placement
                </div>
                <div className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-amber-600">
                  Gold Placement
                </div>
              </div>

              {/* RHACM Controller */}
              <div className="flex items-center justify-center gap-3 p-2 rounded-lg border border-gray-600 bg-gray-800/50">
                <KueuePinwheel size={22} />
                <span className="text-white text-sm">RHACM Admission Controller</span>
              </div>

              {/* Queues - LARGER */}
              <div className="flex gap-3 justify-center">
                <div className="px-4 py-2.5 rounded-lg bg-green-600/20 border border-green-500">
                  <div className="text-sm text-green-300">GPU Queues</div>
                </div>
                <div className="px-4 py-2.5 rounded-lg bg-blue-600/20 border border-blue-500">
                  <div className="text-sm text-blue-300">CPU Queues</div>
                </div>
                <div className="px-4 py-2.5 rounded-lg bg-amber-600/20 border border-amber-500">
                  <div className="text-sm text-amber-300">Gold Queues</div>
                </div>
              </div>

              {/* Kueue Controller - HIGHLIGHTED */}
              <motion.div 
                className="flex items-center justify-center gap-3 p-2.5 rounded-lg border-2 border-purple-500 bg-purple-900/50"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <KueuePinwheel size={22} />
                <span className="text-white text-sm font-semibold">Kueue Dispatches Jobs</span>
                <motion.span 
                  className="text-xs text-green-300 bg-green-800/50 px-2 py-1 rounded"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ⚡ Active
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated dispatch arrows */}
          <div className="flex justify-center gap-12 py-2 relative">
            {/* Animated packets going down */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-blue-500"
              style={{ left: '25%', boxShadow: '0 0 10px #3B82F6' }}
              animate={{ y: [0, 35], opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-green-500"
              style={{ left: '50%', boxShadow: '0 0 10px #22C55E' }}
              animate={{ y: [0, 35], opacity: [1, 0] }}
              transition={{ duration: 0.8, delay: 0.3, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-amber-500"
              style={{ left: '75%', boxShadow: '0 0 10px #F59E0B' }}
              animate={{ y: [0, 35], opacity: [1, 0] }}
              transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatDelay: 1 }}
            />
            
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

          {/* Worker clusters - HIGHLIGHTED */}
          <motion.div 
            className="flex justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ClusterBox name="CPU Workers" variant="cpu" highlighted />
            <ClusterBox name="GPU Workers" variant="gpu" highlighted />
            <ClusterBox name="Gold GPUs" variant="gold" highlighted />
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
