import { motion } from 'framer-motion';
import { Camera, Cloud, Cpu, GitMerge, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'Pitch Images',
    description: 'High-res camera feeds capture pitch surface in real-time',
    color: '#00BFFF',
    detail: 'Multi-angle capture',
  },
  {
    icon: Cpu,
    title: 'Computer Vision',
    description: 'CNN models detect cracks, wear zones, and surface texture',
    color: '#8B5CF6',
    detail: 'YOLOv8 + ResNet',
  },
  {
    icon: Cloud,
    title: 'Weather APIs',
    description: 'Live humidity, temperature, and dew point integration',
    color: '#39FF14',
    detail: 'OpenWeather + IMD',
  },
  {
    icon: GitMerge,
    title: 'Ensemble Learning',
    description: 'XGBoost + LSTM models fuse all signals into predictions',
    color: '#FF6B35',
    detail: '94% accuracy',
  },
  {
    icon: BarChart3,
    title: 'Match Forecast',
    description: 'Actionable pitch reports and strategic recommendations',
    color: '#FFB800',
    detail: 'Real-time output',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#00BFFF] border border-[#00BFFF]/20 mb-4"
          >
            <Cpu size={12} />
            The Pipeline
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            How{' '}
            <span className="bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] bg-clip-text text-transparent">
              PitchPulse AI
            </span>{' '}
            Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            A five-stage intelligent pipeline that transforms raw pitch imagery into
            match-winning strategic intelligence.
          </motion.p>
        </div>

        {/* Pipeline — desktop horizontal */}
        <div className="hidden lg:flex items-stretch gap-0 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-center flex-1">
                {/* Step card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -4 }}
                  className="flex-1 glass rounded-2xl p-5 group relative overflow-hidden"
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                  />

                  {/* Step number */}
                  <div className="text-xs font-mono text-white/20 mb-3">0{i + 1}</div>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon size={20} style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-white text-sm mb-1.5">{step.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed mb-3">{step.description}</p>

                  {/* Detail badge */}
                  <span
                    className="inline-block text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ background: `${step.color}15`, color: step.color }}
                  >
                    {step.detail}
                  </span>

                  {/* Animated dot */}
                  <motion.div
                    className="absolute bottom-3 right-3 w-2 h-2 rounded-full"
                    style={{ background: step.color }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                </motion.div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.3 }}
                    className="flex items-center px-2"
                  >
                    <div className="flex items-center gap-0.5">
                      <div className="w-6 h-px bg-gradient-to-r from-[#00BFFF]/40 to-[#8B5CF6]/40" />
                      <ArrowRight size={12} className="text-[#00BFFF]/60" />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pipeline — mobile vertical */}
        <div className="lg:hidden flex flex-col gap-4 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="w-full glass rounded-2xl p-5 flex items-start gap-4"
                >
                  <div
                    className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon size={20} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/20 mb-0.5">0{i + 1}</div>
                    <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-white/45">{step.description}</p>
                  </div>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="w-px h-6 bg-gradient-to-b from-[#00BFFF]/40 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom data flow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 overflow-hidden relative"
        >
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-10" viewBox="0 0 800 80">
              <motion.path
                d="M0,40 Q200,10 400,40 Q600,70 800,40"
                stroke="#00BFFF"
                strokeWidth="1"
                fill="none"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold">End-to-end latency under 2 seconds</p>
              <p className="text-white/40 text-sm mt-1">
                From image capture to strategic recommendation — faster than a commentary team.
              </p>
            </div>
            <div className="flex gap-6">
              {[
                { label: 'Models', value: '4' },
                { label: 'Data Sources', value: '7+' },
                { label: 'Metrics', value: '12' },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-2xl font-black text-[#00BFFF]">{m.value}</div>
                  <div className="text-xs text-white/40">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
