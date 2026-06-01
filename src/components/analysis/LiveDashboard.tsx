import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Droplets, Zap, TrendingUp, Shield, Cloud, RefreshCw } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts';
import GlassCard from '../ui/GlassCard';
import type { AnalysisResult } from '../../analysis/types';

interface Props { result: AnalysisResult }

function AnimatedCounter({ target, suffix = '', color }: { target: number; suffix?: string; color: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <span className="text-3xl font-black" style={{ color }}>
      {count}{suffix}
    </span>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs border border-white/10">
        <p className="text-white/50 mb-1 font-mono">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
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

export default function LiveDashboard({ result }: Props) {
  const kpis = [
    { icon: Activity, label: 'Crack Density', value: result.surface.crackDensityIndex, suffix: '%', color: '#FF4444' },
    { icon: Droplets, label: 'Moisture Score', value: result.moisture.currentScore, suffix: '%', color: '#00BFFF' },
    { icon: Zap, label: 'Spin Potential', value: result.forecast.spinPotential, suffix: '', color: '#8B5CF6' },
    { icon: TrendingUp, label: 'Bounce Stability', value: result.forecast.bounceConsistency, suffix: '', color: '#39FF14' },
    { icon: Shield, label: 'Forecast Confidence', value: result.forecast.confidenceScore, suffix: '%', color: '#FFB800' },
    { icon: Cloud, label: 'Weather Impact', value: result.weather.impactScore, suffix: '', color: '#FF6B35' },
  ];

  // Build combined chart data from evolution
  const chartData = result.evolution.map((e) => ({
    label: e.label,
    'Crack Growth': e.crackGrowth,
    'Spin Increase': e.spinIncrease,
    'Moisture Loss': e.moistureLoss,
  }));

  // Forecast bar data
  const forecastBars = [
    { name: 'Spin', value: result.forecast.spinPotential, color: '#8B5CF6' },
    { name: 'Seam', value: result.forecast.seamMovement, color: '#00BFFF' },
    { name: 'Bounce', value: result.forecast.bounceConsistency, color: '#39FF14' },
    { name: 'Batting', value: result.forecast.battingFriendliness, color: '#FFB800' },
    { name: 'Bowling', value: result.forecast.bowlingFriendliness, color: '#FF6B35' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center">
            <Activity size={16} className="text-[#00BFFF]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live Analytics Dashboard</h3>
            <p className="text-xs text-white/40">Real-time KPIs + multi-chart overview</p>
          </div>
        </div>
        <div className="flex items-center gap-2 glass rounded-lg px-3 py-1.5 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
          <span className="text-white/50">LIVE</span>
          <RefreshCw size={10} className="text-white/30 ml-1" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-xl p-4 relative overflow-hidden"
              style={{ borderTop: `2px solid ${kpi.color}40` }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                style={{ background: `${kpi.color}12` }}
              >
                <Icon size={13} style={{ color: kpi.color }} />
              </div>
              <AnimatedCounter target={kpi.value} suffix={kpi.suffix} color={kpi.color} />
              <p className="text-xs text-white/40 mt-1 leading-tight">{kpi.label}</p>

              {/* Mini bar */}
              <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: kpi.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${kpi.value}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.07 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Evolution area chart */}
        <GlassCard className="p-5" accentColor="#00BFFF">
          <p className="text-sm font-semibold text-white mb-4">Pitch Deterioration Overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                {[
                  { id: 'crackA', color: '#FF4444' },
                  { id: 'spinA', color: '#8B5CF6' },
                  { id: 'moistA', color: '#00BFFF' },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }} />
              <Area type="monotone" dataKey="Crack Growth" stroke="#FF4444" fill="url(#crackA)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="Spin Increase" stroke="#8B5CF6" fill="url(#spinA)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="Moisture Loss" stroke="#00BFFF" fill="url(#moistA)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Forecast bar chart */}
        <GlassCard className="p-5" accentColor="#8B5CF6">
          <p className="text-sm font-semibold text-white mb-4">Forecast Metrics Breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={forecastBars} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                name="Score"
                radius={[4, 4, 0, 0]}
                fill="#8B5CF6"
              // Per-bar colors via Cell would need recharts Cell — use uniform for simplicity
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
