'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchitectureDiagram from '@/components/diagrams/ArchitectureDiagram';
import { theme } from '../diagrams/slides/shared/theme';

type Persona = 'admin' | 'scientist' | 'all';

const steps = [
  {
    id: 1,
    title: 'RHACM Hub with Managed Clusters',
    description: 'Start with a standard RHACM hub managing multiple OpenShift clusters',
    highlight: 'Foundation of multi-cluster management',
  },
  {
    id: 2,
    title: 'Label Clusters by Hardware',
    description: 'Tag clusters with their capabilities: CPU-only, NVIDIA GPUs, Mixed workloads, Premium A100s',
    highlight: 'Enables intelligent workload routing',
  },
  {
    id: 3,
    title: 'Enable MultiKueue Addon',
    description: 'Install Red Hat Build of Kueue (RHBoK) on hub and all managed clusters',
    highlight: 'Hub becomes Kueue Manager Cluster',
  },
  {
    id: 4,
    title: 'Create Placements',
    description: 'Admin creates GPUPlacement, CPUPlacement, and GoldClassPlacement to define routing rules',
    highlight: 'RHACM Placement → Kueue config',
  },
  {
    id: 5,
    title: 'Auto-Generate Kueue Resources',
    description: 'RHACM Controller automatically creates LocalQueues and ClusterQueues from Placements',
    highlight: 'Zero manual Kueue configuration',
  },
  {
    id: 6,
    title: 'Hub Admin Ready',
    description: 'Admin has configured the platform. Data Scientists can now be onboarded.',
    highlight: 'Admin only knows Placement API',
  },
  {
    id: 7,
    title: 'Data Scientists Submit Jobs',
    description: 'Scientists submit jobs to LocalQueues on the hub. They only need to know queue names.',
    highlight: 'Scientists only know Kueue API',
  },
  {
    id: 8,
    title: 'Jobs Dispatched to Clusters',
    description: 'Kueue Admission Controller routes jobs to the best available worker cluster',
    highlight: 'Automatic multi-cluster scheduling',
  },
  {
    id: 9,
    title: 'Complete GPU-as-a-Service',
    description: 'Full system operational: single entry point, intelligent routing, multi-cluster execution',
    highlight: '🎉 Production Ready!',
  },
];

export default function ArchitectureSlide({ persona }: { persona: Persona }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = steps[currentStep];

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
        className="text-center mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: theme.white }}>
          Architecture{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})` }}
          >
            Step by Step
          </span>
        </h2>
        <p style={{ color: theme.gray400 }}>
          Watch how GPU-as-a-Service is built progressively
        </p>
      </motion.div>

      {/* Step progress */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ 
              width: i === currentStep ? '48px' : '32px',
              background: i === currentStep 
                ? `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})`
                : i < currentStep 
                ? `${theme.redHatRed}80` 
                : theme.gray700
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Interactive Diagram */}
        <div 
          className="flex-1 relative rounded-2xl overflow-hidden border"
          style={{ 
            backgroundColor: `${theme.backgroundCard}cc`,
            borderColor: `${theme.gray700}50`
          }}
        >
          <ArchitectureDiagram step={step.id} />
        </div>

        {/* Description panel */}
        <div className="md:w-80 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl p-6 mb-4 border"
              style={{ 
                backgroundColor: `${theme.backgroundCard}cc`,
                borderColor: `${theme.gray700}50`
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.goldAmber})`,
                    color: theme.white
                  }}
                >
                  {step.id}
                </span>
                <div className="text-xs" style={{ color: theme.gray500 }}>
                  Step {step.id} of {steps.length}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: theme.white }}>{step.title}</h3>
              <p className="mb-4" style={{ color: theme.gray400 }}>{step.description}</p>
              <div 
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: `${theme.goldAmber}10`,
                  borderColor: `${theme.goldAmber}20`
                }}
              >
                <span className="text-sm" style={{ color: theme.goldAmber }}>💡 {step.highlight}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-2">
            <motion.button
              onClick={handlePrev}
              disabled={currentStep === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl font-medium transition-all border"
              style={{ 
                backgroundColor: currentStep === 0 ? `${theme.gray800}30` : `${theme.backgroundCard}cc`,
                borderColor: `${theme.gray700}50`,
                color: currentStep === 0 ? theme.gray600 : theme.gray300,
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl font-medium transition-all"
              style={{ 
                background: currentStep === steps.length - 1 
                  ? `${theme.gray800}30` 
                  : `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})`,
                color: currentStep === steps.length - 1 ? theme.gray600 : theme.white,
                cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Next →
            </motion.button>
          </div>

          {/* Quick jump */}
          <div className="mt-4 flex gap-2 justify-center">
            <button
              onClick={() => setCurrentStep(0)}
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: theme.gray500 }}
            >
              ← Start
            </button>
            <span style={{ color: theme.gray700 }}>|</span>
            <button
              onClick={() => setCurrentStep(steps.length - 1)}
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: theme.gray500 }}
            >
              Final →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
