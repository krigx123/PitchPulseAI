import { motion } from 'framer-motion';
import { BarChart3, Zap } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import ScoreBar from '../ui/ScoreBar';
import GlassCard from '../ui/GlassCard';
import CircularProgress from '../ui/CircularProgress';
import type { ForecastMetrics } from '../../analysis/types';

interface Props { forecast: ForecastMetrics }

const metrics = [
  { key: 'spinPotential', label: 'Spin Potential', color: '#8B5CF6' },
  { key: 'seamMovement', label: 'Seam Movement', color: '#00BFFF' },
  { key: 'bounceConsistency', label: 'Bounce Consistency', color: '#39FF14' },
  { key: 'battingFriendliness', label: 'Batting Friendliness', color: '#FFB800' },
  { key: 'bowlingFriendliness', label: 'Bowling Friendliness', color: '#FF6B35' },
];

export default function ForecastPanel({ forecast }: Props) {
  const radarData = metrics.map((m) => ({
    subject: m.label.split(' ')[0],
    value: forecast[m.key as keyof ForecastMetrics],
    fullMark: 100,
  }));

  const confColor =
    forecast.confidenceScore > 85 ? '#39FF14' : forecast.confidenceScore > 70 ? '#FFB800' : '#FF4444';

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
          <BarChart3 size={16} className="text-[#8B5CF6]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Strategic Match Forecast</h3>
          <p className="text-xs text-white/40">Ensemble ML model — XGBoost + LSTM</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {/* Radar chart */}
        <GlassCard className="p-5" accentColor="#8B5CF6">
          <p className="text-xs text-white/40 mb-3 font-mono">PITCH PROFILE RADAR</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
              />
              <Radar
                name="Forecast"
                dataKey="value"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Confidence + score bars */}
        <GlassCard className="p-5" accentColor={confColor}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-white/40 mb-0.5">Model Confidence</p>
              <div className="flex items-center gap-2">
                <Zap size={14} style={{ color: confColor }} />
                <span className="text-lg font-black" style={{ color: confColor }}>
                  {forecast.confidenceScore}%
                </span>
              </div>
            </div>
            <CircularProgress
              value={forecast.confidenceScore}
              size={64}
              strokeWidth={5}
              color={confColor}
            />
          </div>

          <div className="space-y-3">
            {metrics.map((m, i) => (
              <ScoreBar
                key={m.key}
                label={m.label}
                value={forecast[m.key as keyof ForecastMetrics] as number}
                color={m.color}
                delay={0.1 + i * 0.08}
              />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="glass rounded-xl p-3 text-center"
            style={{ borderTop: `2px solid ${m.color}40` }}
          >
            <div className="text-2xl font-black mb-0.5" style={{ color: m.color }}>
              {forecast[m.key as keyof ForecastMetrics]}
            </div>
            <div className="text-xs text-white/40 leading-tight">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
