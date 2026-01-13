'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Animated stat card
const StatCard = ({ 
  value, 
  label, 
  icon, 
  color, 
  delay 
}: { 
  value: string; 
  label: string; 
  icon: string; 
  color: string; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="relative group"
  >
    <div 
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ 
        background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
        filter: 'blur(20px)',
      }}
    />
    <div 
      className="relative p-6 rounded-2xl border backdrop-blur-sm"
      style={{ 
        background: theme.glassBg,
        borderColor: `${color}30`,
      }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div 
        className="text-4xl font-bold mb-2"
        style={{ color }}
      >
        {value}
      </div>
      <div style={{ color: theme.textSecondary }} className="text-sm">
        {label}
      </div>
    </div>
  </motion.div>
);

// Challenge card
const ChallengeCard = ({
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
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start gap-4 p-5 rounded-xl"
    style={{ 
      background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`,
      border: `1px solid ${color}25`,
    }}
  >
    <div 
      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `${color}20` }}
    >
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: theme.white }}>
        {title}
      </h3>
      <p style={{ color: theme.textMuted }} className="text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

export default function Slide2() {
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
            background: `radial-gradient(circle, ${theme.redHatRedGlow} 0%, transparent 60%)`,
            top: '-20%',
            right: '-10%',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
          style={{ 
            background: `${theme.redHatRed}15`,
            border: `1px solid ${theme.redHatRed}30`,
          }}
        >
          <span style={{ color: theme.redHatRedLight }} className="text-xs font-medium uppercase tracking-wider">
            The Challenge
          </span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span style={{ color: theme.white }}>Generative AI </span>
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: theme.gradientRedGold }}
          >
            Adoption Barriers
          </span>
        </h2>
        <p style={{ color: theme.textMuted }} className="text-lg max-w-2xl mx-auto">
          Enterprises face critical challenges in scaling AI workloads efficiently
        </p>
      </motion.div>

      {/* Main content grid */}
      <div className="flex-1 flex gap-8 relative z-10">
        {/* Left: Stats */}
        <div className="w-1/3 flex flex-col justify-center gap-4">
          <StatCard
            value="$40K+"
            label="Per H100 GPU on secondary market"
            icon="💰"
            color={theme.redHatRed}
            delay={0.3}
          />
          <StatCard
            value="30-50%"
            label="Typical GPU utilization rate"
            icon="📉"
            color={theme.amber}
            delay={0.4}
          />
          <StatCard
            value="$41B"
            label="AI Platforms TAM (IDC 2024)"
            icon="📊"
            color={theme.gpuGreen}
            delay={0.5}
          />
        </div>

        {/* Right: Challenges */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <ChallengeCard
            icon="💸"
            title="Cost"
            description="Frontier model services are cost-prohibitive at scale for most enterprise use cases. GPU resources are scarce and expensive."
            color={theme.redHatRed}
            delay={0.6}
          />
          <ChallengeCard
            icon="🔧"
            title="Complexity"
            description="Tuning models with private enterprise data is too complex for non-data scientists. Managing GPU clusters requires specialized expertise."
            color={theme.purpleLight}
            delay={0.7}
          />
          <ChallengeCard
            icon="🌐"
            title="Flexibility"
            description="Enterprise AI spans data center, cloud & edge. Can't be constrained to a single cloud service or deployment model."
            color={theme.cyan}
            delay={0.8}
          />

          {/* Quote callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-4 p-4 rounded-xl relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${theme.backgroundCard} 0%, ${theme.backgroundLight} 100%)`,
              border: `1px solid ${theme.glassBorder}`,
            }}
          >
            <div 
              className="absolute top-0 left-0 w-1 h-full"
              style={{ background: theme.gradientRedGold }}
            />
            <p className="italic text-lg pl-4" style={{ color: theme.textSecondary }}>
              "You're paying for Ferraris, but only using them to drive to the corner store."
            </p>
            <p className="text-sm mt-2 pl-4" style={{ color: theme.textDim }}>
              — The GPU Efficiency Problem
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-center relative z-10"
      >
        <div 
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
          style={{ 
            background: theme.glassBg,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          <span style={{ color: theme.amber }}>💡</span>
          <span style={{ color: theme.textSecondary }}>
            <span className="font-semibold" style={{ color: theme.white }}>27%</span> of AI workloads require specialized compliance & security
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${theme.cyan}20`, color: theme.cyan }}>
            Sovereign AI
          </span>
        </div>
      </motion.div>
    </div>
  );
}
