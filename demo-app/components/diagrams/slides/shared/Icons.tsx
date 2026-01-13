'use client';

import { theme } from './theme';

// RHBoK Logo Icon
export const RHBoKIcon = ({ size = 40 }: { size?: number }) => (
  <div 
    className="flex items-center justify-center rounded-lg"
    style={{ 
      width: size, 
      height: size, 
      background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.redHatRedDark})`,
    }}
  >
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="white">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
    <span className="absolute text-[6px] text-white font-bold mt-6">RHBoK</span>
  </div>
);

// Addon Puzzle Icon
export const AddonIcon = ({ size = 48, label = 'ADD-ON' }: { size?: number; label?: string }) => (
  <div className="flex flex-col items-center">
    <div 
      className="relative"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Puzzle piece */}
        <path 
          d="M10 14h8v-4c0-2.2 1.8-4 4-4s4 1.8 4 4v4h8c2.2 0 4 1.8 4 4v8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4v8c0 2.2-1.8 4-4 4h-8v-4c0-2.2-1.8-4-4-4s-4 1.8-4 4v4h-8c-2.2 0-4-1.8-4-4v-8h4c2.2 0 4-1.8 4-4s-1.8-4-4-4H6v-8c0-2.2 1.8-4 4-4z" 
          fill={theme.gray400}
          stroke={theme.gray500}
          strokeWidth="1.5"
        />
      </svg>
    </div>
    {label && (
      <span className="text-[8px] mt-1 px-1.5 py-0.5 rounded bg-red-600 text-white font-medium">
        {label}
      </span>
    )}
  </div>
);

// Kueue Pinwheel Icon (colored spinner)
export const KueueIcon = ({ color = 'blue', size = 32 }: { color?: 'blue' | 'green' | 'gold'; size?: number }) => {
  const colors = {
    blue: ['#3B82F6', '#60A5FA', '#2563EB', '#1D4ED8'],
    green: ['#22C55E', '#4ADE80', '#16A34A', '#15803D'],
    gold: ['#F59E0B', '#FBBF24', '#D97706', '#B45309'],
  };
  const c = colors[color];
  
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L20 16 L16 16 Z" fill={c[0]}/>
      <path d="M28 16 L16 20 L16 16 Z" fill={c[1]}/>
      <path d="M16 28 L12 16 L16 16 Z" fill={c[2]}/>
      <path d="M4 16 L16 12 L16 16 Z" fill={c[3]}/>
      <circle cx="16" cy="16" r="3" fill="white" stroke={c[0]} strokeWidth="1"/>
    </svg>
  );
};

// Hub Admin Persona
export const HubAdminIcon = ({ size = 64 }: { size?: number }) => (
  <div className="flex flex-col items-center">
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Head */}
        <circle cx="32" cy="18" r="12" fill="#FEEBC8" stroke="#92400E" strokeWidth="1"/>
        {/* Glasses */}
        <rect x="24" y="15" width="7" height="5" rx="1" stroke="#1F2937" strokeWidth="1.5" fill="none"/>
        <rect x="33" y="15" width="7" height="5" rx="1" stroke="#1F2937" strokeWidth="1.5" fill="none"/>
        <line x1="31" y1="17.5" x2="33" y2="17.5" stroke="#1F2937" strokeWidth="1.5"/>
        {/* Body */}
        <path d="M16 58 L18 38 Q32 32 46 38 L48 58" fill={theme.redHatRed} stroke={theme.redHatRedDark} strokeWidth="1"/>
        {/* Collar */}
        <path d="M28 38 L32 44 L36 38" fill="white" stroke="#E5E7EB" strokeWidth="0.5"/>
        {/* Tie */}
        <path d="M32 44 L30 50 L32 58 L34 50 Z" fill="#1F2937"/>
      </svg>
    </div>
    <span className="text-xs text-gray-400 mt-1 font-medium">Hub Admin</span>
  </div>
);

// Data Scientist Persona
export const DataScientistIcon = ({ size = 64, side = 'left' }: { size?: number; side?: 'left' | 'right' }) => (
  <div className="flex flex-col items-center">
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Head */}
        <circle cx="32" cy="18" r="12" fill="#FEEBC8" stroke="#92400E" strokeWidth="1"/>
        {/* Hair */}
        <path d="M22 14 Q32 6 42 14" stroke="#4A3728" strokeWidth="3" fill="none"/>
        {/* Body */}
        <path d="M16 58 L18 38 Q32 32 46 38 L48 58" fill="#3B82F6" stroke="#2563EB" strokeWidth="1"/>
        {/* Collar */}
        <path d="M28 38 L32 42 L36 38" fill="white"/>
        {/* Laptop on side */}
        <rect x={side === 'left' ? 48 : 4} y="44" width="12" height="8" rx="1" fill="#374151" stroke="#4B5563"/>
        <rect x={side === 'left' ? 49 : 5} y="45" width="10" height="5" fill="#60A5FA"/>
      </svg>
    </div>
    <span className="text-xs text-gray-400 mt-1 font-medium">Data Scientist</span>
  </div>
);

// Server Stack Icon
export const ServerIcon = ({ variant = 'cpu' }: { variant?: 'cpu' | 'gpu' | 'gold' }) => {
  const colors = {
    cpu: { fill: '#E2E8F0', stroke: '#94A3B8' },
    gpu: { fill: '#D1FAE5', stroke: '#34D399' },
    gold: { fill: '#FEF3C7', stroke: '#FBBF24' },
  };
  const c = colors[variant];
  
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
      <rect x="2" y="2" width="24" height="8" rx="1" fill={c.fill} stroke={c.stroke} strokeWidth="1"/>
      <rect x="2" y="14" width="24" height="8" rx="1" fill={c.fill} stroke={c.stroke} strokeWidth="1"/>
      <circle cx="6" cy="6" r="1.5" fill="#22C55E"/>
      <circle cx="6" cy="18" r="1.5" fill="#22C55E"/>
      <rect x="18" y="4" width="6" height="4" rx="0.5" fill="#94A3B8"/>
      <rect x="18" y="16" width="6" height="4" rx="0.5" fill="#94A3B8"/>
    </svg>
  );
};

// GPU Card Icon
export const GPUCardIcon = ({ isGold = false }: { isGold?: boolean }) => (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
    <rect 
      x="1" y="2" 
      width="30" height="16" 
      rx="2" 
      fill={isGold ? '#FBBF24' : '#6B7280'} 
      stroke={isGold ? '#D97706' : '#4B5563'} 
      strokeWidth="1"
    />
    <rect x="4" y="5" width="10" height="10" rx="1" fill={isGold ? '#F59E0B' : '#374151'}/>
    <rect x="16" y="5" width="4" height="4" rx="0.5" fill={isGold ? '#FDE68A' : '#9CA3AF'}/>
    <rect x="16" y="11" width="4" height="4" rx="0.5" fill={isGold ? '#FDE68A' : '#9CA3AF'}/>
    <rect x="22" y="5" width="6" height="10" rx="0.5" fill={isGold ? '#FDE68A' : '#9CA3AF'}/>
    {/* PCIe connector */}
    <rect x="5" y="18" width="3" height="4" fill={isGold ? '#D97706' : '#374151'}/>
    <rect x="10" y="18" width="3" height="4" fill={isGold ? '#D97706' : '#374151'}/>
    <rect x="19" y="18" width="3" height="4" fill={isGold ? '#D97706' : '#374151'}/>
    <rect x="24" y="18" width="3" height="4" fill={isGold ? '#D97706' : '#374151'}/>
  </svg>
);

// Cluster Label Badge
export const ClusterBadge = ({ 
  name, 
  color = 'gray',
  hasRHBoK = false,
}: { 
  name: string; 
  color?: 'red' | 'blue' | 'green' | 'gold' | 'gray';
  hasRHBoK?: boolean;
}) => {
  const colors = {
    red: 'border-red-500 bg-red-500/10',
    blue: 'border-blue-500 bg-blue-500/10',
    green: 'border-green-500 bg-green-500/10',
    gold: 'border-amber-500 bg-amber-500/10',
    gray: 'border-gray-500 bg-gray-500/10',
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${colors[color]}`}>
      {hasRHBoK && (
        <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center">
          <span className="text-[6px] text-white font-bold">RH</span>
        </div>
      )}
      <span className="text-white text-sm font-medium">{name}</span>
      {hasRHBoK && (
        <div className="w-5 h-5 rounded bg-gray-600 flex items-center justify-center">
          <span className="text-[6px] text-white">BoK</span>
        </div>
      )}
    </div>
  );
};

