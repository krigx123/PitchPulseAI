import { motion } from 'framer-motion';
import { Cpu, Loader2 } from 'lucide-react';

interface ScanningOverlayProps {
  progress: number;
  currentStep: string;
  imagePreview: string | null;
}

const analysisStages = [
  'Image Preprocessing',
  'Crack Detection',
  'Grass Coverage',
  'Surface Analysis',
  'Weather Fetch',
  'Moisture Model',
  'Ensemble Forecast',
  'AI Insights',
  'Historical Match',
  'Report Generation',
];

export default function ScanningOverlay({ progress, currentStep, imagePreview }: ScanningOverlayProps) {
  const completedStages = Math.floor((progress / 100) * analysisStages.length);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass rounded-2xl overflow-hidden border border-[#00BFFF]/20">
        {/* Image with scan animation */}
        <div className="relative aspect-video bg-black/60">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Analyzing"
              className="w-full h-full object-cover opacity-40"
            />
          )}

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,191,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.6) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Corner brackets */}
          {[
            'top-4 left-4',
            'top-4 right-4',
            'bottom-4 left-4',
            'bottom-4 right-4',
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-6 h-6`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <div
                className={`absolute w-full h-0.5 bg-[#00BFFF] ${i < 2 ? 'top-0' : 'bottom-0'}`}
              />
              <div
                className={`absolute h-full w-0.5 bg-[#00BFFF] ${i % 2 === 0 ? 'left-0' : 'right-0'}`}
              />
            </motion.div>
          ))}

          {/* Center AI badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="glass-blue rounded-2xl px-6 py-4 text-center border border-[#00BFFF]/30"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 justify-center mb-2">
                <Loader2 size={16} className="text-[#00BFFF] animate-spin" />
                <span className="text-[#00BFFF] font-bold text-sm">Analyzing Pitch Surface...</span>
              </div>
              <p className="text-white/50 text-xs font-mono">{currentStep}</p>
            </motion.div>
          </div>

          {/* Floating detection boxes */}
          {[
            { top: '20%', left: '25%', label: 'Crack Zone', color: '#FF4444' },
            { top: '55%', left: '60%', label: 'Wear Area', color: '#FFB800' },
            { top: '35%', left: '45%', label: 'Dry Patch', color: '#FF6B35' },
          ].map((box, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: box.top, left: box.left }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: progress > (i + 1) * 20 ? 1 : 0, scale: progress > (i + 1) * 20 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-16 h-10 rounded border-2 flex items-end justify-start p-0.5"
                style={{ borderColor: box.color }}
              >
                <span
                  className="text-[9px] font-mono px-1 rounded"
                  style={{ background: box.color, color: '#000' }}
                >
                  {box.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress section */}
        <div className="p-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-[#00BFFF]" />
              <span className="text-sm font-semibold text-white">AI Analysis Pipeline</span>
            </div>
            <span className="text-sm font-mono font-bold text-[#00BFFF]">{progress}%</span>
          </div>

          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6]"
              style={{ boxShadow: '0 0 12px rgba(0,191,255,0.5)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Stage checklist */}
          <div className="grid grid-cols-2 gap-1.5">
            {analysisStages.map((stage, i) => {
              const done = i < completedStages;
              const active = i === completedStages;
              return (
                <motion.div
                  key={stage}
                  className="flex items-center gap-2 text-xs"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: done || active ? 1 : 0.3 }}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${done
                        ? 'bg-[#39FF14]'
                        : active
                          ? 'bg-[#00BFFF] animate-pulse'
                          : 'bg-white/20'
                      }`}
                  />
                  <span
                    className={
                      done
                        ? 'text-[#39FF14]/80'
                        : active
                          ? 'text-[#00BFFF]'
                          : 'text-white/30'
                    }
                  >
                    {stage}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
