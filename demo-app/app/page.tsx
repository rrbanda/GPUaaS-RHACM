'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TitleSlide from '@/components/slides/TitleSlide';
import PersonaSlide from '@/components/slides/PersonaSlide';
import DemoSlide from '@/components/slides/DemoSlide';
import PersonaToggle from '@/components/ui/PersonaToggle';
import { theme } from '@/components/diagrams/slides/shared/theme';

// Import all 9 architecture slides
import Slide1 from '@/components/diagrams/slides/Slide1';
import Slide2 from '@/components/diagrams/slides/Slide2';
import Slide3 from '@/components/diagrams/slides/Slide3';
import Slide4 from '@/components/diagrams/slides/Slide4';
import Slide5 from '@/components/diagrams/slides/Slide5';
import Slide6 from '@/components/diagrams/slides/Slide6';
import Slide7 from '@/components/diagrams/slides/Slide7';
import Slide8 from '@/components/diagrams/slides/Slide8';
import Slide9 from '@/components/diagrams/slides/Slide9';

type Persona = 'admin' | 'scientist' | 'all';

interface SlideInfo {
  id: string;
  title: string;
  subtitle?: string;
  section: 'intro' | 'architecture' | 'personas' | 'interactive';
}

// Unified slide structure: Intro → 9 Architecture Slides → Personas → Interactive
const slideInfo: SlideInfo[] = [
  { id: 'intro', title: 'GPU-as-a-Service', subtitle: 'Introduction', section: 'intro' },
  { id: 'arch-1', title: 'Infrastructure', subtitle: 'Step 1/9', section: 'architecture' },
  { id: 'arch-2', title: 'Enable Addon', subtitle: 'Step 2/9', section: 'architecture' },
  { id: 'arch-3', title: 'Kueue Setup', subtitle: 'Step 3/9', section: 'architecture' },
  { id: 'arch-4', title: 'Placements', subtitle: 'Step 4/9', section: 'architecture' },
  { id: 'arch-5', title: 'Queues', subtitle: 'Step 5/9', section: 'architecture' },
  { id: 'arch-6', title: 'Entry Points', subtitle: 'Step 6/9', section: 'architecture' },
  { id: 'arch-7', title: 'Job Flow', subtitle: 'Step 7/9', section: 'architecture' },
  { id: 'arch-8', title: 'Complete', subtitle: 'Step 8/9', section: 'architecture' },
  { id: 'arch-9', title: 'Summary', subtitle: 'Step 9/9', section: 'architecture' },
  { id: 'personas', title: 'Two Personas', subtitle: 'Use Cases', section: 'personas' },
  { id: 'interactive', title: 'Try It', subtitle: 'Interactive Mode', section: 'interactive' },
];

