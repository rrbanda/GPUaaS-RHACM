'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Animated orbit ring
const OrbitRing = ({ 
  radius, 
  duration, 
  delay,
  color 
}: { 
  radius: number; 
  duration: number; 
  delay: number;
  color: string;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: radius * 2,
      height: radius * 2,
      border: `1px solid ${color}`,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      rotate: 360,
    }}
    transition={{
      opacity: { duration: 4, repeat: Infinity, delay },
      rotate: { duration, repeat: Infinity, ease: 'linear', delay },
    }}
  />
);

// Central logo
const CentralLogo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, type: 'spring' }}
    className="relative z-20"
  >
    <div 
      className="absolute inset-0 rounded-3xl"
      style={{ 
        background: `radial-gradient(circle, ${theme.redHatRedGlow} 0%, transparent 70%)`,
        filter: 'blur(30px)',
        transform: 'scale(1.5)',
      }}
    />
    <div 
      className="relative w-32 h-32 rounded-3xl flex items-center justify-center"
      style={{ 
        background: `linear-gradient(135deg, ${theme.redHatRed} 0%, ${theme.redHatRedDark} 100%)`,
        boxShadow: `0 8px 40px ${theme.redHatRedGlow}`,
      }}
    >
      <span className="text-white text-4xl font-bold">AI</span>
    </div>
  </motion.div>
);

// Orbiting feature
const OrbitingFeature = ({
  icon,
  label,
  angle,
  radius,
  delay,
  color,
}: {
  icon: string;
  label: string;
  angle: number;
  radius: number;
  delay: number;
  color: string;
}) => {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `calc(50% + ${x}px - 32px)`,
        top: `calc(50% + ${y}px - 32px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center relative group cursor-pointer"
        style={{ 
          background: theme.backgroundCard,
          border: `1px solid ${color}40`,
        }}
        whileHover={{ scale: 1.1, borderColor: color }}
      >
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ 
            background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          }}
        />
        <span className="text-2xl relative z-10">{icon}</span>
        
        {/* Label tooltip */}
        <motion.div
          className="absolute top-full mt-2 whitespace-nowrap px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ 
            background: theme.backgroundElevated,
            color: theme.textPrimary,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          {label}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Feature card
const FeatureCard = ({
  title,
  description,
  icon,
  color,
  delay,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-5 rounded-xl relative overflow-hidden group"
    style={{ 
      background: theme.backgroundCard,
      border: `1px solid ${theme.glassBorder}`,
    }}
  >
    <motion.div
      className="absolute inset-0"
      style={{ 
        background: `linear-gradient(135deg, ${color}10 0%, transparent 50%)`,
      }}
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
    />
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <span className="text-xl">{icon}</span>
        </div>
        <h3 className="font-semibold text-lg" style={{ color: theme.white }}>
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
        {description}
      </p>
    </div>
  </motion.div>
);

export default function Slide3() {
  const features = [
    { icon: '📓', label: 'Notebooks', angle: 0, color: theme.amber },
    { icon: '🧪', label: 'Experiments', angle: 45, color: theme.purpleLight },
    { icon: '📊', label: 'Pipelines', angle: 90, color: theme.cyan },
    { icon: '🚀', label: 'Model Serving', angle: 135, color: theme.gpuGreen },
    { icon: '📦', label: 'Model Registry', angle: 180, color: theme.redHatRed },
    { icon: '🔧', label: 'Tuning', angle: 225, color: theme.amber },
    { icon: '🤖', label: 'Agents', angle: 270, color: theme.purpleLight },
    { icon: '🦙', label: 'LlamaStack', angle: 315, color: theme.magenta },
  ];

  return (
    <div 
      className="w-full h-full flex p-8 gap-8 relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(${theme.white}10 1px, transparent 1px),
            linear-gradient(90deg, ${theme.white}10 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Left: Visual */}
      <div className="w-1/2 flex items-center justify-center relative">
        {/* Orbit rings */}
        <OrbitRing radius={100} duration={30} delay={0} color={theme.redHatRed + '40'} />
        <OrbitRing radius={160} duration={40} delay={0.5} color={theme.purpleLight + '30'} />
        <OrbitRing radius={220} duration={50} delay={1} color={theme.cyan + '20'} />
        
        {/* Central logo */}
        <CentralLogo />
        
        {/* Orbiting features */}
        {features.map((f, i) => (
          <OrbitingFeature
            key={f.label}
            icon={f.icon}
            label={f.label}
            angle={f.angle}
            radius={160}
            delay={0.3 + i * 0.1}
            color={f.color}
          />
        ))}
      </div>

      {/* Right: Content */}
      <div className="w-1/2 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ 
              background: `${theme.redHatRed}15`,
              border: `1px solid ${theme.redHatRed}30`,
            }}
          >
            <span style={{ color: theme.redHatRedLight }} className="text-xs font-medium uppercase tracking-wider">
              The Platform
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            <span style={{ color: theme.white }}>Red Hat </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: theme.gradientRedPurple }}
            >
              OpenShift AI
            </span>
          </h2>
          <p style={{ color: theme.textSecondary }} className="text-lg">
            Enterprise-ready hybrid AI & MLOps platform for the open hybrid cloud
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard
            icon="🧠"
            title="Train & Tune"
            description="Jupyter notebooks, experiment tracking, and InstructLab for model customization"
            color={theme.amber}
            delay={0.5}
          />
          <FeatureCard
            icon="🚀"
            title="Serve & Scale"
            description="KServe & vLLM for high-performance model serving with autoscaling"
            color={theme.gpuGreen}
            delay={0.6}
          />
          <FeatureCard
            icon="⚡"
            title="GPU-as-a-Service"
            description="Kueue integration for intelligent GPU scheduling and multi-tenancy"
            color={theme.cyan}
            delay={0.7}
          />
          <FeatureCard
            icon="🤖"
            title="Agentic AI"
            description="LlamaStack APIs, MCP support, and GenAI Studio for building agents"
            color={theme.purpleLight}
            delay={0.8}
          />
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex items-center gap-6"
        >
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: theme.gpuGreen }}>90%+</div>
            <div className="text-xs" style={{ color: theme.textMuted }}>GPU Utilization</div>
          </div>
          <div className="w-px h-8" style={{ background: theme.glassBorder }} />
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: theme.cyan }}>100+</div>
            <div className="text-xs" style={{ color: theme.textMuted }}>Pre-built Models</div>
          </div>
          <div className="w-px h-8" style={{ background: theme.glassBorder }} />
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: theme.purpleLight }}>3.x</div>
            <div className="text-xs" style={{ color: theme.textMuted }}>Latest Release</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
