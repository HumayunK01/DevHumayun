import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

type CustomCursorProps = {
  className?: string;
};

export function CustomCursor({ className }: CustomCursorProps) {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select, [data-cursor-pointer]").forEach(el => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Call once to add listeners to existing elements
    handleLinkHoverEvents();

    // Set up a MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      className={cn("custom-cursor", className)}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: theme === "dark" ? "difference" : "normal",
      }}
      animate={{
        x: position.x - (clicked ? 6 : 12),
        y: position.y - (clicked ? 6 : 12),
        scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      }}
    >
      <motion.div
        className={cn(
          "h-6 w-6 rounded-full",
          theme === "dark"
            ? (clicked ? "bg-white/80" : linkHovered ? "bg-white/30 h-8 w-8" : "border-2 border-white bg-transparent")
            : (clicked ? "bg-black/80" : linkHovered ? "bg-black/30 h-8 w-8" : "border-2 border-black bg-transparent")
        )}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 1.2 : 1,
        }}
      />
      <motion.div
        className={cn(
          "absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full",
          theme === "dark" ? "bg-white" : "bg-black"
        )}
        animate={{
          scale: clicked ? 0 : 1,
        }}
      />
    </motion.div>
  );
}
