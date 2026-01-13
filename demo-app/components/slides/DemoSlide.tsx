'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../diagrams/slides/shared/theme';

type Persona = 'admin' | 'scientist' | 'all';
type JobState = 'idle' | 'submitting' | 'queued' | 'routing' | 'running' | 'completed';

interface Cluster {
  id: string;
  name: string;
  icon: string;
  gpus: number;
  color: string;
}

const clusters: Cluster[] = [
  { id: 'cpu', name: 'Cheap CPUs', icon: '🖥️', gpus: 0, color: theme.cpuBlue },
  { id: 'gpu', name: 'Workhorse GPUs', icon: '⚡', gpus: 16, color: theme.gpuGreen },
  { id: 'mixed', name: 'Mixed', icon: '🔀', gpus: 8, color: theme.purple },
  { id: 'gold', name: 'Premium A100s', icon: '👑', gpus: 32, color: theme.goldAmber },
];

const queues = [
  { id: 'cpu-queue', name: 'CPULocalQueue', icon: '🖥️', color: theme.cpuBlue, targets: ['cpu'] },
  { id: 'gpu-queue', name: 'GPULocalQueue', icon: '⚡', color: theme.gpuGreen, targets: ['gpu', 'mixed'] },
  { id: 'gold-queue', name: 'GoldGPULocalQueue', icon: '👑', color: theme.goldAmber, targets: ['gold'] },
];

const statusMessages: Record<JobState, { icon: string; text: string; color: string }> = {
  idle: { icon: '⏸️', text: 'Ready - Click a queue to submit a job', color: theme.gray400 },
  submitting: { icon: '📤', text: 'Submitting job to hub...', color: theme.cpuBlue },
  queued: { icon: '📋', text: 'Job queued in ClusterQueue', color: theme.purple },
  routing: { icon: '🎯', text: 'Placement evaluating best cluster...', color: theme.goldAmber },
  running: { icon: '⚡', text: 'Job running on worker cluster!', color: theme.gpuGreen },
  completed: { icon: '✅', text: 'Job completed successfully!', color: theme.gpuGreen },
};

