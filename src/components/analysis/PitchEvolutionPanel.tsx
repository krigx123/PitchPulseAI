import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import GlassCard from '../ui/GlassCard';
import type { PitchEvolutionPoint } from '../../analysis/types';

interface Props { evolution: PitchEvolutionPoint[] }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs border border-white/10">
        <p className="text-white/50 mb-2 font-mono">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/60">{p.name}:</span>
            <span className="text-white font-bold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PitchEvolutionPanel({ evolution }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
          <Clock size={16} className="text-[#FF6B35]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Pitch Evolution Timeline</h3>
          <p className="text-xs text-white/40">Predicted deterioration across match sessions</p>
        </div>
      </div>

      {/* Timeline cards */}
      <div className="flex gap-3 mb-5 overflow-x-auto pb-2">
        {evolution.map((point, i) => (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 shrink-0 min-w-[130px] relative"
          >
            {/* Connector line */}
            {i < evolution.length - 1 && (
              <div className="absolute right-0 top-1/2 w-3 h-px bg-[#00BFFF]/20 translate-x-full -translate-y-1/2" />
            )}

            <div className="text-xs font-mono text-white/30 mb-1">
              {point.overs > 0 ? `Over ${point.overs}` : 'Start'}
            </div>
            <div className="text-sm font-bold text-white mb-3">{point.label}</div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Cracks</span>
                <span className="text-[#FF4444] font-mono">{point.crackGrowth}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Moisture</span>
                <span className="text-[#00BFFF] font-mono">-{point.moistureLoss}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Spin</span>
                <span className="text-[#8B5CF6] font-mono">{point.spinIncrease}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <GlassCard className="p-5" accentColor="#FF6B35">
        <p className="text-sm font-semibold text-white mb-4">Evolution Chart</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={evolution}>
            <defs>
              {[
                { id: 'crackLine', color: '#FF4444' },
                { id: 'spinLine', color: '#8B5CF6' },
                { id: 'bounceLine', color: '#FFB800' },
              ].map(({ id, color }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={color} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="label"
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }} />
            <Line
              type="monotone"
              dataKey="crackGrowth"
              name="Crack Growth"
              stroke="#FF4444"
              strokeWidth={2}
              dot={{ fill: '#FF4444', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="spinIncrease"
              name="Spin Increase"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: '#8B5CF6', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="bounceVariation"
              name="Bounce Variation"
              stroke="#FFB800"
              strokeWidth={2}
              dot={{ fill: '#FFB800', r: 3 }}
              strokeDasharray="4 2"
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
