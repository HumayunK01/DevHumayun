
import { useEffect, useRef } from "react";
import { ArrowRight, Github, ExternalLink, Folder } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
};

export function ProjectsSection() {
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
  
  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A modern personal portfolio website with smooth animations and interactive elements.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      title: "E-Commerce Dashboard",
      description: "A comprehensive dashboard for e-commerce businesses with analytics and inventory management.",
      tags: ["Next.js", "TypeScript", "Chart.js"],
      githubUrl: "https://github.com"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      tags: ["React", "Node.js", "Socket.io"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      title: "Weather Forecasting Tool",
      description: "An interactive weather forecasting application with detailed visualizations and alerts.",
      tags: ["JavaScript", "APIs", "D3.js"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-muted/5 reveal-container">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal-content">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative">
              <span className="relative z-10">Featured Projects</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10"></span>
            </h2>
          </div>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore some of my recent work and personal projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-content" style={{transitionDelay: "0.2s"}}>
          {projects.map((project, index) => (
            <Card key={index} className="card-hover border-border overflow-hidden bg-background/30 backdrop-blur-md hover:bg-background/40 transition-all duration-300">
              <CardHeader className="relative">
                {project.imageUrl ? (
                  <div className="aspect-video rounded-md overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-md bg-secondary/30 backdrop-blur-sm flex items-center justify-center">
                    <Folder size={64} className="text-muted-foreground/50" />
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <h3 className="text-xl font-bold mb-2 font-serif">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/50 backdrop-blur-sm text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="flex space-x-3">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-theme"
                  >
                    <Github size={20} />
                  </a>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-theme"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center reveal-content" style={{transitionDelay: "0.4s"}}>
          <Button variant="outline" className="group">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
