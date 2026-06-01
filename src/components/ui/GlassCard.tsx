import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  accentColor,
  delay = 0,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { y: -3 } : undefined}
      className={`glass rounded-2xl relative overflow-hidden ${className}`}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
