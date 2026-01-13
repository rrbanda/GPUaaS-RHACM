'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ArchitectureDiagramProps {
  step: number;
}

// Cluster component
const Cluster = ({ 
  name, 
  type, 
  icon, 
  delay = 0,
  hasKueue = false,
  hasRHBoK = false,
}: { 
  name: string; 
  type: 'hub' | 'gpu' | 'cpu' | 'mixed' | 'gold';
  icon: string;
  delay?: number;
  hasKueue?: boolean;
  hasRHBoK?: boolean;
}) => {
  const colors = {
    hub: 'from-red-500/20 to-red-600/20 border-red-500/40',
    gpu: 'from-green-500/20 to-green-600/20 border-green-500/40',
    cpu: 'from-blue-500/20 to-blue-600/20 border-blue-500/40',
    mixed: 'from-purple-500/20 to-purple-600/20 border-purple-500/40',
    gold: 'from-amber-500/20 to-amber-600/20 border-amber-500/40',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring' }}
      className={`relative px-4 py-3 rounded-xl bg-gradient-to-br ${colors[type]} border backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-white text-sm font-medium">{name}</span>
      </div>
      {(hasKueue || hasRHBoK) && (
        <div className="mt-2 flex gap-1">
          {hasRHBoK && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/30 text-red-300">RHBoK</span>
          )}
          {hasKueue && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">Kueue</span>
          )}
        </div>
      )}
    </motion.div>
  );
};

// Connection line component
const Connection = ({ 
  from, 
  to, 
  delay = 0,
  animated = false,
  color = 'gray'
}: { 
  from: string; 
  to: string; 
  delay?: number;
  animated?: boolean;
  color?: 'gray' | 'red' | 'amber' | 'green';
}) => {
  const colors = {
    gray: 'bg-gray-600',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    green: 'bg-green-500',
  };

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={`w-0.5 h-8 ${colors[color]} origin-top ${animated ? 'animate-pulse' : ''}`}
    />
  );
};

// Queue component
const Queue = ({ 
  name, 
  type,
  delay = 0 
}: { 
  name: string; 
  type: 'local' | 'cluster';
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={`px-3 py-2 rounded-lg text-xs font-medium ${
      type === 'local' 
        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    }`}
  >
    {name}
  </motion.div>
);

// Placement component
const Placement = ({ 
  name, 
  color,
  delay = 0 
}: { 
  name: string; 
  color: 'red' | 'blue' | 'amber';
  delay?: number;
}) => {
  const colors = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    amber: 'from-amber-500 to-amber-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring' }}
      className={`px-3 py-2 rounded-lg bg-gradient-to-r ${colors[color]} text-white text-xs font-medium shadow-lg`}
    >
      🎯 {name}
    </motion.div>
  );
};

// Persona component
const Persona = ({ 
  type, 
  delay = 0,
  action = ''
}: { 
  type: 'admin' | 'scientist';
  delay?: number;
  action?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex flex-col items-center gap-1"
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
      type === 'admin' ? 'bg-red-500/20' : 'bg-amber-500/20'
    }`}>
      {type === 'admin' ? '🔧' : '🧪'}
    </div>
    <span className="text-[10px] text-gray-400">
      {type === 'admin' ? 'Hub Admin' : 'Data Scientist'}
    </span>
    {action && (
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className="text-[10px] text-gray-500 max-w-20 text-center"
      >
        {action}
      </motion.span>
    )}
  </motion.div>
);

// Job packet component
const JobPacket = ({ 
  delay = 0,
  status = 'pending'
}: { 
  delay?: number;
  status?: 'pending' | 'routing' | 'running' | 'complete';
}) => {
  const statusColors = {
    pending: 'bg-gray-500',
    routing: 'bg-amber-500 animate-pulse',
    running: 'bg-green-500 animate-pulse',
    complete: 'bg-green-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, type: 'spring' }}
      className="flex items-center gap-1"
    >
      <span className="text-lg">📦</span>
      <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
    </motion.div>
  );
};

export default function ArchitectureDiagram({ step }: ArchitectureDiagramProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Basic RHACM Hub */}
        {step >= 1 && (
          <motion.div
            key="hub-section"
            className="relative z-10 flex flex-col items-center"
          >
            {/* Hub Cluster */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-gray-500 mb-2"
              >
                RHACM Hub Cluster
              </motion.div>
              <Cluster 
                name="Hub" 
                type="hub" 
                icon="🏛️"
                hasRHBoK={step >= 3}
                hasKueue={step >= 3}
              />
              
              {/* Placements - Step 4+ */}
              {step >= 4 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 mt-4"
                >
                  <Placement name="GPU" color="red" delay={0.1} />
                  <Placement name="CPU" color="blue" delay={0.2} />
                  <Placement name="Gold" color="amber" delay={0.3} />
                </motion.div>
              )}

              {/* Queues - Step 5+ */}
              {step >= 5 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 mt-3"
                >
                  <Queue name="GPULocalQueue" type="local" delay={0.1} />
                  <Queue name="CPULocalQueue" type="local" delay={0.2} />
                  <Queue name="GoldQueue" type="local" delay={0.3} />
                </motion.div>
              )}
            </div>

            {/* Connection lines */}
            <div className="flex gap-8 mb-4">
              {[...Array(step >= 2 ? 4 : 4)].map((_, i) => (
                <Connection 
                  key={i} 
                  from="hub" 
                  to={`cluster-${i}`} 
                  delay={0.2 + i * 0.1}
                  color={step >= 8 ? (i === 1 || i === 3 ? 'amber' : 'gray') : 'gray'}
                  animated={step >= 8 && (i === 1 || i === 3)}
                />
              ))}
            </div>

            {/* Managed Clusters */}
            <div className="flex gap-4">
              <Cluster 
                name="Cheap CPUs" 
                type="cpu" 
                icon="🖥️" 
                delay={0.3}
                hasRHBoK={step >= 3}
              />
              <Cluster 
                name={step >= 2 ? "Workhorse GPUs" : "Managed"} 
                type="gpu" 
                icon="⚡" 
                delay={0.4}
                hasRHBoK={step >= 3}
              />
              <Cluster 
                name={step >= 2 ? "Mixed" : "Managed"} 
                type="mixed" 
                icon="🔀" 
                delay={0.5}
                hasRHBoK={step >= 3}
              />
              <Cluster 
                name={step >= 2 ? "Creme of Crop" : "Managed"} 
                type="gold" 
                icon="👑" 
                delay={0.6}
                hasRHBoK={step >= 3}
              />
            </div>

            {/* Labels on clusters - Step 2+ */}
            {step >= 2 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 mt-2"
              >
                <span className="text-[9px] text-blue-400">cpu-only</span>
                <span className="text-[9px] text-green-400">nvidia-l4</span>
                <span className="text-[9px] text-purple-400">mixed</span>
                <span className="text-[9px] text-amber-400">a100-80gb</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Personas - Step 6+ */}
        {step >= 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-8 top-1/2 -translate-y-1/2"
          >
            <Persona 
              type="admin" 
              action={step >= 4 ? "Creates Placements" : ""}
            />
          </motion.div>
        )}

        {step >= 7 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-8 top-1/2 -translate-y-1/2"
          >
            <Persona 
              type="scientist" 
              action={step >= 7 ? "Submits to Queue" : ""}
            />
          </motion.div>
        )}

        {/* Job flow animation - Step 8+ */}
        {step >= 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-24 top-1/3"
          >
            <JobPacket status="routing" delay={0.5} />
          </motion.div>
        )}

        {/* Complete indicator - Step 9 */}
        {step >= 9 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
          >
            <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
              ✓ Complete Multi-Cluster GPU-as-a-Service
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
