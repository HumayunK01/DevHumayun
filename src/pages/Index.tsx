import { useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Background } from "@/components/background";
import { BackToTopButton } from "@/components/back-to-top-button";


// Lazy load larger components to improve initial load performance
const AboutSection = lazy(() => import("@/components/about-section"));
const ExperienceSection = lazy(() => import("@/components/experience-section"));
const ProjectsSection = lazy(() => import("@/components/projects-section"));
const SkillsSection = lazy(() => import("@/components/skills-section"));
const ContactSection = lazy(() => import("@/components/contact-section"));
const Footer = lazy(() => import("@/components/footer"));

const Index = () => {
  // Initialize scroll reveal observer and locomotive scroll
  useEffect(() => {
    // Initialize Locomotive Scroll
    let locomotiveScroll: any;
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll = new LocomotiveScroll();
    })();

    // Use a more efficient IntersectionObserver configuration
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Unobserve elements after they've been revealed to minimize performance impact
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before elements come into view
      }
    );

    // Select all elements with the reveal-content class
    const revealElements = document.querySelectorAll('.reveal-content');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen transition-theme relative overflow-hidden">
      {/* Global background that stays consistent across all sections */}
      <div className="fixed inset-0 w-full h-full -z-30">
        <Background />
      </div>

      <Navbar />
      <HeroSection />

      {/* Wrap lazy-loaded components in Suspense with fallback */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ExperienceSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ContactSection />
      </Suspense>

      <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading...</div>}>
        <Footer />
      </Suspense>

      <BackToTopButton />
    </div>
  );
};

export default Index;
