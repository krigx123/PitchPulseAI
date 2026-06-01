import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import DashboardSection from './components/DashboardSection';
import FeaturesSection from './components/FeaturesSection';
import ImpactSection from './components/ImpactSection';
import FutureScopeSection from './components/FutureScopeSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-[#F8FAFC]">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <DashboardSection />
        <FeaturesSection />
        <ImpactSection />
        <FutureScopeSection />
      </main>
      <Footer />
    </div>
  );
}
