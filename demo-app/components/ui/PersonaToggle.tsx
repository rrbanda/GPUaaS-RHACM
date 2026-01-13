'use client';

import { motion } from 'framer-motion';
import { theme } from '../diagrams/slides/shared/theme';

type Persona = 'admin' | 'scientist' | 'all';

interface PersonaToggleProps {
  selected: Persona;
  onSelect: (persona: Persona) => void;
}

const personas: { id: Persona; label: string; icon: string; color: string; hoverColor: string }[] = [
  { id: 'admin', label: 'Hub Admin', icon: '🔧', color: theme.redHatRed, hoverColor: theme.redHatRedDark },
  { id: 'scientist', label: 'Data Scientist', icon: '🧪', color: theme.goldAmber, hoverColor: '#B45309' },
  { id: 'all', label: 'Both', icon: '👥', color: theme.purple, hoverColor: theme.purpleDark },
];

export default function PersonaToggle({ selected, onSelect }: PersonaToggleProps) {
  return (
    <div 
      className="rounded-xl p-1 flex gap-1 border"
      style={{ 
        backgroundColor: `${theme.backgroundCard}cc`,
        borderColor: `${theme.gray700}50`
      }}
    >
      {personas.map((persona) => (
        <motion.button
          key={persona.id}
          onClick={() => onSelect(persona.id)}
          className="relative px-3 py-2 rounded-lg text-sm transition-all"
          style={{ 
            color: selected === persona.id ? theme.white : theme.gray400
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {selected === persona.id && (
            <motion.div
              layoutId="persona-bg"
              className="absolute inset-0 rounded-lg"
              style={{ 
                background: `linear-gradient(135deg, ${persona.color}, ${persona.hoverColor})`
              }}
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
