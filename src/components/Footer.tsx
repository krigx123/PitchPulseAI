import { motion } from 'framer-motion';
import { Activity, GitBranch, MessageCircle, Link2, Mail, ExternalLink } from 'lucide-react';

const footerLinks = {
  Product: ['Dashboard', 'Features', 'How It Works', 'Roadmap'],
  Solutions: ['IPL Teams', 'Broadcasters', 'Analysts', 'Academies'],
  Company: ['About', 'Research', 'Blog', 'Careers'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Data Policy'],
};

const socials = [
  { icon: GitBranch, label: 'GitHub', href: '#' },
  { icon: MessageCircle, label: 'Twitter', href: '#' },
  { icon: Link2, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

interface FooterProps { onAnalyze?: () => void }

export default function Footer({ onAnalyze }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[#111827]/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/20 to-transparent" />

      {/* CTA Banner */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 to-[#8B5CF6]/5" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Ready to transform your{' '}
                <span className="text-[#00BFFF]">pitch strategy?</span>
              </h3>
              <p className="text-white/50 text-sm">
                Join IPL franchises and cricket analysts already using PitchPulse AI.
              </p>
            </div>
            <div className="relative z-10 flex gap-3 shrink-0">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onAnalyze?.(); }}
                className="px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity glow-blue"
              >
                Get Early Access
              </a>
              <a
                href="#dashboard"
                className="px-6 py-3 glass border border-white/10 rounded-xl text-white/70 font-medium text-sm hover:border-[#00BFFF]/30 hover:text-white transition-all flex items-center gap-2"
              >
                Live Demo
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] flex items-center justify-center">
                <Activity size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#00BFFF]">Pitch</span>
                <span className="text-white">Pulse</span>
                <span className="text-[#8B5CF6] ml-1">AI</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-xs">
              AI-powered cricket pitch analytics. From observation to prediction — in under 2 seconds.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-[#00BFFF] hover:border-[#00BFFF]/30 transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/35 hover:text-white/70 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2026 PitchPulse AI. Built for the future of cricket analytics.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-white/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
              All systems operational
            </div>
            <span className="text-white/10">|</span>
            <span className="text-xs text-white/25 font-mono">v1.0.0-beta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
