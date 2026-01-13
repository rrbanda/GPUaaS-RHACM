'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Reusing components from Slide2 but with additions

const AddonIcon = ({ size = 32 }: { size?: number }) => (
  <div className="flex flex-col items-center">
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path 
        d="M6 10h6v-3c0-1.5 1.2-2.5 2.5-2.5s2.5 1 2.5 2.5v3h6c1.4 0 2.5 1.1 2.5 2.5v6h3c1.5 0 2.5 1.2 2.5 2.5s-1 2.5-2.5 2.5h-3v6c0 1.4-1.1 2.5-2.5 2.5h-6v-3c0-1.5-1.2-2.5-2.5-2.5s-2.5 1-2.5 2.5v3H6c-1.4 0-2.5-1.1-2.5-2.5v-6h3c1.5 0 2.5-1.2 2.5-2.5s-1-2.5-2.5-2.5h-3v-6c0-1.4 1.1-2.5 2.5-2.5z" 
        fill={theme.gray300}
        stroke={theme.gray400}
        strokeWidth="1"
      />
    </svg>
    <span className="text-[7px] px-1 py-0.5 rounded bg-red-600 text-white font-medium mt-0.5">ADD-ON</span>
  </div>
);

// Kueue Pinwheel icon
const KueuePinwheel = ({ size = 28, color = 'green' }: { size?: number; color?: 'green' | 'blue' | 'gold' }) => {
  const colors = {
    green: ['#22C55E', '#4ADE80', '#16A34A', '#15803D'],
    blue: ['#3B82F6', '#60A5FA', '#2563EB', '#1D4ED8'],
    gold: ['#F59E0B', '#FBBF24', '#D97706', '#B45309'],
  };
  const c = colors[color];
  
  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 28 28" 
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <path d="M14 2 L18 14 L14 14 Z" fill={c[0]}/>
      <path d="M26 14 L14 18 L14 14 Z" fill={c[1]}/>
      <path d="M14 26 L10 14 L14 14 Z" fill={c[2]}/>
      <path d="M2 14 L14 10 L14 14 Z" fill={c[3]}/>
      <circle cx="14" cy="14" r="3" fill="white" stroke={c[0]} strokeWidth="1"/>
    </motion.svg>
  );
};

