import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { rafThrottle } from "@/lib/scroll-utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = rafThrottle(() => {
      setVisible(window.scrollY > 300);
    });
    
    // Use passive event listener for better scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed z-50 right-3 bottom-3 sm:right-4 sm:bottom-4 md:right-6 md:bottom-6 transition-all duration-500",
        visible
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-4"
      )}
      style={{ transitionProperty: "opacity, transform" }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "bg-background/60 backdrop-blur-xl border border-white/20 shadow-xl",
              "hover:bg-background/80 hover:shadow-2xl",
              "transition-all duration-300 text-primary glass-card",
              "w-10 h-10 p-0 sm:w-12 sm:h-12 md:w-14 md:h-14",
              "xs:w-9 xs:h-9 xs:right-2 xs:bottom-2 xs:p-0"
            )}
            style={{ boxShadow: "0 4px 32px 0 rgba(139,92,246,0.10)" }}
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={12} className="bg-background/90 backdrop-blur-md">
          Back to Top
        </TooltipContent>
      </Tooltip>
    </div>
  );
} 