'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from '@/components/diagrams/slides/shared/theme';

// Import all unified slides
import Slide1 from '@/components/diagrams/slides/Slide1';
import Slide2 from '@/components/diagrams/slides/Slide2';
import Slide3 from '@/components/diagrams/slides/Slide3';
import Slide4 from '@/components/diagrams/slides/Slide4';
import Slide5 from '@/components/diagrams/slides/Slide5';
import Slide6 from '@/components/diagrams/slides/Slide6';
import Slide7 from '@/components/diagrams/slides/Slide7';
import Slide8 from '@/components/diagrams/slides/Slide8';
import Slide9 from '@/components/diagrams/slides/Slide9';
import Slide10 from '@/components/diagrams/slides/Slide10';
import Slide11 from '@/components/diagrams/slides/Slide11';
import Slide12 from '@/components/diagrams/slides/Slide12';
import Slide13 from '@/components/diagrams/slides/Slide13';
import Slide14 from '@/components/diagrams/slides/Slide14';

interface SlideInfo {
  id: string;
  title: string;
  subtitle?: string;
  section: 'intro' | 'platform' | 'agentic' | 'solution' | 'demo';
}

// Unified slide structure covering the full story
const slideInfo: SlideInfo[] = [
  { id: 'title', title: 'GPU-as-a-Service', subtitle: 'Title', section: 'intro' },
  { id: 'problem', title: 'The Challenge', subtitle: 'Problem Statement', section: 'intro' },
  { id: 'openshift-ai', title: 'OpenShift AI', subtitle: 'Platform Overview', section: 'platform' },
  { id: 'capabilities', title: 'Capabilities', subtitle: 'Platform Stack', section: 'platform' },
  { id: 'kueue', title: 'GPU-as-a-Service', subtitle: 'Kueue Scheduling', section: 'platform' },
  { id: 'agents', title: 'Agentic AI', subtitle: 'The Future', section: 'agentic' },
  { id: 'llamastack', title: 'LlamaStack', subtitle: 'Open Framework', section: 'agentic' },
  { id: 'mcp', title: 'MCP', subtitle: 'Tool Calling', section: 'agentic' },
  { id: 'multi-cluster', title: 'Multi-Cluster', subtitle: 'The Challenge', section: 'solution' },
  { id: 'rhacm-multikueue', title: 'RHACM + MultiKueue', subtitle: 'The Solution', section: 'solution' },
  { id: 'architecture', title: 'Architecture', subtitle: 'Deep Dive', section: 'solution' },
  { id: 'admin-workflow', title: 'RHACM Admin', subtitle: 'Setup Workflow', section: 'demo' },
  { id: 'ds-workflow', title: 'Data Scientist', subtitle: 'Usage Workflow', section: 'demo' },
  { id: 'job-flow', title: 'Job Flow', subtitle: 'Live Animation', section: 'demo' },
];

// Slide components mapping
const slideComponents = [
  Slide1, Slide2, Slide3, Slide4, Slide5, Slide6,
  Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14,
];

// Get section colors using theme
const getSectionGradient = (section: string) => {
  switch (section) {
    case 'intro': return `linear-gradient(90deg, ${theme.redHatRed}, ${theme.amber})`;
    case 'platform': return `linear-gradient(90deg, ${theme.gpuGreen}, ${theme.cyan})`;
    case 'agentic': return `linear-gradient(90deg, ${theme.purpleLight}, ${theme.magenta})`;
    case 'solution': return `linear-gradient(90deg, ${theme.cyan}, ${theme.gpuGreen})`;
    case 'demo': return `linear-gradient(90deg, ${theme.amber}, ${theme.redHatRed})`;
    default: return `linear-gradient(90deg, ${theme.gray500}, ${theme.gray600})`;
  }
};

const getSectionIcon = (section: string) => {
  switch (section) {
    case 'intro': return '🎯';
    case 'platform': return '🏗️';
    case 'agentic': return '🤖';
    case 'solution': return '⚡';
    case 'demo': return '🎮';
    default: return '📄';
  }
};