// Get section colors using theme
const getSectionGradient = (section: string) => {
  switch (section) {
    case 'intro': return `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})`;
    case 'architecture': return `linear-gradient(90deg, ${theme.purple}, ${theme.cpuBlue})`;
    case 'personas': return `linear-gradient(90deg, ${theme.gpuGreen}, ${theme.teal})`;
    case 'interactive': return `linear-gradient(90deg, ${theme.goldAmber}, ${theme.redHatRed})`;
    default: return `linear-gradient(90deg, ${theme.gray500}, ${theme.gray600})`;
  }
};

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
    } else if (e.key >= '1' && e.key <= '9') {
      const slideNum = parseInt(e.key);
      if (slideNum <= slideInfo.length) {
        setDirection(slideNum - 1 > currentSlideIndex ? 1 : -1);
        setCurrentSlideIndex(slideNum - 1);
      }
    }
  }, [handleNext, handlePrevious, currentSlideIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentSlide = slideInfo[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / slideInfo.length) * 100;

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

  // Render the current slide component
  const renderSlide = () => {
    switch (currentSlide.id) {
      case 'intro':
        return <TitleSlide persona={persona} />;
      case 'arch-1':
        return <div className="h-full flex items-center justify-center"><Slide1 /></div>;
      case 'arch-2':
        return <div className="h-full flex items-center justify-center"><Slide2 /></div>;
      case 'arch-3':
        return <div className="h-full flex items-center justify-center"><Slide3 /></div>;
      case 'arch-4':
        return <div className="h-full flex items-center justify-center"><Slide4 /></div>;
      case 'arch-5':
        return <div className="h-full flex items-center justify-center"><Slide5 /></div>;
      case 'arch-6':
        return <div className="h-full flex items-center justify-center"><Slide6 /></div>;
      case 'arch-7':
        return <div className="h-full flex items-center justify-center"><Slide7 /></div>;
      case 'arch-8':
        return <div className="h-full flex items-center justify-center"><Slide8 /></div>;
      case 'arch-9':
        return <div className="h-full flex items-center justify-center"><Slide9 /></div>;
      case 'personas':
        return <PersonaSlide persona={persona} />;
      case 'interactive':
        return <DemoSlide persona={persona} />;
      default:
        return null;
    }
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
          <div 
            className="w-12 h-12 rounded-full animate-spin"
            style={{ 
              border: `2px solid ${theme.redHatRed}30`,
              borderTopColor: theme.redHatRed
            }}
          />
          <p style={{ color: theme.gray400 }}>Loading GPU-as-a-Service Demo...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen overflow-hidden relative"
      style={{ backgroundColor: theme.background }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.redHatRed}15 0%, transparent 70%)`,
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
            background: `radial-gradient(circle, ${theme.goldAmber}10 0%, transparent 70%)`,
            bottom: '-10%',
            left: '-15%',
          }}
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Header - Title & Section indicator */}
      <header 
        className="fixed top-0 left-0 right-0 z-50"
        style={{ 
          background: `linear-gradient(to bottom, ${theme.background}, ${theme.background}e6, transparent)`
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.redHatRed}, ${theme.redHatRedDark})` }}
            >
              <span className="text-white font-bold text-xs">RH</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold" style={{ color: theme.white }}>MultiKueue Architecture</h1>
              <p className="text-xs" style={{ color: theme.gray500 }}>{currentSlide.subtitle}</p>
            </div>
          </div>

          {/* Center: Slide dots */}
          <div className="flex items-center gap-1">
            {slideInfo.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(index > currentSlideIndex ? 1 : -1);
                  setCurrentSlideIndex(index);
                }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: index === currentSlideIndex ? '24px' : '8px',
                  height: '8px',
                  background: index === currentSlideIndex 
                    ? getSectionGradient(slide.section)
                    : index < currentSlideIndex
                    ? theme.gray500
                    : theme.gray700
                }}
                title={slide.title}
              />
            ))}
          </div>

          {/* Right: Persona Toggle */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlideIndex > 0 ? 1 : 0 }}
            >
              <PersonaToggle selected={persona} onSelect={setPersona} />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main slide area */}
      <main className="h-full pt-14 pb-20 relative z-10">
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
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{ 
          background: `linear-gradient(to top, ${theme.background}, ${theme.background}e6, transparent)`
        }}
      >
        {/* Progress bar */}
        <div className="px-6 pb-2">
          <div 
            className="h-0.5 rounded-full overflow-hidden"
            style={{ backgroundColor: theme.gray800 }}
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

        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Section badges */}
          <div className="flex items-center gap-2">
            {[
              { id: 'intro', label: '🎯 Intro' },
              { id: 'architecture', label: '🏗️ Architecture' },
              { id: 'personas', label: '👥 Personas' },
              { id: 'interactive', label: '🎮 Interactive' },
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
                className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={{ 
                  background: currentSlide.section === section.id 
                    ? getSectionGradient(section.id) 
                    : `${theme.gray800}80`,
                  color: currentSlide.section === section.id 
                    ? theme.white 
                    : theme.gray500
                }}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Center: Navigation */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handlePrevious}
              disabled={currentSlideIndex === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all border"
              style={{ 
                backgroundColor: currentSlideIndex === 0 ? `${theme.gray800}30` : `${theme.gray800}80`,
                borderColor: `${theme.gray700}50`,
                color: currentSlideIndex === 0 ? theme.gray600 : theme.gray300,
                cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Previous</span>
            </motion.button>

            <span className="text-sm" style={{ color: theme.gray600 }}>
              {currentSlideIndex + 1} / {slideInfo.length}
            </span>

            <motion.button
              onClick={handleNext}
              disabled={currentSlideIndex === slideInfo.length - 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
              style={{ 
                background: currentSlideIndex === slideInfo.length - 1 
                  ? `${theme.gray800}30` 
                  : `linear-gradient(90deg, ${theme.redHatRed}, ${theme.goldAmber})`,
                color: currentSlideIndex === slideInfo.length - 1 ? theme.gray600 : theme.white,
                cursor: currentSlideIndex === slideInfo.length - 1 ? 'not-allowed' : 'pointer',
                boxShadow: currentSlideIndex === slideInfo.length - 1 ? 'none' : `0 4px 20px ${theme.redHatRed}30`
              }}
            >
              <span className="text-sm">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Right: Keyboard hints */}
          <div className="flex items-center gap-2 text-xs" style={{ color: theme.gray600 }}>
            <kbd 
              className="px-1.5 py-0.5 rounded text-[10px] border"
              style={{ backgroundColor: `${theme.gray800}80`, borderColor: `${theme.gray700}50` }}
            >←</kbd>
            <kbd 
              className="px-1.5 py-0.5 rounded text-[10px] border"
              style={{ backgroundColor: `${theme.gray800}80`, borderColor: `${theme.gray700}50` }}
            >→</kbd>
            <span>Navigate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
