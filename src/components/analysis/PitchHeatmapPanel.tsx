import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import type { HeatmapZone } from '../../analysis/types';

interface Props { heatmap: HeatmapZone[] }

function getColor(intensity: number) {
  if (intensity < 0.25) return { bg: `rgba(57,255,20,${0.25 + intensity * 1.5})`, label: 'Low Wear' };
  if (intensity < 0.5) return { bg: `rgba(255,184,0,${0.3 + intensity})`, label: 'Moderate' };
  if (intensity < 0.75) return { bg: `rgba(255,107,53,${0.4 + intensity * 0.5})`, label: 'High Wear' };
  return { bg: `rgba(255,50,50,${0.5 + intensity * 0.4})`, label: 'Critical' };
}

const zoneOrder = ['Short', 'Back of Length', 'Good Length', 'Full', 'Yorker'];
const colLabels = ['Off', 'Middle', 'Leg'];

export default function PitchHeatmapPanel({ heatmap }: Props) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const getCell = (zone: string, col: number) =>
    heatmap.find((h) => h.zone === zone && h.col === col);

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
          <Map size={16} className="text-[#8B5CF6]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Interactive Pitch Heatmap</h3>
          <p className="text-xs text-white/40">Hover zones for detailed wear analysis</p>
        </div>
      </div>

      <GlassCard className="p-5" accentColor="#8B5CF6">
        <div className="flex gap-6 items-start justify-center">
          {/* Pitch visualization */}
          <div className="flex flex-col items-center gap-1">
            {/* Column headers */}
            <div className="flex gap-1 mb-1 ml-24">
              {colLabels.map((l) => (
                <div key={l} className="w-16 text-center text-xs text-white/30 font-mono">
                  {l}
                </div>
              ))}
            </div>

            {/* Stumps top */}
            <div className="flex items-center gap-1 mb-1">
              <div className="w-24" />
              <div className="flex gap-1">
                {[0, 1, 2].map((s) => (
                  <div key={s} className="w-16 flex justify-center">
                    <div className="w-1 h-4 bg-[#00BFFF]/60 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Zone rows */}
            {zoneOrder.map((zone, zoneIdx) => (
              <div key={zone} className="flex items-center gap-1">
                {/* Zone label */}
                <div className="w-24 text-right pr-3 text-xs text-white/40 font-mono shrink-0">
                  {zone}
                </div>
                {/* Cells */}
                {[0, 1, 2].map((col) => {
                  const cell = getCell(zone, col);
                  const intensity = cell?.intensity ?? 0;
                  const { bg } = getColor(intensity);
                  return (
                    <motion.div
                      key={col}
                      className="w-16 h-10 rounded-lg cursor-pointer flex items-center justify-center text-xs font-mono font-bold relative"
                      style={{ background: bg, border: '1px solid rgba(255,255,255,0.06)' }}
                      whileHover={{ scale: 1.08, zIndex: 10 }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          text: cell?.tooltip ?? '',
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: zoneIdx * 0.06 + col * 0.02 }}
                    >
                      <span className="text-white/80 text-[10px]">
                        {Math.round(intensity * 100)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Stumps bottom */}
            <div className="flex items-center gap-1 mt-1">
              <div className="w-24" />
              <div className="flex gap-1">
                {[0, 1, 2].map((s) => (
                  <div key={s} className="w-16 flex justify-center">
                    <div className="w-1 h-4 bg-[#00BFFF]/60 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 pt-8">
            <p className="text-xs text-white/30 font-mono mb-1">WEAR SCALE</p>
            {[
              { label: 'Low Wear', color: 'rgba(57,255,20,0.6)' },
              { label: 'Moderate', color: 'rgba(255,184,0,0.6)' },
              { label: 'High Wear', color: 'rgba(255,107,53,0.7)' },
              { label: 'Critical', color: 'rgba(255,50,50,0.8)' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ background: l.color }} />
                <span className="text-xs text-white/50">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              className="fixed z-50 glass rounded-lg px-3 py-2 text-xs text-white/80 pointer-events-none -translate-x-1/2 -translate-y-full"
              style={{ left: tooltip.x, top: tooltip.y }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {tooltip.text}
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}