export default function Home() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slideInfo.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex]);

  const handlePrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setDirection(-1);
      setCurrentSlideIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setDirection(1);
      setCurrentSlideIndex(slideInfo.length - 1);
    }
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentSlide = slideInfo[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / slideInfo.length) * 100;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  // Render the current slide component
  const renderSlide = () => {
    const SlideComponent = slideComponents[currentSlideIndex];
    return SlideComponent ? <SlideComponent /> : null;
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.amber})`,
                boxShadow: `0 8px 40px ${theme.redHatRedGlow}`
              }}
            >
              <span className="text-white text-2xl font-bold">AI</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ border: `2px solid ${theme.redHatRed}` }}
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <p style={{ color: theme.textMuted }}>Loading GPU-as-a-Service Demo...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen overflow-hidden relative"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ 
          background: `linear-gradient(to bottom, ${theme.background} 0%, ${theme.background}cc 50%, transparent 100%)`
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 pointer-events-auto">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.redHatRedDark})`,
                boxShadow: `0 4px 15px ${theme.redHatRedGlow}`
              }}
            >
              <span className="text-white font-bold text-sm">RH</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold" style={{ color: theme.white }}>
                GPU-as-a-Service
              </h1>
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{ 
                    background: getSectionGradient(currentSlide.section),
                    color: theme.white
                  }}
                >
                  {getSectionIcon(currentSlide.section)} {currentSlide.subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Slide dots */}
          <div className="flex items-center gap-1.5">
            {slideInfo.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(index > currentSlideIndex ? 1 : -1);
                  setCurrentSlideIndex(index);
                }}
                className="transition-all duration-300 rounded-full relative group"
                style={{
                  width: index === currentSlideIndex ? '28px' : '8px',
                  height: '8px',
                  background: index === currentSlideIndex 
                    ? getSectionGradient(slide.section)
                    : index < currentSlideIndex
                    ? `${theme.textMuted}80`
                    : theme.gray700
                }}
                title={slide.title}
              >
                {/* Tooltip */}
                <div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ 
                    background: theme.backgroundElevated,
                    color: theme.textSecondary,
                    border: `1px solid ${theme.glassBorder}`
                  }}
                >
                  {slide.title}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Slide counter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: theme.textMuted }}>
              {currentSlideIndex + 1} / {slideInfo.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main slide area */}
      <main className="h-full relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer 
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        style={{ 
          background: `linear-gradient(to top, ${theme.background} 0%, ${theme.background}cc 50%, transparent 100%)`
        }}
      >
        {/* Progress bar */}
        <div className="px-6 pb-2">
          <div 
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: `${theme.gray700}50` }}
          >
            <motion.div
              className="h-full"
              style={{ background: getSectionGradient(currentSlide.section) }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-3 pointer-events-auto">
          {/* Left: Section badges */}
          <div className="flex items-center gap-2">
            {[
              { id: 'intro', label: 'Intro' },
              { id: 'platform', label: 'Platform' },
              { id: 'agentic', label: 'Agentic' },
              { id: 'solution', label: 'Solution' },
              { id: 'demo', label: 'Demo' },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  const idx = slideInfo.findIndex(s => s.section === section.id);
                  if (idx !== -1) {
                    setDirection(idx > currentSlideIndex ? 1 : -1);
                    setCurrentSlideIndex(idx);
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ 
                  background: currentSlide.section === section.id 
                    ? getSectionGradient(section.id) 
                    : theme.backgroundCard,
                  color: currentSlide.section === section.id 
                    ? theme.white 
                    : theme.textMuted,
                  border: `1px solid ${currentSlide.section === section.id ? 'transparent' : theme.glassBorder}`
                }}
              >
                {getSectionIcon(section.id)} {section.label}
              </button>
            ))}
          </div>

          {/* Center: Navigation */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handlePrevious}
              disabled={currentSlideIndex === 0}
              whileHover={{ scale: currentSlideIndex === 0 ? 1 : 1.05 }}
              whileTap={{ scale: currentSlideIndex === 0 ? 1 : 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
              style={{ 
                backgroundColor: currentSlideIndex === 0 ? theme.backgroundCard : theme.backgroundElevated,
                color: currentSlideIndex === 0 ? theme.textDim : theme.textSecondary,
                cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
                border: `1px solid ${theme.glassBorder}`
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm hidden sm:inline">Previous</span>
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={currentSlideIndex === slideInfo.length - 1}
              whileHover={{ scale: currentSlideIndex === slideInfo.length - 1 ? 1 : 1.05 }}
              whileTap={{ scale: currentSlideIndex === slideInfo.length - 1 ? 1 : 0.95 }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl transition-all"
              style={{ 
                background: currentSlideIndex === slideInfo.length - 1 
                  ? theme.backgroundCard 
                  : getSectionGradient(currentSlide.section),
                color: currentSlideIndex === slideInfo.length - 1 ? theme.textDim : theme.white,
                cursor: currentSlideIndex === slideInfo.length - 1 ? 'not-allowed' : 'pointer',
                boxShadow: currentSlideIndex === slideInfo.length - 1 ? 'none' : `0 4px 20px ${theme.redHatRedGlow}`
              }}
            >
              <span className="text-sm hidden sm:inline">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Right: Keyboard hints */}
          <div className="flex items-center gap-2 text-xs" style={{ color: theme.textDim }}>
            <div className="flex items-center gap-1">
              <kbd 
                className="px-2 py-1 rounded text-[10px]"
                style={{ backgroundColor: theme.backgroundCard, border: `1px solid ${theme.glassBorder}` }}
              >←</kbd>
              <kbd 
                className="px-2 py-1 rounded text-[10px]"
                style={{ backgroundColor: theme.backgroundCard, border: `1px solid ${theme.glassBorder}` }}
              >→</kbd>
            </div>
            <span className="hidden md:inline">or Space to navigate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
