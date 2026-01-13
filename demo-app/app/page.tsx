'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TitleSlide from '@/components/slides/TitleSlide';
import ArchitectureSlide from '@/components/slides/ArchitectureSlide';
import PersonaSlide from '@/components/slides/PersonaSlide';
import DemoSlide from '@/components/slides/DemoSlide';
import PersonaToggle from '@/components/ui/PersonaToggle';

type Persona = 'admin' | 'scientist' | 'all';

interface Slide {
  id: string;
  title: string;
  component: React.ComponentType<{ persona: Persona }>;
}

const slides: Slide[] = [
  { id: 'title', title: 'GPU-as-a-Service', component: TitleSlide },
  { id: 'architecture', title: 'Architecture', component: ArchitectureSlide },
  { id: 'personas', title: 'Use Cases', component: PersonaSlide },
  { id: 'demo', title: 'Interactive Demo', component: DemoSlide },
];

export default function Home() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [persona, setPersona] = useState<Persona>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
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
    }
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentSlide = slides[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
          <p className="text-gray-400">Loading GPU-as-a-Service Demo...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0a0f] overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(238,0,0,0.08) 0%, transparent 70%)',
            top: '-20%',
            right: '-20%',
          }}
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-15%',
          }}
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      {/* Persona Toggle - top right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: currentSlideIndex > 0 ? 1 : 0, y: currentSlideIndex > 0 ? 0 : -20 }}
        className="fixed top-4 right-4 z-50"
      >
        <PersonaToggle selected={persona} onSelect={setPersona} />
      </motion.div>

      {/* Slide indicator dots - top center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              setDirection(index > currentSlideIndex ? 1 : -1);
              setCurrentSlideIndex(index);
            }}
            className={`relative group transition-all duration-300 ${
              index === currentSlideIndex ? 'scale-110' : ''
            }`}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlideIndex
                ? 'bg-gradient-to-r from-red-500 to-amber-500'
                : index < currentSlideIndex
                ? 'bg-red-500/50'
                : 'bg-gray-700'
            }`} />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {slide.title}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Main slide area */}
      <main className="h-full pt-16 pb-24 relative z-10">
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
            {currentSlide && <currentSlide.component persona={persona} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress bar */}
      <div className="fixed bottom-20 left-0 right-0 z-40 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-4 py-4 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent">
        <motion.button
          onClick={handlePrevious}
          disabled={currentSlideIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
            currentSlideIndex === 0
              ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Previous</span>
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
            currentSlideIndex === slides.length - 1
              ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-500 hover:to-amber-500 shadow-lg shadow-red-500/20'
          }`}
        >
          <span className="text-sm">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </nav>

      {/* Keyboard hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 right-6 z-50 flex items-center gap-4 text-xs text-gray-600"
      >
        <a 
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/slides`}
          className="flex items-center gap-1 hover:text-gray-400 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          All Slides
        </a>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] border border-gray-700/50">→</kbd>
          Navigate
        </span>
      </motion.div>
    </div>
  );
}
