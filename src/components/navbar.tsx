import { useState, useEffect, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Menu, User, Code, Briefcase, Mail, Home, FolderOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { rafThrottle } from "@/lib/scroll-utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

// Static data defined outside component to prevent recreation
const NAV_LINKS = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "My Journey", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Contact", href: "#contact", icon: Mail },
] as const;

const SECTIONS = ["hero", "about", "experience", "projects", "skills", "contact"] as const;

type NavbarProps = {
  className?: string;
};

// Memoized NavLink to prevent unnecessary re-renders of individual links
const NavLink = memo(({
  link,
  isActive,
  onClick,
  isMobile = false
}: {
  link: typeof NAV_LINKS[number],
  isActive: boolean,
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void,
  isMobile?: boolean
}) => {
  return (
    <a
      href={link.href}
      className={cn(
        isMobile
          ? "flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-lg font-medium"
          : "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
        isActive
          ? (isMobile ? "bg-primary/10 text-primary" : "text-primary")
          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
      )}
      onClick={(e) => onClick(e, link.href)}
    >
      {!isMobile && isActive && (
        <motion.span
          layoutId="active-nav-pill-desktop"
          className="absolute inset-0 bg-primary/10 rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        <link.icon className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
        <span className={cn(!isMobile && "hidden lg:block")}>{link.name}</span>
      </span>
    </a>
  );
});

NavLink.displayName = "NavLink";

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      // 1. Update Navbar appearance
      // Using functional state update to possibly bailout if value hasn't changed? 
      // React handles this optimization automatically, but good to be precise.
      const currentScrollState = window.scrollY > 20;
      setIsScrolled(prev => prev !== currentScrollState ? currentScrollState : prev);

      // 2. Update Active Section
      let currentSection = "hero";
      const viewportHeight = window.innerHeight;

      // Loop through sections to find which one is currently in view
      // We start from the bottom to catch the last visible section first
      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Logic: "active" if the top of the section is above the bottom 70% mark of the screen
          // i.e., it has scrolled up into view a bit.
          if (rect.top <= viewportHeight * 0.3) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed z-50 transition-all duration-300 ease-in-out",
          // Mobile Styles: Always full width, sticking to top
          "w-full top-0 left-0 right-0 md:hidden",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm py-2"
            : "bg-transparent py-4",
          className
        )}
      >
        <div className="flex items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold font-serif"
            onClick={handleLogoClick}
          >
            <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">H</span>
            </div>
            <span className="text-primary">DevHumayun</span>
          </Link>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle className="flex items-center gap-2 text-xl font-bold font-serif">
                    <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">H</span>
                    </div>
                    DevHumayun
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.name}>
                      {/* We need to wrap custom component with SheetClose asChild properly or use a span */}
                      {/* SheetClose expects a single child. We'll render the functional component's output directly here via map for simplicity with SheetClose */}
                      <a
                        href={link.href}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-lg font-medium",
                          activeSection === link.href.substring(1)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                        )}
                        onClick={(e) => handleScrollToSection(e, link.href)}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}

                  {/* Resume Download Button - Mobile */}
                  <SheetClose asChild>
                    <Button
                      onClick={() => window.open('/resume.pdf', '_blank')}
                      className="mt-4 gap-2 w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                    >
                      <Download className="h-5 w-5" />
                      Download Resume
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Desktop Floating Navbar */}
      <AnimatePresence>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "fixed z-50 hidden md:flex items-center justify-center left-0 right-0 transition-all duration-300 ease-in-out",
            // Position changes based on scroll
            isScrolled ? "top-4" : "top-6"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-1 transition-all duration-300 ease-in-out",
              // Shape changes based on scroll: Full width vs Capsule
              isScrolled
                ? "px-3 py-1.5 rounded-full border border-border/40 bg-background/70 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-background/80"
                : "px-6 py-2 rounded-none bg-transparent w-full max-w-7xl justify-between"
            )}
          >
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 font-serif transition-colors",
                isScrolled ? "mr-4" : "text-2xl font-bold"
              )}
              onClick={handleLogoClick}
            >
              <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">H</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              </div>
              <span className={cn("text-primary whitespace-nowrap", isScrolled ? "hidden lg:block font-bold" : "block font-bold")}>
                DevHumayun
              </span>
            </Link>

            <div className={cn("flex items-center", isScrolled ? "gap-1" : "gap-1 ml-auto")}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  link={link}
                  isActive={activeSection === link.href.substring(1)}
                  onClick={handleScrollToSection}
                />
              ))}

              {/* Resume Download Button - Desktop */}
              <button
                onClick={() => window.open('/resume.pdf', '_blank')}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105",
                  isScrolled ? "ml-2" : "ml-4"
                )}
              >
                <Download className="h-4 w-4" />
                <span className="hidden lg:inline">Resume</span>
              </button>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
