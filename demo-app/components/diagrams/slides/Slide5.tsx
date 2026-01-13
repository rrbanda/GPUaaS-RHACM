'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';
import { useState, useEffect } from 'react';

// GPU utilization bar
const UtilizationBar = ({ 
  label, 
  beforeValue, 
  afterValue,
  color,
  delay,
}: {
  label: string;
  beforeValue: number;
  afterValue: number;
  color: string;
  delay: number;
}) => {
  const [showAfter, setShowAfter] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowAfter(true), 2000 + delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span style={{ color: theme.textSecondary }} className="text-sm font-medium">
          {label}
        </span>
        <motion.span 
          style={{ color: showAfter ? theme.gpuGreen : theme.amber }} 
          className="text-sm font-bold"
          key={showAfter ? 'after' : 'before'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {showAfter ? afterValue : beforeValue}%
        </motion.span>
      </div>
      <div 
        className="h-3 rounded-full overflow-hidden"
        style={{ background: theme.backgroundCard }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${showAfter ? afterValue : beforeValue}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ background: showAfter ? theme.gpuGreen : theme.amber }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.white}30, transparent)`,
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Kueue feature card
const KueueFeature = ({
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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-4 rounded-xl group cursor-pointer"
    style={{
      background: theme.backgroundCard,
      border: `1px solid ${theme.glassBorder}`,
    }}
    whileHover={{ 
      borderColor: theme.gpuGreen,
      y: -2,
    }}
  >
    <div className="flex items-start gap-3">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${theme.gpuGreen}15` }}
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
    </div>
  </motion.div>
);

// Animated GPU cluster visualization
const GPUCluster = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="relative"
  >
    <div 
      className="absolute inset-0 rounded-2xl"
      style={{ 
        background: `radial-gradient(circle, ${theme.gpuGreenGlow} 0%, transparent 70%)`,
        filter: 'blur(30px)',
      }}
    />
    <div 
      className="relative p-6 rounded-2xl"
      style={{
        background: theme.backgroundCard,
        border: `1px solid ${theme.gpuGreen}30`,
      }}
    >
      <div className="grid grid-cols-4 gap-2">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `${theme.gpuGreen}20`,
              border: `1px solid ${theme.gpuGreen}40`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1, 0.98],
            }}
            transition={{
              delay: delay + i * 0.05,
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg className="w-5 h-5" style={{ color: theme.gpuGreen }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h2v2H6V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zM6 12h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
            </svg>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="text-xs font-medium" style={{ color: theme.gpuGreen }}>
          GPU Pool • 16 H100s
        </span>
      </div>
    </div>
  </motion.div>
);

export default function Slide5() {
  return (
    <div 
      className="w-full h-full flex flex-col p-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.gpuGreenGlow} 0%, transparent 60%)`,
            top: '-10%',
            right: '-15%',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.cyanGlow} 0%, transparent 60%)`,
            bottom: '10%',
            left: '-10%',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
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
            Scheduling
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-2">
          <span style={{ color: theme.white }}>GPU-as-a-Service with </span>
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: theme.gradientGreenCyan }}
          >
            Kueue
          </span>
        </h2>
        <p style={{ color: theme.textMuted }} className="text-lg">
          Kubernetes-native workload management for ML & AI workloads
        </p>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex gap-8 relative z-10">
        {/* Left: Utilization improvement */}
        <div className="w-1/3 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl mb-6"
            style={{
              background: theme.backgroundCard,
              border: `1px solid ${theme.glassBorder}`,
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.white }}>
              GPU Utilization Improvement
            </h3>
            <UtilizationBar 
              label="Cluster A" 
              beforeValue={35} 
              afterValue={92} 
              color={theme.gpuGreen} 
              delay={0.5}
            />
            <UtilizationBar 
              label="Cluster B" 
              beforeValue={42} 
              afterValue={88} 
              color={theme.gpuGreen} 
              delay={0.7}
            />
            <UtilizationBar 
              label="Cluster C" 
              beforeValue={28} 
              afterValue={95} 
              color={theme.gpuGreen} 
              delay={0.9}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="mt-4 pt-4 border-t flex items-center justify-between"
              style={{ borderColor: theme.glassBorder }}
            >
              <span style={{ color: theme.textMuted }} className="text-sm">Average</span>
              <div className="flex items-center gap-3">
                <span style={{ color: theme.amber }} className="text-lg font-bold">35%</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ color: theme.textMuted }}
                >→</motion.span>
                <span style={{ color: theme.gpuGreen }} className="text-lg font-bold">92%</span>
              </div>
            </motion.div>
          </motion.div>

          <GPUCluster delay={1.1} />
        </div>

        {/* Middle: Kueue features */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-semibold mb-2"
            style={{ color: theme.white }}
          >
            Kueue Capabilities
          </motion.h3>
          
          <div className="grid grid-cols-2 gap-3">
            <KueueFeature
              icon="📋"
              title="Job Queueing"
              description="Queue jobs when resources aren't available, admit when ready"
              delay={0.5}
            />
            <KueueFeature
              icon="⚖️"
              title="Resource Quotas"
              description="Nominal quotas with cohort-based borrowing for flexibility"
              delay={0.6}
            />
            <KueueFeature
              icon="🎯"
              title="Fair Sharing"
              description="Weighted fair scheduling across teams and namespaces"
              delay={0.7}
            />
            <KueueFeature
              icon="🏆"
              title="Priority Classes"
              description="Deterministic scheduling under contention with preemption"
              delay={0.8}
            />
            <KueueFeature
              icon="⏸️"
              title="Preemption"
              description="Suspend lower-priority jobs instead of terminating"
              delay={0.9}
            />
            <KueueFeature
              icon="🔗"
              title="Gang Scheduling"
              description="All-or-nothing admission for distributed training"
              delay={1.0}
            />
          </div>
        </div>

        {/* Right: Visual flow */}
        <div className="w-1/4 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="relative"
          >
            {/* Flow visualization */}
            {[
              { icon: '📥', label: 'Jobs Submitted', color: theme.cyan },
              { icon: '📋', label: 'LocalQueue', color: theme.amber },
              { icon: '🏢', label: 'ClusterQueue', color: theme.purpleLight },
              { icon: '✅', label: 'Admission', color: theme.gpuGreen },
              { icon: '🚀', label: 'Running', color: theme.redHatRed },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.15 }}
                className="relative"
              >
                <div 
                  className="flex items-center gap-3 p-3 rounded-xl mb-2"
                  style={{
                    background: `${step.color}10`,
                    border: `1px solid ${step.color}25`,
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${step.color}20` }}
                  >
                    <span className="text-xl">{step.icon}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    {step.label}
                  </span>
                </div>
                {i < 4 && (
                  <motion.div
                    className="w-0.5 h-4 mx-auto"
                    style={{ background: `${theme.glassBorder}` }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
