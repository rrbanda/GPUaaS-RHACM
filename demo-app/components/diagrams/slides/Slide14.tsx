'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './shared/theme';

const Slide14: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      id: 0,
      title: 'Job Submission',
      description: 'Data Scientist submits ML training job to GPULocalQueue on Hub',
    },
    {
      id: 1,
      title: 'Queue Processing',
      description: 'Kueue validates quota and queues the workload',
    },
    {
      id: 2,
      title: 'Placement Evaluation',
      description: 'RHACM Placement selects optimal cluster based on GPU availability',
    },
    {
      id: 3,
      title: 'MultiKueue Dispatch',
      description: 'Job is dispatched to selected worker cluster',
    },
    {
      id: 4,
      title: 'Job Execution',
      description: 'Worker cluster executes the training job on available GPUs',
    },
    {
      id: 5,
      title: 'Results Collected',
      description: 'Job completes, results and metrics returned to Hub',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const clusters = [
    { id: 'worker1', name: 'us-east-gpu', gpus: 8, available: 6, color: theme.gpuGreen },
    { id: 'worker2', name: 'eu-west-gpu', gpus: 4, available: 2, color: theme.cyan },
    { id: 'worker3', name: 'asia-gpu', gpus: 8, available: 8, color: theme.amber },
  ];

  const selectedCluster = step >= 2 ? clusters[2] : null; // asia-gpu has most availability

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${theme.background} 0%, #0f1419 50%, #0a0d10 100%)`,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={theme.white} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                background: `linear-gradient(135deg, ${theme.amber} 0%, ${theme.redHatRed} 100%)`,
                padding: '8px 16px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'white',
                display: 'inline-block',
                marginBottom: '8px',
              }}
            >
              LIVE DEMO ANIMATION
            </div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: 'white',
                margin: 0,
              }}
            >
              Job Flow: End-to-End
            </h1>
          </div>
          
          {/* Playback controls */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: theme.backgroundCard,
                border: `1px solid ${theme.glassBorder}`,
                borderRadius: '8px',
                padding: '8px 16px',
                color: theme.textSecondary,
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              onClick={() => setStep((prev) => (prev + 1) % steps.length)}
              style={{
                background: theme.backgroundCard,
                border: `1px solid ${theme.glassBorder}`,
                borderRadius: '8px',
                padding: '8px 16px',
                color: theme.textSecondary,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Next Step →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Animation Area */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '200px 1fr 280px',
          gap: '30px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: Data Scientist */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            animate={{
              scale: step === 0 ? [1, 1.05, 1] : 1,
              boxShadow: step === 0 ? `0 0 40px ${theme.cpuBlue}50` : 'none',
            }}
            transition={{ duration: 0.5, repeat: step === 0 ? Infinity : 0, repeatDelay: 1 }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '20px',
              background: `linear-gradient(135deg, ${theme.cpuBlue}20 0%, ${theme.purple}20 100%)`,
              border: `2px solid ${step === 0 ? theme.cpuBlue : theme.glassBorder}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '40px' }}>👨‍🔬</span>
            <span style={{ fontSize: '12px', color: theme.textSecondary, textAlign: 'center' }}>
              Data Scientist
            </span>
          </motion.div>

          {/* Job submission animation */}
          <AnimatePresence>
            {step >= 0 && step < 3 && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, 60, 60] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  position: 'absolute',
                  left: '200px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <div
                  style={{
                    background: theme.cpuBlue,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: 'white',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  📦 ML Training Job
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Hub Cluster */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            animate={{
              scale: step >= 1 && step <= 3 ? [1, 1.02, 1] : 1,
              boxShadow: step >= 1 && step <= 3 ? `0 0 60px ${theme.purple}40` : 'none',
            }}
            transition={{ duration: 1, repeat: step >= 1 && step <= 3 ? Infinity : 0 }}
            style={{
              width: '100%',
              maxWidth: '400px',
              background: `linear-gradient(135deg, ${theme.backgroundCard} 0%, ${theme.backgroundLight} 100%)`,
              border: `2px solid ${step >= 1 && step <= 3 ? theme.purple : theme.glassBorder}`,
              borderRadius: '20px',
              padding: '24px',
            }}
          >
            {/* Hub Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, ${theme.redHatRed} 0%, ${theme.purple} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
              >
                🏠
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: 0 }}>
                  RHACM Hub Cluster
                </h3>
                <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>
                  Kueue Manager + MultiKueue
                </p>
              </div>
            </div>

            {/* Components */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* LocalQueue */}
              <motion.div
                animate={{
                  borderColor: step === 1 ? theme.gpuGreen : 'rgba(255,255,255,0.1)',
                  background: step === 1 ? `${theme.gpuGreen}15` : 'rgba(255,255,255,0.02)',
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '18px' }}>📋</span>
                <div>
                  <code style={{ fontSize: '13px', color: theme.gpuGreen }}>GPULocalQueue</code>
                  <p style={{ fontSize: '11px', color: theme.textMuted, margin: '2px 0 0 0' }}>
                    {step >= 1 ? '1 job queued' : '0 jobs queued'}
                  </p>
                </div>
              </motion.div>

              {/* Placement */}
              <motion.div
                animate={{
                  borderColor: step === 2 ? theme.cyan : 'rgba(255,255,255,0.1)',
                  background: step === 2 ? `${theme.cyan}15` : 'rgba(255,255,255,0.02)',
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '18px' }}>🎯</span>
                <div>
                  <code style={{ fontSize: '13px', color: theme.cyan }}>RHACM Placement</code>
                  <p style={{ fontSize: '11px', color: theme.textMuted, margin: '2px 0 0 0' }}>
                    {step >= 2 ? 'Selected: asia-gpu ✓' : 'Evaluating clusters...'}
                  </p>
                </div>
              </motion.div>

              {/* MultiKueue */}
              <motion.div
                animate={{
                  borderColor: step === 3 ? theme.amber : 'rgba(255,255,255,0.1)',
                  background: step === 3 ? `${theme.amber}15` : 'rgba(255,255,255,0.02)',
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '18px' }}>🚀</span>
                <div>
                  <code style={{ fontSize: '13px', color: theme.amber }}>MultiKueue</code>
                  <p style={{ fontSize: '11px', color: theme.textMuted, margin: '2px 0 0 0' }}>
                    {step >= 3 ? 'Dispatching to worker...' : 'Waiting for placement'}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Dispatch Arrow */}
          <AnimatePresence>
            {step >= 3 && step < 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x: [0, 20, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, x: { repeat: Infinity, duration: 1 } }}
                style={{
                  position: 'absolute',
                  right: '290px',
                  top: '45%',
                  fontSize: '24px',
                }}
              >
                →
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Worker Clusters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
          <h4 style={{ fontSize: '14px', color: theme.textMuted, margin: '0 0 8px 0', textAlign: 'center' }}>
            Worker Clusters
          </h4>
          {clusters.map((cluster, index) => (
            <motion.div
              key={cluster.id}
              animate={{
                scale: selectedCluster?.id === cluster.id && step >= 3 ? 1.05 : 1,
                borderColor: selectedCluster?.id === cluster.id && step >= 3 ? cluster.color : 'rgba(255,255,255,0.1)',
                boxShadow: selectedCluster?.id === cluster.id && step >= 4 ? `0 0 30px ${cluster.color}50` : 'none',
              }}
              style={{
                background: `linear-gradient(135deg, ${theme.backgroundCard} 0%, ${theme.backgroundLight} 100%)`,
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>🖥️</span>
                  <code style={{ fontSize: '12px', color: cluster.color }}>{cluster.name}</code>
                </div>
                {selectedCluster?.id === cluster.id && step >= 4 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      background: theme.gpuGreen,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {step === 5 ? '✓ COMPLETE' : 'RUNNING'}
                  </motion.span>
                )}
              </div>
              
              {/* GPU Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', color: theme.textMuted }}>GPUs:</span>
                <div
                  style={{
                    flex: 1,
                    height: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    animate={{
                      width: selectedCluster?.id === cluster.id && step >= 4
                        ? `${((cluster.gpus - cluster.available + 4) / cluster.gpus) * 100}%`
                        : `${((cluster.gpus - cluster.available) / cluster.gpus) * 100}%`,
                    }}
                    style={{
                      height: '100%',
                      background: cluster.color,
                      borderRadius: '3px',
                    }}
                  />
                </div>
                <span style={{ fontSize: '10px', color: theme.textMuted }}>
                  {selectedCluster?.id === cluster.id && step >= 4
                    ? `${cluster.available - 4}/${cluster.gpus}`
                    : `${cluster.available}/${cluster.gpus}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step Indicator */}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {steps.map((s, index) => (
            <motion.div
              key={s.id}
              animate={{
                background: index <= step ? theme.amber : 'rgba(255,255,255,0.1)',
                scale: index === step ? 1.1 : 1,
              }}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
              onClick={() => setStep(index)}
            />
          ))}
        </div>

        {/* Current step info */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${theme.amber} 0%, ${theme.redHatRed} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            {step + 1}
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: 0 }}>
              {steps[step].title}
            </h4>
            <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '4px 0 0 0' }}>
              {steps[step].description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide14;
