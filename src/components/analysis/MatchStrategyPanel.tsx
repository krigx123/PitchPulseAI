import { motion } from 'framer-motion';
import { Target, Zap, Shield, RotateCcw, TrendingUp } from 'lucide-react';
import type { MatchStrategy } from '../../analysis/types';

interface Props { strategy: MatchStrategy }

const sections = [
  { key: 'powerplay', label: 'Powerplay Strategy', icon: Zap, color: '#00BFFF', overs: 'Overs 1–6' },
  { key: 'middleOvers', label: 'Middle Overs Strategy', icon: Target, color: '#8B5CF6', overs: 'Overs 7–15' },
  { key: 'deathOvers', label: 'Death Overs Strategy', icon: Shield, color: '#FF6B35', overs: 'Overs 16–20' },
  { key: 'spinVsPaceMix', label: 'Spin vs Pace Mix', icon: RotateCcw, color: '#FFB800', overs: 'Full Match' },
  { key: 'battingApproach', label: 'Batting Approach', icon: TrendingUp, color: '#39FF14', overs: 'All Innings' },
];

export default function MatchStrategyPanel({ strategy }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
          <Target size={16} className="text-[#FF6B35]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Match Strategy Engine</h3>
          <p className="text-xs text-white/40">AI-generated tactical recommendations</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {sections.map((section, i) => {
          const Icon = section.icon;
          const text = strategy[section.key as keyof MatchStrategy];
          return (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-5 relative overflow-hidden group ${i === 4 ? 'sm:col-span-2' : ''
                }`}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, ${section.color}, transparent)`,
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${section.color}08, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${section.color}12`, border: `1px solid ${section.color}20` }}
                    >
                      <Icon size={13} style={{ color: section.color }} />
                    </div>
                    <span className="text-sm font-bold text-white">{section.label}</span>
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ background: `${section.color}10`, color: section.color }}
                  >
                    {section.overs}
                  </span>
                </div>

                {/* Strategy text */}
                <p className="text-sm text-white/55 leading-relaxed">{text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
