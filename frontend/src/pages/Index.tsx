import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import PoliciesSection from '@/components/PoliciesSection';
import DemoSection from '@/components/DemoSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TechnologiesSection />
        <PoliciesSection />
        <DemoSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
