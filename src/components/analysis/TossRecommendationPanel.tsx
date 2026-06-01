import { motion } from 'framer-motion';
import { Coins, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import CircularProgress from '../ui/CircularProgress';
import type { TossRecommendation } from '../../analysis/types';

interface Props { toss: TossRecommendation }

const riskConfig = {
  Low: { color: '#39FF14', icon: CheckCircle },
  Medium: { color: '#FFB800', icon: AlertTriangle },
  High: { color: '#FF4444', icon: XCircle },
};

export default function TossRecommendationPanel({ toss }: Props) {
  const isBat = toss.decision === 'Bat First';
  const accentColor = isBat ? '#FFB800' : '#00BFFF';
  const riskCfg = riskConfig[toss.riskLevel];
  const RiskIcon = riskCfg.icon;

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center">
          <Coins size={16} className="text-[#FFB800]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Toss Recommendation Engine</h3>
          <p className="text-xs text-white/40">AI-powered toss decision with confidence scoring</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {/* Main recommendation */}
        <GlassCard className="p-6" accentColor={accentColor}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-white/40 mb-1">Recommendation</p>
              <motion.h2
                className="text-3xl font-black"
                style={{ color: accentColor }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                {toss.decision}
              </motion.h2>
              <p className="text-sm text-white/50 mt-1">Recommended</p>
            </div>
            <CircularProgress
              value={toss.confidence}
              size={80}
              strokeWidth={6}
              color={accentColor}
            />
          </div>

          {/* Risk level */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: `${riskCfg.color}10`, border: `1px solid ${riskCfg.color}20` }}
          >
            <RiskIcon size={14} style={{ color: riskCfg.color }} />
            <span className="text-xs font-semibold" style={{ color: riskCfg.color }}>
              {toss.riskLevel} Risk
            </span>
          </div>
        </GlassCard>

        {/* Explanation */}
        <GlassCard className="p-5" accentColor="#8B5CF6">
          <p className="text-xs text-white/40 mb-2 font-mono">AI REASONING</p>
          <p className="text-sm text-white/65 leading-relaxed mb-4">{toss.explanation}</p>

          <div className="space-y-2">
            {toss.reasoning.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-2"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: accentColor }}
                />
                <span className="text-xs text-white/50">{reason}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Confidence breakdown */}
      <GlassCard className="p-4" accentColor={accentColor}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Decision Confidence</p>
            <p className="text-xs text-white/40 mt-0.5">
              Based on {toss.reasoning.length} key factors from pitch analysis
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black" style={{ color: accentColor }}>
              {toss.confidence}%
            </span>
            <p className="text-xs text-white/30">confidence</p>
          </div>
        </div>
        <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accentColor}80, ${accentColor})`,
              boxShadow: `0 0 10px ${accentColor}50`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${toss.confidence}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </GlassCard>
    </div>
  );
}
