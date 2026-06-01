import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import DashboardSection from './components/DashboardSection';
import FeaturesSection from './components/FeaturesSection';
import ImpactSection from './components/ImpactSection';
import FutureScopeSection from './components/FutureScopeSection';
import Footer from './components/Footer';
import AnalysisPage from './pages/AnalysisPage';

export default function App() {
  const [page, setPage] = useState<'landing' | 'analysis'>('landing');

  if (page === 'analysis') {
    return <AnalysisPage onBack={() => setPage('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#F8FAFC]">
      <Navbar onAnalyze={() => setPage('analysis')} />
      <main>
        <HeroSection onAnalyze={() => setPage('analysis')} />
        <ProblemSection />
        <HowItWorksSection />
        <DashboardSection />
        <FeaturesSection />
        <ImpactSection />
        <FutureScopeSection />
      </main>
      <Footer onAnalyze={() => setPage('analysis')} />
    </div>
  );
}
