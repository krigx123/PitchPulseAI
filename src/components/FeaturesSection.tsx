import { motion } from 'framer-motion';
import { Eye, Target, Cloud, Cpu, BarChart2, Shield } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Real-Time Pitch Intelligence',
    description:
      'Continuous monitoring of pitch surface conditions using live camera feeds and computer vision models that detect micro-level changes invisible to the human eye.',
    color: '#00BFFF',
    tags: ['CV Model', 'Live Feed', 'Sub-second'],
  },
  {
    icon: Target,
    title: 'Strategic Match Forecasts',
    description:
      'AI-generated recommendations for toss decisions, batting order, bowling rotations, and field placements — tailored to predicted pitch behavior.',
    color: '#8B5CF6',
    tags: ['Toss Advice', 'Bowling Plan', 'Field Set'],
  },
  {
    icon: Cloud,
    title: 'Weather Integration',
    description:
      'Real-time fusion of humidity, temperature, dew point, and wind data with pitch readings to model how conditions will evolve throughout the match.',
    color: '#39FF14',
    tags: ['OpenWeather', 'IMD API', 'Dew Model'],
  },
  {
    icon: Cpu,
    title: 'Computer Vision Analysis',
    description:
      'Deep learning models trained on thousands of pitch images to classify crack patterns, grass coverage, soil hardness, and surface wear zones.',
    color: '#FF6B35',
    tags: ['YOLOv8', 'ResNet-50', 'Segmentation'],
  },
  {
    icon: BarChart2,
    title: 'Decision Support System',
    description:
      'Structured reports with confidence scores, risk assessments, and alternative scenarios — designed for coaches, analysts, and broadcasters.',
    color: '#FFB800',
    tags: ['Confidence Score', 'Risk Map', 'PDF Export'],
  },
  {
    icon: Shield,
    title: 'Historical Pitch Database',
    description:
      'Access to a growing database of pitch profiles from international and domestic venues, enabling comparative analysis and trend identification.',
    color: '#FF4444',
    tags: ['100+ Venues', 'Match History', 'Trend Analysis'],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#39FF14] border border-[#39FF14]/20 mb-4"
          >
            <Cpu size={12} />
            Platform Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Built for the{' '}
            <span className="bg-gradient-to-r from-[#39FF14] to-[#00BFFF] bg-clip-text text-transparent">
              Modern Game
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Six core capabilities that transform how teams, broadcasters, and analysts
            understand and respond to pitch conditions.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="glass rounded-2xl p-6 group relative overflow-hidden cursor-default"
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 0% 0%, ${feature.color}10, transparent 60%)`,
                  }}
                />

                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: feature.color }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${feature.color}12`,
                      border: `1px solid ${feature.color}25`,
                    }}
                  >
                    <Icon size={22} style={{ color: feature.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/45 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={{
                          background: `${feature.color}12`,
                          color: feature.color,
                          border: `1px solid ${feature.color}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
