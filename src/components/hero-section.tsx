
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="circle-bg bg-blue-300 dark:bg-blue-700 top-1/4 right-1/4 w-[30vw] h-[30vw]" />
      <div className="circle-bg bg-purple-300 dark:bg-purple-700 bottom-1/4 left-1/4 w-[40vw] h-[40vw]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 transform ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
            <div className="reveal-container">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Creative <span className="text-gradient">Developer</span> & 
                <span className="block">Digital <span className="text-gradient">Designer</span></span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Crafting immersive digital experiences through code and design.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="w-full sm:w-auto">
                View My Work
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto transition-theme">
                Get In Touch
              </Button>
            </div>
          </div>
          
          <div className={`transform ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm animate-float"></div>
              <div className="absolute inset-4 rounded-xl bg-background glass-card flex items-center justify-center p-8 overflow-hidden">
                <span className="text-6xl">👋</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <a href="#about" className="animate-float">
            <ArrowDown className="h-8 w-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