// Placement Badge
export const PlacementBadge = ({ name, color = 'red' }: { name: string; color?: 'red' | 'blue' | 'gold' }) => {
  const colors = {
    red: 'bg-gradient-to-r from-red-600 to-red-500',
    blue: 'bg-gradient-to-r from-blue-600 to-blue-500',
    gold: 'bg-gradient-to-r from-amber-600 to-amber-500',
  };

  return (
    <div className={`px-4 py-2 rounded-lg ${colors[color]} text-white text-sm font-medium shadow-lg`}>
      {name}
    </div>
  );
};

// Queue Box
export const QueueBox = ({ 
  localQueue, 
  clusterQueue, 
  color = 'red' 
}: { 
  localQueue: string; 
  clusterQueue: string; 
  color?: 'red' | 'blue' | 'gold';
}) => {
  const colors = {
    red: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-300' },
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-300' },
    gold: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-300' },
  };
  const c = colors[color];

  return (
    <div className={`px-4 py-3 rounded-lg ${c.bg} border ${c.border}`}>
      <div className="text-xs text-gray-400">Kueue: <span className={c.text}>{localQueue}</span></div>
      <div className="text-xs text-gray-400">MultiKueue: <span className={c.text}>{clusterQueue}</span></div>
    </div>
  );
};
