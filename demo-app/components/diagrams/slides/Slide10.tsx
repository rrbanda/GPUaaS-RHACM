'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from './shared/theme';

const Slide10: React.FC = () => {
  const personas = [
    {
      icon: '🏗️',
      title: 'Platform Engineer',
      subtitle: 'RHACM Admin',
      description: 'Manages clusters & policies',
      color: theme.redHatRed,
      responsibilities: ['Configure cluster fleet', 'Define Placements', 'Set quotas', 'Deploy Kueue'],
      tools: ['RHACM', 'oc CLI', 'Policies'],
      knows: ['Cluster topology', 'GPU types', 'Quotas'],
    },
    {
      icon: '🔬',
      title: 'Data Scientist',
      subtitle: 'Kueue User',
      description: 'Trains & deploys ML models',
      color: theme.gpuGreen,
      responsibilities: ['Submit jobs', 'Run notebooks', 'Fine-tune models', 'Deploy via KServe'],
      tools: ['OpenShift AI', 'Notebooks', 'Pipelines'],
      knows: ['Job specs', 'Queue names', 'Model params'],
    },
    {
      icon: '🤖',
      title: 'AI Engineer',
      subtitle: 'Agent Builder',
      description: 'Builds intelligent agents',
      color: theme.purpleLight,
      responsibilities: ['Design agents', 'Configure LlamaStack', 'Define MCP tools', 'Build RAG'],
      tools: ['GenAI Studio', 'LlamaStack', 'MCP'],
      knows: ['Agent logic', 'Tool schemas', 'APIs'],
    },
  ];

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
        padding: '40px 60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      {personas.map((p, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.5 }}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${p.color}30 0%, transparent 70%)`,
            left: `${20 + i * 30}%`,
            top: '20%',
            filter: 'blur(60px)',
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}
      >
        <h1 style={{ fontSize: '44px', fontWeight: 700, margin: 0 }}>
          <span style={{ color: 'white' }}>Three Personas, </span>
          <span
            style={{
              background: `linear-gradient(135deg, ${theme.redHatRed} 0%, ${theme.amber} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            One Platform
          </span>
        </h1>
        <p style={{ fontSize: '18px', color: theme.textSecondary, margin: '12px 0 0 0' }}>
          Clear separation of concerns for multi-cluster GPU management
        </p>
      </motion.div>

      {/* Persona Cards - Horizontal Layout */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1100px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {personas.map((persona, index) => (
          <motion.div
            key={persona.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            style={{
              width: '320px',
              minHeight: '300px',
              background: `linear-gradient(135deg, ${persona.color}08 0%, ${theme.backgroundCard} 100%)`,
              border: `1px solid ${persona.color}30`,
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: `${persona.color}20`,
                  border: `2px solid ${persona.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                }}
              >
                {persona.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: persona.color, margin: 0 }}>
                  {persona.title}
                </h3>
                <p style={{ fontSize: '12px', color: theme.textMuted, margin: '2px 0 0 0' }}>
                  {persona.subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: theme.textSecondary, margin: '0 0 14px 0' }}>
              {persona.description}
            </p>

            {/* Responsibilities - Compact List */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: theme.textDim, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Responsibilities
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {persona.responsibilities.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: persona.color, fontSize: '10px' }}>▸</span>
                    <span style={{ fontSize: '12px', color: theme.textSecondary }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools - Compact Tags */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: theme.textDim, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Tools
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {persona.tools.map((tool, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: `${persona.color}15`,
                      color: persona.color,
                      fontWeight: 500,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Knowledge Separation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '32px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          padding: '20px 32px',
          width: '100%',
          maxWidth: '1100px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>
            🔐 Knowledge Separation by Design
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          {personas.map((persona, index) => (
            <div key={index} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: persona.color, marginBottom: '8px' }}>
                {persona.title} Knows
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                {persona.knows.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '10px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: `${persona.color}10`,
                      color: theme.textMuted,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Slide10;
