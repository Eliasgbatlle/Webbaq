import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { SectorsSection } from "@/components/landing/sectors-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CoverageSection } from "@/components/landing/coverage-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { SerpentineLine } from "@/components/landing/serpentine-line";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <SerpentineLine />
      <FeaturesSection />
      <SectorsSection />
      <DevelopersSection />
      <PricingSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CoverageSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}