import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Brain, Clock, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: Eye,
    title: 'Subjective Assessment',
    description:
      'Traditional pitch evaluation relies on visual inspection by curators and commentators — highly inconsistent and prone to personal interpretation.',
    color: '#FF6B35',
    stat: '~60%',
    statLabel: 'Inconsistency Rate',
  },
  {
    icon: Brain,
    title: 'Human Bias',
    description:
      'Team analysts and selectors are influenced by past experiences, home advantage bias, and incomplete data — leading to flawed strategic decisions.',
    color: '#FF4444',
    stat: '3 in 5',
    statLabel: 'Decisions Affected',
  },
  {
    icon: Clock,
    title: 'Lack of Real-Time Insights',
    description:
      'Pitch conditions change dynamically with weather, usage, and time. Current tools cannot track these changes in real-time during a match.',
    color: '#FFB800',
    stat: '0',
    statLabel: 'Real-Time Tools Exist',
  },
  {
    icon: AlertTriangle,
    title: 'No Predictive Capability',
    description:
      'Teams have no way to forecast how a pitch will behave on Day 3 or Day 4 — critical information for toss decisions and bowling rotations.',
    color: '#8B5CF6',
    stat: '100%',
    statLabel: 'Decisions Made Blind',
  },
];

function ProblemCard({
  problem,
  index,
}: {
  problem: (typeof problems)[0];
  index: number;
}) {
  const Icon = problem.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass rounded-2xl p-6 group cursor-default relative overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${problem.color}15, transparent 70%)`,
        }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${problem.color}60, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${problem.color}15`, border: `1px solid ${problem.color}30` }}
        >
          <Icon size={22} style={{ color: problem.color }} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-4">{problem.description}</p>

        {/* Stat */}
        <div className="flex items-end gap-2 pt-3 border-t border-white/5">
          <span className="text-2xl font-black" style={{ color: problem.color }}>
            {problem.stat}
          </span>
          <span className="text-xs text-white/40 mb-1">{problem.statLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  useInView(ref, { once: true });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#111827]/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#FF6B35] border border-[#FF6B35]/20 mb-4"
          >
            <AlertTriangle size={12} />
            The Problem
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Cricket Analytics is{' '}
            <span className="text-[#FF4444]">Broken</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            The world's most data-rich sport still relies on gut feeling when it comes to the most
            critical variable — the pitch.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-blue rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-semibold text-lg">
              The result? Teams lose matches they should win.
            </p>
            <p className="text-white/50 text-sm mt-1">
              PitchPulse AI eliminates guesswork with data-driven pitch intelligence.
            </p>
          </div>
          <a
            href="#how-it-works"
            className="shrink-0 px-6 py-2.5 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            See the Solution →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
