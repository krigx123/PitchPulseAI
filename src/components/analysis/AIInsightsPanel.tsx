import { motion } from 'framer-motion';
import { Brain, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import type { AIInsight } from '../../analysis/types';

interface Props { insights: AIInsight[] }

const severityConfig = {
  info: { icon: Info, color: '#00BFFF', bg: 'rgba(0,191,255,0.08)', border: 'rgba(0,191,255,0.2)', label: 'INFO' },
  warning: { icon: AlertTriangle, color: '#FFB800', bg: 'rgba(255,184,0,0.08)', border: 'rgba(255,184,0,0.2)', label: 'WARNING' },
  critical: { icon: AlertCircle, color: '#FF4444', bg: 'rgba(255,68,68,0.08)', border: 'rgba(255,68,68,0.2)', label: 'CRITICAL' },
};

const categoryLabel: Record<string, string> = {
  surface: 'Surface CV',
  moisture: 'Moisture Model',
  weather: 'Weather API',
  strategy: 'Strategy Engine',
  forecast: 'Forecast Model',
};

export default function AIInsightsPanel({ insights }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
          <Brain size={16} className="text-[#8B5CF6]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">AI Insights Panel</h3>
          <p className="text-xs text-white/40">GPT-style reasoning from multi-model analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, i) => {
          const cfg = severityConfig[insight.severity];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              {/* Left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                style={{ background: cfg.color }}
              />

              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${cfg.color}15` }}
                >
                  <Icon size={15} style={{ color: cfg.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-sm font-bold text-white">{insight.title}</span>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{ background: `${cfg.color}15`, color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-xs font-mono text-white/25 ml-auto">
                      {categoryLabel[insight.category]}
                    </span>
                  </div>

                  {/* Text — typewriter feel */}
                  <p className="text-sm text-white/60 leading-relaxed">{insight.text}</p>

                  {/* Confidence */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-white/30">Confidence:</span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden max-w-24">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: cfg.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.confidence}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                    <span className="text-xs font-mono" style={{ color: cfg.color }}>
                      {insight.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
