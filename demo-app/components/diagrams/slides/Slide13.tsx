'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from './shared/theme';

const Slide13: React.FC = () => {
  const queues = [
    {
      name: 'GPULocalQueue',
      description: 'Standard GPU workloads',
      icon: '🎮',
      color: theme.gpuGreen,
      resources: 'A100/H100 GPUs',
      useCase: 'Training, Fine-tuning',
    },
    {
      name: 'CPULocalQueue',
      description: 'CPU-only workloads',
      icon: '💻',
      color: theme.cpuBlue,
      resources: 'CPU Compute',
      useCase: 'Data processing, Preprocessing',
    },
    {
      name: 'GoldGPULocalQueue',
      description: 'Premium GPU tier',
      icon: '👑',
      color: theme.goldAmber,
      resources: 'Best-in-class GPUs',
      useCase: 'Priority training, Production inference',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${theme.background} 0%, #1a1a2e 50%, #0d0d1a 100%)`,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.02 }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: theme.cpuBlue,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '30px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.cpuBlue} 0%, ${theme.purple} 100%)`,
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            DATA SCIENTIST WORKFLOW
          </div>
        </div>
        <h1
          style={{
            fontSize: '42px',
            fontWeight: 700,
            background: `linear-gradient(135deg, white 0%, ${theme.textSecondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Using GPU-as-a-Service
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: theme.textSecondary,
            margin: '12px 0 0 0',
            maxWidth: '700px',
          }}
        >
          Simple queue selection—submit to the Hub, get resources anywhere
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: How It Works */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: 'white',
              margin: '0 0 24px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '24px' }}>📤</span>
            How It Works
          </h3>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { step: 1, text: 'Data scientists submit jobs to Kueues on the RHACM Hub' },
              { step: 2, text: 'RHACM Admin advises which queue to use based on needs' },
              { step: 3, text: 'Jobs are automatically dispatched to available clusters' },
              { step: 4, text: 'Results are collected back to the Hub transparently' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.cpuBlue} 0%, ${theme.purple} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'white',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: 0, lineHeight: 1.5 }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Key Point */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <p style={{ fontSize: '13px', color: theme.textMuted, margin: 0, fontStyle: 'italic' }}>
              💡 Data Scientists only need to know how to use Kueue—no RHACM knowledge required
            </p>
          </div>
        </motion.div>

        {/* Right: Available Queues */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: 'white',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '24px' }}>📋</span>
            Available Queues
          </h3>

          {queues.map((queue, index) => (
            <motion.div
              key={queue.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
              style={{
                background: `linear-gradient(135deg, ${queue.color}08 0%, transparent 100%)`,
                border: `1px solid ${queue.color}30`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontSize: '32px' }}>{queue.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <code
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: queue.color,
                      fontFamily: 'JetBrains Mono, monospace',
                      background: `${queue.color}15`,
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {queue.name}
                  </code>
                </div>
                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '0 0 8px 0' }}>
                  {queue.description}
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                  <span style={{ color: theme.textMuted }}>
                    <strong style={{ color: theme.textSecondary }}>Resources:</strong> {queue.resources}
                  </span>
                  <span style={{ color: theme.textMuted }}>
                    <strong style={{ color: theme.textSecondary }}>Use Case:</strong> {queue.useCase}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '24px',
          background: `linear-gradient(135deg, ${theme.redHatRed}10 0%, transparent 100%)`,
          border: `1px solid ${theme.redHatRed}30`,
          borderRadius: '16px',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: '40px' }}>🎯</div>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: '0 0 6px 0' }}>
            RHACM: The Engine Behind the Experience
          </h4>
          <p style={{ fontSize: '14px', color: theme.textSecondary, margin: 0 }}>
            RHACM admin creates Placements, data scientists use Kueues—RHACM is just the engine 
            that drives the outcomes designed and desired by users. Tiered pricing? Priority access? 
            Resource isolation? All controlled through simple Placement rules.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide13;
