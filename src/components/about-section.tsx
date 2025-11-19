import { useEffect, useRef } from "react";
import { User, Code, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const skills = [
    { name: "React", category: "frontend" },
    { name: "TypeScript", category: "language" },
    { name: "C", category: "language" },
    { name: "C++", category: "language" },
    { name: "Java", category: "language" },
    { name: "Python", category: "language" },
    { name: "XML", category: "language" },
    { name: "JavaScript", category: "language" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Solidity", category: "blockchain" },
    { name: "Web3.js", category: "blockchain" },
    { name: "Android Studio", category: "tools" }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-10 md:py-32 lg:px-24 overflow-hidden reveal-container">
      {/* We're using the global background component now */}

      {/* Floating decorative elements - reduced for better performance */}
      <div className="absolute top-32 left-[15%] w-16 h-16 border border-primary/20 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.7s' }} aria-hidden="true" />
      <div className="absolute bottom-32 right-[10%] w-8 h-8 border border-primary/20 rounded-full animate-float" style={{ animationDelay: '1.2s' }} aria-hidden="true" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm text-sm font-medium">
            <span className="text-primary mr-2">✦</span>
            About Me
            <span className="text-primary ml-2">✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Journey</span> & Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="reveal-content" style={{ transitionDelay: "0.1s" }}>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm shadow-lg">
                <picture>
                  <source srcSet="/realme.webp" type="image/webp" />
                  <source srcSet="/realme.png" type="image/png" />
                  <img
                    src="/realme.webp"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </picture>
                {/* Decorative elements - matching hero section style */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl pulse-glow" aria-hidden="true" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pulse-glow" style={{ animationDelay: '1.5s' }} aria-hidden="true" />
                <div className="absolute top-1/2 -right-6 w-12 h-12 bg-pink-500/20 rounded-full blur-xl pulse-glow" style={{ animationDelay: '2s' }} aria-hidden="true" />
              </div>
              <div className="absolute -bottom-8 -right-8 p-6 glass-card rounded-xl border border-white/10 shadow-lg max-w-xs bg-background/80 backdrop-blur-md">
                <p className="font-serif italic text-lg">
                  "Code is like humor. When you have to explain it, it's bad!"
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-content" style={{ transitionDelay: "0.3s" }}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 mr-3">
                    <User className="w-4 h-4 text-primary" />
                  </span>
                  About Me
                </h3>
                <div className="space-y-4 text-lg text-justify">
                  <p>
                    I'm a skilled full-stack developer with expertise in blockchain technologies and mobile
                    application development. With a strong foundation in multiple programming languages
                    including C, C++, Java, Python, and JavaScript, I create robust and innovative digital solutions.
                  </p>
                  <p>
                    My experience spans across web development, blockchain applications, and mobile development.
                    I'm passionate about creating secure, efficient, and user-friendly applications that leverage
                    cutting-edge technologies to deliver exceptional user experiences.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  className="group btn-glow pulse-glow w-full sm:w-auto"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                >
                  <span className="flex items-center justify-center">
                    Download Resume
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button
                  className="group btn-glow pulse-glow w-full sm:w-auto"
                  onClick={() => window.open('https://github.com/sponsors/HumayunK01', '_blank')}
                >
                  <span className="flex items-center justify-center">
                    Sponsor Me
                    <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
