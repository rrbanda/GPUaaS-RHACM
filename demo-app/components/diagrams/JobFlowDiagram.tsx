'use client';

import { motion } from 'framer-motion';

interface JobFlowDiagramProps {
  selectedQueue: string | null;
  jobState: 'idle' | 'submitting' | 'queued' | 'routing' | 'running' | 'completed';
  targetCluster: string | null;
}

const queues = [
  { id: 'cpu-queue', name: 'CPU Queue', color: 'blue', icon: '🖥️' },
  { id: 'gpu-queue', name: 'GPU Queue', color: 'green', icon: '⚡' },
  { id: 'gold-queue', name: 'Gold Queue', color: 'amber', icon: '👑' },
];

const clusters = [
  { id: 'cpu', name: 'Cheap CPUs', icon: '🖥️', gpus: 0 },
  { id: 'gpu', name: 'Workhorse', icon: '⚡', gpus: 16 },
  { id: 'mixed', name: 'Mixed', icon: '🔀', gpus: 8 },
  { id: 'gold', name: 'Premium', icon: '👑', gpus: 32 },
];

export default function JobFlowDiagram({ selectedQueue, jobState, targetCluster }: JobFlowDiagramProps) {
  // Calculate job position based on state
  const getJobPosition = () => {
    switch (jobState) {
      case 'idle': return { x: 0, opacity: 0 };
      case 'submitting': return { x: 50, opacity: 1 };
      case 'queued': return { x: 150, opacity: 1 };
      case 'routing': return { x: 280, opacity: 1 };
      case 'running': return { x: 420, opacity: 1 };
      case 'completed': return { x: 420, opacity: 0.5 };
      default: return { x: 0, opacity: 0 };
    }
  };

  const jobPos = getJobPosition();

  return (
    <div className="w-full h-full flex items-center justify-between px-8 py-4 relative">
      {/* Background flow lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(239,68,68,0.3)" />
            <stop offset="50%" stopColor="rgba(245,158,11,0.3)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0.3)" />
          </linearGradient>
        </defs>
        <path
          d="M 120 200 Q 250 200 350 200 Q 450 200 550 150"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
        <path
          d="M 120 200 Q 250 200 350 200 Q 450 200 550 200"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
        <path
          d="M 120 200 Q 250 200 350 200 Q 450 200 550 250"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
      </svg>

      {/* Queues Section */}
      <div className="flex flex-col gap-3 z-10">
        <div className="text-xs text-gray-500 text-center mb-1">LocalQueues</div>
        {queues.map((queue) => (
          <motion.div
            key={queue.id}
            className={`relative px-4 py-3 rounded-xl cursor-pointer transition-all ${
              selectedQueue === queue.id
                ? `bg-${queue.color}-500/30 border-2 border-${queue.color}-500 shadow-lg shadow-${queue.color}-500/20`
                : 'glass hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{queue.icon}</span>
              <span className="text-white text-sm font-medium">{queue.name}</span>
            </div>
            {selectedQueue === queue.id && jobState !== 'idle' && (
              <motion.div
                className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-amber-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Hub / Placement Section */}
      <div className="flex flex-col items-center z-10">
        <motion.div
          className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all ${
            jobState === 'routing'
              ? 'bg-gradient-to-br from-red-500/30 to-amber-500/30 border-2 border-amber-500 shadow-lg shadow-amber-500/30'
              : 'glass'
          }`}
          animate={jobState === 'routing' ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          <span className="text-3xl">🎯</span>
          <span className="text-xs text-gray-400 mt-1">Placement</span>
          {jobState === 'routing' && (
            <motion.span
              className="text-[10px] text-amber-400 mt-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              Evaluating...
            </motion.span>
          )}
        </motion.div>
        <div className="text-xs text-gray-600 mt-2">RHACM Hub</div>
      </div>

      {/* Clusters Section */}
      <div className="grid grid-cols-2 gap-3 z-10">
        <div className="col-span-2 text-xs text-gray-500 text-center mb-1">Worker Clusters</div>
        {clusters.map((cluster) => (
          <motion.div
            key={cluster.id}
            className={`px-4 py-3 rounded-xl transition-all ${
              targetCluster === cluster.id
                ? 'bg-green-500/20 border-2 border-green-500 shadow-lg shadow-green-500/20'
                : 'glass'
            }`}
            animate={targetCluster === cluster.id && jobState === 'running' ? { scale: [1, 1.02, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{cluster.icon}</span>
              <span className="text-white text-sm font-medium">{cluster.name}</span>
            </div>
            <div className="text-xs text-gray-500">
              {cluster.gpus > 0 ? `${cluster.gpus} GPUs` : 'CPU only'}
            </div>
            {targetCluster === cluster.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`mt-2 text-xs px-2 py-1 rounded-full text-center ${
                  jobState === 'completed'
                    ? 'bg-green-500/30 text-green-300'
                    : 'bg-amber-500/30 text-amber-300'
                }`}
              >
                {jobState === 'completed' ? '✓ Complete' : '⚡ Running'}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Animated Job Packet */}
      {jobState !== 'idle' && (
        <motion.div
          className="absolute z-20"
          initial={{ x: 80, y: 180, opacity: 0 }}
          animate={{
            x: jobPos.x,
            opacity: jobPos.opacity,
            y: targetCluster === 'cpu' || targetCluster === 'gpu' ? 150 : 
               targetCluster === 'mixed' || targetCluster === 'gold' ? 220 : 180,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <motion.div
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-amber-500 shadow-lg"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(239,68,68,0.5)',
                '0 0 40px rgba(245,158,11,0.5)',
                '0 0 20px rgba(239,68,68,0.5)',
              ]
            }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <span className="text-lg">📦</span>
            <span className="text-white text-xs font-medium">Job</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
