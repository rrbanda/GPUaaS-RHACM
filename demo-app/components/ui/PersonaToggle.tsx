'use client';

import { motion } from 'framer-motion';

type Persona = 'admin' | 'scientist' | 'all';

interface PersonaToggleProps {
  selected: Persona;
  onSelect: (persona: Persona) => void;
}

const personas: { id: Persona; label: string; icon: string; color: string }[] = [
  { id: 'admin', label: 'Hub Admin', icon: '🔧', color: 'from-red-500 to-red-600' },
  { id: 'scientist', label: 'Data Scientist', icon: '🧪', color: 'from-amber-500 to-amber-600' },
  { id: 'all', label: 'Both', icon: '👥', color: 'from-purple-500 to-pink-500' },
];

export default function PersonaToggle({ selected, onSelect }: PersonaToggleProps) {
  return (
    <div className="glass rounded-xl p-1 flex gap-1">
      {personas.map((persona) => (
        <motion.button
          key={persona.id}
          onClick={() => onSelect(persona.id)}
          className={`relative px-3 py-2 rounded-lg text-sm transition-all ${
            selected === persona.id
              ? 'text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {selected === persona.id && (
            <motion.div
              layoutId="persona-bg"
              className={`absolute inset-0 rounded-lg bg-gradient-to-r ${persona.color}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            <span>{persona.icon}</span>
            <span className="hidden md:inline">{persona.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