export default function DemoSlide({ persona }: { persona: Persona }) {
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);
  const [jobState, setJobState] = useState<JobState>('idle');
  const [targetCluster, setTargetCluster] = useState<string | null>(null);

  const submitJob = useCallback((queueId: string) => {
    if (jobState !== 'idle') return;

    const queue = queues.find(q => q.id === queueId);
    if (!queue) return;

    setSelectedQueue(queueId);
    setJobState('submitting');

    // Simulate job flow with timeouts
    setTimeout(() => setJobState('queued'), 600);
    setTimeout(() => setJobState('routing'), 1400);
    setTimeout(() => {
      // Pick target cluster with most GPUs from available targets
      const availableTargets = clusters.filter(c => queue.targets.includes(c.id));
      const target = availableTargets.reduce((best, c) => 
        c.gpus >= best.gpus ? c : best
      , availableTargets[0]);
      setTargetCluster(target.id);
      setJobState('running');
    }, 2400);
    setTimeout(() => setJobState('completed'), 4000);
    setTimeout(() => {
      setJobState('idle');
      setSelectedQueue(null);
      setTargetCluster(null);
    }, 5500);
  }, [jobState]);

  const status = statusMessages[jobState];

  return (
    <div 
      className="h-full flex flex-col px-8 py-4"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `radial-gradient(ellipse at top right, ${theme.purple}15 0%, transparent 50%),
                          radial-gradient(ellipse at bottom left, ${theme.redHatRed}10 0%, transparent 50%)`
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: theme.white }}>
          Interactive{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})` }}
          >
            Job Flow Demo
          </span>
        </h2>
        <p style={{ color: theme.gray400 }}>
          Click a queue to simulate job submission and see automatic routing
        </p>
      </motion.div>

      {/* Main visualization */}
      <div className="flex-1 flex items-center justify-center gap-8 relative">
        {/* Data Scientist on left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center"
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2"
            style={{ backgroundColor: `${theme.goldAmber}20` }}
          >
            🧪
          </div>
          <span className="text-xs" style={{ color: theme.gray400 }}>Data Scientist</span>
          <span className="text-[10px] mt-1" style={{ color: theme.gray600 }}>Submits to queue</span>
        </motion.div>

        {/* Queues */}
        <div className="flex flex-col gap-3">
          <div className="text-xs text-center mb-1" style={{ color: theme.gray500 }}>LocalQueues</div>
          {queues.map((queue, i) => (
            <motion.button
              key={queue.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => submitJob(queue.id)}
              disabled={jobState !== 'idle'}
              className="relative px-5 py-3 rounded-xl transition-all text-left border"
              style={{ 
                backgroundColor: selectedQueue === queue.id 
                  ? queue.color 
                  : `${theme.backgroundCard}cc`,
                borderColor: selectedQueue === queue.id 
                  ? queue.color 
                  : `${theme.gray700}50`,
                opacity: jobState !== 'idle' && selectedQueue !== queue.id ? 0.5 : 1,
                cursor: jobState !== 'idle' ? 'not-allowed' : 'pointer',
                transform: selectedQueue === queue.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedQueue === queue.id ? `0 0 20px ${queue.color}40` : 'none',
              }}
              whileHover={jobState === 'idle' ? { scale: 1.03 } : {}}
              whileTap={jobState === 'idle' ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{queue.icon}</span>
                <div>
                  <div className="font-medium text-sm" style={{ color: theme.white }}>{queue.name}</div>
                  <div className="text-[10px]" style={{ color: selectedQueue === queue.id ? theme.white : theme.gray500 }}>
                    Click to submit
                  </div>
                </div>
              </div>
              {selectedQueue === queue.id && jobState !== 'idle' && (
                <motion.div
                  className="absolute -right-1 -top-1 w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: theme.white }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Flow Arrow 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center"
        >
          <div 
            className="w-16 h-1 rounded-full transition-all duration-500"
            style={{ 
              background: (jobState === 'submitting' || jobState === 'queued')
                ? `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})`
                : theme.gray700
            }}
          >
            {(jobState === 'submitting' || jobState === 'queued') && (
              <motion.div
                className="h-full w-4 rounded-full"
                style={{ backgroundColor: `${theme.white}50` }}
                animate={{ x: [0, 48, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </div>
          <div style={{ color: theme.gray600 }}>→</div>
        </motion.div>

        {/* Hub / Placement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative flex flex-col items-center transition-all duration-300 ${
            jobState === 'routing' ? 'scale-110' : ''
          }`}
        >
          <div 
            className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all border-2"
            style={{ 
              backgroundColor: jobState === 'routing' 
                ? `${theme.redHatRed}30` 
                : `${theme.backgroundCard}cc`,
              borderColor: jobState === 'routing' 
                ? theme.goldAmber 
                : `${theme.gray700}50`,
              boxShadow: jobState === 'routing' ? `0 0 30px ${theme.goldAmber}30` : 'none'
            }}
          >
            <span className="text-4xl">🎯</span>
            <span className="text-[10px] mt-1" style={{ color: theme.gray400 }}>Placement</span>
          </div>
          <span className="text-xs mt-2" style={{ color: theme.gray600 }}>RHACM Hub</span>
          {jobState === 'routing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 text-[10px]"
              style={{ color: theme.goldAmber }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                Evaluating clusters...
              </motion.span>
            </motion.div>
          )}
        </motion.div>

        {/* Flow Arrow 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center"
        >
          <div style={{ color: theme.gray600 }}>→</div>
          <div 
            className="w-16 h-1 rounded-full transition-all duration-500"
            style={{ 
              background: (jobState === 'running' || jobState === 'completed')
                ? `linear-gradient(90deg, ${theme.goldAmber}, ${theme.gpuGreen})`
                : theme.gray700
            }}
          >
            {jobState === 'running' && (
              <motion.div
                className="h-full w-4 rounded-full"
                style={{ backgroundColor: `${theme.white}50` }}
                animate={{ x: [0, 48, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </div>
        </motion.div>

        {/* Clusters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 text-xs text-center mb-1" style={{ color: theme.gray500 }}>Worker Clusters</div>
          {clusters.map((cluster, i) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="px-4 py-3 rounded-xl transition-all duration-300 border-2"
              style={{ 
                backgroundColor: targetCluster === cluster.id 
                  ? `${theme.gpuGreen}30` 
                  : `${theme.backgroundCard}cc`,
                borderColor: targetCluster === cluster.id 
                  ? theme.gpuGreen 
                  : `${theme.gray700}50`,
                transform: targetCluster === cluster.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: targetCluster === cluster.id ? `0 0 20px ${theme.gpuGreen}20` : 'none'
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{cluster.icon}</span>
                <span className="text-sm font-medium" style={{ color: theme.white }}>{cluster.name}</span>
              </div>
              <div className="text-[10px]" style={{ color: theme.gray500 }}>
                {cluster.gpus > 0 ? `${cluster.gpus} GPUs available` : 'CPU only'}
              </div>
              {targetCluster === cluster.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-xs px-2 py-1 rounded-full text-center"
                  style={{ 
                    backgroundColor: jobState === 'completed' 
                      ? `${theme.gpuGreen}30` 
                      : `${theme.goldAmber}30`,
                    color: jobState === 'completed' 
                      ? theme.gpuGreen 
                      : theme.goldAmber
                  }}
                >
                  {jobState === 'completed' ? '✓ Completed!' : '⚡ Running...'}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 flex items-center justify-center"
      >
        <div 
          className="px-6 py-3 rounded-full flex items-center gap-3 transition-all border"
          style={{ 
            backgroundColor: `${theme.backgroundCard}cc`,
            borderColor: `${theme.gray700}50`,
            boxShadow: jobState !== 'idle' ? `0 0 20px ${status.color}20` : 'none'
          }}
        >
          <motion.span 
            className="text-xl"
            animate={jobState !== 'idle' && jobState !== 'completed' ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            {status.icon}
          </motion.span>
          <span className="text-sm font-medium" style={{ color: status.color }}>
            {status.text}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
