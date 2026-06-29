import { lazy, Suspense } from "react";
import { HeroSection } from "./components/HeroSection";
import { Navigation } from "./components/Navigation";

const AboutSection = lazy(() => import("./components/AboutSection").then(m => ({ default: m.AboutSection })));
const ServicesSection = lazy(() => import("./components/ServicesSection").then(m => ({ default: m.ServicesSection })));
const PortfolioSection = lazy(() => import("./components/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const CreativeShowcase = lazy(() => import("./components/CreativeShowcase").then(m => ({ default: m.CreativeShowcase })));
const ContactSection = lazy(() => import("./components/ContactSection").then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));

function SectionFallback() {
  return <div className="min-h-screen bg-[#000000]" aria-hidden="true" />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus:border focus:border-white/30"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <PortfolioSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <CreativeShowcase />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-24 bg-[#000000]" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
