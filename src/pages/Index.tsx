import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContractsSection from "@/components/ContractsSection";
import TrackingSection from "@/components/TrackingSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { ContractInteraction } from "@/components/ContractInteraction";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ContractsSection />
        <section id="contract-interaction" className="py-16 px-4">
          <div className="container mx-auto">
            <ContractInteraction />
          </div>
        </section>
        <TrackingSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
