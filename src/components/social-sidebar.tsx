import React, { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const socialLinks = [
  { icon: Github, href: "https://github.com/HumayunK01", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/devhumayun/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/humayunkpvt", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/sleepyhumayun", label: "Instagram" },
];

export function SocialSidebar() {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      setShow(rect.bottom < 0); // Show when hero is out of view
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className={cn(
        "fixed left-0 top-1/2 z-40 -translate-y-1/2 flex flex-col items-center gap-2 glass-card border border-white/15 backdrop-blur-lg shadow-lg px-2 py-3 rounded-lg transition-all duration-500 min-w-[44px]",
        show
          ? "opacity-100 pointer-events-auto -translate-x-0"
          : "opacity-0 pointer-events-none -translate-x-6"
      )}
      style={{ transitionProperty: "opacity, transform" }}
      aria-label="Social sidebar"
    >
      {/* Vertical accent line */}
      <div className="w-0.5 h-8 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent mb-2 rounded-full" />
      {socialLinks.map((link, i) => (
        <Tooltip key={i}>
          <TooltipTrigger asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-1.5 rounded-full hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all group"
              tabIndex={0}
            >
              <link.icon className="w-5 h-5 text-primary group-hover:scale-110 group-hover:-translate-y-0.5 group-focus:scale-110 group-focus:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {link.label}
          </TooltipContent>
        </Tooltip>
      ))}
      {/* Vertical accent line */}
      <div className="w-0.5 h-8 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent mt-2 rounded-full" />
    </div>
  );
} 