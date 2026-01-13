'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Slide 6: RHOAI Integration - Data Scientists submitting from RHOAI/MCP

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

export default function Slide6() {
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
        RHOAI Integration
      </motion.h3>

      {/* Main layout */}
      <div className="flex-1 flex">
        {/* Left: Data Scientists with RHOAI */}
        <div className="w-32 flex flex-col items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <PersonaIcon type="scientist" />
            <motion.div 
              className="mt-2 px-3 py-1.5 rounded-lg border border-blue-500 bg-blue-900/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-sm text-blue-300 font-semibold">RHOAI</div>
              <div className="text-xs text-gray-400">OpenShift AI</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <PersonaIcon type="scientist" />
            <motion.div 
              className="mt-2 px-3 py-1.5 rounded-lg border border-purple-500 bg-purple-900/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm text-purple-300 font-semibold">MCP</div>
              <div className="text-xs text-gray-400">ML Pipelines</div>
            </motion.div>
          </motion.div>

          {/* Arrows */}
          <motion.svg 
            width="80" height="50" viewBox="0 0 80 50" className="absolute left-28 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <defs>
              <marker id="arrow6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#6B7280"/>
              </marker>
            </defs>
            <path d="M0 12 L65 12" stroke="#3B82F6" strokeWidth="2.5" markerEnd="url(#arrow6)"/>
            <path d="M0 38 L65 38" stroke="#8B5CF6" strokeWidth="2.5" markerEnd="url(#arrow6)"/>
            <text x="32" y="28" fill="#6B7280" fontSize="9" textAnchor="middle">Jobs</text>
          </motion.svg>
        </div>

        {/* Center: Hub Cluster */}
        <div className="flex-1 flex flex-col ml-14">
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

              {/* Kueue Controller */}
              <div className="flex items-center justify-center gap-3 p-2 rounded-lg border border-purple-600 bg-purple-900/30">
                <KueuePinwheel size={22} />
                <span className="text-white text-sm">Kueue Admission Controller</span>
              </div>
            </div>
          </motion.div>

          {/* Connection arrows */}
          <div className="flex justify-center gap-12 py-2">
            <motion.svg width="28" height="28" viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <path d="M12 4 L12 16 M8 12 L12 16 L16 12" stroke="#3B82F6" strokeWidth="2.5" fill="none"/>
            </motion.svg>
            <motion.svg width="28" height="28" viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <path d="M12 4 L12 16 M8 12 L12 16 L16 12" stroke="#22C55E" strokeWidth="2.5" fill="none"/>
            </motion.svg>
            <motion.svg width="28" height="28" viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <path d="M12 4 L12 16 M8 12 L12 16 L16 12" stroke="#F59E0B" strokeWidth="2.5" fill="none"/>
            </motion.svg>
          </div>

          {/* Worker clusters */}
          <motion.div 
            className="flex justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
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
            <div className="mt-2 text-xs text-gray-500 text-center">
              Creates<br/>Placements
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