const RHBoKBadge = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <div 
    className={`flex items-center justify-center rounded-lg ${size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'}`}
    style={{ background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.redHatRedDark})` }}
  >
    <span className={`text-white font-bold ${size === 'sm' ? 'text-[6px]' : 'text-[8px]'}`}>RHBoK</span>
  </div>
);

const HubAdminIcon = () => (
  <div className="flex flex-col items-center">
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="12" r="7" fill="#FEEBC8" stroke="#92400E" strokeWidth="1"/>
      <rect x="17" y="10" width="4" height="3" rx="1" stroke="#1F2937" strokeWidth="1" fill="none"/>
      <rect x="23" y="10" width="4" height="3" rx="1" stroke="#1F2937" strokeWidth="1" fill="none"/>
      <line x1="21" y1="11.5" x2="23" y2="11.5" stroke="#1F2937" strokeWidth="1"/>
      <path d="M10 40 L12 25 Q22 20 32 25 L34 40" fill={theme.redHatRed}/>
    </svg>
    <span className="text-[9px] text-gray-400">Hub Admin</span>
  </div>
);

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
              className="w-3 h-2 rounded-sm"
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
              className="w-3 h-1.5 rounded-sm"
              style={{ backgroundColor: variant === 'gold' ? '#FBBF24' : '#6B7280' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ClusterLabel = ({ name, hasRHBoK = false }: { name: string; hasRHBoK?: boolean }) => (
  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-red-600/50 bg-gray-900/60">
    {hasRHBoK && <RHBoKBadge size="sm" />}
    <span className="text-white text-[10px] font-medium">{name}</span>
    {hasRHBoK && (
      <div className="w-4 h-4 rounded bg-gray-700 flex items-center justify-center">
        <KueuePinwheel size={12} color="green" />
      </div>
    )}
  </div>
);

export default function Slide3() {
  return (
    <div 
      className="w-full h-full flex flex-col p-4 relative overflow-hidden"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `radial-gradient(ellipse at top right, ${theme.purple}15 0%, transparent 50%),
                          radial-gradient(ellipse at bottom left, ${theme.redHatRed}10 0%, transparent 50%)`
      }}
    >
      {/* Hub Cluster Box - leave room for Hub Admin on right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ml-4 mr-16 relative"
      >
        {/* Hub header */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg border-2 border-b-0"
          style={{ borderColor: theme.redHatRed, backgroundColor: theme.backgroundCard }}
        >
          <RHBoKBadge size="md" />
          <span className="text-red-400 font-semibold text-sm">RHACM Hub Cluster</span>
          <span className="text-gray-500 text-sm">+</span>
          <span className="text-purple-400 font-semibold text-sm">MultiKueue Addon</span>
          <span className="text-gray-500 text-sm">=</span>
          <span className="text-cyan-400 font-medium text-sm">Kueue Manager Cluster</span>
        </div>

        {/* Hub content */}
        <div 
          className="p-3 rounded-b-lg border-2 border-t-0 space-y-2"
          style={{ borderColor: theme.redHatRed, backgroundColor: theme.backgroundLight }}
        >
          {/* Placements row */}
          <div className="flex gap-2 justify-center">
            <div className="px-3 py-1 rounded-md text-white text-xs font-medium" style={{ backgroundColor: theme.gpuGreen }}>
              GPUPlacement
            </div>
            <div className="px-3 py-1 rounded-md text-white text-xs font-medium" style={{ backgroundColor: theme.cpuBlue }}>
              CPUPlacement
            </div>
            <div className="px-3 py-1 rounded-md text-white text-xs font-medium" style={{ backgroundColor: theme.goldAmber }}>
              GoldClassPlacement
            </div>
          </div>

          {/* RHACM Admission Check Controller with Kueue integration */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 p-2 rounded-lg border border-gray-700 bg-gray-800/50"
          >
            <AddonIcon size={28} />
            <div className="flex-1">
              <div className="text-white text-xs font-medium">RHACM Admission Check Controller</div>
              <div className="text-gray-500 text-[10px]">(Addon supplied)</div>
            </div>
            <KueuePinwheel size={24} color="green" />
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white text-xs font-medium bg-green-700/40 px-2 py-1 rounded"
            >
              Create Kueue workload dispatching from Placement
            </motion.div>
          </motion.div>

          {/* Queue configurations - highlighted */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-2 justify-center"
          >
            {/* GPU Queue */}
            <div className="px-3 py-2 rounded-lg bg-red-600/20 border border-red-500">
              <div className="text-[10px] text-gray-400">Kueue: <span className="text-red-300">GPULocalQueue</span></div>
              <div className="text-[10px] text-gray-400">MultiKueue: <span className="text-red-300">GPUClusterQueue</span></div>
            </div>
            {/* CPU Queue */}
            <div className="px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-500">
              <div className="text-[10px] text-gray-400">Kueue: <span className="text-blue-300">CPULocalQueue</span></div>
              <div className="text-[10px] text-gray-400">MultiKueue: <span className="text-blue-300">CPUClusterQueue</span></div>
            </div>
            {/* Gold Queue */}
            <div className="px-3 py-2 rounded-lg bg-amber-600/20 border border-amber-500">
              <div className="text-[10px] text-gray-400">Kueue: <span className="text-amber-300">GoldGPULocalQueue</span></div>
              <div className="text-[10px] text-gray-400">MultiKueue: <span className="text-amber-300">GoldGPUClusterQueue</span></div>
            </div>
          </motion.div>

          {/* Kueue Admission Check Controller */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-3 p-2 rounded-lg border border-purple-700 bg-purple-900/30"
          >
            <AddonIcon size={28} />
            <div className="text-white text-xs font-medium">Kueue Admission Check Controller</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hub Admin - positioned outside the hub cluster box */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 right-2 z-10"
      >
        <HubAdminIcon />
      </motion.div>

      {/* Worker Clusters */}
      <div className="flex justify-center items-end gap-3 mt-auto pb-3">
        {[
          { name: 'Cheap CPUs', variant: 'cpu' as const, hasRHBoK: true },
          { name: 'Workhorse GPUs', variant: 'gpu' as const, hasRHBoK: true },
          { name: 'Mixed', variant: 'cpu' as const, hasRHBoK: true },
          { name: 'Test Cluster No Use', variant: 'gpu' as const, hasRHBoK: false, disabled: true },
          { name: 'Creme of the crop', variant: 'gold' as const, hasRHBoK: true },
        ].map((cluster, i) => (
          <motion.div
            key={cluster.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="flex flex-col items-center gap-1.5 relative"
          >
            <ClusterIcon variant={cluster.variant} disabled={cluster.disabled} />
            {cluster.disabled && (
              <div className="absolute top-2 text-red-500 text-xl font-bold">✕</div>
            )}
            <ClusterLabel name={cluster.name} hasRHBoK={cluster.hasRHBoK && !cluster.disabled} />
          </motion.div>
        ))}
      </div>

    </div>
  );
}
