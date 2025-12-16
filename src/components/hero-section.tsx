import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Linkedin, Mail, Twitter, Code } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse position for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable tilt on mobile

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const TypewriterText = () => {
    const roles = ["Full Stack Developer", "Blockchain Engineer", "UI/UX Designer"];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const typeSpeed = isDeleting ? 50 : 100;
      const timeout = setTimeout(() => {
        const currentRole = roles[currentRoleIndex];

        if (!isDeleting) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      }, typeSpeed);

      return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRoleIndex, roles]);

    return (
      <>
        <span className="text-foreground ml-2">{displayText}</span>
        <span className="ml-1 w-0.5 h-8 bg-primary animate-pulse" />
      </>
    );
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center overflow-x-hidden pt-24 pb-20 md:pt-20 md:pb-0">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">

          {/* Text Content */}
          <div className={`space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm hover:bg-primary/10 transition-colors cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for new projects
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Hi, I'm <span className="text-primary relative inline-block">
                  Humayun
                  <svg className="absolute w-full h-2.5 -bottom-1 left-0 text-primary opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7937 2.1462 72.8228 -1.27218 198.006 2.65151" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /> </svg>
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground h-[1.5em] flex items-center justify-center lg:justify-start">
                I am a <TypewriterText />
              </h2>
            </div>

            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              Crafting exceptional digital experiences with modern web technologies.
              Specializing in scalable, high-performance applications that solve real-world problems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <ScrollLink to="projects" smooth={true} duration={800} offset={-100} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
                  View My Work <ExternalLink className="h-4 w-4" />
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={800} offset={-100} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold hover:bg-secondary transition-all hover:scale-105">
                  Contact Me <Mail className="h-4 w-4" />
                </Button>
              </ScrollLink>
            </div>

            {/* Social Proof / Links */}
            <div className="pt-4 flex items-center gap-6 text-muted-foreground">
              <motion.a href="https://github.com/HumayunK01" target="_blank" whileHover={{ scale: 1.2, color: "#fff" }} className="hover:text-foreground transition-colors"><Github className="h-6 w-6" /></motion.a>
              <motion.a href="https://www.linkedin.com/in/devhumayun/" target="_blank" whileHover={{ scale: 1.2, color: "#0A66C2" }} className="hover:text-foreground transition-colors"><Linkedin className="h-6 w-6" /></motion.a>
              <motion.a href="https://x.com/humayunkpvt/" target="_blank" whileHover={{ scale: 1.2, color: "#1DA1F2" }} className="hover:text-foreground transition-colors"><Twitter className="h-6 w-6" /></motion.a>
            </div>
          </div>

          {/* 3D Tilt Image Card */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0" style={{ perspective: "1000px" }}>
            <motion.div
              style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-3xl cursor-grab active:cursor-grabbing"
            >
              {/* Background Glows */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-3xl blur-2xl opacity-30 animate-pulse"
                style={{ transform: "translateZ(-50px)" }}
              />

              {/* Card Container */}
              <div
                className="absolute inset-0 bg-background/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                style={{ transform: "translateZ(20px)" }}
              >
                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted">
                    <img
                      src="/me.webp"
                      alt="Humayun"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-sm font-medium opacity-80">Based in</p>
                      <p className="text-xl font-bold">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Element 1 */}
              <motion.div
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-background/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-border shadow-xl flex items-center gap-3 z-50"
                initial={{ z: 70, y: 0 }}
                animate={{ z: 70, y: [0, -10, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  z: { duration: 0 } // steady z
                }}
              >
                <div className="h-8 w-8 md:h-10 md:w-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                  <Code className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Experience</p>
                  <p className="text-xs md:text-sm font-bold">3+ Years</p>
                </div>
              </motion.div>

              {/* Floating Badge Element 2 */}
              <motion.div
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-background/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-border shadow-xl flex items-center gap-3 z-50"
                initial={{ z: 70, y: 0 }}
                animate={{ z: 70, y: [0, 10, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 },
                  z: { duration: 0 }
                }}
              >
                <div className="h-8 w-8 md:h-10 md:w-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Projects</p>
                  <p className="text-xs md:text-sm font-bold">50+ Completed</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-[-2] left-1/2 -translate-x-1/2 cursor-pointer hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground font-medium">Scroll down</span>
          <div className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 bg-primary rounded-full"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
