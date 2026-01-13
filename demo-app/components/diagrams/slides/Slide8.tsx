'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Cluster node component
const ClusterNode = ({
  label,
  type,
  status,
  gpus,
  position,
  delay,
}: {
  label: string;
  type: 'hub' | 'worker';
  status: 'available' | 'busy' | 'offline';
  gpus?: number;
  position: { x: number; y: number };
  delay: number;
}) => {
  const statusColors = {
    available: theme.gpuGreen,
    busy: theme.amber,
    offline: theme.gray500,
  };
  
  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring' }}
    >
      <div 
        className="relative p-4 rounded-2xl"
        style={{
          background: type === 'hub' 
            ? `linear-gradient(135deg, ${theme.redHatRed}15 0%, ${theme.backgroundCard} 100%)`
            : theme.backgroundCard,
          border: `2px solid ${type === 'hub' ? theme.redHatRed : theme.glassBorder}`,
          boxShadow: type === 'hub' ? `0 4px 30px ${theme.redHatRedGlow}` : undefined,
        }}
      >
        {/* Status indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ background: statusColors[status] }}
          animate={status === 'available' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{type === 'hub' ? '🏛️' : '🖥️'}</span>
          <span className="font-semibold text-sm" style={{ color: theme.white }}>
            {label}
          </span>
        </div>
        
        {gpus !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: theme.gpuGreen }}>⬢</span>
            <span className="text-xs" style={{ color: theme.textMuted }}>
              {gpus} GPUs
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Pain point card
const PainPoint = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-3 p-4 rounded-xl"
    style={{
      background: `linear-gradient(135deg, ${theme.redHatRed}08 0%, transparent 100%)`,
      border: `1px solid ${theme.redHatRed}20`,
    }}
  >
    <div 
      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: `${theme.redHatRed}15` }}
    >
      <span className="text-xl">{icon}</span>
    </div>
    <div>
      <h4 className="font-semibold mb-1" style={{ color: theme.white }}>
        {title}
      </h4>
      <p className="text-xs" style={{ color: theme.textMuted }}>
        {description}
      </p>
    </div>
  </motion.div>
);

export default function Slide8() {
  return (
    <div 
      className="w-full h-full flex p-8 gap-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.redHatRedGlow} 0%, transparent 60%)`,
            top: '-15%',
            left: '30%',
          }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Left: Visualization */}
      <div className="w-1/2 flex flex-col relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ 
              background: `${theme.amber}15`,
              border: `1px solid ${theme.amber}30`,
            }}
          >
            <span style={{ color: theme.amber }} className="text-xs font-medium uppercase tracking-wider">
              The Challenge
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-2">
            <span style={{ color: theme.white }}>Multi-Cluster </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: theme.gradientRedGold }}
            >
              Complexity
            </span>
          </h2>
          <p style={{ color: theme.textMuted }} className="text-lg">
            Single-cluster Kueue doesn't scale to enterprise multi-cluster environments
          </p>
        </motion.div>

        {/* Cluster diagram */}
        <div className="flex-1 relative min-h-[350px]">
          {/* Connection lines showing fragmentation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Dashed lines indicating lack of coordination */}
            <motion.path
              d="M 160 100 L 60 200"
              stroke={theme.gray500}
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.8 }}
            />
            <motion.path
              d="M 160 100 L 160 200"
              stroke={theme.gray500}
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.9 }}
            />
            <motion.path
              d="M 160 100 L 260 200"
              stroke={theme.gray500}
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.0 }}
            />
            <motion.path
              d="M 160 100 L 360 200"
              stroke={theme.gray500}
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.1 }}
            />
          </svg>

          {/* Question marks indicating confusion */}
          <motion.div
            className="absolute text-4xl"
            style={{ left: 90, top: 140, color: theme.amber }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -5, 0] }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
          >
            ?
          </motion.div>
          <motion.div
            className="absolute text-4xl"
            style={{ left: 200, top: 130, color: theme.amber }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -5, 0] }}
            transition={{ delay: 1.4, duration: 2, repeat: Infinity }}
          >
            ?
          </motion.div>

          {/* Clusters */}
          <ClusterNode
            label="Manual Management"
            type="hub"
            status="busy"
            position={{ x: 80, y: 20 }}
            delay={0.3}
          />
          <ClusterNode
            label="Cluster A"
            type="worker"
            status="available"
            gpus={8}
            position={{ x: 0, y: 180 }}
            delay={0.5}
          />
          <ClusterNode
            label="Cluster B"
            type="worker"
            status="busy"
            gpus={4}
            position={{ x: 100, y: 240 }}
            delay={0.6}
          />
          <ClusterNode
            label="Cluster C"
            type="worker"
            status="available"
            gpus={16}
            position={{ x: 200, y: 180 }}
            delay={0.7}
          />
          <ClusterNode
            label="Cluster D"
            type="worker"
            status="offline"
            gpus={8}
            position={{ x: 300, y: 240 }}
            delay={0.8}
          />

          {/* Manual process arrows */}
          <motion.div
            className="absolute px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ 
              left: 280, 
              top: 60,
              background: `${theme.redHatRed}15`,
              border: `1px solid ${theme.redHatRed}30`,
              color: theme.redHatRedLight,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            ❌ No coordination
          </motion.div>
        </div>
      </div>

      {/* Right: Pain points */}
      <div className="w-1/2 flex flex-col justify-center gap-4 relative z-10">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-semibold mb-2"
          style={{ color: theme.white }}
        >
          Pain Points Without Multi-Cluster Management
        </motion.h3>

        <PainPoint
          icon="🔀"
          title="Manual Job Routing"
          description="Users must know which cluster to submit jobs to, and manually move jobs between clusters"
          delay={0.5}
        />
        <PainPoint
          icon="📊"
          title="Fragmented Visibility"
          description="No single pane of glass for viewing cluster capacity, GPU availability, or job status"
          delay={0.6}
        />
        <PainPoint
          icon="⚖️"
          title="Inconsistent Quotas"
          description="Each cluster has independent quotas - no way to enforce org-wide resource policies"
          delay={0.7}
        />
        <PainPoint
          icon="🚫"
          title="Resource Silos"
          description="GPUs sit idle in one cluster while jobs queue in another with no automatic rebalancing"
          delay={0.8}
        />
        <PainPoint
          icon="🔧"
          title="Operational Overhead"
          description="Platform teams spend time firefighting instead of building. Each cluster is a snowflake."
          delay={0.9}
        />

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-4 p-4 rounded-xl"
          style={{
            background: theme.glassBg,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            <span style={{ color: theme.amber }} className="font-semibold">Result:</span>{' '}
            GPU utilization drops to 30-50% across the fleet, 
            while data scientists wait for resources
          </p>
        </motion.div>
      </div>
    </div>
  );
}
