import { motion } from 'framer-motion';

interface ScoreBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  showValue?: boolean;
  delay?: number;
}

export default function ScoreBar({
  label,
  value,
  max = 100,
  color = '#00BFFF',
  showValue = true,
  delay = 0,
}: ScoreBarProps) {
  const pct = (value / max) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/50 w-32 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-mono font-bold w-8 text-right" style={{ color }}>
          {value}
        </span>
      )}
    </div>
  );
}
