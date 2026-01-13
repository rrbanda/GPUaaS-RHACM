'use client';

import { motion } from 'framer-motion';
import { theme } from '../diagrams/slides/shared/theme';

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
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: theme.white }}>
          Two Personas,{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})` }}
          >
            Clear Separation
          </span>
        </h2>
        <p style={{ color: theme.gray400 }} className="max-w-2xl mx-auto">
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
            <div 
              className="rounded-2xl p-6 flex-1 border"
              style={{ 
                backgroundColor: `${theme.backgroundCard}cc`,
                borderColor: `${theme.redHatRed}30`,
                boxShadow: `0 0 40px ${theme.redHatRed}10`
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.redHatRedDark})` }}
                >
                  🔧
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: theme.white }}>Hub Admin</h3>
                  <p style={{ color: theme.redHatRed }}>Knows: Placements, Clusters</p>
                </div>
              </div>

              <div className="space-y-4">
                {adminSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                    style={{ 
                      backgroundColor: `${theme.backgroundLight}80`,
                      borderColor: `${theme.redHatRed}15`
                    }}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <div className="font-medium" style={{ color: theme.white }}>{step.title}</div>
                      <div className="text-sm" style={{ color: theme.gray500 }}>{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 rounded-lg border"
                style={{ 
                  backgroundColor: `${theme.redHatRed}10`,
                  borderColor: `${theme.redHatRed}20`
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.redHatRed }}>What they DON&apos;T need to know:</div>
                <div className="text-sm mt-1" style={{ color: theme.gray500 }}>
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
            <div 
              className="rounded-2xl p-6 flex-1 border"
              style={{ 
                backgroundColor: `${theme.backgroundCard}cc`,
                borderColor: `${theme.goldAmber}30`,
                boxShadow: `0 0 40px ${theme.goldAmber}10`
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: `linear-gradient(135deg, ${theme.goldAmber}, #B45309)` }}
                >
                  🧪
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: theme.white }}>Data Scientist</h3>
                  <p style={{ color: theme.goldAmber }}>Knows: Kueue, LocalQueues</p>
                </div>
              </div>

              <div className="space-y-4">
                {scientistSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                    style={{ 
                      backgroundColor: `${theme.backgroundLight}80`,
                      borderColor: `${theme.goldAmber}15`
                    }}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <div className="font-medium" style={{ color: theme.white }}>{step.title}</div>
                      <div className="text-sm" style={{ color: theme.gray500 }}>{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-6 p-4 rounded-lg border"
                style={{ 
                  backgroundColor: `${theme.goldAmber}10`,
                  borderColor: `${theme.goldAmber}20`
                }}
              >
                <div className="text-sm font-medium" style={{ color: theme.goldAmber }}>What they DON&apos;T need to know:</div>
                <div className="text-sm mt-1" style={{ color: theme.gray500 }}>
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
        <div 
          className="inline-block px-6 py-3 rounded-full border"
          style={{ 
            backgroundColor: `${theme.backgroundCard}cc`,
            borderColor: `${theme.gray700}50`
          }}
        >
          <span style={{ color: theme.gray400 }}>💡 </span>
          <span className="font-medium" style={{ color: theme.white }}>Key Insight:</span>
          <span style={{ color: theme.gray300 }}> RHACM is the engine that drives outcomes designed by these users</span>
        </div>
      </motion.div>
    </div>
  );
}
