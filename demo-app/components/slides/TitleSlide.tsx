'use client';

import { motion } from 'framer-motion';
import { theme } from '../diagrams/slides/shared/theme';

type Persona = 'admin' | 'scientist' | 'all';

export default function TitleSlide({ persona }: { persona: Persona }) {
  return (
    <div 
      className="h-full flex flex-col items-center justify-center text-center px-8 overflow-hidden relative"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `radial-gradient(ellipse at top right, ${theme.purple}20 0%, transparent 50%),
                          radial-gradient(ellipse at bottom left, ${theme.redHatRed}15 0%, transparent 50%)`
      }}
    >
      {/* Floating GPU icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          >
            {i % 3 === 0 ? '🖥️' : i % 3 === 1 ? '⚡' : '🚀'}
          </motion.div>
        ))}
      </div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
          <span className="block text-xl md:text-2xl font-medium mb-4 tracking-wide" style={{ color: theme.gray400 }}>
            Red Hat Advanced Cluster Management
          </span>
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber}, ${theme.redHatRed})` }}
          >
            GPU-as-a-Service
          </span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl" style={{ color: theme.white }}>
            with MultiKueue
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-3xl mb-12"
      >
        <div className="relative">
          <div 
            className="absolute -inset-1 rounded-2xl blur-xl" 
            style={{ background: `linear-gradient(90deg, ${theme.redHatRed}20, ${theme.goldAmber}20)` }}
          />
          <div 
            className="relative rounded-xl p-6 border"
            style={{ 
              backgroundColor: `${theme.backgroundCard}cc`,
              borderColor: `${theme.gray700}50`
            }}
          >
            <p className="text-xl md:text-2xl leading-relaxed" style={{ color: theme.gray200 }}>
              Intelligent <span style={{ color: theme.redHatRed }} className="font-semibold">multi-cluster workload scheduling</span> for{' '}
              <span style={{ color: theme.goldAmber }} className="font-semibold">AI/ML training jobs</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
      >
        {[
          { icon: '🎯', title: 'Single Entry Point', subtitle: 'Submit to hub' },
          { icon: '🏷️', title: 'Label-Based', subtitle: 'GPU selection' },
          { icon: '📊', title: 'Score-Based', subtitle: 'Dynamic routing' },
          { icon: '⚡', title: 'Auto-Dispatch', subtitle: 'Best cluster' },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="group relative px-5 py-4 rounded-xl transition-all duration-300 border"
            style={{ 
              backgroundColor: `${theme.backgroundCard}80`,
              borderColor: `${theme.gray700}50`
            }}
          >
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${theme.redHatRed}10, ${theme.goldAmber}10)` }}
            />
            <div className="relative">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h3 className="font-semibold text-sm" style={{ color: theme.white }}>{item.title}</h3>
              <p className="text-xs" style={{ color: theme.gray500 }}>{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
          style={{ color: theme.gray500 }}
        >
          <span className="text-xs">Press → to explore</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
