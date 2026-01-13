'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from './shared/theme';

const Slide11: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${theme.background} 0%, #0f1419 50%, #0a0d10 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={theme.white} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${theme.cyan} 0%, ${theme.gpuGreen} 100%)`,
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'white',
            display: 'inline-block',
            marginBottom: '16px',
            letterSpacing: '1px',
          }}
        >
          ARCHITECTURE DEEP DIVE
        </div>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            background: `linear-gradient(135deg, white 0%, ${theme.textSecondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Hub & Worker Architecture
        </h1>
      </motion.div>

      {/* Main Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '60px',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        {/* Hub Cluster */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: `linear-gradient(135deg, ${theme.redHatRed}15 0%, ${theme.backgroundCard} 100%)`,
            border: `2px solid ${theme.redHatRed}50`,
            borderRadius: '24px',
            padding: '32px',
            width: '340px',
            boxShadow: `0 8px 40px ${theme.redHatRed}20`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${theme.redHatRed} 0%, ${theme.redHatRedDark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
              }}
            >
              🏛️
            </div>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'white', margin: 0 }}>
                RHACM Hub
              </h3>
              <p style={{ fontSize: '13px', color: theme.textMuted, margin: '4px 0 0 0' }}>
                Kueue Manager Cluster
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '📋', name: 'ClusterQueue', desc: 'Resource quotas & policies' },
              { icon: '🎯', name: 'Placement', desc: 'Cluster selection rules' },
              { icon: '🔀', name: 'MultiKueue', desc: 'Cross-cluster dispatch' },
              { icon: '✅', name: 'AdmissionCheck', desc: 'Placement validation' },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: theme.textMuted }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connection Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: '40px', color: theme.gpuGreen }}
          >
            ⟶
          </motion.div>
          <div
            style={{
              background: `${theme.gpuGreen}20`,
              border: `1px solid ${theme.gpuGreen}40`,
              borderRadius: '12px',
              padding: '10px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: theme.gpuGreen }}>
              Job Dispatch
            </div>
            <div style={{ fontSize: '10px', color: theme.textMuted, marginTop: '2px' }}>
              via MultiKueue
            </div>
          </div>
        </motion.div>

        {/* Worker Clusters */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '320px',
          }}
        >
          {[
            { name: 'GPU Cluster A', region: 'us-east', gpus: '8x A100', color: theme.gpuGreen },
            { name: 'GPU Cluster B', region: 'eu-west', gpus: '4x H100', color: theme.cyan },
            { name: 'CPU Cluster', region: 'asia-pac', gpus: 'CPU Only', color: theme.amber },
          ].map((cluster, index) => (
            <motion.div
              key={cluster.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.15 }}
              style={{
                background: `linear-gradient(135deg, ${cluster.color}10 0%, ${theme.backgroundCard} 100%)`,
                border: `2px solid ${cluster.color}40`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${cluster.color}20`,
                  border: `1px solid ${cluster.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                🖥️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>
                  {cluster.name}
                </div>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>
                  {cluster.region} • {cluster.gpus}
                </div>
              </div>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: cluster.color,
                  boxShadow: `0 0 10px ${cluster.color}`,
                }}
              />
            </motion.div>
          ))}

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              padding: '12px 16px',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>
              Each worker runs <strong style={{ color: theme.gpuGreen }}>Kueue Worker</strong> for local job execution
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Key Points */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          display: 'flex',
          gap: '24px',
          marginTop: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {[
          { icon: '🔐', text: 'Secure cross-cluster communication' },
          { icon: '⚖️', text: 'Automatic load balancing' },
          { icon: '📊', text: 'Centralized observability' },
          { icon: '🔄', text: 'Placement-driven routing' },
        ].map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + index * 0.1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '13px', color: theme.textSecondary }}>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slide11;
