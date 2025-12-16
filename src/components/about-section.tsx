import { useRef, useState, useEffect } from "react";
import { User, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const parallaxY = isMobile ? 0 : y;

  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Consistent Background Pattern (Matching Hero) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary cursor-default">
            About Me
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Crafting Digital <span className="text-primary">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image */}
          <div className="relative">
            <motion.div
              style={{ y: parallaxY }}
              className="relative z-10"
            >
              <div className="relative aspect-square w-full max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                {/* Image */}
                <img
                  src="/realme.webp"
                  alt="Profile"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                {/* Floating Quote - Minimal Glass */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white/90">
                  <p className="font-serif italic text-sm md:text-base">
                    "Code is like humor. When you have to explain it, it's bad!"
                  </p>
                </div>
              </div>

              {/* Minimal Border Offset */}
              <div className="absolute inset-0 border border-primary/20 rounded-3xl translate-x-4 translate-y-4 -z-10 max-w-sm mx-auto" />
            </motion.div>
          </div>

          {/* Right Column: Bio */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-2 text-foreground">
                <User className="text-primary h-6 w-6" />
                Who I Am
              </h3>
              <div className="space-y-4 text-zinc-400 text-lg leading-relaxed text-left">
                <p>
                  I'm a passionate Full-Stack Developer with a knack for building robust and scalable web applications.
                  My journey began with a curiosity for how things work on the internet, which quickly evolved into a
                  career obsession with clean code and intuitive user experiences.
                </p>
                <p>
                  With expertise ranging from low-level languages like C/C++ to modern web frameworks like React and Next.js,
                  I bridge the gap between complex engineering and elegant design. I also specialize in Blockchain technologies,
                  creating decentralized solutions for the future.
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all"
              >
                Download Resume <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/sponsors/HumayunK01', '_blank')}
                className="gap-2 hover:bg-secondary hover:scale-105 transition-all"
              >
                Sponsor Me <Heart className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
