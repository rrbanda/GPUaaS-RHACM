'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Agent visualization component
const AgentNode = ({
  icon,
  label,
  isActive,
  delay,
  position,
}: {
  icon: string;
  label: string;
  isActive?: boolean;
  delay: number;
  position: { x: number; y: number };
}) => (
  <motion.div
    className="absolute"
    style={{ left: position.x, top: position.y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 300 }}
  >
    <motion.div
      className="relative"
      animate={isActive ? { 
        boxShadow: [
          `0 0 20px ${theme.purpleGlow}`,
          `0 0 40px ${theme.purpleGlow}`,
          `0 0 20px ${theme.purpleGlow}`,
        ]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: isActive 
            ? `linear-gradient(135deg, ${theme.purpleLight}20 0%, ${theme.magenta}20 100%)`
            : theme.backgroundCard,
          border: `2px solid ${isActive ? theme.purpleLight : theme.glassBorder}`,
        }}
      >
        <span className="text-2xl">{icon}</span>
      </div>
      <div 
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs font-medium"
        style={{ 
          background: theme.backgroundElevated,
          color: theme.textSecondary,
        }}
      >
        {label}
      </div>
    </motion.div>
  </motion.div>
);

// Connection line
const ConnectionLine = ({
  from,
  to,
  delay,
  animated,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
  animated?: boolean;
}) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: 0, top: 0, width: '100%', height: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme.purpleLight} stopOpacity="0.3" />
          <stop offset="50%" stopColor={theme.cyan} stopOpacity="0.6" />
          <stop offset="100%" stopColor={theme.purpleLight} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <motion.path
        d={`M ${from.x + 32} ${from.y + 32} Q ${midX} ${midY - 20} ${to.x + 32} ${to.y + 32}`}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeDasharray={animated ? "8 4" : "0"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
      />
      {animated && (
        <motion.circle
          r="4"
          fill={theme.cyan}
          style={{ filter: `drop-shadow(0 0 6px ${theme.cyan})` }}
        >
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={`M ${from.x + 32} ${from.y + 32} Q ${midX} ${midY - 20} ${to.x + 32} ${to.y + 32}`}
          />
        </motion.circle>
      )}
    </motion.svg>
  );
};

// Feature pill
const FeaturePill = ({
  text,
  color,
  delay,
}: {
  text: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="px-3 py-1.5 rounded-full text-xs font-medium"
    style={{
      background: `${color}15`,
      border: `1px solid ${color}30`,
      color,
    }}
  >
    {text}
  </motion.div>
);

export default function Slide6() {
  const agentPositions = {
    user: { x: 50, y: 120 },
    agent: { x: 180, y: 60 },
    tool1: { x: 330, y: 30 },
    tool2: { x: 330, y: 120 },
    tool3: { x: 330, y: 210 },
    llm: { x: 180, y: 180 },
  };

  return (
    <div 
      className="w-full h-full flex p-8 gap-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.purpleGlow} 0%, transparent 60%)`,
            top: '-20%',
            left: '20%',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.magenta}20 0%, transparent 60%)`,
            bottom: '10%',
            right: '-5%',
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Left: Agent visualization */}
      <div className="w-1/2 flex flex-col relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ 
              background: `${theme.purpleLight}15`,
              border: `1px solid ${theme.purpleLight}30`,
            }}
          >
            <span style={{ color: theme.purpleLight }} className="text-xs font-medium uppercase tracking-wider">
              The Future
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-2">
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: theme.gradientPurpleCyan }}
            >
              Agentic AI
            </span>
            <span style={{ color: theme.white }}> Workloads</span>
          </h2>
          <p style={{ color: theme.textMuted }} className="text-lg">
            AI agents are the next wave of enterprise AI — and they need GPUs
          </p>
        </motion.div>

        {/* Agent flow visualization */}
        <div className="relative flex-1 min-h-[300px]">
          {/* Connection lines */}
          <ConnectionLine from={agentPositions.user} to={agentPositions.agent} delay={0.5} animated />
          <ConnectionLine from={agentPositions.agent} to={agentPositions.tool1} delay={0.7} />
          <ConnectionLine from={agentPositions.agent} to={agentPositions.tool2} delay={0.8} />
          <ConnectionLine from={agentPositions.agent} to={agentPositions.tool3} delay={0.9} />
          <ConnectionLine from={agentPositions.agent} to={agentPositions.llm} delay={1.0} animated />
          
          {/* Agent nodes */}
          <AgentNode icon="👤" label="User" position={agentPositions.user} delay={0.3} />
          <AgentNode icon="🤖" label="Agent" position={agentPositions.agent} delay={0.4} isActive />
          <AgentNode icon="🔧" label="Tool: DB" position={agentPositions.tool1} delay={0.6} />
          <AgentNode icon="🌐" label="Tool: API" position={agentPositions.tool2} delay={0.7} />
          <AgentNode icon="📁" label="Tool: RAG" position={agentPositions.tool3} delay={0.8} />
          <AgentNode icon="🧠" label="LLM (GPU)" position={agentPositions.llm} delay={0.9} isActive />
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="p-4 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${theme.purpleLight}10 0%, transparent 100%)`,
            border: `1px solid ${theme.purpleLight}20`,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p style={{ color: theme.textSecondary }} className="text-sm">
              Every agent interaction requires <span style={{ color: theme.gpuGreen }} className="font-semibold">LLM inference</span> — 
              making agents <span style={{ color: theme.amber }} className="font-semibold">GPU workloads</span> at their core
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right: Details */}
      <div className="w-1/2 flex flex-col justify-center gap-6 relative z-10">
        {/* What are agents */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl"
          style={{
            background: theme.backgroundCard,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          <h3 className="text-xl font-semibold mb-3" style={{ color: theme.white }}>
            What are AI Agents?
          </h3>
          <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
            Autonomous AI systems that can reason, plan, and take actions using tools to accomplish complex tasks.
          </p>
          <div className="flex flex-wrap gap-2">
            <FeaturePill text="Multi-step Reasoning" color={theme.purpleLight} delay={0.7} />
            <FeaturePill text="Tool Calling" color={theme.cyan} delay={0.8} />
            <FeaturePill text="Memory & Context" color={theme.amber} delay={0.9} />
            <FeaturePill text="Autonomous Execution" color={theme.gpuGreen} delay={1.0} />
          </div>
        </motion.div>

        {/* Why agents need GPUs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-2xl"
          style={{
            background: theme.backgroundCard,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: theme.white }}>
            Why Agents Need GPU-as-a-Service
          </h3>
          <div className="space-y-3">
            {[
              { icon: '🔄', text: 'Multiple LLM calls per request (5-20+ typically)', color: theme.purpleLight },
              { icon: '⚡', text: 'Low latency required for interactive use', color: theme.cyan },
              { icon: '📈', text: 'Unpredictable, bursty demand patterns', color: theme.amber },
              { icon: '🔐', text: 'Enterprise data requires private inference', color: theme.redHatRed },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg"
                style={{ background: `${item.color}08` }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm" style={{ color: theme.textSecondary }}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Engineer persona callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-4 p-4 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${theme.purpleLight}15 0%, ${theme.magenta}10 100%)`,
            border: `1px solid ${theme.purpleLight}30`,
          }}
        >
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${theme.purpleLight}20` }}
          >
            <span className="text-3xl">🤖</span>
          </div>
          <div>
            <h4 className="font-semibold" style={{ color: theme.purpleLight }}>
              AI Engineer Persona
            </h4>
            <p className="text-sm" style={{ color: theme.textMuted }}>
              New persona in OpenShift AI focused on building agents & AI applications
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
