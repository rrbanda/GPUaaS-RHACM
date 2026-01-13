'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide1 from '@/components/diagrams/slides/Slide1';
import Slide2 from '@/components/diagrams/slides/Slide2';
import Slide3 from '@/components/diagrams/slides/Slide3';
import Slide4 from '@/components/diagrams/slides/Slide4';
import Slide5 from '@/components/diagrams/slides/Slide5';
import Slide6 from '@/components/diagrams/slides/Slide6';
import Slide7 from '@/components/diagrams/slides/Slide7';
import Slide8 from '@/components/diagrams/slides/Slide8';
import Slide9 from '@/components/diagrams/slides/Slide9';

const slides = [
  { id: 1, component: Slide1, title: 'Infrastructure Overview' },
  { id: 2, component: Slide2, title: 'MultiKueue Addon Setup' },
  { id: 3, component: Slide3, title: 'Kueue Workload Dispatching' },
  { id: 4, component: Slide4, title: 'Data Scientists Submit Jobs' },
  { id: 5, component: Slide5, title: 'Job Flow to Clusters' },
  { id: 6, component: Slide6, title: 'Complete Architecture' },
  { id: 7, component: Slide7, title: 'Animated Job Flow' },
  { id: 8, component: Slide8, title: 'Full System in Action' },
  { id: 9, component: Slide9, title: 'Summary' },
];

export default function SlidesPreview() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const goToSlide = useCallback((slideNum: number) => {
    if (slideNum >= 1 && slideNum <= slides.length) {
      setCurrentSlide(slideNum);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key >= '1' && e.key <= '9') {
        goToSlide(parseInt(e.key));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  const CurrentSlideComponent = slides[currentSlide - 1].component;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
            <span className="text-white font-bold text-xs">RH</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">MultiKueue Architecture</h1>
            <p className="text-gray-500 text-xs">{slides[currentSlide - 1].title}</p>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-1.5">
          {slides.map(slide => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slide.id)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all duration-200 ${
                currentSlide === slide.id 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {slide.id}
            </button>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-500 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Slide Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl aspect-[16/10] shadow-2xl rounded-xl overflow-hidden border border-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <CurrentSlideComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-2 flex items-center justify-between border-t border-gray-800 bg-gray-900/50">
        <div className="text-gray-500 text-xs">
          Use ← → arrow keys or 1-9 to navigate
        </div>
        <div className="text-gray-500 text-xs">
          Slide {currentSlide} of {slides.length}
        </div>
        <div className="text-gray-500 text-xs">
          GPUaaS Demo
        </div>
      </div>
    </div>
  );
}
