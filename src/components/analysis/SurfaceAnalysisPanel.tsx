import { motion } from 'framer-motion';
import { Activity, Layers, Zap, TrendingDown } from 'lucide-react';
import CircularProgress from '../ui/CircularProgress';
import GlassCard from '../ui/GlassCard';
import type { SurfaceMetrics } from '../../analysis/types';

interface Props { surface: SurfaceMetrics }

const levelColor = { Low: '#39FF14', Medium: '#FFB800', High: '#FF4444' };

export default function SurfaceAnalysisPanel({ surface }: Props) {
  const metrics = [
    {
      icon: Activity,
      label: 'Crack Density Index',
      value: surface.crackDensityIndex,
      color: levelColor[surface.crackLevel],
      badge: surface.crackLevel,
      desc: 'Surface fracture severity',
    },
    {
      icon: Layers,
      label: 'Grass Coverage',
      value: surface.grassCoverage,
      color: '#39FF14',
      badge: surface.grassCoverage > 50 ? 'Good' : surface.grassCoverage > 30 ? 'Moderate' : 'Sparse',
      desc: 'Vegetation density',
    },
    {
      icon: Zap,
      label: 'Surface Roughness',
      value: surface.surfaceRoughness,
      color: '#8B5CF6',
      badge: surface.surfaceRoughness > 70 ? 'High' : surface.surfaceRoughness > 45 ? 'Medium' : 'Low',
      desc: 'Texture irregularity',
    },
    {
      icon: TrendingDown,
      label: 'Wear Level',
      value: surface.wearLevel,
      color: '#FF6B35',
      badge: surface.wearLevel > 65 ? 'Severe' : surface.wearLevel > 40 ? 'Moderate' : 'Minimal',
      desc: 'Overall pitch degradation',
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center">
          <Activity size={16} className="text-[#00BFFF]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Surface Analysis</h3>
          <p className="text-xs text-white/40">Computer Vision — YOLOv8 + ResNet-50</p>
        </div>
      </div>

      {/* Circular progress grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {metrics.map((m, i) => (
          <GlassCard key={m.label} className="p-4 text-center" accentColor={m.color} delay={i * 0.08}>
            <CircularProgress
              value={m.value}
              size={80}
              strokeWidth={6}
              color={m.color}
              animate
            />
            <p className="text-xs font-semibold text-white/70 mt-2 leading-tight">{m.label}</p>
            <span
              className="inline-block mt-1 text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: `${m.color}15`, color: m.color }}
            >
              {m.badge}
            </span>
          </GlassCard>
        ))}
      </div>

      {/* Detail rows */}
      <GlassCard className="p-4" accentColor="#00BFFF">
        <div className="grid sm:grid-cols-2 gap-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${m.color}12`, border: `1px solid ${m.color}25` }}
                >
                  <Icon size={14} style={{ color: m.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60 truncate">{m.label}</span>
                    <span className="text-xs font-mono font-bold ml-2" style={{ color: m.color }}>
                      {m.value}%
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
