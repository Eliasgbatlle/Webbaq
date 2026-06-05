import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { SectorsSection } from "@/components/landing/sectors-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CoverageSection } from "@/components/landing/coverage-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <SectorsSection />
      <DevelopersSection />
      <PricingSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CoverageSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}

