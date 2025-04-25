
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Wrench, Terminal } from "lucide-react";

export function SkillsSection() {
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5/CSS3"],
    },
    {
      title: "Backend Development",
      icon: Database,
      skills: ["Node.js", "Express", "PostgreSQL", "RESTful APIs", "GraphQL"],
    },
    {
      title: "Tools & DevOps",
      icon: Wrench,
      skills: ["Git", "Docker", "AWS", "CI/CD", "Webpack"],
    },
    {
      title: "Development Tools",
      icon: Terminal,
      skills: ["VS Code", "Figma", "Postman", "Jest", "npm/yarn"],
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="section-padding reveal-container bg-muted/5">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal-content">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative">
              <span className="relative z-10">Skills & Tools</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10"></span>
            </h2>
          </div>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-content" style={{transitionDelay: "0.2s"}}>
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-border bg-background/30 backdrop-blur-md hover:bg-background/40 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm bg-secondary/50 backdrop-blur-sm text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
