'use client';

import { motion } from 'framer-motion';
import { theme, animations } from './shared/theme';

// Animated GPU chip component
const GPUChip = ({ delay = 0, size = 60 }: { delay?: number; size?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay, duration: 0.6, ...animations.springBouncy }}
    className="relative"
    style={{ width: size, height: size }}
  >
    <div 
      className="absolute inset-0 rounded-lg"
      style={{ 
        background: theme.gradientGreenCyan,
        opacity: 0.2,
        filter: 'blur(12px)',
      }}
    />
    <div 
      className="relative w-full h-full rounded-lg border flex items-center justify-center"
      style={{ 
        background: theme.backgroundCard,
        borderColor: theme.gpuGreen,
      }}
    >
      <div className="grid grid-cols-3 gap-0.5 p-2">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-sm"
            style={{ background: theme.gpuGreen }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ 
              delay: delay + i * 0.05,
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Floating particle
const FloatingParticle = ({ index }: { index: number }) => {
  const colors = [theme.redHatRed, theme.gpuGreen, theme.purpleLight, theme.cyan, theme.amber];
  const color = colors[index % colors.length];
  const size = 4 + Math.random() * 6;
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${startX}%`,
        top: `${startY}%`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: 'easeInOut',
      }}
    />
  );
};

export default function Slide1() {
  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.redHatRedGlow} 0%, transparent 60%)`,
            top: '-30%',
            right: '-20%',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.purpleGlow} 0%, transparent 60%)`,
            bottom: '-20%',
            left: '-15%',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.gpuGreenGlow} 0%, transparent 60%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl px-8">
        {/* Red Hat badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ 
            background: `${theme.redHatRed}15`,
            border: `1px solid ${theme.redHatRed}40`,
          }}
        >
          <div 
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ background: theme.redHatRed }}
          >
            <span className="text-white text-xs font-bold">RH</span>
          </div>
          <span style={{ color: theme.redHatRedLight }} className="text-sm font-medium">
            Red Hat OpenShift AI
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: theme.gradientRedGold }}
          >
            GPU-as-a-Service
          </span>
          <br />
          <span style={{ color: theme.white }} className="text-4xl md:text-5xl lg:text-6xl">
            Multi-Cluster AI Workloads
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
          style={{ color: theme.textSecondary }}
        >
          Intelligent workload scheduling across hybrid cloud with{' '}
          <span style={{ color: theme.cyan }} className="font-semibold">RHACM</span>,{' '}
          <span style={{ color: theme.gpuGreen }} className="font-semibold">Kueue</span>, and{' '}
          <span style={{ color: theme.purpleLight }} className="font-semibold">LlamaStack</span>
        </motion.p>

        {/* GPU chips decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <GPUChip delay={0.8} size={50} />
          <GPUChip delay={0.9} size={60} />
          <GPUChip delay={1.0} size={70} />
          <GPUChip delay={1.1} size={60} />
          <GPUChip delay={1.2} size={50} />
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: '🎯', label: 'Smart Placement', color: theme.redHatRed },
            { icon: '⚡', label: 'Distributed Inference', color: theme.gpuGreen },
            { icon: '🤖', label: 'Agentic AI', color: theme.purpleLight },
            { icon: '🔄', label: 'Multi-Cluster', color: theme.cyan },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ 
                background: theme.glassBg,
                border: `1px solid ${theme.glassBorder}`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span style={{ color: item.color }} className="text-sm font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
          style={{ color: theme.textMuted }}
        >
          <span className="text-xs">Press → or Space to continue</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
