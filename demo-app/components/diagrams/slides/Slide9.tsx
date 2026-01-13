'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Hub cluster component
const HubCluster = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="relative"
  >
    <div 
      className="absolute inset-0 rounded-2xl"
      style={{ 
        background: `radial-gradient(circle, ${theme.redHatRedGlow} 0%, transparent 70%)`,
        filter: 'blur(30px)',
      }}
    />
    <div 
      className="relative p-6 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${theme.redHatRed}15 0%, ${theme.backgroundCard} 100%)`,
        border: `2px solid ${theme.redHatRed}50`,
        boxShadow: `0 8px 40px ${theme.redHatRedGlow}`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: theme.redHatRed }}
        >
          <span className="text-2xl">🏛️</span>
        </div>
        <div>
          <h3 className="font-bold text-lg" style={{ color: theme.white }}>
            RHACM Hub
          </h3>
          <p className="text-xs" style={{ color: theme.textMuted }}>
            Central Control Plane
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: '📋', label: 'MultiKueue', color: theme.gpuGreen },
          { icon: '🎯', label: 'Placement', color: theme.cyan },
          { icon: '🔌', label: 'Addon', color: theme.purpleLight },
          { icon: '📜', label: 'Policies', color: theme.amber },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.2 + i * 0.1 }}
            className="flex items-center gap-2 p-2 rounded-lg"
            style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-xs font-medium" style={{ color: item.color }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Worker cluster component
