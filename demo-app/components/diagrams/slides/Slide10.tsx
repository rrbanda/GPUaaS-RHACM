'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Persona card
const PersonaCard = ({
  icon,
  title,
  description,
  responsibilities,
  tools,
  color,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  responsibilities: string[];
  tools: string[];
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex-1 p-6 rounded-2xl relative overflow-hidden group"
    style={{
      background: theme.backgroundCard,
      border: `1px solid ${theme.glassBorder}`,
    }}
    whileHover={{ borderColor: color }}
  >
    {/* Background accent */}
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        background: `linear-gradient(180deg, ${color}15 0%, transparent 50%)`,
      }}
    />
    
    <div className="relative z-10">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: 'spring' }}
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto"
        style={{
          background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          border: `2px solid ${color}40`,
          boxShadow: `0 8px 30px ${color}20`,
        }}
      >
        <span className="text-4xl">{icon}</span>
      </motion.div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-center mb-2" style={{ color }}>
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-center mb-4" style={{ color: theme.textMuted }}>
        {description}
      </p>
      
      {/* Divider */}
      <div 
        className="h-px w-12 mx-auto mb-4"
        style={{ background: `${color}40` }}
      />
      
      {/* Responsibilities */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: theme.textDim }}>
          Responsibilities
        </h4>
        <ul className="space-y-1">
          {responsibilities.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3 + i * 0.05 }}
              className="flex items-center gap-2 text-xs"
              style={{ color: theme.textSecondary }}
            >
              <span style={{ color }}>▸</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
      
      {/* Tools */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: theme.textDim }}>
          Tools & Interfaces
        </h4>
        <div className="flex flex-wrap gap-1">
          {tools.map((tool, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.5 + i * 0.05 }}
              className="text-xs px-2 py-1 rounded"
              style={{ background: `${color}15`, color }}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Knowledge boundary visualization
const KnowledgeBoundary = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="mt-8 p-4 rounded-xl relative"
    style={{
      background: theme.glassBg,
      border: `1px solid ${theme.glassBorder}`,
    }}
  >
    <h4 className="text-sm font-semibold mb-3 text-center" style={{ color: theme.white }}>
      Knowledge Separation by Design
    </h4>
    
    <div className="flex items-center justify-center gap-4">
      {/* Platform Engineer knows */}
      <div className="flex-1 p-3 rounded-lg" style={{ background: `${theme.redHatRed}10` }}>
        <div className="text-xs font-semibold mb-2 text-center" style={{ color: theme.redHatRedLight }}>
          Platform Engineer Knows
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {['Cluster topology', 'GPU types', 'Quotas', 'Policies', 'Placement rules'].map((item, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: `${theme.redHatRed}15`, color: theme.textMuted }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      
      {/* Divider */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-px h-8" style={{ background: theme.glassBorder }} />
        <span className="text-xl">🔐</span>
        <div className="w-px h-8" style={{ background: theme.glassBorder }} />
      </div>
      
      {/* Data Scientist knows */}
      <div className="flex-1 p-3 rounded-lg" style={{ background: `${theme.gpuGreen}10` }}>
        <div className="text-xs font-semibold mb-2 text-center" style={{ color: theme.gpuGreen }}>
          Data Scientist Knows
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {['Job requirements', 'Queue names', 'Model specs', 'Training params'].map((item, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: `${theme.gpuGreen}15`, color: theme.textMuted }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      
      {/* AI Engineer knows */}
      <div className="flex-1 p-3 rounded-lg" style={{ background: `${theme.purpleLight}10` }}>
        <div className="text-xs font-semibold mb-2 text-center" style={{ color: theme.purpleLight }}>
          AI Engineer Knows
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {['Agent logic', 'LlamaStack APIs', 'Tool schemas', 'MCP servers'].map((item, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: `${theme.purpleLight}15`, color: theme.textMuted }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Slide10() {
  return (
    <div 
      className="w-full h-full flex flex-col p-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.redHatRedGlow} 0%, transparent 60%)`,
            top: '-10%',
            left: '10%',
          }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.gpuGreenGlow} 0%, transparent 60%)`,
            top: '20%',
            left: '45%',
          }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.purpleGlow} 0%, transparent 60%)`,
            top: '-5%',
            right: '10%',
          }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 relative z-10"
      >
        <h2 className="text-4xl font-bold mb-2">
          <span style={{ color: theme.white }}>Three Personas, </span>
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: theme.gradientRedGold }}
          >
            One Platform
          </span>
        </h2>
        <p style={{ color: theme.textMuted }} className="text-lg">
          Clear separation of concerns for multi-cluster GPU management
        </p>
      </motion.div>

      {/* Persona cards */}
      <div className="flex gap-6 flex-1 relative z-10">
        <PersonaCard
          icon="🏗️"
          title="Platform Engineer"
          description="Manages infrastructure, clusters, and platform-wide policies"
          responsibilities={[
            'Configure cluster fleet & GPU pools',
            'Define Placements & admission checks',
            'Set up quotas and fair-share policies',
            'Deploy Kueue Add-on via RHACM',
            'Monitor fleet-wide GPU utilization',
          ]}
          tools={['RHACM Console', 'oc CLI', 'Policies', 'Placement API']}
          color={theme.redHatRed}
          delay={0.3}
        />
        <PersonaCard
          icon="🔬"
          title="Data Scientist"
          description="Develops, trains, and deploys ML models at scale"
          responsibilities={[
            'Submit training jobs to LocalQueue',
            'Run Jupyter notebooks',
            'Fine-tune models with InstructLab',
            'Deploy models via KServe/vLLM',
            'Monitor job status & results',
          ]}
          tools={['OpenShift AI Dashboard', 'Notebooks', 'Pipelines', 'Model Registry']}
          color={theme.gpuGreen}
          delay={0.5}
        />
        <PersonaCard
          icon="🤖"
          title="AI Engineer"
          description="Builds intelligent agents and AI-powered applications"
          responsibilities={[
            'Design agentic workflows',
            'Configure LlamaStack agents',
            'Define MCP tool integrations',
            'Build RAG pipelines',
            'Test & evaluate agent behavior',
          ]}
          tools={['GenAI Studio', 'LlamaStack APIs', 'AI Hub', 'MCP Servers']}
          color={theme.purpleLight}
          delay={0.7}
        />
      </div>

      {/* Knowledge boundary */}
      <KnowledgeBoundary delay={1.0} />
    </div>
  );
}
