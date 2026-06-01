import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Activity, Droplets, TrendingUp, Zap, RefreshCw } from 'lucide-react';

// --- Mock data ---
const deteriorationData = [
  { day: 'Day 1', crack: 10, wear: 15, bounce: 90 },
  { day: 'Day 2', crack: 22, wear: 28, bounce: 82 },
  { day: 'Day 3', crack: 38, wear: 45, bounce: 71 },
  { day: 'Day 4', crack: 55, wear: 62, bounce: 58 },
  { day: 'Day 5', crack: 73, wear: 78, bounce: 44 },
];

const moistureData = [
  { time: '6AM', moisture: 18, dew: 22 },
  { time: '9AM', moisture: 15, dew: 18 },
  { time: '12PM', moisture: 10, dew: 12 },
  { time: '3PM', moisture: 7, dew: 8 },
  { time: '6PM', moisture: 9, dew: 11 },
  { time: '9PM', moisture: 14, dew: 17 },
];

const spinData = [
  { session: 'S1', offSpin: 20, legSpin: 15, seam: 65 },
  { session: 'S2', offSpin: 30, legSpin: 22, seam: 48 },
  { session: 'S3', offSpin: 48, legSpin: 38, seam: 30 },
  { session: 'S4', offSpin: 62, legSpin: 55, seam: 18 },
  { session: 'S5', offSpin: 75, legSpin: 68, seam: 10 },
  { session: 'S6', offSpin: 82, legSpin: 78, seam: 6 },
];

// Heatmap data: 5 zones × 3 columns
const heatmapData = [
  // [zone, col, intensity 0-1, label]
  [0, 0, 0.1, 'Low'], [0, 1, 0.15, 'Low'], [0, 2, 0.1, 'Low'],
  [1, 0, 0.3, 'Med'], [1, 1, 0.45, 'Med'], [1, 2, 0.25, 'Med'],
  [2, 0, 0.7, 'High'], [2, 1, 0.85, 'High'], [2, 2, 0.65, 'High'],
  [3, 0, 0.5, 'Med'], [3, 1, 0.6, 'Med'], [3, 2, 0.4, 'Med'],
  [4, 0, 0.2, 'Low'], [4, 1, 0.3, 'Low'], [4, 2, 0.15, 'Low'],
];

const zoneLabels = ['Short', 'Back of Length', 'Good Length', 'Full', 'Yorker'];

function getHeatColor(intensity: number) {
  if (intensity < 0.3) return `rgba(57,255,20,${0.3 + intensity})`;
  if (intensity < 0.6) return `rgba(255,165,0,${0.3 + intensity * 0.5})`;
  return `rgba(255,50,50,${0.4 + intensity * 0.4})`;
}

