
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Wrench, Cpu, Filter, ChevronDown, Check, ChevronsUpDown } from "lucide-react";
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

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      category: "frontend",
      color: "blue",
      skills: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
        { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
        { name: "Next.js", icon: "/icons/nextjs.svg" },
        { name: "HTML5", icon: "/icons/html5.svg" },
        { name: "CSS3", icon: "/icons/css3.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
        { name: "XML", icon: "/icons/xml.svg" },
      ],
    },
    {
      title: "Blockchain Development",
      icon: Cpu,
      category: "blockchain",
      color: "green",
      skills: [
        { name: "Solidity", icon: "/icons/solidity.svg" },
        { name: "Web3.js", icon: "/icons/web3js.svg" },
        { name: "Ethers.js", icon: "/icons/ethers.svg" },
        { name: "Smart Contracts", icon: "/icons/smartcontract.svg" },
        { name: "NFTs", icon: "/icons/nft.svg" },
        { name: "Hardhat", icon: "/icons/hardhat.svg" },
        { name: "Metamask", icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" },
      ],
    },
    {
      title: "Programming Languages",
      icon: Code,
      category: "languages",
      color: "amber",
      skills: [
        { name: "C", icon: "/icons/c.svg" },
        { name: "C++", icon: "/icons/cpp.svg" },
        { name: "Java", icon: "/icons/java.svg" },
        { name: "Python", icon: "/icons/python.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
      ],
    },
    {
      title: "Development Tools",
      icon: Wrench,
      category: "tools",
      color: "amber",
      skills: [
        { name: "Git", icon: "/icons/git.svg" },
        { name: "VS Code", icon: "/icons/vscode.svg" },
        { name: "npm", icon: "/icons/npm.svg" },
        { name: "GitHub", icon: "/icons/github.svg" },
        { name: "Android Studio", icon: "/icons/android-studio.svg" },
        { name: "Vercel", icon: "/icons/vercel.svg" },
      ],
    },
  ];

  const filteredCategories = activeCategory === "all"
    ? skillCategories
    : skillCategories.filter(category => category.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="relative py-10 md:py-28 md:px-12 lg:px-24 overflow-hidden reveal-container">
      {/* Local decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 reveal-content">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm text-sm font-medium">
            <span className="text-primary mr-2">✦</span>
            My Expertise
            <span className="text-primary ml-2">✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Skills & <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Technologies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From programming languages to blockchain technologies, these are the tools I use to build innovative solutions.
          </p>
        </div>

        {/* Modern Tabs Interface */}
        <div className="mb-12 reveal-content" style={{transitionDelay: "0.1s"}}>
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              {/* Desktop Tabs */}
              <div className="hidden md:block w-full max-w-xl">
                <TabsList className="grid grid-cols-5 p-1 bg-background/50 backdrop-blur-md border border-border/50 rounded-full w-full">
                  <TabsTrigger
                    value="all"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    <span>All Skills</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="frontend"
                    className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    <span>Frontend</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="languages"
                    className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    <span>Languages</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="blockchain"
                    className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    <Cpu className="w-4 h-4 mr-2" />
                    <span>Blockchain</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="tools"
                    className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                  >
                    <Wrench className="w-4 h-4 mr-2" />
                    <span>Tools</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Mobile Dropdown */}
              <div className="md:hidden w-full max-w-xs">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-background/50 backdrop-blur-md border border-border/50"
                    >
                      <div className="flex items-center">
                        {activeCategory === "all" && <Filter className="w-4 h-4 mr-2" />}
                        {activeCategory === "frontend" && <Code className="w-4 h-4 mr-2" />}
                        {activeCategory === "languages" && <Code className="w-4 h-4 mr-2" />}
                        {activeCategory === "blockchain" && <Cpu className="w-4 h-4 mr-2" />}
                        {activeCategory === "tools" && <Wrench className="w-4 h-4 mr-2" />}
                        <span>
                          {activeCategory === "all" && "All Skills"}
                          {activeCategory === "frontend" && "Frontend"}
                          {activeCategory === "languages" && "Languages"}
                          {activeCategory === "blockchain" && "Blockchain"}
                          {activeCategory === "tools" && "Tools"}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-full min-w-[200px]">
                    <DropdownMenuItem
                      onClick={() => setActiveCategory("all")}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        <span>All Skills</span>
                      </div>
                      {activeCategory === "all" && <Check className="h-4 w-4 ml-2" />}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setActiveCategory("frontend")}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        <span>Frontend</span>
                      </div>
                      {activeCategory === "frontend" && <Check className="h-4 w-4 ml-2" />}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setActiveCategory("languages")}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        <span>Languages</span>
                      </div>
                      {activeCategory === "languages" && <Check className="h-4 w-4 ml-2" />}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setActiveCategory("blockchain")}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Cpu className="w-4 h-4 mr-2" />
                        <span>Blockchain</span>
                      </div>
                      {activeCategory === "blockchain" && <Check className="h-4 w-4 ml-2" />}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => setActiveCategory("tools")}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Wrench className="w-4 h-4 mr-2" />
                        <span>Tools</span>
                      </div>
                      {activeCategory === "tools" && <Check className="h-4 w-4 ml-2" />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Create a flat array of all skills from all categories */}
                {(() => {
                  // Flatten all skills into a single array with category information
                  const allSkills = filteredCategories.flatMap(category =>
                    category.skills.map((skill, i) => ({
                      ...skill,
                      category,
                      id: `${category.category}-${i}`
                    }))
                  );

                  // For mobile: show limited skills initially, for desktop: show all
                  const visibleSkills = isMobile && !showAllSkills ? allSkills.slice(0, 6) : allSkills;

                  return (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {visibleSkills.map((skillItem, index) => (
                          <motion.div
                            key={skillItem.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="col-span-1"
                          >
                            <Card className={cn(
                              "overflow-hidden border-border/50 bg-background/30 backdrop-blur-md hover:bg-background/40 transition-all duration-300 h-full",
                              skillItem.category.color === "blue" && "hover:border-blue-500/50",
                              skillItem.category.color === "green" && "hover:border-green-500/50",
                              skillItem.category.color === "purple" && "hover:border-purple-500/50",
                              skillItem.category.color === "amber" && "hover:border-amber-500/50"
                            )}>
                              <CardContent className="p-4 flex flex-col items-center gap-2">
                                <div className={cn(
                                  "flex-shrink-0 w-12 h-12 rounded-lg p-2 flex items-center justify-center",
                                  skillItem.category.color === "blue" && "bg-blue-500/10",
                                  skillItem.category.color === "green" && "bg-green-500/10",
                                  skillItem.category.color === "purple" && "bg-purple-500/10",
                                  skillItem.category.color === "amber" && "bg-amber-500/10"
                                )}>
                                  <img
                                    src={skillItem.icon}
                                    alt={skillItem.name}
                                    className="w-8 h-8 object-contain"
                                    onError={(e) => {
                                      e.currentTarget.src = "/icons/placeholder.svg";
                                    }}
                                  />
                                </div>
                                {/* Show skill name below icon for all screen sizes */}
                                <div className="text-center mt-1">
                                  <p className="text-xs font-medium">{skillItem.name}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>

                      {/* Show More Button - only visible on mobile if there are more skills to show */}
                      {allSkills.length > 6 && (
                        <div className="md:hidden flex justify-center mt-8">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setShowAllSkills(!showAllSkills)}
                            className="group"
                          >
                            {showAllSkills ? "Show Less" : "Show All Skills"}
                            <ChevronDown className={cn(
                              "ml-2 h-4 w-4 transition-transform",
                              showAllSkills && "rotate-180"
                            )} />
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })()}

              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
