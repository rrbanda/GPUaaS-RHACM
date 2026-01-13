'use client';

import { motion } from 'framer-motion';

type Persona = 'admin' | 'scientist' | 'all';

export default function TitleSlide({ persona }: { persona: Persona }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8 overflow-hidden relative">
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
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
          <span className="block text-gray-400 text-xl md:text-2xl font-medium mb-4 tracking-wide">
            Red Hat Advanced Cluster Management
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-400 to-red-500">
            GPU-as-a-Service
          </span>
          <br />
          <span className="text-white text-4xl md:text-5xl lg:text-6xl">with MultiKueue</span>
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
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-amber-600/20 rounded-2xl blur-xl" />
          <div className="relative glass rounded-xl p-6">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Intelligent <span className="text-red-400 font-semibold">multi-cluster workload scheduling</span> for{' '}
              <span className="text-amber-400 font-semibold">AI/ML training jobs</span>
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
            className="group relative px-5 py-4 rounded-xl glass hover:border-red-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/0 to-amber-500/0 group-hover:from-red-500/5 group-hover:to-amber-500/5 transition-all duration-300" />
            <div className="relative">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h3 className="text-white font-semibold text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.subtitle}</p>
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
          className="flex flex-col items-center gap-1 text-gray-500"
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
