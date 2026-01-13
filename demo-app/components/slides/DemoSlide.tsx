'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

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
  { id: 'cpu', name: 'Cheap CPUs', icon: '🖥️', gpus: 0, color: 'blue' },
  { id: 'gpu', name: 'Workhorse GPUs', icon: '⚡', gpus: 16, color: 'green' },
  { id: 'mixed', name: 'Mixed', icon: '🔀', gpus: 8, color: 'purple' },
  { id: 'gold', name: 'Premium A100s', icon: '👑', gpus: 32, color: 'amber' },
];

const queues = [
  { id: 'cpu-queue', name: 'CPULocalQueue', icon: '🖥️', color: 'from-blue-500 to-blue-600', targets: ['cpu'] },
  { id: 'gpu-queue', name: 'GPULocalQueue', icon: '⚡', color: 'from-green-500 to-green-600', targets: ['gpu', 'mixed'] },
  { id: 'gold-queue', name: 'GoldGPULocalQueue', icon: '👑', color: 'from-amber-500 to-amber-600', targets: ['gold'] },
];

const statusMessages: Record<JobState, { icon: string; text: string; color: string }> = {
  idle: { icon: '⏸️', text: 'Ready - Click a queue to submit a job', color: 'text-gray-400' },
  submitting: { icon: '📤', text: 'Submitting job to hub...', color: 'text-blue-400' },
  queued: { icon: '📋', text: 'Job queued in ClusterQueue', color: 'text-purple-400' },
  routing: { icon: '🎯', text: 'Placement evaluating best cluster...', color: 'text-amber-400' },
  running: { icon: '⚡', text: 'Job running on worker cluster!', color: 'text-green-400' },
  completed: { icon: '✅', text: 'Job completed successfully!', color: 'text-green-400' },
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
    <div className="h-full flex flex-col px-8 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Interactive{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
            Job Flow Demo
          </span>
        </h2>
        <p className="text-gray-400">
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
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-3xl mb-2">
            🧪
          </div>
          <span className="text-xs text-gray-400">Data Scientist</span>
          <span className="text-[10px] text-gray-600 mt-1">Submits to queue</span>
        </motion.div>

        {/* Queues */}
        <div className="flex flex-col gap-3">
          <div className="text-xs text-gray-500 text-center mb-1">LocalQueues</div>
          {queues.map((queue, i) => (
            <motion.button
              key={queue.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => submitJob(queue.id)}
              disabled={jobState !== 'idle'}
              className={`relative px-5 py-3 rounded-xl transition-all text-left ${
                selectedQueue === queue.id
                  ? `bg-gradient-to-r ${queue.color} text-white shadow-xl scale-105`
                  : jobState !== 'idle'
                  ? 'glass opacity-50 cursor-not-allowed'
                  : 'glass hover:bg-white/10 cursor-pointer'
              }`}
              whileHover={jobState === 'idle' ? { scale: 1.03 } : {}}
              whileTap={jobState === 'idle' ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{queue.icon}</span>
                <div>
                  <div className="font-medium text-sm">{queue.name}</div>
                  <div className="text-[10px] opacity-70">Click to submit</div>
                </div>
              </div>
              {selectedQueue === queue.id && jobState !== 'idle' && (
                <motion.div
                  className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-white shadow-lg"
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
          <div className={`w-16 h-1 rounded-full transition-all duration-500 ${
            jobState === 'submitting' || jobState === 'queued' 
              ? 'bg-gradient-to-r from-red-500 to-amber-500' 
              : 'bg-gray-700'
          }`}>
            {(jobState === 'submitting' || jobState === 'queued') && (
              <motion.div
                className="h-full w-4 bg-white/50 rounded-full"
                animate={{ x: [0, 48, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </div>
          <div className="text-gray-600">→</div>
        </motion.div>

        {/* Hub / Placement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative flex flex-col items-center transition-all duration-300 ${
            jobState === 'routing' ? 'scale-110' : ''
          }`}
        >
          <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all ${
            jobState === 'routing'
              ? 'bg-gradient-to-br from-red-500/40 to-amber-500/40 border-2 border-amber-500 shadow-xl shadow-amber-500/30'
              : 'glass'
          }`}>
            <span className="text-4xl">🎯</span>
            <span className="text-[10px] text-gray-400 mt-1">Placement</span>
          </div>
          <span className="text-xs text-gray-600 mt-2">RHACM Hub</span>
          {jobState === 'routing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 text-[10px] text-amber-400"
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
          <div className="text-gray-600">→</div>
          <div className={`w-16 h-1 rounded-full transition-all duration-500 ${
            jobState === 'running' || jobState === 'completed'
              ? 'bg-gradient-to-r from-amber-500 to-green-500' 
              : 'bg-gray-700'
          }`}>
            {jobState === 'running' && (
              <motion.div
                className="h-full w-4 bg-white/50 rounded-full"
                animate={{ x: [0, 48, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </div>
        </motion.div>

        {/* Clusters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 text-xs text-gray-500 text-center mb-1">Worker Clusters</div>
          {clusters.map((cluster, i) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                targetCluster === cluster.id
                  ? 'bg-green-500/30 border-2 border-green-500 shadow-lg shadow-green-500/20 scale-105'
                  : 'glass'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{cluster.icon}</span>
                <span className="text-white text-sm font-medium">{cluster.name}</span>
              </div>
              <div className="text-[10px] text-gray-500">
                {cluster.gpus > 0 ? `${cluster.gpus} GPUs available` : 'CPU only'}
              </div>
              {targetCluster === cluster.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`mt-2 text-xs px-2 py-1 rounded-full text-center ${
                    jobState === 'completed'
                      ? 'bg-green-500/30 text-green-300'
                      : 'bg-amber-500/30 text-amber-300 animate-pulse'
                  }`}
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
        <div className={`glass px-6 py-3 rounded-full flex items-center gap-3 transition-all ${
          jobState !== 'idle' ? 'shadow-lg' : ''
        }`}>
          <motion.span 
            className="text-xl"
            animate={jobState !== 'idle' && jobState !== 'completed' ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            {status.icon}
          </motion.span>
          <span className={`text-sm font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
