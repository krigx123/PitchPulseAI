import { motion } from 'framer-motion';
import { ArrowRight, Play, Cpu, Wifi, TrendingUp } from 'lucide-react';

function PitchHologram() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-80 h-80 rounded-full border border-[#00BFFF]/20 animate-rotate-slow"
          style={{ animationDuration: '25s' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-64 h-64 rounded-full border border-[#8B5CF6]/20 animate-rotate-slow"
          style={{ animationDuration: '18s', animationDirection: 'reverse' }}
        />
      </div>

      {/* Cricket pitch SVG */}
      <div className="relative z-10 animate-float">
        <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
          {/* Pitch rectangle */}
          <rect x="80" y="10" width="60" height="140" rx="4" fill="rgba(0,191,255,0.05)" stroke="rgba(0,191,255,0.4)" strokeWidth="1.5" />

          {/* Crease lines */}
          <line x1="80" y1="35" x2="140" y2="35" stroke="rgba(0,191,255,0.6)" strokeWidth="1" />
          <line x1="80" y1="125" x2="140" y2="125" stroke="rgba(0,191,255,0.6)" strokeWidth="1" />

          {/* Stumps */}
          <rect x="103" y="28" width="3" height="10" rx="1" fill="#00BFFF" />
          <rect x="108" y="28" width="3" height="10" rx="1" fill="#00BFFF" />
          <rect x="113" y="28" width="3" height="10" rx="1" fill="#00BFFF" />
          <rect x="103" y="122" width="3" height="10" rx="1" fill="#00BFFF" />
          <rect x="108" y="122" width="3" height="10" rx="1" fill="#00BFFF" />
          <rect x="113" y="122" width="3" height="10" rx="1" fill="#00BFFF" />

          {/* Pitch zones with heat colors */}
          <rect x="82" y="37" width="56" height="25" rx="2" fill="rgba(57,255,20,0.15)" />
          <rect x="82" y="62" width="56" height="36" rx="2" fill="rgba(255,165,0,0.15)" />
          <rect x="82" y="98" width="56" height="25" rx="2" fill="rgba(255,50,50,0.15)" />

          {/* Zone labels */}
          <text x="110" y="53" textAnchor="middle" fill="rgba(57,255,20,0.8)" fontSize="7" fontFamily="monospace">GOOD</text>
          <text x="110" y="83" textAnchor="middle" fill="rgba(255,165,0,0.8)" fontSize="7" fontFamily="monospace">WEAR</text>
          <text x="110" y="113" textAnchor="middle" fill="rgba(255,80,80,0.8)" fontSize="7" fontFamily="monospace">CRACK</text>

          {/* Scanning line */}
          <motion.line
            x1="80" y1="80" x2="140" y2="80"
            stroke="rgba(0,191,255,0.8)"
            strokeWidth="1.5"
            initial={{ y1: 10, y2: 10 }}
            animate={{ y1: [10, 150, 10], y2: [10, 150, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Data points */}
          {[
            { cx: 95, cy: 50, r: 3, color: '#39FF14' },
            { cx: 125, cy: 70, r: 4, color: '#FF6B35' },
            { cx: 100, cy: 90, r: 3, color: '#FF4444' },
            { cx: 120, cy: 110, r: 3, color: '#FF6B35' },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill={dot.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 1] }}
              transition={{ delay: i * 0.4, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
          ))}

          {/* Outfield */}
          <ellipse cx="110" cy="80" rx="100" ry="70" fill="none" stroke="rgba(0,191,255,0.08)" strokeWidth="1" />
          <ellipse cx="110" cy="80" rx="75" ry="52" fill="none" stroke="rgba(0,191,255,0.06)" strokeWidth="1" />
        </svg>

        {/* Floating data badges */}
        <motion.div
          className="absolute -left-16 top-4 glass-blue rounded-lg px-3 py-2 text-xs"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-[#00BFFF] font-mono font-bold">CDI</div>
          <div className="text-white/60">0.73</div>
        </motion.div>

        <motion.div
          className="absolute -right-16 top-8 glass-purple rounded-lg px-3 py-2 text-xs"
          animate={{ x: [2, -2, 2] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <div className="text-[#8B5CF6] font-mono font-bold">SPIN</div>
          <div className="text-white/60">HIGH</div>
        </motion.div>

        <motion.div
          className="absolute -left-14 bottom-4 glass rounded-lg px-3 py-2 text-xs border border-[#39FF14]/20"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-[#39FF14] font-mono font-bold">MOIST</div>
          <div className="text-white/60">12%</div>
        </motion.div>
      </div>

      {/* Corner indicators */}
      {[
        { top: '10%', left: '5%', icon: <Cpu size={12} />, label: 'CV Model', color: '#00BFFF' },
        { top: '10%', right: '5%', icon: <Wifi size={12} />, label: 'Weather', color: '#8B5CF6' },
        { bottom: '10%', left: '5%', icon: <TrendingUp size={12} />, label: 'ML Engine', color: '#39FF14' },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center gap-1.5 text-xs"
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, color: item.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.3 }}
        >
          {item.icon}
          <span className="font-mono opacity-70">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

interface HeroProps { onAnalyze?: () => void }

export default function HeroSection({ onAnalyze }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CF6]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/3 rounded-full blur-3xl" />
      </div>

      {/* Stadium silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full opacity-10">
          <path d="M0,200 L0,120 Q180,60 360,100 Q540,140 720,80 Q900,20 1080,70 Q1260,120 1440,90 L1440,200 Z" fill="#00BFFF" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 text-xs font-medium text-[#00BFFF] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            AI-Powered Cricket Analytics Platform
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-4"
          >
            <span className="text-white">Pitch</span>
            <span className="text-[#00BFFF] text-glow-blue">Pulse</span>
            <br />
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#00BFFF] bg-clip-text text-transparent">AI</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 font-light tracking-widest uppercase mb-6"
          >
            From Observation to Prediction
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-white/60 leading-relaxed max-w-lg mb-8"
          >
            PitchPulse AI fuses Computer Vision, real-time weather data, and ensemble machine learning
            to deliver precise pitch condition forecasts — giving teams, broadcasters, and analysts
            the strategic edge before the first ball is bowled.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex gap-6 mb-8"
          >
            {[
              { value: '94%', label: 'Forecast Accuracy' },
              { value: '<2s', label: 'Analysis Time' },
              { value: '12+', label: 'Pitch Metrics' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-[#00BFFF]">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onAnalyze?.(); }}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] rounded-xl font-semibold text-white glow-blue hover:opacity-90 transition-all duration-200"
            >
              Analyze Pitch
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#dashboard"
              className="flex items-center gap-2 px-6 py-3 glass border border-white/10 rounded-xl font-medium text-white/80 hover:border-[#00BFFF]/40 hover:text-white transition-all duration-200"
            >
              <Play size={14} className="text-[#39FF14]" />
              View Dashboard
            </a>
          </motion.div>
        </div>

        {/* Right: Hologram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <PitchHologram />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#00BFFF]/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
