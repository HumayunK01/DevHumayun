
import { useEffect, useRef } from "react";
import { User } from "lucide-react";

export function AboutSection() {
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const skills = [
    "React", "TypeScript", "UI/UX Design", "Next.js",
    "Node.js", "Tailwind CSS", "JavaScript", "RESTful APIs"
  ];
  
  return (
    <section id="about" ref={sectionRef} className="section-padding reveal-container">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-2/5 reveal-content" style={{transitionDelay: "0.1s"}}>
            <div className="relative">
              <div className="aspect-square max-w-md rounded-2xl overflow-hidden border border-border bg-muted/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <User size={120} className="text-muted-foreground/30" />
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 p-6 glass-card rounded-xl border border-border shadow-lg">
                <p className="font-serif italic text-lg">
                  "Passionate about creating meaningful digital experiences"
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 reveal-content" style={{transitionDelay: "0.3s"}}>
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative mb-6">
                <span className="relative z-10">About Me</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10"></span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg">
              <p>
                I'm a passionate web developer and designer with over 5 years of experience
                creating beautiful, functional websites and applications. My approach combines
                technical expertise with an eye for design.
              </p>
              
              <p>
                I specialize in front-end development and UI/UX design, with a focus on
                creating responsive, accessible, and performant web experiences. I believe in
                continuous learning and staying up-to-date with the latest technologies.
              </p>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
