import { motion } from 'framer-motion';
import { Database, Trophy } from 'lucide-react';
import type { HistoricalMatch } from '../../analysis/types';

interface Props { historical: HistoricalMatch[] }

const venueColors: Record<string, string> = {
  'Chennai (Chepauk)': '#FF6B35',
  'Bengaluru (Chinnaswamy)': '#00BFFF',
  'Mumbai (Wankhede)': '#8B5CF6',
  'Ahmedabad (Narendra Modi)': '#FFB800',
  'Kolkata (Eden Gardens)': '#39FF14',
};

export default function HistoricalComparisonPanel({ historical }: Props) {
  const topMatch = historical[0];

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center">
          <Database size={16} className="text-[#FFB800]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Historical Pitch Comparison</h3>
          <p className="text-xs text-white/40">Matched against 500+ venue profiles</p>
        </div>
      </div>

      {/* Top match highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-5 mb-4 border border-[#FFB800]/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFB800]/15 border border-[#FFB800]/25 flex items-center justify-center shrink-0">
            <Trophy size={22} className="text-[#FFB800]" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-white/40 mb-0.5 font-mono">CLOSEST MATCH</p>
            <p className="text-lg font-black text-white">{topMatch.venue}</p>
            <p className="text-sm text-white/50">
              {topMatch.year} · {topMatch.pitchType}
            </p>
          </div>
          <div className="text-right shrink-0">
            <motion.div
              className="text-4xl font-black text-[#FFB800]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
            >
              {topMatch.similarity}%
            </motion.div>
            <p className="text-xs text-white/30">similarity</p>
          </div>
        </div>
        <div className="relative z-10 mt-3 pt-3 border-t border-white/5">
          <p className="text-xs text-white/50">
            Current pitch resembles <span className="text-[#FFB800]">{topMatch.venue} {topMatch.year}</span> surface —{' '}
            <span className="text-[#FFB800] font-semibold">{topMatch.similarity}% match</span>
          </p>
        </div>
      </motion.div>

      {/* All comparisons */}
      <div className="space-y-3">
        {historical.map((match, i) => {
          const color = venueColors[match.venue] ?? '#00BFFF';
          return (
            <motion.div
              key={match.venue}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass rounded-xl p-4 flex items-center gap-4"
            >
              {/* Rank */}
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono text-white/30 shrink-0">
                #{i + 1}
              </div>

              {/* Venue info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white truncate">{match.venue}</span>
                  <span className="text-xs text-white/30 shrink-0">{match.year}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{match.pitchType}</span>
                  <span>·</span>
                  <span>Avg: {match.avgScore}</span>
                  <span>·</span>
                  <span className="truncate">{match.matchResult}</span>
                </div>
              </div>

              {/* Similarity bar + score */}
              <div className="shrink-0 w-28">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold" style={{ color }}>
                    {match.similarity}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${match.similarity}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
