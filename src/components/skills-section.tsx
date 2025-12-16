import { useEffect, useRef, useState, useMemo } from "react";
import { Code, Wrench, Cpu, Filter, ChevronDown, ChevronsUpDown, Database, Layout, Globe } from "lucide-react";
import { VscVscode } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import {
  SiReact, SiTypescript, SiTailwindcss, SiNextdotjs, SiHtml5, SiCss3, SiJavascript,
  SiSolidity, SiEthereum, SiIpfs, SiVite, SiFramer, SiShadcnui, SiNodedotjs,
  SiPostgresql, SiPrisma, SiFirebase, SiGit, SiGithub,
  SiVercel, SiPostman, SiPython, SiCplusplus, SiC, SiAndroidstudio
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { FaHardHat } from "react-icons/fa";

// Static Data Definition (Moved outside component to avoid recreation)
const SKILL_CATEGORIES = [
  {
    title: "Frontend & Design",
    icon: Layout,
    category: "frontend",
    color: "blue",
    glow: "blue",
    skills: [
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-foreground" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-foreground" /> },
      { name: "Shadcn UI", icon: <SiShadcnui className="text-foreground" /> },
      { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS3", icon: <SiCss3 className="text-[#1572B6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
    ],
  },
  {
    title: "Blockchain & Web3",
    icon: Globe,
    category: "blockchain",
    color: "green",
    glow: "green",
    skills: [
      { name: "Solidity", icon: <SiSolidity className="text-foreground" /> },
      { name: "Ethereum", icon: <SiEthereum className="text-[#3C3C3D]" /> },
      { name: "Hardhat", icon: <FaHardHat className="text-[#FFF100]" /> },
      { name: "IPFS", icon: <SiIpfs className="text-[#65C2CB]" /> },
      { name: "Web3.js", icon: <SiEthereum className="text-foreground" /> }, // Proxy
      { name: "Ethers.js", icon: <Code className="text-purple-500" /> }, // Generic code icon
    ],
  },
  {
    title: "Backend & Database",
    icon: Database,
    category: "backend",
    color: "purple",
    glow: "purple",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "Prisma", icon: <SiPrisma className="text-foreground" /> },
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "Java", icon: <FaJava className="text-[#007396]" /> },
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "C", icon: <SiC className="text-[#A8B9CC]" /> },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    category: "tools",
    color: "amber",
    glow: "orange",
    skills: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "GitHub", icon: <SiGithub className="text-foreground" /> },
      { name: "VS Code", icon: <VscVscode className="text-[#007ACC]" /> },
      { name: "Vercel", icon: <SiVercel className="text-foreground" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
      { name: "Android Studio", icon: <SiAndroidstudio className="text-[#3DDC84]" /> },
    ],
  },
];

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Optimized mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Throttling could be added here if resize is heavy, but for this simple check it's generally fine.
    // However, adding a passive listener is good practice.
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize filtered skills to avoid expensive flatMap operations on every render
  const visibleSkills = useMemo(() => {
    const filteredCategories = activeCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter(category => category.category === activeCategory);

    const allSkills = filteredCategories.flatMap(category =>
      category.skills.map((skill, i) => ({
        ...skill,
        id: `${category.category}-${skill.name}-${i}` // More robust ID
      }))
    );

    return isMobile && !showAllSkills ? allSkills.slice(0, 9) : allSkills;
  }, [activeCategory, isMobile, showAllSkills]);

  return (
    <section id="skills" ref={sectionRef} className="relative py-6 md:py-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary cursor-default">
            Tech Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            My <span className="text-primary">Arsenal</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A comprehensive look at the technologies, languages, and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Modern Tabs Interface */}
        <div className="mb-12">
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <div className="flex justify-center mb-10">
              {/* Desktop Tabs */}
              <div className="hidden md:block">
                <TabsList className="h-auto p-1.5 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full gap-1">
                  <TabsTrigger
                    value="all"
                    onClick={() => setActiveCategory("all")}
                    className="relative rounded-full px-6 py-2.5 data-[state=active]:bg-transparent hover:bg-white/5 transition-colors text-muted-foreground data-[state=active]:text-primary-foreground"
                  >
                    {activeCategory === "all" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      All Skills
                    </span>
                  </TabsTrigger>
                  {SKILL_CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat.category}
                      value={cat.category}
                      onClick={() => setActiveCategory(cat.category)}
                      className="relative rounded-full px-6 py-2.5 data-[state=active]:bg-transparent hover:bg-white/5 transition-colors text-muted-foreground data-[state=active]:text-primary-foreground"
                    >
                      {activeCategory === cat.category && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center">
                        <cat.icon className="w-4 h-4 mr-2" />
                        {cat.title.split(" ")[0]}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Mobile Dropdown */}
              <div className="md:hidden w-full max-w-xs">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-zinc-900/50 backdrop-blur-md border-white/10 h-12 rounded-xl"
                    >
                      <div className="flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {activeCategory === "all" ? "All Skills" : SKILL_CATEGORIES.find(c => c.category === activeCategory)?.title}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-zinc-900 border-white/10">
                    <DropdownMenuItem onClick={() => setActiveCategory("all")} className="py-3">
                      <Filter className="w-4 h-4 mr-2" /> All Skills
                    </DropdownMenuItem>
                    {SKILL_CATEGORIES.map((cat) => (
                      <DropdownMenuItem key={cat.category} onClick={() => setActiveCategory(cat.category)} className="py-3">
                        <cat.icon className="w-4 h-4 mr-2" /> {cat.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <motion.div className="w-full" layout>
              <motion.div layout className="flex flex-wrap justify-center gap-3 md:gap-4">
                <AnimatePresence mode="popLayout">
                  {visibleSkills.map((skill) => (
                    <motion.div
                      layout
                      key={skill.name} // Using unique name as key is safe here as skill names are unique
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div
                        className="flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-xl md:rounded-2xl group hover:scale-105 hover:shadow-lg hover:shadow-primary/5 cursor-default"
                      >
                        <div className="text-lg md:text-2xl filter drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                          {skill.icon}
                        </div>
                        <span className="text-xs md:text-sm font-medium text-zinc-400 group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Show More Button (Mobile) */}
              {isMobile && activeCategory === "all" && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="ghost"
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="text-primary hover:text-primary/80 hover:bg-primary/5"
                  >
                    {showAllSkills ? "Show Less" : "View All Skills"}
                    <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", showAllSkills && "rotate-180")} />
                  </Button>
                </div>
              )}
            </motion.div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
