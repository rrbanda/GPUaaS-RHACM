'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from './shared/theme';

const Slide12: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Enable MultiKueue Addon',
      description: 'Hub admin enables the MultiKueue Addon on RHACM',
      icon: '⚡',
    },
    {
      number: '2',
      title: 'Install Kueue on Hub',
      description: 'Addon installs Kueue, configuring Hub as the Kueue Manager Cluster',
      icon: '🎛️',
    },
    {
      number: '3',
      title: 'Install Kueue on Workers',
      description: 'Addon installs Kueue on targeted managed clusters as Kueue Worker Clusters',
      icon: '🔧',
    },
    {
      number: '4',
      title: 'Deploy Admission Controller',
      description: 'RHACM Admission Check Controller enables Placement-based workload dispatching',
      icon: '🎯',
    },
    {
      number: '5',
      title: 'Create Placements',
      description: 'Admin creates RHACM Placements to define cluster selection rules',
      icon: '📋',
    },
    {
      number: '6',
      title: 'Auto-Configure Kueue',
      description: 'RHACM Kueue Admission Controller converts Placements to MultiKueue configuration',
      icon: '🔄',
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
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              width: '200px',
              height: '200px',
              border: `1px solid ${theme.redHatRed}`,
              borderRadius: '8px',
              transform: 'rotate(45deg)',
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
              background: `linear-gradient(135deg, ${theme.purple} 0%, ${theme.redHatRed} 100%)`,
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            RHACM ADMIN WORKFLOW
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
          Setting Up GPU-as-a-Service
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: theme.textSecondary,
            margin: '12px 0 0 0',
            maxWidth: '700px',
          }}
        >
          One-time setup transforms RHACM into a powerful GPU scheduling platform
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Step Number */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.purple}40 0%, ${theme.redHatRed}40 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: theme.purple,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {step.number}
            </div>

            {/* Icon */}
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>{step.icon}</div>

            {/* Title */}
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'white',
                margin: '0 0 8px 0',
                paddingRight: '40px',
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: '14px',
                color: theme.textSecondary,
                margin: 0,
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              {step.description}
            </p>

            {/* Connection Arrow (except last in row) */}
            {index !== 2 && index !== 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{
                  position: 'absolute',
                  right: '-12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.purple,
                  fontSize: '20px',
                  zIndex: 10,
                }}
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Result Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          marginTop: '24px',
          background: `linear-gradient(135deg, ${theme.gpuGreen}15 0%, ${theme.gpuGreen}05 100%)`,
          border: `1px solid ${theme.gpuGreen}40`,
          borderRadius: '16px',
          padding: '20px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: '36px' }}>✅</div>
        <div>
          <h4
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: theme.gpuGreen,
              margin: '0 0 4px 0',
            }}
          >
            Result: Functioning Kueue Manager Cluster
          </h4>
          <p style={{ fontSize: '14px', color: theme.textSecondary, margin: 0 }}>
            Hub is now configured with MultiKueue, automatically managed by RHACM Placements.
            Standard Kueue Admission Controller handles all workload dispatching.
          </p>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '16px',
          padding: '12px 20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '8px',
          borderLeft: `3px solid ${theme.purple}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: '14px', color: theme.textSecondary, margin: 0, fontStyle: 'italic' }}>
          <strong style={{ color: 'white' }}>Key Insight:</strong> Admin only needs to understand RHACM Placements—
          all Kueue configuration is automatically derived from cluster selection rules.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide12;