const WorkerCluster = ({
  label,
  gpus,
  type,
  color,
  delay,
}: {
  label: string;
  gpus: number;
  type: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-4 rounded-xl"
    style={{
      background: theme.backgroundCard,
      border: `1px solid ${color}30`,
    }}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-sm" style={{ color: theme.white }}>
        {label}
      </span>
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ background: theme.gpuGreen }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${color}15`, color }}>
        {type}
      </span>
      <span className="text-xs" style={{ color: theme.textMuted }}>
        {gpus} GPUs
      </span>
    </div>
  </motion.div>
);

// Flow arrow
const FlowArrow = ({ delay, label }: { delay: number; label: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="flex items-center gap-2"
  >
    <motion.div
      className="w-8 h-0.5"
      style={{ background: theme.gpuGreen }}
      animate={{ scaleX: [0.8, 1, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.svg 
      width="12" 
      height="12" 
      viewBox="0 0 12 12"
      style={{ color: theme.gpuGreen }}
    >
      <path 
        d="M 0 6 L 10 6 M 6 2 L 10 6 L 6 10" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
    </motion.svg>
    <span className="text-xs whitespace-nowrap" style={{ color: theme.textMuted }}>
      {label}
    </span>
  </motion.div>
);

// Benefit card
const BenefitCard = ({
  icon,
  title,
  description,
  color,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="p-4 rounded-xl"
    style={{
      background: theme.backgroundCard,
      border: `1px solid ${theme.glassBorder}`,
    }}
    whileHover={{ borderColor: color }}
  >
    <div className="flex items-start gap-3">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}15` }}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1" style={{ color: theme.white }}>
          {title}
        </h4>
        <p className="text-xs" style={{ color: theme.textMuted }}>
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function Slide9() {
  return (
    <div 
      className="w-full h-full flex flex-col p-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.gpuGreenGlow} 0%, transparent 60%)`,
            top: '-10%',
            right: '-15%',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.redHatRedGlow} 0%, transparent 60%)`,
            bottom: '-10%',
            left: '-10%',
          }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 relative z-10"
      >
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
          style={{ 
            background: `${theme.gpuGreen}15`,
            border: `1px solid ${theme.gpuGreen}30`,
          }}
        >
          <span style={{ color: theme.gpuGreen }} className="text-xs font-medium uppercase tracking-wider">
            The Solution
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-2">
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: theme.gradientRedGold }}
          >
            RHACM + MultiKueue
          </span>
        </h2>
        <p style={{ color: theme.textMuted }} className="text-lg max-w-2xl mx-auto">
          Unified multi-cluster GPU scheduling with intelligent workload placement
        </p>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex gap-8 relative z-10">
        {/* Left: Architecture diagram */}
        <div className="w-3/5 flex flex-col">
          {/* Hub */}
          <div className="flex justify-center mb-6">
            <HubCluster delay={0.3} />
          </div>

          {/* Arrows and worker clusters */}
          <div className="flex items-start justify-center gap-8">
            {/* Connections */}
            <div className="flex flex-col items-center gap-2">
              <FlowArrow delay={0.7} label="Dispatch" />
              <WorkerCluster
                label="GPU Cluster"
                gpus={8}
                type="H100"
                color={theme.gpuGreen}
                delay={0.8}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <FlowArrow delay={0.8} label="Dispatch" />
              <WorkerCluster
                label="ML Cluster"
                gpus={16}
                type="A100"
                color={theme.cyan}
                delay={0.9}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <FlowArrow delay={0.9} label="Dispatch" />
              <WorkerCluster
                label="Edge Cluster"
                gpus={4}
                type="T4"
                color={theme.amber}
                delay={1.0}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <FlowArrow delay={1.0} label="Dispatch" />
              <WorkerCluster
                label="Cloud Cluster"
                gpus={32}
                type="H100"
                color={theme.purpleLight}
                delay={1.1}
              />
            </div>
          </div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-6 p-4 rounded-xl"
            style={{
              background: theme.backgroundCard,
              border: `1px solid ${theme.glassBorder}`,
            }}
          >
            <h4 className="font-semibold mb-3" style={{ color: theme.white }}>
              How It Works
            </h4>
            <div className="flex items-center gap-4">
              {[
                { step: '1', text: 'Job submitted to Hub', color: theme.redHatRed },
                { step: '2', text: 'Placement selects clusters', color: theme.cyan },
                { step: '3', text: 'MultiKueue dispatches', color: theme.gpuGreen },
                { step: '4', text: 'Best cluster executes', color: theme.purpleLight },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: item.color, color: theme.white }}
                  >
                    {item.step}
                  </div>
                  <span className="text-xs" style={{ color: theme.textMuted }}>
                    {item.text}
                  </span>
                  {i < 3 && (
                    <motion.span
                      style={{ color: theme.gray500 }}
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    >
                      →
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Benefits */}
        <div className="w-2/5 flex flex-col justify-center gap-3">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold mb-2"
            style={{ color: theme.white }}
          >
            Key Benefits
          </motion.h3>
          
          <BenefitCard
            icon="🎯"
            title="Intelligent Placement"
            description="Automatic cluster selection based on GPU availability, labels, and scores"
            color={theme.cyan}
            delay={0.6}
          />
          <BenefitCard
            icon="📋"
            title="Unified Job Submission"
            description="Submit jobs once to the hub, let the system find the best cluster"
            color={theme.gpuGreen}
            delay={0.7}
          />
          <BenefitCard
            icon="⚖️"
            title="Fleet-Wide Quotas"
            description="Enforce resource policies across all clusters from a single point"
            color={theme.amber}
            delay={0.8}
          />
          <BenefitCard
            icon="📊"
            title="Central Observability"
            description="Single pane of glass for all GPU resources and job statuses"
            color={theme.purpleLight}
            delay={0.9}
          />
          <BenefitCard
            icon="🔄"
            title="Dynamic Rebalancing"
            description="Automatically route jobs to available capacity across the fleet"
            color={theme.redHatRed}
            delay={1.0}
          />

          {/* Result callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-2 p-4 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${theme.gpuGreen}15 0%, ${theme.cyan}10 100%)`,
              border: `1px solid ${theme.gpuGreen}30`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold" style={{ color: theme.gpuGreen }}>
                90%+
              </span>
              <div>
                <span className="text-sm font-semibold" style={{ color: theme.white }}>
                  GPU Utilization
                </span>
                <p className="text-xs" style={{ color: theme.textMuted }}>
                  Across the entire multi-cluster fleet
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
