'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Addon puzzle icon
const AddonIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => (
  <div className="flex flex-col items-center">
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path 
        d="M6 10h6v-3c0-1.5 1.2-2.5 2.5-2.5s2.5 1 2.5 2.5v3h6c1.4 0 2.5 1.1 2.5 2.5v6h3c1.5 0 2.5 1.2 2.5 2.5s-1 2.5-2.5 2.5h-3v6c0 1.4-1.1 2.5-2.5 2.5h-6v-3c0-1.5-1.2-2.5-2.5-2.5s-2.5 1-2.5 2.5v3H6c-1.4 0-2.5-1.1-2.5-2.5v-6h3c1.5 0 2.5-1.2 2.5-2.5s-1-2.5-2.5-2.5h-3v-6c0-1.4 1.1-2.5 2.5-2.5z" 
        fill={active ? theme.gray300 : theme.gray600}
        stroke={active ? theme.gray400 : theme.gray700}
        strokeWidth="1"
      />
    </svg>
    <span className="text-[7px] px-1 py-0.5 rounded bg-red-600 text-white font-medium mt-0.5">ADD-ON</span>
  </div>
);

// RHBoK badge
const RHBoKBadge = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <div 
    className={`flex items-center justify-center rounded-lg ${size === 'sm' ? 'w-8 h-8' : 'w-12 h-12'}`}
    style={{ background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.redHatRedDark})` }}
  >
    <span className={`text-white font-bold ${size === 'sm' ? 'text-[6px]' : 'text-[8px]'}`}>RHBoK</span>
  </div>
);

// Hub Admin icon
const HubAdminIcon = () => (
  <div className="flex flex-col items-center">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="14" r="8" fill="#FEEBC8" stroke="#92400E" strokeWidth="1"/>
      <rect x="18" y="11" width="5" height="4" rx="1" stroke="#1F2937" strokeWidth="1" fill="none"/>
      <rect x="25" y="11" width="5" height="4" rx="1" stroke="#1F2937" strokeWidth="1" fill="none"/>
      <line x1="23" y1="13" x2="25" y2="13" stroke="#1F2937" strokeWidth="1"/>
      <path d="M12 44 L14 28 Q24 24 34 28 L36 44" fill={theme.redHatRed} stroke={theme.redHatRedDark} strokeWidth="1"/>
      <path d="M20 28 L24 32 L28 28" fill="white"/>
      <path d="M24 32 L22 36 L24 44 L26 36 Z" fill="#1F2937"/>
    </svg>
    <span className="text-[10px] text-gray-400 mt-0.5">Hub Admin</span>
  </div>
);

// Server cluster component
const ClusterIcon = ({ variant = 'cpu', disabled = false }: { variant?: 'cpu' | 'gpu' | 'gold'; disabled?: boolean }) => {
  const colors = {
    cpu: '#94A3B8',
    gpu: '#34D399', 
    gold: '#FBBF24',
  };
  
  return (
    <div className={`flex flex-col gap-0.5 ${disabled ? 'opacity-30' : ''}`}>
      {[0,1,2,3].map(i => (
        <div key={i} className="flex gap-0.5">
          {[0,1,2,3].map(j => (
            <div 
              key={j} 
              className="w-4 h-3 rounded-sm"
              style={{ 
                backgroundColor: variant === 'gold' ? '#FEF3C7' : variant === 'gpu' ? '#D1FAE5' : '#E2E8F0',
                border: `1px solid ${colors[variant]}`
              }}
            />
          ))}
        </div>
      ))}
      {variant !== 'cpu' && (
        <div className="flex gap-0.5 mt-0.5">
          {[0,1,2,3].map(j => (
            <div 
              key={j} 
              className="w-4 h-2 rounded-sm"
              style={{ backgroundColor: variant === 'gold' ? '#FBBF24' : '#6B7280' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Cluster label with RHBoK indicator
const ClusterLabel = ({ name, hasRHBoK = false, color = 'gray' }: { name: string; hasRHBoK?: boolean; color?: 'blue' | 'green' | 'gold' | 'gray' | 'red' }) => {
  const borderColors = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    gold: 'border-amber-500',
    gray: 'border-gray-600',
    red: 'border-red-500',
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${borderColors[color]} bg-gray-900/60`}>
      {hasRHBoK && <RHBoKBadge size="sm" />}
      <span className="text-white text-xs font-medium">{name}</span>
      {hasRHBoK && (
        <div className="w-5 h-5 rounded bg-gray-700 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4" fill={theme.gray500}/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default function Slide2() {
  return (
    <div 
      className="w-full h-full flex flex-col p-6 relative overflow-hidden"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `radial-gradient(ellipse at top right, ${theme.purple}15 0%, transparent 50%),
                          radial-gradient(ellipse at bottom left, ${theme.redHatRed}10 0%, transparent 50%)`
      }}
    >
      {/* Hub Cluster Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto relative"
        style={{ width: '85%' }}
      >
        {/* Hub header */}
        <div 
          className="flex items-center gap-3 px-4 py-2 rounded-t-xl border-2 border-b-0"
          style={{ borderColor: theme.redHatRed, backgroundColor: theme.backgroundCard }}
        >
          <RHBoKBadge size="md" />
          <span className="text-red-400 font-semibold">RHACM Hub Cluster</span>
          <span className="text-gray-500">+</span>
          <span className="text-purple-400 font-semibold">MultiKueue Addon</span>
          <span className="text-gray-500">=</span>
          <span className="text-cyan-400 font-medium">Kueue Manager Cluster</span>
        </div>

        {/* Hub content */}
        <div 
          className="p-4 rounded-b-xl border-2 border-t-0 space-y-3"
          style={{ borderColor: theme.redHatRed, backgroundColor: theme.backgroundLight }}
        >
          {/* Placements row */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 justify-center"
          >
            {['GPUPlacement', 'CPUPlacement', 'GoldClassPlacement'].map((p, i) => (
              <div 
                key={p}
                className="px-4 py-1.5 rounded-lg text-white text-sm font-medium"
                style={{ 
                  background: i === 0 ? theme.gpuGreen : i === 1 ? theme.cpuBlue : theme.goldAmber 
                }}
              >
                {p}
              </div>
            ))}
          </motion.div>

          {/* RHACM Admission Check Controller */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 p-3 rounded-lg border border-gray-700 bg-gray-800/50"
          >
            <AddonIcon size={36} active />
            <div>
              <div className="text-white text-sm font-medium">RHACM Admission Check Controller</div>
              <div className="text-gray-500 text-xs">(Addon supplied)</div>
            </div>
          </motion.div>

          {/* Kueue Admission Check Controller */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-4 p-3 rounded-lg border border-purple-700 bg-purple-900/30"
          >
            <AddonIcon size={36} active />
            <div className="text-white text-sm font-medium">Kueue Admission Check Controller</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hub Admin on right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-8"
      >
        <HubAdminIcon />
      </motion.div>

      {/* Arrow from Admin */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-16 right-24"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M35 20 L5 20 M10 15 L5 20 L10 25" stroke={theme.redHatRed} strokeWidth="2" fill="none"/>
        </svg>
      </motion.div>

      {/* Worker Clusters */}
      <div className="flex justify-center items-end gap-4 mt-auto pb-4">
        {/* Cheap CPUs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <ClusterIcon variant="cpu" />
          <ClusterLabel name="Cheap CPUs" hasRHBoK color="red" />
        </motion.div>

        {/* Workhorse GPUs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-2"
        >
          <ClusterIcon variant="gpu" />
          <ClusterLabel name="Workhorse GPUs" hasRHBoK color="red" />
        </motion.div>

        {/* Mixed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <ClusterIcon variant="cpu" />
          <ClusterLabel name="Mixed" hasRHBoK color="red" />
        </motion.div>

        {/* Test Cluster - Disabled */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center gap-2 relative"
        >
          <ClusterIcon variant="gpu" disabled />
          <div className="absolute top-4 text-red-500 text-2xl font-bold">✕</div>
          <ClusterLabel name="Test Cluster No Use" color="gray" />
        </motion.div>

        {/* Creme of the Crop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col items-center gap-2"
        >
          <ClusterIcon variant="gold" />
          <ClusterLabel name="Creme of the crop" hasRHBoK color="red" />
        </motion.div>
      </div>

    </div>
  );
}
