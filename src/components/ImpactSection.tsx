import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Coins, RotateCcw, Map, Database } from 'lucide-react';

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const impacts = [
  {
    icon: Coins,
    title: 'Better Toss Decisions',
    description:
      'Accurate pitch forecasts give captains data-backed confidence at the toss — the single most impactful pre-match decision in cricket.',
    stat: 94,
    statSuffix: '%',
    statLabel: 'Toss Prediction Accuracy',
    color: '#FFB800',
  },
  {
    icon: RotateCcw,
    title: 'Smarter Bowling Rotations',
    description:
      'Know exactly when to bring on spinners vs seamers based on real-time pitch wear data and session-by-session deterioration forecasts.',
    stat: 3,
    statSuffix: 'x',
    statLabel: 'More Effective Rotations',
    color: '#00BFFF',
  },
  {
    icon: Map,
    title: 'Improved Match Strategy',
    description:
      'End-to-end match planning with pitch-aware batting orders, field placements, and powerplay strategies tailored to predicted conditions.',
    stat: 40,
    statSuffix: '%',
    statLabel: 'Strategy Improvement',
    color: '#39FF14',
  },
  {
    icon: Database,
    title: 'Data-Driven Cricket Analytics',
    description:
      'Replace subjective commentary with quantified, reproducible pitch metrics that can be tracked, compared, and improved over time.',
    stat: 12,
    statSuffix: '+',
    statLabel: 'Quantified Pitch Metrics',
    color: '#8B5CF6',
  },
];

function ImpactCard({
  impact,
  index,
  active,
}: {
  impact: (typeof impacts)[0];
  index: number;
  active: boolean;
}) {
  const Icon = impact.icon;
  const count = useCounter(impact.stat, 1500, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${impact.color}12, transparent 60%)`,
        }}
      />

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${impact.color}, transparent)` }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${impact.color}12`, border: `1px solid ${impact.color}25` }}
        >
          <Icon size={22} style={{ color: impact.color }} />
        </div>

        {/* Animated stat */}
        <div className="flex items-end gap-1 mb-1">
          <span className="text-5xl font-black" style={{ color: impact.color }}>
            {count}
          </span>
          <span className="text-2xl font-black text-white/60 mb-1">{impact.statSuffix}</span>
        </div>
        <p className="text-xs font-mono text-white/30 mb-4">{impact.statLabel}</p>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2">{impact.title}</h3>

        {/* Description */}
        <p className="text-sm text-white/45 leading-relaxed">{impact.description}</p>
      </div>
    </motion.div>
  );
}

export default function ImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="impact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#111827]/40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB800]/20 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00BFFF]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#FFB800] border border-[#FFB800]/20 mb-4"
          >
            <Database size={12} />
            Measurable Impact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            The Competitive{' '}
            <span className="bg-gradient-to-r from-[#FFB800] to-[#FF6B35] bg-clip-text text-transparent">
              Edge
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Quantified benefits for IPL franchises, national teams, and cricket broadcasters
            who adopt PitchPulse AI.
          </motion.p>
        </div>

        {/* Impact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {impacts.map((impact, i) => (
            <ImpactCard key={impact.title} impact={impact} index={i} active={inView} />
          ))}
        </div>

        {/* Testimonial-style quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="gradient-border rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 to-[#8B5CF6]/5" />
          <div className="relative z-10">
            <div className="text-4xl text-[#00BFFF]/30 font-serif mb-4">"</div>
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-6">
              In modern cricket, the pitch is the most underanalyzed variable. PitchPulse AI
              gives teams the same data advantage in pitch reading that Hawkeye gave to DRS —
              a complete paradigm shift.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">PitchPulse AI</p>
                <p className="text-white/40 text-xs">Cricket Analytics Platform</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
