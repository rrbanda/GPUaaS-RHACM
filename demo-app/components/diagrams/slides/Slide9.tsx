'use client';

import { motion } from 'framer-motion';
import { theme } from './shared/theme';

// Slide 9: Clean summary view - simplified final state with proper spacing

export default function Slide9() {
  return (
    <div 
      className="w-full h-full flex flex-col p-6 relative overflow-hidden"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `radial-gradient(ellipse at center, ${theme.purple}15 0%, transparent 60%),
                          radial-gradient(ellipse at bottom, ${theme.redHatRed}08 0%, transparent 50%)`
      }}
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-white text-center mb-4"
      >
        GPU-as-a-Service with <span style={{ color: theme.redHatRed }}>RHACM</span> + <span style={{ color: theme.purple }}>MultiKueue</span>
      </motion.h2>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        
        {/* Hub Cluster Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-72 p-4 rounded-xl border-2"
          style={{ borderColor: theme.redHatRed, backgroundColor: theme.backgroundCard }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700">
              <span className="text-white font-bold text-[6px]">RHBoK</span>
            </div>
            <span className="text-red-400 font-semibold text-sm">RHACM Hub</span>
            <span className="text-gray-500 text-sm">+</span>
            <span className="text-purple-400 text-sm">MultiKueue</span>
          </div>
          <div className="text-cyan-400 text-xs text-center mb-3">= Kueue Manager Cluster</div>

          {/* Workload dispatching */}
          <div className="flex items-center justify-center gap-2 p-2 rounded bg-gray-800/50 border border-gray-700 mb-3">
            <motion.svg 
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <path d="M8 1 L10 8 L8 8 Z" fill="#22C55E"/>
              <path d="M15 8 L8 10 L8 8 Z" fill="#4ADE80"/>
              <path d="M8 15 L6 8 L8 8 Z" fill="#16A34A"/>
              <path d="M1 8 L8 6 L8 8 Z" fill="#15803D"/>
              <circle cx="8" cy="8" r="1.5" fill="white" stroke="#22C55E" strokeWidth="0.5"/>
            </motion.svg>
            <span className="text-white text-xs">Placement-based dispatching</span>
          </div>

          {/* Queue badges */}
          <div className="flex gap-2 justify-center">
            <div className="px-2 py-1 rounded bg-red-600/20 border border-red-500">
              <span className="text-[9px] text-red-300">GPU Queues</span>
            </div>
            <div className="px-2 py-1 rounded bg-blue-600/20 border border-blue-500">
              <span className="text-[9px] text-blue-300">CPU Queues</span>
            </div>
            <div className="px-2 py-1 rounded bg-amber-600/20 border border-amber-500">
              <span className="text-[9px] text-amber-300">Gold Queues</span>
            </div>
          </div>
        </motion.div>

        {/* Worker Clusters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6"
        >
          {[
            { name: 'CPU Clusters', color: '#3B82F6', icon: '🖥️' },
            { name: 'GPU Clusters', color: '#22C55E', icon: '🎮' },
            { name: 'Gold GPUs', color: '#F59E0B', icon: '✨' },
          ].map((cluster, i) => (
            <motion.div
              key={cluster.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
              <div 
                className="w-14 h-10 rounded-lg flex items-center justify-center border-2"
                style={{ borderColor: cluster.color, backgroundColor: `${cluster.color}15` }}
              >
                <span className="text-lg">{cluster.icon}</span>
              </div>
              <span className="text-[10px] text-gray-400">{cluster.name}</span>
              <div className="flex items-center gap-0.5">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <span className="text-[3px] text-white font-bold">RH</span>
                </div>
                <span className="text-[7px] text-gray-500">BoK</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Benefits - single row, properly spaced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-3"
        >
          {[
            { icon: '🎯', text: 'Smart Placement' },
            { icon: '⚡', text: 'Auto Scaling' },
            { icon: '🔐', text: 'Secure Access' },
            { icon: '📊', text: 'Fair Scheduling' },
          ].map((benefit, i) => (
            <div 
              key={i}
              className="flex items-center gap-1 px-2 py-1 rounded-full border border-gray-700 bg-gray-800/50"
            >
              <span className="text-sm">{benefit.icon}</span>
              <span className="text-[10px] text-gray-300">{benefit.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom: Personas - fixed height row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="flex justify-between items-center pt-4 border-t border-gray-800"
      >
        {/* Hub Admin */}
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="7" r="4" fill="#FEEBC8" stroke="#92400E" strokeWidth="0.6"/>
            <rect x="11" y="5.5" width="2.5" height="1.5" rx="0.3" stroke="#1F2937" strokeWidth="0.5" fill="none"/>
            <rect x="14.5" y="5.5" width="2.5" height="1.5" rx="0.3" stroke="#1F2937" strokeWidth="0.5" fill="none"/>
            <path d="M7 24 L9 15 Q14 11 19 15 L21 24" fill={theme.redHatRed}/>
          </svg>
          <div>
            <div className="text-xs text-gray-300">Hub Admin</div>
            <div className="text-[9px] text-gray-500">Creates Placements</div>
          </div>
        </div>

        {/* Data Scientist */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-gray-300">Data Scientist</div>
            <div className="text-[9px] text-gray-500">Submits to Kueues</div>
          </div>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="7" r="4" fill="#FEEBC8" stroke="#92400E" strokeWidth="0.6"/>
            <path d="M9 5 Q14 2 19 5" stroke="#4A3728" strokeWidth="1" fill="none"/>
            <path d="M7 24 L9 15 Q14 11 19 15 L21 24" fill="#3B82F6"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
