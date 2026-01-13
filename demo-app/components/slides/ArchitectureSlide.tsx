'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchitectureDiagram from '@/components/diagrams/ArchitectureDiagram';

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
    <div className="h-full flex flex-col px-8 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Architecture{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
            Step by Step
          </span>
        </h2>
        <p className="text-gray-400">
          Watch how GPU-as-a-Service is built progressively
        </p>
      </motion.div>

      {/* Step progress */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
              i === currentStep
                ? 'bg-gradient-to-r from-red-500 to-amber-500 w-12'
                : i < currentStep
                ? 'bg-red-500/50'
                : 'bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Interactive Diagram */}
        <div className="flex-1 relative glass rounded-2xl overflow-hidden">
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
              className="glass rounded-xl p-6 mb-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white font-bold">
                  {step.id}
                </span>
                <div className="text-xs text-gray-500">
                  Step {step.id} of {steps.length}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 mb-4">{step.description}</p>
              <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-400 text-sm">💡 {step.highlight}</span>
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
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              ← Previous
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                currentStep === steps.length - 1
                  ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-amber-600 text-white'
              }`}
            >
              Next →
            </motion.button>
          </div>

          {/* Quick jump */}
          <div className="mt-4 flex gap-2 justify-center">
            <button
              onClick={() => setCurrentStep(0)}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              ← Start
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => setCurrentStep(steps.length - 1)}
              className="text-xs text-gray-500 hover:text-amber-400 transition-colors"
            >
              Final →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
