'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Llama icon component
const LlamaIcon = ({ size = 80 }: { size?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.6, type: 'spring' }}
    className="relative"
  >
    <div 
      className="absolute inset-0 rounded-3xl"
      style={{ 
        background: `radial-gradient(circle, ${theme.magenta}40 0%, transparent 70%)`,
        filter: 'blur(25px)',
        transform: 'scale(1.3)',
      }}
    />
    <div 
      className="relative rounded-3xl flex items-center justify-center"
      style={{ 
        width: size, 
        height: size,
        background: `linear-gradient(135deg, ${theme.magenta}20 0%, ${theme.purpleLight}20 100%)`,
        border: `2px solid ${theme.magenta}40`,
      }}
    >
      <span className="text-5xl">🦙</span>
    </div>
  </motion.div>
);

// API layer card
const APICard = ({
  icon,
  title,
  description,
  color,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-4 rounded-xl relative group"
    style={{
      background: theme.backgroundCard,
      border: `1px solid ${theme.glassBorder}`,
    }}
    whileHover={{ borderColor: color, y: -2 }}
  >
    <motion.div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)` }}
    />
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <h4 className="font-semibold text-sm" style={{ color: theme.white }}>
          {title}
        </h4>
      </div>
      <p className="text-xs" style={{ color: theme.textMuted }}>
        {description}
      </p>
    </div>
  </motion.div>
);

// Distribution option
const DistributionOption = ({
  icon,
  label,
  items,
  color,
  delay,
}: {
  icon: string;
  label: string;
  items: string[];
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="p-4 rounded-xl"
    style={{
      background: `linear-gradient(135deg, ${color}08 0%, transparent 100%)`,
      border: `1px solid ${color}20`,
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xl">{icon}</span>
      <span className="font-semibold text-sm" style={{ color: theme.white }}>
        {label}
      </span>
    </div>
    <div className="flex flex-wrap gap-1">
      {items.map((item, i) => (
        <span
          key={i}
          className="text-xs px-2 py-1 rounded"
          style={{ background: `${color}15`, color: theme.textMuted }}
        >
          {item}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function Slide7() {
  const apis = [
    { icon: '🧠', title: 'Inference', description: 'Unified LLM inference across providers', color: theme.magenta },
    { icon: '📚', title: 'RAG', description: 'Vector stores, embeddings, retrieval', color: theme.cyan },
    { icon: '🤖', title: 'Agents', description: 'Agent orchestration & memory', color: theme.purpleLight },
    { icon: '🔧', title: 'Tools', description: 'Tool registration & execution', color: theme.amber },
    { icon: '🛡️', title: 'Safety', description: 'Content moderation & guardrails', color: theme.redHatRed },
    { icon: '📊', title: 'Eval', description: 'Benchmarks & evaluations', color: theme.gpuGreen },
  ];

  return (
    <div 
      className="w-full h-full flex flex-col p-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.magenta}20 0%, transparent 60%)`,
            top: '-15%',
            right: '-10%',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.purpleGlow} 0%, transparent 60%)`,
            bottom: '-10%',
            left: '10%',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 relative z-10"
      >
        <div>
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ 
              background: `${theme.magenta}15`,
              border: `1px solid ${theme.magenta}30`,
            }}
          >
            <span style={{ color: theme.magenta }} className="text-xs font-medium uppercase tracking-wider">
              Open Source Framework
            </span>
          </div>
          <h2 className="text-4xl font-bold">
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${theme.magenta} 0%, ${theme.purpleLight} 100%)` }}
            >
              LlamaStack
            </span>
            <span style={{ color: theme.white }}> in OpenShift AI</span>
          </h2>
        </div>
        <LlamaIcon />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex gap-8 relative z-10">
        {/* Left: Dual identity */}
        <div className="w-2/5 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl relative overflow-hidden"
            style={{
              background: theme.backgroundCard,
              border: `1px solid ${theme.glassBorder}`,
            }}
          >
            <div 
              className="absolute top-0 left-0 w-1 h-full"
              style={{ background: theme.magenta }}
            />
            <h3 className="text-xl font-semibold mb-3 pl-4" style={{ color: theme.white }}>
              Dual Identity
            </h3>
            <p className="text-sm pl-4 mb-4" style={{ color: theme.textMuted }}>
              LlamaStack serves as both the <span style={{ color: theme.magenta }} className="font-semibold">foundation</span> for 
              building AI applications AND a <span style={{ color: theme.cyan }} className="font-semibold">workload</span> that 
              runs on GPU-as-a-Service
            </p>
            
            <div className="grid grid-cols-2 gap-3 pl-4">
              <div 
                className="p-3 rounded-xl text-center"
                style={{ background: `${theme.magenta}10`, border: `1px solid ${theme.magenta}25` }}
              >
                <span className="text-2xl mb-1 block">🏗️</span>
                <span className="text-xs font-medium" style={{ color: theme.magenta }}>
                  Build Agents
                </span>
              </div>
              <div 
                className="p-3 rounded-xl text-center"
                style={{ background: `${theme.gpuGreen}10`, border: `1px solid ${theme.gpuGreen}25` }}
              >
                <span className="text-2xl mb-1 block">⚡</span>
                <span className="text-xs font-medium" style={{ color: theme.gpuGreen }}>
                  GPU Workload
                </span>
              </div>
            </div>
          </motion.div>

          {/* MCP Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-5 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${theme.cyan}10 0%, ${theme.purpleLight}10 100%)`,
              border: `1px solid ${theme.cyan}25`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${theme.cyan}20` }}
              >
                <span className="text-xl">🔌</span>
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: theme.white }}>
                  Model Context Protocol (MCP)
                </h4>
                <p className="text-xs" style={{ color: theme.textMuted }}>
                  Connect models to real-world tools
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Databases', 'APIs', 'File Systems', 'Custom Tools'].map((tool, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: `${theme.cyan}15`, color: theme.cyan }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Distributions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold" style={{ color: theme.textSecondary }}>
              Deployment Options
            </h4>
            <div className="space-y-2">
              <DistributionOption
                icon="💻"
                label="Local"
                items={['Ollama', 'Meta', 'Together']}
                color={theme.amber}
                delay={0.8}
              />
              <DistributionOption
                icon="☁️"
                label="Cloud"
                items={['AWS Bedrock', 'Fireworks', 'NVIDIA NIM']}
                color={theme.cyan}
                delay={0.9}
              />
              <DistributionOption
                icon="🏢"
                label="Enterprise"
                items={['OpenShift AI', 'vLLM', 'KServe']}
                color={theme.redHatRed}
                delay={1.0}
              />
            </div>
          </motion.div>
        </div>

        {/* Right: API layer */}
        <div className="flex-1 flex flex-col">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-semibold mb-4"
            style={{ color: theme.white }}
          >
            Unified API Layer
          </motion.h3>
          
          <div className="grid grid-cols-2 gap-3 flex-1">
            {apis.map((api, i) => (
              <APICard
                key={api.title}
                icon={api.icon}
                title={api.title}
                description={api.description}
                color={api.color}
                delay={0.5 + i * 0.1}
              />
            ))}
          </div>

          {/* GenAI Studio callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-4 p-4 rounded-xl flex items-center gap-4"
            style={{
              background: `linear-gradient(135deg, ${theme.purpleLight}10 0%, ${theme.magenta}08 100%)`,
              border: `1px solid ${theme.purpleLight}30`,
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${theme.purpleLight}15` }}
            >
              <span className="text-2xl">🎨</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold" style={{ color: theme.purpleLight }}>
                GenAI Studio
              </h4>
              <p className="text-sm" style={{ color: theme.textMuted }}>
                Integrated UI for AI Engineers to discover, consume, and experiment with GenAI assets
              </p>
            </div>
            <div 
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: `${theme.gpuGreen}15`, color: theme.gpuGreen }}
            >
              OpenShift AI 3.0
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
