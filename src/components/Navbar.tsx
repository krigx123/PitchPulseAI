import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Features', href: '#features' },
  { label: 'Impact', href: '#impact' },
];

interface NavbarProps { onAnalyze?: () => void }

export default function Navbar({ onAnalyze }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] flex items-center justify-center glow-blue">
              <Activity size={18} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#39FF14] animate-pulse-glow" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#00BFFF] text-glow-blue">Pitch</span>
            <span className="text-white">Pulse</span>
            <span className="text-[#8B5CF6] ml-1">AI</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-[#00BFFF] transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#dashboard"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#00BFFF] border border-[#00BFFF]/30 rounded-lg hover:bg-[#00BFFF]/10 transition-all duration-200"
          >
            <Zap size={14} />
            Live Demo
          </a>
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); onAnalyze?.(); }}
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] rounded-lg text-white hover:opacity-90 transition-opacity glow-blue"
          >
            Analyze Pitch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-[#00BFFF] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); onAnalyze?.(); }}
              className="mt-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] rounded-lg text-white text-center"
            >
              Analyze Pitch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
