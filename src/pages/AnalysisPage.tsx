import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Upload, Activity, Droplets, Cloud, BarChart3,
  Brain, Coins, Target, Clock, Database, LayoutDashboard, Map,
} from 'lucide-react';
import { runAnalysis } from '../analysis/simulator';
import type { AnalysisState } from '../analysis/types';

import UploadPanel from '../components/analysis/UploadPanel';
import ScanningOverlay from '../components/analysis/ScanningOverlay';
import LiveDashboard from '../components/analysis/LiveDashboard';
import SurfaceAnalysisPanel from '../components/analysis/SurfaceAnalysisPanel';
import PitchHeatmapPanel from '../components/analysis/PitchHeatmapPanel';
import MoisturePanel from '../components/analysis/MoisturePanel';
import WeatherPanel from '../components/analysis/WeatherPanel';
import ForecastPanel from '../components/analysis/ForecastPanel';
import AIInsightsPanel from '../components/analysis/AIInsightsPanel';
import TossRecommendationPanel from '../components/analysis/TossRecommendationPanel';
import MatchStrategyPanel from '../components/analysis/MatchStrategyPanel';
import PitchEvolutionPanel from '../components/analysis/PitchEvolutionPanel';
import HistoricalComparisonPanel from '../components/analysis/HistoricalComparisonPanel';

interface Props { onBack: () => void }

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'surface', label: 'Surface', icon: Activity },
  { id: 'heatmap', label: 'Heatmap', icon: Map },
  { id: 'moisture', label: 'Moisture', icon: Droplets },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'forecast', label: 'Forecast', icon: BarChart3 },
  { id: 'insights', label: 'AI Insights', icon: Brain },
  { id: 'toss', label: 'Toss', icon: Coins },
  { id: 'strategy', label: 'Strategy', icon: Target },
  { id: 'evolution', label: 'Evolution', icon: Clock },
  { id: 'historical', label: 'Historical', icon: Database },
];

export default function AnalysisPage({ onBack }: Props) {
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    progress: 0,
    currentStep: '',
    result: null,
    imagePreview: null,
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleUpload = useCallback(async (file: File, previewUrl: string) => {
    setState((s) => ({ ...s, status: 'uploading', imagePreview: previewUrl, progress: 0 }));

    // Brief upload animation
    await new Promise((r) => setTimeout(r, 800));
    setState((s) => ({ ...s, status: 'scanning' }));

    const result = await runAnalysis(file.name, previewUrl, (progress, step) => {
      setState((s) => ({ ...s, progress, currentStep: step }));
    });

    setState((s) => ({ ...s, status: 'complete', result }));
    setActiveTab('dashboard');
  }, []);

  const reset = () => {
    setState({ status: 'idle', progress: 0, currentStep: '', result: null, imagePreview: null });
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A192F] grid-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] flex items-center justify-center">
                <Activity size={12} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white">
                Pitch<span className="text-[#00BFFF]">Pulse</span>
                <span className="text-[#8B5CF6] ml-0.5">AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {state.status === 'complete' && (
              <>
                <div className="hidden sm:flex items-center gap-2 glass rounded-lg px-3 py-1.5 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                  <span className="text-white/50">Analysis Complete</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/50 font-mono">{state.result?.analyzedAt}</span>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs text-white/60 hover:text-white border border-white/10 hover:border-[#00BFFF]/30 transition-all"
                >
                  <Upload size={12} />
                  New Analysis
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {/* ── IDLE: Upload ── */}
          {state.status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-1.5 text-xs font-medium text-[#00BFFF] mb-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                  Demo Mode Active — Simulated AI Analysis
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                  Upload Pitch Image
                </h1>
                <p className="text-white/50 max-w-md mx-auto">
                  Upload any cricket pitch photo. Our AI pipeline will analyze surface conditions,
                  moisture, weather impact, and generate strategic match forecasts.
                </p>
              </div>

              <UploadPanel onUpload={handleUpload} />

              {/* Feature preview */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Surface Analysis', color: '#00BFFF' },
                  { label: 'Moisture Model', color: '#39FF14' },
                  { label: 'Match Forecast', color: '#8B5CF6' },
                  { label: 'Toss Decision', color: '#FFB800' },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="glass rounded-xl p-3 text-center text-xs text-white/40"
                    style={{ borderTop: `1px solid ${f.color}30` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full mx-auto mb-2" style={{ background: f.color }} />
                    {f.label}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── SCANNING ── */}
          {(state.status === 'uploading' || state.status === 'scanning') && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-white mb-2">
                  Analyzing Pitch Surface...
                </h2>
                <p className="text-white/40 text-sm">
                  Running 10-stage AI pipeline — please wait
                </p>
              </div>
              <ScanningOverlay
                progress={state.progress}
                currentStep={state.currentStep}
                imagePreview={state.imagePreview}
              />
            </motion.div>
          )}

          {/* ── COMPLETE: Results ── */}
          {state.status === 'complete' && state.result && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Result header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Analysis{' '}
                    <span className="bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] bg-clip-text text-transparent">
                      Complete
                    </span>
                  </h2>
                  <p className="text-white/40 text-sm mt-0.5">
                    {state.result.imageName} · {state.result.analyzedAt}
                  </p>
                </div>
                {/* Quick stats */}
                <div className="flex gap-3">
                  {[
                    { label: 'Confidence', value: `${state.result.forecast.confidenceScore}%`, color: '#39FF14' },
                    { label: 'Toss', value: state.result.toss.decision.split(' ')[0], color: '#FFB800' },
                    { label: 'Spin', value: `${state.result.forecast.spinPotential}`, color: '#8B5CF6' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="glass rounded-xl px-3 py-2 text-center"
                      style={{ borderTop: `2px solid ${s.color}40` }}
                    >
                      <div className="text-base font-black" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs text-white/30">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab navigation */}
              <div className="flex gap-1 overflow-x-auto pb-1 mb-6 scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${active
                          ? 'bg-gradient-to-r from-[#00BFFF]/20 to-[#8B5CF6]/20 text-white border border-[#00BFFF]/30'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                        }`}
                    >
                      <Icon size={12} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === 'dashboard' && <LiveDashboard result={state.result} />}
                  {activeTab === 'surface' && <SurfaceAnalysisPanel surface={state.result.surface} />}
                  {activeTab === 'heatmap' && <PitchHeatmapPanel heatmap={state.result.heatmap} />}
                  {activeTab === 'moisture' && <MoisturePanel moisture={state.result.moisture} />}
                  {activeTab === 'weather' && <WeatherPanel weather={state.result.weather} />}
                  {activeTab === 'forecast' && <ForecastPanel forecast={state.result.forecast} />}
                  {activeTab === 'insights' && <AIInsightsPanel insights={state.result.insights} />}
                  {activeTab === 'toss' && <TossRecommendationPanel toss={state.result.toss} />}
                  {activeTab === 'strategy' && <MatchStrategyPanel strategy={state.result.strategy} />}
                  {activeTab === 'evolution' && <PitchEvolutionPanel evolution={state.result.evolution} />}
                  {activeTab === 'historical' && <HistoricalComparisonPanel historical={state.result.historical} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
