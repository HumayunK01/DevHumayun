import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            "bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-xl",
            "text-primary hover:bg-zinc-800 hover:border-primary/20",
            "group transition-colors duration-300"
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>
      )}
    </AnimatePresence>
  );
} 