
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MapPin,
  Calendar,
  Copy,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  const socialLinks = [
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:humayunk.pvt@gmail.com",
      color: "hover:bg-gray-800 hover:text-whitee"
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/HumayunK01",
      color: "hover:bg-gray-800 hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/devhumayun/",
      color: "hover:bg-blue-600 hover:text-white"
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://x.com/humayunkpvt",
      color: "hover:bg-sky-500 hover:text-white"
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com/sleepyhumayun",
      color: "hover:bg-pink-600 hover:text-white"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-5 md:py-12 md:px-12 lg:px-24 overflow-hidden reveal-container">
      {/* Local decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 reveal-content">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm text-sm font-medium">
            <span className="text-primary mr-2">✦</span>
            Contact Me
            <span className="text-primary ml-2">✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get In <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating on a blockchain project or need a full-stack developer?
            I'm open to discussing new opportunities and innovative ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 reveal-content" style={{transitionDelay: "0.2s"}}>
          {/* Contact Information - Hidden on mobile */}
          <Card className="hidden md:block overflow-hidden border-border bg-background/30 backdrop-blur-md hover:bg-background/40 transition-all duration-300 h-full">
            <div className="p-6 md:p-8 space-y-8">
              <div className="flex flex-col space-y-2">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-muted-foreground">
                  Reach out directly or connect with me on social media
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className="group relative flex items-center space-x-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all bg-background/50">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                    <p className="font-medium">humayunk.pvt@gmail.com</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('humayunk.pvt@gmail.com', 'email')}
                    className="flex-shrink-0 p-2 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Copy email"
                  >
                    {copySuccess === 'email' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all bg-background/50">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                    <p className="font-medium">Thane, India</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all bg-background/50">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Availability</h4>
                    <p className="font-medium">Open to opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Links - Full width on mobile */}
          <Card className="overflow-hidden border-border bg-background/30 backdrop-blur-md hover:bg-background/40 transition-all duration-300 h-full md:col-span-1 col-span-full">
            <div className="p-6 md:p-8 space-y-8">
              <div className="flex flex-col space-y-2">
                <h3 className="text-2xl font-bold">Connect With Me</h3>
                <p className="text-muted-foreground">
                  Follow me on social media or check out my work
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center space-x-3 p-4 rounded-lg border border-border/50 transition-all",
                      "hover:border-primary/50 bg-background/50",
                      link.color
                    )}
                  >
                    <div className="flex-shrink-0">
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>

              {/* Digital Business Card */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <h4 className="text-sm font-medium text-center mb-4 text-muted-foreground">
                  <span className="inline-flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    Digital Business Card
                  </span>
                </h4>
                <div className="relative w-full h-64 perspective-1000">
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 shadow-xl p-6 flex flex-col justify-between cursor-pointer"
                    initial={{ rotateY: 0 }}
                    animate={{
                      rotateY: [0, 5, 0, -5, 0],
                      rotateX: [0, -5, 0, 5, 0],
                      y: [0, -5, 0, 5, 0]
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">Khan Humayun</h3>
                        <p className="text-sm text-muted-foreground">Full-Stack & Blockchain Developer</p>
                      </div>
                      <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-inner flex items-center justify-center">
                        <div className="w-full h-full bg-black rounded-sm grid grid-cols-4 grid-rows-4 gap-0.5 p-1">
                          {/* Simplified QR code pattern */}
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "rounded-sm",
                                Math.random() > 0.6 ? "bg-white" : "bg-transparent"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-[120px] sm:max-w-none">humayunk.pvt@gmail.com</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-[120px] sm:max-w-none">Mumbra, India</span>
                        </div>
                      </div>
                      <div className="text-xs opacity-70">Scan to connect</div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full bg-pink-500/10 blur-xl" />
                    <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-blue-500/10 blur-xl" />

                    {/* Download button */}
                    <motion.button
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 shadow-md"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => window.open('/vcard.vcf', '_blank')}
                      aria-label="Download contact card"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center reveal-content" style={{transitionDelay: "0.4s"}}>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Looking forward to hearing from you! I typically respond within 24-48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
