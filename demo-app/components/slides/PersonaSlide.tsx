'use client';

import { motion } from 'framer-motion';

type Persona = 'admin' | 'scientist' | 'all';

const adminSteps = [
  { icon: '1️⃣', title: 'Enable MultiKueue Addon', description: 'Install RHBoK on hub and managed clusters' },
  { icon: '2️⃣', title: 'Label Clusters', description: 'Tag clusters with hardware capabilities' },
  { icon: '3️⃣', title: 'Create Placements', description: 'Define GPUPlacement, CPUPlacement, etc.' },
  { icon: '4️⃣', title: 'Done!', description: 'RHACM auto-creates Kueue resources' },
];

const scientistSteps = [
  { icon: '1️⃣', title: 'Ask Admin', description: '"Which queue should I use for GPU training?"' },
  { icon: '2️⃣', title: 'Submit Job', description: 'Add label: kueue.x-k8s.io/queue-name: gpu-queue' },
  { icon: '3️⃣', title: 'Wait', description: 'Job automatically routes to best cluster' },
  { icon: '4️⃣', title: 'Get Results', description: 'Results sync back to hub' },
];

export default function PersonaSlide({ persona }: { persona: Persona }) {
  const showAdmin = persona === 'admin' || persona === 'all';
  const showScientist = persona === 'scientist' || persona === 'all';

  return (
    <div className="h-full flex flex-col px-8 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Two Personas,{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
            Clear Separation
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          RHACM is just the engine. Admins know Placement. Scientists know Kueue.
        </p>
      </motion.div>

      {/* Persona cards */}
      <div className={`flex-1 grid gap-8 ${persona === 'all' ? 'md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
        {/* Admin Card */}
        {showAdmin && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="glass rounded-2xl p-6 flex-1 glow-red">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-3xl">
                  🔧
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Hub Admin</h3>
                  <p className="text-red-400">Knows: Placements, Clusters</p>
                </div>
              </div>

              <div className="space-y-4">
                {adminSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-red-500/10"
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <div className="text-white font-medium">{step.title}</div>
                      <div className="text-gray-500 text-sm">{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <div className="text-sm text-red-400 font-medium">What they DON&apos;T need to know:</div>
                <div className="text-gray-500 text-sm mt-1">
                  Kueue internals, job YAML structure, data science workflows
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Scientist Card */}
        {showScientist && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="glass rounded-2xl p-6 flex-1 glow-gold">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-3xl">
                  🧪
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Data Scientist</h3>
                  <p className="text-amber-400">Knows: Kueue, LocalQueues</p>
                </div>
              </div>

              <div className="space-y-4">
                {scientistSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-amber-500/10"
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <div className="text-white font-medium">{step.title}</div>
                      <div className="text-gray-500 text-sm">{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
              >
                <div className="text-sm text-amber-400 font-medium">What they DON&apos;T need to know:</div>
                <div className="text-gray-500 text-sm mt-1">
                  Which clusters exist, how Placement works, networking, credentials
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-center"
      >
        <div className="inline-block glass px-6 py-3 rounded-full">
          <span className="text-gray-400">💡 </span>
          <span className="text-white font-medium">Key Insight:</span>
          <span className="text-gray-300"> RHACM is the engine that drives outcomes designed by these users</span>
        </div>
      </motion.div>
    </div>
  );
}
