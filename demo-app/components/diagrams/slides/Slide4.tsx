'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Layer component for the stack visualization
const StackLayer = ({
  title,
  items,
  color,
  delay,
  isHighlighted,
}: {
  title: string;
  items: { icon: string; label: string }[];
  color: string;
  delay: number;
  isHighlighted?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`relative ${isHighlighted ? 'z-10' : ''}`}
  >
    {/* Glow effect for highlighted */}
    {isHighlighted && (
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at center, ${color}30 0%, transparent 70%)`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    )}
    
    <div
      className="relative p-5 rounded-2xl"
      style={{
        background: isHighlighted 
          ? `linear-gradient(135deg, ${color}15 0%, ${theme.backgroundCard} 100%)`
          : theme.backgroundCard,
        border: `1px solid ${isHighlighted ? color : theme.glassBorder}`,
        boxShadow: isHighlighted ? `0 4px 30px ${color}20` : undefined,
      }}
    >
      {/* Layer title */}
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: isHighlighted ? color : theme.white }}
        >
          {title}
        </h3>
        <div 
          className="w-3 h-3 rounded-full"
          style={{ background: color }}
        />
      </div>
      
      {/* Items grid */}
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.1 + i * 0.05 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: `${color}10`,
              border: `1px solid ${color}20`,
            }}
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Persona badge
const PersonaBadge = ({
  icon,
  label,
  color,
  delay,
}: {
  icon: string;
  label: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex flex-col items-center gap-2"
  >
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        border: `1px solid ${color}40`,
      }}
    >
      <span className="text-3xl">{icon}</span>
    </div>
    <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>
      {label}
    </span>
  </motion.div>
);

export default function Slide4() {
  return (
    <div 
      className="w-full h-full flex p-8 gap-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.gpuGreenGlow} 0%, transparent 60%)`,
            top: '30%',
            left: '-10%',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Left: Stack visualization */}
      <div className="w-3/5 flex flex-col justify-center gap-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ 
              background: `${theme.gpuGreen}15`,
              border: `1px solid ${theme.gpuGreen}30`,
            }}
          >
            <span style={{ color: theme.gpuGreen }} className="text-xs font-medium uppercase tracking-wider">
              Platform Stack
            </span>
          </div>
          <h2 className="text-3xl font-bold">
            <span style={{ color: theme.white }}>OpenShift AI </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: theme.gradientGreenCyan }}
            >
              Capabilities
            </span>
          </h2>
        </motion.div>

        {/* Stack layers */}
        <div className="flex flex-col gap-3">
          <StackLayer
            title="Generative AI"
            items={[
              { icon: '🦙', label: 'LlamaStack' },
              { icon: '🤖', label: 'AI Agents' },
              { icon: '🔌', label: 'MCP' },
              { icon: '🎨', label: 'GenAI Studio' },
              { icon: '🏪', label: 'AI Hub' },
            ]}
            color={theme.purpleLight}
            delay={0.3}
            isHighlighted
          />
          
          <StackLayer
            title="Model Lifecycle"
            items={[
              { icon: '📓', label: 'Notebooks' },
              { icon: '📊', label: 'Pipelines' },
              { icon: '🧪', label: 'Experiments' },
              { icon: '📦', label: 'Registry' },
              { icon: '🛠️', label: 'InstructLab' },
            ]}
            color={theme.amber}
            delay={0.5}
          />
          
          <StackLayer
            title="Model Serving"
            items={[
              { icon: '🚀', label: 'KServe' },
              { icon: '⚡', label: 'vLLM' },
              { icon: '🔀', label: 'llm-d' },
              { icon: '📈', label: 'Autoscaling' },
              { icon: '🌐', label: 'API Gateway' },
            ]}
            color={theme.gpuGreen}
            delay={0.7}
            isHighlighted
          />
          
          <StackLayer
            title="GPU-as-a-Service"
            items={[
              { icon: '📋', label: 'Kueue' },
              { icon: '🔲', label: 'DAS' },
              { icon: '🔀', label: 'MultiKueue' },
              { icon: '⚖️', label: 'Fair Share' },
            ]}
            color={theme.cyan}
            delay={0.9}
            isHighlighted
          />
        </div>
      </div>

      {/* Right: Personas & Key benefits */}
      <div className="w-2/5 flex flex-col justify-center gap-6 relative z-10">
        {/* Personas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="p-5 rounded-2xl"
          style={{
            background: theme.backgroundCard,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.white }}>
            Target Personas
          </h3>
          <div className="flex justify-around">
            <PersonaBadge
              icon="🏗️"
              label="Platform Engineer"
              color={theme.redHatRed}
              delay={1.2}
            />
            <PersonaBadge
              icon="🔬"
              label="Data Scientist"
              color={theme.gpuGreen}
              delay={1.3}
            />
            <PersonaBadge
              icon="🤖"
              label="AI Engineer"
              color={theme.purpleLight}
              delay={1.4}
            />
          </div>
        </motion.div>

        {/* Key highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="space-y-3"
        >
          {[
            { icon: '🎯', text: 'Unified platform for all AI workloads', color: theme.redHatRed },
            { icon: '🔐', text: 'Enterprise security & compliance built-in', color: theme.amber },
            { icon: '☁️', text: 'Hybrid cloud: datacenter, cloud & edge', color: theme.cyan },
            { icon: '🔄', text: 'Open source, no vendor lock-in', color: theme.gpuGreen },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: `${item.color}08`,
                border: `1px solid ${item.color}15`,
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span style={{ color: theme.textSecondary }} className="text-sm">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex items-center justify-center gap-4"
        >
          <div 
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: `${theme.redHatRed}15`,
              border: `1px solid ${theme.redHatRed}30`,
              color: theme.redHatRedLight,
            }}
          >
            OpenShift AI 3.0
          </div>
          <div 
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: `${theme.gpuGreen}15`,
              border: `1px solid ${theme.gpuGreen}30`,
              color: theme.gpuGreen,
            }}
          >
            Generally Available
          </div>
        </motion.div>
      </div>
    </div>
  );
}
