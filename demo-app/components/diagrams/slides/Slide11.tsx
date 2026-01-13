'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './shared/theme';
import { useState, useEffect } from 'react';

// Job packet that animates through the system
const JobPacket = ({
  id,
  type,
  status,
  position,
}: {
  id: number;
  type: 'training' | 'inference' | 'agent';
  status: 'submitted' | 'queued' | 'dispatching' | 'running' | 'complete';
  position: { x: number; y: number };
}) => {
  const colors = {
    training: theme.gpuGreen,
    inference: theme.cyan,
    agent: theme.purpleLight,
  };
  
  const icons = {
    training: '🧠',
    inference: '⚡',
    agent: '🤖',
  };

  return (
    <motion.div
      className="absolute z-20"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center relative"
        style={{
          background: `${colors[type]}20`,
          border: `2px solid ${colors[type]}`,
          boxShadow: `0 0 20px ${colors[type]}40`,
        }}
        animate={status === 'running' ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: status === 'running' ? Infinity : 0 }}
      >
        <span className="text-lg">{icons[type]}</span>
        {status === 'complete' && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: theme.gpuGreen }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <span className="text-xs">✓</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// System component (Hub, Queue, Cluster)
const SystemNode = ({
  icon,
  label,
  type,
  position,
  size = 'normal',
  highlight,
}: {
  icon: string;
  label: string;
  type: 'hub' | 'queue' | 'cluster' | 'user';
  position: { x: number; y: number };
  size?: 'small' | 'normal' | 'large';
  highlight?: boolean;
}) => {
  const sizes = {
    small: { box: 'w-14 h-14', icon: 'text-xl', font: 'text-xs' },
    normal: { box: 'w-20 h-20', icon: 'text-3xl', font: 'text-sm' },
    large: { box: 'w-24 h-24', icon: 'text-4xl', font: 'text-base' },
  };
  
  const colors = {
    hub: theme.redHatRed,
    queue: theme.amber,
    cluster: theme.gpuGreen,
    user: theme.cyan,
  };

  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className={`${sizes[size].box} rounded-2xl flex flex-col items-center justify-center relative`}
        style={{
          background: highlight 
            ? `linear-gradient(135deg, ${colors[type]}25 0%, ${theme.backgroundCard} 100%)`
            : theme.backgroundCard,
          border: `2px solid ${highlight ? colors[type] : theme.glassBorder}`,
          boxShadow: highlight ? `0 4px 30px ${colors[type]}30` : undefined,
        }}
        animate={highlight ? { borderColor: [colors[type], `${colors[type]}80`, colors[type]] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className={sizes[size].icon}>{icon}</span>
      </motion.div>
      <div className={`text-center mt-2 ${sizes[size].font} font-medium`} style={{ color: theme.textSecondary }}>
        {label}
      </div>
    </motion.div>
  );
};

// Connection path
const ConnectionPath = ({
  from,
  to,
  active,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active?: boolean;
}) => (
  <svg className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={active ? theme.gpuGreen : theme.gray600}
      strokeWidth={active ? 3 : 2}
      strokeDasharray={active ? "0" : "8 4"}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: active ? 0.8 : 0.3 }}
      transition={{ duration: 0.5 }}
    />
    {active && (
      <motion.circle
        r="4"
        fill={theme.gpuGreen}
        style={{ filter: `drop-shadow(0 0 6px ${theme.gpuGreen})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <animateMotion
          dur="1.5s"
          repeatCount="indefinite"
          path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
        />
      </motion.circle>
    )}
  </svg>
);

export default function Slide11() {
  const [step, setStep] = useState(0);
  const [jobs, setJobs] = useState<Array<{
    id: number;
    type: 'training' | 'inference' | 'agent';
    status: 'submitted' | 'queued' | 'dispatching' | 'running' | 'complete';
    position: { x: number; y: number };
  }>>([]);

  // Animation sequence
  useEffect(() => {
    const sequence = [
      // Step 1: Jobs appear at user
      () => {
        setJobs([
          { id: 1, type: 'training', status: 'submitted', position: { x: 60, y: 150 } },
          { id: 2, type: 'inference', status: 'submitted', position: { x: 60, y: 200 } },
          { id: 3, type: 'agent', status: 'submitted', position: { x: 60, y: 250 } },
        ]);
        setStep(1);
      },
      // Step 2: Jobs move to hub queue
      () => {
        setJobs(prev => prev.map(j => ({
          ...j,
          status: 'queued',
          position: { x: 250, y: j.position.y - 20 },
        })));
        setStep(2);
      },
      // Step 3: Jobs dispatching
      () => {
        setJobs(prev => prev.map(j => ({
          ...j,
          status: 'dispatching',
          position: { x: 420, y: j.position.y },
        })));
        setStep(3);
      },
      // Step 4: Jobs running on clusters
      () => {
        setJobs(prev => prev.map((j, i) => ({
          ...j,
          status: 'running',
          position: { x: 580, y: 100 + i * 90 },
        })));
        setStep(4);
      },
      // Step 5: Jobs complete
      () => {
        setJobs(prev => prev.map(j => ({
          ...j,
          status: 'complete',
        })));
        setStep(5);
      },
      // Reset
      () => {
        setJobs([]);
        setStep(0);
      },
    ];

    const timers: NodeJS.Timeout[] = [];
    let totalDelay = 1000;
    
    sequence.forEach((fn, i) => {
      timers.push(setTimeout(fn, totalDelay));
      totalDelay += i === sequence.length - 1 ? 2000 : 1500;
    });

    // Loop the animation
    const loopTimer = setInterval(() => {
      setJobs([]);
      setStep(0);
      let delay = 1000;
      sequence.forEach((fn, i) => {
        timers.push(setTimeout(fn, delay));
        delay += i === sequence.length - 1 ? 2000 : 1500;
      });
    }, totalDelay);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, []);

  const steps = [
    { label: 'Submit', active: step >= 1 },
    { label: 'Queue', active: step >= 2 },
    { label: 'Dispatch', active: step >= 3 },
    { label: 'Execute', active: step >= 4 },
    { label: 'Complete', active: step >= 5 },
  ];

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
            top: '10%',
            right: '-10%',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 relative z-10"
      >
        <h2 className="text-3xl font-bold mb-2">
          <span style={{ color: theme.white }}>Job Flow </span>
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: theme.gradientGreenCyan }}
          >
            Animation
          </span>
        </h2>
        <p style={{ color: theme.textMuted }}>
          Watch jobs flow from submission through multi-cluster execution
        </p>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center gap-2 mb-6 relative z-10"
      >
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: s.active ? `${theme.gpuGreen}20` : theme.backgroundCard,
                border: `1px solid ${s.active ? theme.gpuGreen : theme.glassBorder}`,
              }}
              animate={s.active ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: s.active ? theme.gpuGreen : theme.gray500 }}
              />
              <span 
                className="text-xs font-medium"
                style={{ color: s.active ? theme.gpuGreen : theme.textMuted }}
              >
                {s.label}
              </span>
            </motion.div>
            {i < steps.length - 1 && (
              <div 
                className="w-4 h-0.5 mx-1"
                style={{ background: s.active && steps[i + 1].active ? theme.gpuGreen : theme.gray600 }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Main visualization */}
      <div className="flex-1 relative z-10">
        <div className="relative w-full h-full" style={{ minHeight: 400 }}>
          {/* Connection paths */}
          <ConnectionPath from={{ x: 100, y: 200 }} to={{ x: 250, y: 200 }} active={step >= 1} />
          <ConnectionPath from={{ x: 330, y: 200 }} to={{ x: 450, y: 200 }} active={step >= 2} />
          <ConnectionPath from={{ x: 530, y: 160 }} to={{ x: 620, y: 120 }} active={step >= 3} />
          <ConnectionPath from={{ x: 530, y: 200 }} to={{ x: 620, y: 200 }} active={step >= 3} />
          <ConnectionPath from={{ x: 530, y: 240 }} to={{ x: 620, y: 280 }} active={step >= 3} />

          {/* System nodes */}
          <SystemNode icon="👤" label="User" type="user" position={{ x: 20, y: 160 }} highlight={step === 1} />
          <SystemNode icon="🏛️" label="RHACM Hub" type="hub" position={{ x: 220, y: 140 }} size="large" highlight={step === 2} />
          <SystemNode icon="📋" label="MultiKueue" type="queue" position={{ x: 420, y: 150 }} highlight={step === 3} />
          <SystemNode icon="🖥️" label="GPU Cluster A" type="cluster" position={{ x: 600, y: 60 }} size="small" highlight={step >= 4} />
          <SystemNode icon="🖥️" label="GPU Cluster B" type="cluster" position={{ x: 600, y: 150 }} size="small" highlight={step >= 4} />
          <SystemNode icon="🖥️" label="GPU Cluster C" type="cluster" position={{ x: 600, y: 240 }} size="small" highlight={step >= 4} />

          {/* Animated job packets */}
          <AnimatePresence>
            {jobs.map(job => (
              <JobPacket key={job.id} {...job} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-6 relative z-10"
      >
        {[
          { icon: '🧠', label: 'Training Job', color: theme.gpuGreen },
          { icon: '⚡', label: 'Inference Job', color: theme.cyan },
          { icon: '🤖', label: 'Agent Workload', color: theme.purpleLight },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
            >
              <span className="text-sm">{item.icon}</span>
            </div>
            <span className="text-xs" style={{ color: theme.textMuted }}>{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
