import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code, Palette, ExternalLink } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 md:pt-20 mt-2 md:mt-0">
      {/* Decorative Elements - reduced for better performance */}
      <div className="absolute top-32 md:top-24 right-[20%] lg:right-[25%] w-16 h-16 border border-primary/20 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.5s' }} aria-hidden="true" />
      <div className="absolute bottom-32 left-[20%] lg:left-[25%] w-8 h-8 border border-primary/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} aria-hidden="true" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className={`space-y-8 transform ${isLoaded ? 'animate-fade-in' : 'opacity-0'} mx-auto md:mx-0 max-w-xl md:max-w-none`} style={{ animationDelay: '0.1s' }}>
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-foreground mb-2 mt-4 md:mt-0">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for freelance work
            </div>

            <div className="reveal-container">
              <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Full Stack</span> Developer
                <span className="block mt-2">&amp; <span className="gradient-text">Blockchain</span> Engineer</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
              Specializing in Next.js development, blockchain technologies, and creating innovative digital solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ScrollLink to="projects" smooth={true} duration={800} offset={-100}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm transform scale-150" />
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center">
                      View My Work
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </ScrollLink>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ScrollLink to="contact" smooth={true} duration={800} offset={-100}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto group relative overflow-hidden border-2 border-primary/30 hover:border-primary/80 bg-background/30 hover:bg-background/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">Get In Touch</span>
                  </Button>
                </ScrollLink>
              </motion.div>
            </div>

            {/* Skills Icons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Code className="w-4 h-4 text-primary" />
                </div>
                <span>Development</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Palette className="w-4 h-4 text-primary" />
                </div>
                <span>Design</span>
              </div>
            </div>
          </div>

          <div className={`transform ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements around the card */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl pulse-glow" aria-hidden="true" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pulse-glow" style={{ animationDelay: '1.5s' }} aria-hidden="true" />
              <div className="absolute top-1/2 -right-6 w-12 h-12 bg-pink-500/20 rounded-full blur-xl pulse-glow" style={{ animationDelay: '2s' }} aria-hidden="true" />

              {/* Main card with improved styling */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-sm animate-float" />
              <div className="absolute inset-4 rounded-xl bg-background/80 glass-card flex items-center justify-center p-8 overflow-hidden border border-white/10 shadow-lg">
                <div className="relative">
                  <picture>
                    <source srcSet="/me.webp" type="image/webp" />
                    <source srcSet="/me.png" type="image/png" />
                    <img
                      src="/me.webp"
                      alt="Profile"
                      className="w-58 h-58 object-cover rounded-full animate-float"
                      style={{ animationDelay: '1s' }}
                      loading="eager"
                    />
                  </picture>
                  <div className="absolute -bottom-4 -right-4 text-sm font-medium bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    Hello!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <a href="#about" className="group p-3 transition-all hover:translate-y-1 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40 hover:bg-background/70">
            <ArrowDown className="h-6 w-6 text-primary/70 group-hover:text-primary animate-float" />
          </a>
          <div className="absolute -z-10 w-12 h-12 rounded-full bg-primary/5 blur-xl pulse-glow" />
        </div> */}
      </div>
    </section>
  );
}