const metricCards = [
  {
    icon: Activity,
    label: 'Crack Density Index',
    value: '0.73',
    unit: '/1.0',
    change: '+0.12',
    changeDir: 'up',
    color: '#FF4444',
    bg: 'rgba(255,68,68,0.08)',
    border: 'rgba(255,68,68,0.2)',
    desc: 'Surface fracture severity',
  },
  {
    icon: Droplets,
    label: 'Moisture Estimation',
    value: '12',
    unit: '%',
    change: '-3%',
    changeDir: 'down',
    color: '#00BFFF',
    bg: 'rgba(0,191,255,0.08)',
    border: 'rgba(0,191,255,0.2)',
    desc: 'Sub-surface moisture level',
  },
  {
    icon: TrendingUp,
    label: 'Bounce Stability',
    value: '71',
    unit: '/100',
    change: '-8',
    changeDir: 'down',
    color: '#39FF14',
    bg: 'rgba(57,255,20,0.08)',
    border: 'rgba(57,255,20,0.2)',
    desc: 'Predictability of bounce',
  },
  {
    icon: Zap,
    label: 'Spin Potential Index',
    value: '6.4',
    unit: '/10',
    change: '+1.2',
    changeDir: 'up',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    desc: 'Expected turn & grip',
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs border border-white/10">
        <p className="text-white/60 mb-2 font-mono">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/70">{p.name}:</span>
            <span className="text-white font-bold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardSection() {
  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#111827]/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#8B5CF6] border border-[#8B5CF6]/20 mb-4"
            >
              <Activity size={12} />
              Live Analytics Dashboard
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white"
            >
              Pitch Intelligence{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#00BFFF] bg-clip-text text-transparent">
                Center
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 glass rounded-lg px-3 py-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
              <span className="text-white/60">LIVE</span>
              <span className="text-white font-mono">Wankhede Stadium</span>
            </div>
            <button className="glass rounded-lg p-2 text-white/40 hover:text-[#00BFFF] transition-colors">
              <RefreshCw size={14} />
            </button>
          </motion.div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metricCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{ background: card.bg, border: `1px solid ${card.border}` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.color}20` }}
                  >
                    <Icon size={16} style={{ color: card.color }} />
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{
                      background: `${card.color}15`,
                      color: card.color,
                    }}
                  >
                    {card.change}
                  </span>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-black text-white">{card.value}</span>
                  <span className="text-sm text-white/40 mb-1">{card.unit}</span>
                </div>
                <p className="text-xs font-medium text-white/70">{card.label}</p>
                <p className="text-xs text-white/30 mt-0.5">{card.desc}</p>

                {/* Decorative bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: card.color, opacity: 0.4 }} />
              </motion.div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          {/* Deterioration Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Pitch Deterioration Timeline</h3>
                <p className="text-xs text-white/40 mt-0.5">Crack density & wear progression over match days</p>
              </div>
              <span className="text-xs font-mono text-[#FF4444] glass px-2 py-1 rounded-lg">Day 3 Active</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={deteriorationData}>
                <defs>
                  <linearGradient id="crackGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="wearGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bounceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#39FF14" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }} />
                <Area type="monotone" dataKey="crack" name="Crack %" stroke="#FF4444" fill="url(#crackGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="wear" name="Wear %" stroke="#FF6B35" fill="url(#wearGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="bounce" name="Bounce" stroke="#39FF14" fill="url(#bounceGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Moisture Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-5"
          >
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Moisture Trend</h3>
              <p className="text-xs text-white/40 mt-0.5">Today's moisture & dew readings</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="moisture" name="Moisture%" stroke="#00BFFF" strokeWidth={2} dot={{ fill: '#00BFFF', r: 3 }} />
                <Line type="monotone" dataKey="dew" name="Dew%" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom row: Spin chart + Heatmap */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Spin Prediction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-5"
          >
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Spin vs Seam Prediction</h3>
              <p className="text-xs text-white/40 mt-0.5">Bowling type effectiveness by session</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={spinData} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="session" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }} />
                <Bar dataKey="offSpin" name="Off Spin" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="legSpin" name="Leg Spin" fill="#00BFFF" radius={[3, 3, 0, 0]} />
                <Bar dataKey="seam" name="Seam" fill="#39FF14" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pitch Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-5"
          >
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Pitch Zone Heatmap</h3>
              <p className="text-xs text-white/40 mt-0.5">Wear intensity by landing zone</p>
            </div>

            <div className="flex gap-4 items-start">
              {/* Pitch visual */}
              <div className="flex-1">
                <div className="relative mx-auto" style={{ width: '120px' }}>
                  {/* Pitch outline */}
                  <div className="border border-[#00BFFF]/20 rounded-lg overflow-hidden">
                    {zoneLabels.map((zone, zoneIdx) => (
                      <div key={zone} className="flex">
                        {[0, 1, 2].map((col) => {
                          const cell = heatmapData.find(
                            ([z, c]) => z === zoneIdx && c === col
                          );
                          const intensity = cell ? (cell[2] as number) : 0;
                          return (
                            <motion.div
                              key={col}
                              className="heatmap-cell flex-1 h-9 flex items-center justify-center text-xs font-mono"
                              style={{ background: getHeatColor(intensity) }}
                              whileHover={{ scale: 1.05 }}
                              title={`${zone} - Intensity: ${Math.round(intensity * 100)}%`}
                            >
                              <span className="text-white/60 text-[9px]">
                                {Math.round(intensity * 100)}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  {/* Stumps indicator */}
                  <div className="flex justify-center gap-1 mt-1">
                    {[0, 1, 2].map((s) => (
                      <div key={s} className="w-1 h-3 bg-[#00BFFF]/60 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Zone labels + legend */}
              <div className="flex flex-col justify-between h-full gap-1">
                {zoneLabels.map((zone) => (
                  <div key={zone} className="text-xs text-white/40 h-9 flex items-center">
                    {zone}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/5">
              <span className="text-xs text-white/30">Wear:</span>
              {[
                { color: 'rgba(57,255,20,0.6)', label: 'Low' },
                { color: 'rgba(255,165,0,0.6)', label: 'Med' },
                { color: 'rgba(255,50,50,0.7)', label: 'High' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                  <span className="text-xs text-white/40">{l.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
