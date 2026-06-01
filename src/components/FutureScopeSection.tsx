import { motion } from 'framer-motion';
import { Smartphone, Scan, Building2, Brain, ChevronRight } from 'lucide-react';

const timeline = [
  {
    phase: 'Phase 1',
    quarter: 'Q3 2025',
    icon: Smartphone,
    title: 'Mobile App',
    description:
      'Native iOS and Android app for coaches and analysts — real-time pitch reports, push alerts, and match-day dashboards on the go.',
    status: 'In Development',
    statusColor: '#39FF14',
    color: '#00BFFF',
    features: ['Live Notifications', 'Offline Mode', 'Team Sharing'],
  },
  {
    phase: 'Phase 2',
    quarter: 'Q1 2026',
    icon: Scan,
    title: 'Drone-Based Scanning',
    description:
      'Autonomous drone integration for aerial pitch mapping — capturing 3D surface topology and micro-crack patterns from above.',
    status: 'Planned',
    statusColor: '#FFB800',
    color: '#8B5CF6',
    features: ['3D Mapping', 'Thermal Imaging', 'Auto-Flight'],
  },
  {
    phase: 'Phase 3',
    quarter: 'Q3 2026',
    icon: Building2,
    title: 'Stadium Integration',
    description:
      'Direct API integration with stadium infrastructure — embedded sensors, broadcast overlays, and real-time commentary assistance.',
    status: 'Planned',
    statusColor: '#FFB800',
    color: '#FF6B35',
    features: ['Broadcast API', 'Sensor Network', 'AR Overlays'],
  },
  {
    phase: 'Phase 4',
    quarter: '2027',
    icon: Brain,
    title: 'Advanced Deep Learning',
    description:
      'Next-generation transformer models trained on global pitch databases — predicting pitch behavior across all formats and conditions.',
    status: 'Research',
    statusColor: '#8B5CF6',
    color: '#FF4444',
    features: ['Transformer Models', 'Global DB', 'Multi-Format'],
  },
];

export default function FutureScopeSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#8B5CF6] border border-[#8B5CF6]/20 mb-4"
          >
            <Brain size={12} />
            Roadmap
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            The Future of{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#FF6B35] bg-clip-text text-transparent">
              Pitch Analytics
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Our development roadmap — from mobile-first analytics to AI-powered stadium infrastructure.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00BFFF]/30 via-[#8B5CF6]/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-row`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="glass rounded-2xl p-6 relative overflow-hidden group inline-block w-full"
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{
                          background: `radial-gradient(circle at ${isLeft ? '100%' : '0%'} 50%, ${item.color}10, transparent 60%)`,
                        }}
                      />

                      <div className="relative z-10">
                        {/* Phase + status */}
                        <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                          <span className="text-xs font-mono text-white/30">{item.phase}</span>
                          <span className="text-xs text-white/20">·</span>
                          <span className="text-xs font-mono text-white/30">{item.quarter}</span>
                          <span
                            className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
                            style={{ background: `${item.statusColor}15`, color: item.statusColor }}
                          >
                            {item.status}
                          </span>
                        </div>

                        {/* Icon + Title */}
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                          >
                            <Icon size={18} style={{ color: item.color }} />
                          </div>
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-white/45 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Feature tags */}
                        <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                          {item.features.map((f) => (
                            <span
                              key={f}
                              className="text-xs font-mono px-2 py-0.5 rounded-full flex items-center gap-1"
                              style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}
                            >
                              <ChevronRight size={10} />
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex shrink-0 w-4 h-4 rounded-full border-2 items-center justify-center z-10"
                    style={{ borderColor: item.color, background: '#0A192F' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
