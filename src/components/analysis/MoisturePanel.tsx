import { motion } from 'framer-motion';
import { Droplets, TrendingDown, Minus, TrendingUp } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import CircularProgress from '../ui/CircularProgress';
import GlassCard from '../ui/GlassCard';
import type { MoistureData } from '../../analysis/types';

interface Props { moisture: MoistureData }

const statusConfig = {
  'Drying Fast': { color: '#FF6B35', icon: TrendingDown, desc: 'Rapid moisture loss detected' },
  'Stable': { color: '#00BFFF', icon: Minus, desc: 'Moisture levels holding steady' },
  'High Moisture': { color: '#39FF14', icon: TrendingUp, desc: 'Above-average moisture content' },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs border border-white/10">
        <p className="text-white/50 mb-1 font-mono">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/60">{p.name}:</span>
            <span className="text-white font-bold">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MoisturePanel({ moisture }: Props) {
  const cfg = statusConfig[moisture.status];
  const StatusIcon = cfg.icon;

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center">
          <Droplets size={16} className="text-[#00BFFF]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Moisture Intelligence</h3>
          <p className="text-xs text-white/40">Sub-surface moisture model + 24h forecast</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        {/* Score */}
        <GlassCard className="p-5 flex flex-col items-center justify-center" accentColor="#00BFFF">
          <CircularProgress
            value={moisture.currentScore}
            size={90}
            strokeWidth={7}
            color="#00BFFF"
          />
          <p className="text-xs text-white/50 mt-2 text-center">Current Moisture Score</p>
        </GlassCard>

        {/* Status */}
        <GlassCard className="p-5 flex flex-col justify-center" accentColor={cfg.color}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: `${cfg.color}15`, border: `1px solid ${cfg.color}25` }}
          >
            <StatusIcon size={20} style={{ color: cfg.color }} />
          </div>
          <p className="text-xs text-white/40 mb-1">Status</p>
          <p className="text-lg font-black" style={{ color: cfg.color }}>
            {moisture.status}
          </p>
          <p className="text-xs text-white/40 mt-1">{cfg.desc}</p>
        </GlassCard>

        {/* Quick stats */}
        <GlassCard className="p-5" accentColor="#8B5CF6">
          <p className="text-xs text-white/40 mb-3 font-mono">FORECAST SUMMARY</p>
          {[
            { label: '6h Forecast', value: `${Math.max(5, moisture.currentScore - 8)}%` },
            { label: '12h Forecast', value: `${Math.max(5, moisture.currentScore - 15)}%` },
            { label: '24h Forecast', value: `${Math.max(5, moisture.currentScore - 22)}%` },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
            >
              <span className="text-xs text-white/50">{s.label}</span>
              <span className="text-xs font-mono font-bold text-[#8B5CF6]">{s.value}</span>
            </motion.div>
          ))}
        </GlassCard>
      </div>

      {/* Trend chart */}
      <GlassCard className="p-5" accentColor="#00BFFF">
        <p className="text-sm font-semibold text-white mb-4">24-Hour Moisture Trend</p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={moisture.forecast24h}>
            <defs>
              <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00BFFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dewGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }} />
            <Area type="monotone" dataKey="moisture" name="Moisture %" stroke="#00BFFF" fill="url(#moistGrad)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="dew" name="Dew %" stroke="#8B5CF6" fill="url(#dewGrad)" strokeWidth={2} dot={false} strokeDasharray="4 2" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
