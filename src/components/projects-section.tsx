import { useRef, useState, useEffect } from "react";
import { ExternalLink, Search, Filter, Stethoscope, Palette } from "lucide-react";
import { SiReact, SiTypescript, SiVite, SiTailwindcss, SiFramer, SiPostgresql, SiPrisma, SiSolidity, SiEthereum, SiOpenai, SiShadcnui, SiNextdotjs, SiFirebase, SiIpfs } from "react-icons/si";
import { FaHardHat } from "react-icons/fa";
import { FaRobot, FaDatabase, FaBolt } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

type ProjectCategory = "frontend" | "blockchain" | "fullstack" | "all";

type Project = {
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  imageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
};

const getTechIcon = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('react')) return <SiReact className="w-4 h-4 text-[#61DAFB]" />;
  if (t.includes('type')) return <SiTypescript className="w-4 h-4 text-[#3178C6]" />;
  if (t.includes('vite')) return <SiVite className="w-4 h-4 text-[#646CFF]" />;
  if (t.includes('tailwind')) return <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />;
  if (t.includes('framer')) return <SiFramer className="w-4 h-4 text-foreground" />;
  if (t.includes('postgres')) return <SiPostgresql className="w-4 h-4 text-[#4169E1]" />;
  if (t.includes('prisma')) return <SiPrisma className="w-4 h-4 text-foreground" />;
  if (t.includes('solidity')) return <SiSolidity className="w-4 h-4 text-foreground" />;
  if (t.includes('web3')) return <SiEthereum className="w-4 h-4 text-foreground" />;
  if (t.includes('hardhat')) return <FaHardHat className="w-4 h-4 text-[#FFF100]" />;
  if (t.includes('medical')) return <Stethoscope className="w-4 h-4 text-red-500" />;
  if (t.includes('brand')) return <Palette className="w-4 h-4 text-pink-500" />;
  if (t.includes('openrouter')) return <SiOpenai className="w-4 h-4 text-green-500" />; // Using OpenAI icon as proxy or generic robot
  if (t.includes('shadcn')) return <SiShadcnui className="w-4 h-4 text-foreground" />;
  if (t.includes('ai agent')) return <FaRobot className="w-4 h-4 text-orange-500" />;
  if (t.includes('neon')) return <FaBolt className="w-4 h-4 text-[#00E599]" />; // Neon DB neon green/bolt
  if (t.includes('next.js')) return <SiNextdotjs className="w-4 h-4 text-foreground" />;
  if (t.includes('firebase')) return <SiFirebase className="w-4 h-4 text-[#FFCA28]" />;
  if (t.includes('ipfs')) return <SiIpfs className="w-4 h-4 text-[#65C2CB]" />;
  return null;
};

function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 3 : 6);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects: Project[] = [
    {
      title: "PS Foundation",
      description: "A modern, responsive, and accessible web portal for the PS Foundation, a non-profit organization dedicated to building sustainable futures through education, healthcare, and community development across rural India.",
      tags: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Vite", "Context API"],
      category: "frontend",
      imageUrl: "/projects/psfoundation.png",
      githubUrl: "",
      liveUrl: "https://psfoundationforyou.vercel.app/",
      featured: true
    },
    {
      title: "ChatFlow",
      description: "A modern, feature-rich AI chat assistant powered by OpenRouter. Features multiple AI models, real-time streaming, chat history, and voice input.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "OpenRouter API", "shadcn/ui"],
      category: "fullstack",
      imageUrl: "/projects/chatflow.png",
      githubUrl: "https://github.com/HumayunK01/ChatFlow",
      liveUrl: "https://chatflowaibot.vercel.app/",
      featured: true
    },
    {
      title: "Asmeera Stays",
      description: "Luxury villa booking platform offering an exclusive collection of stays across Mumbai and Lonavala. Seamless booking experience with premium UI.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript", "AI Agent"],
      category: "frontend",
      imageUrl: "/projects/asmeera.webp",
      githubUrl: "",
      liveUrl: "https://asmeerastays.com/",
      featured: true
    },
    {
      title: "RailCon MHSSCE",
      description: "Full-stack railway concession portal. Handles student applications, document uploads, and tracking with a strictly typed backend system.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript", "Prisma ORM", "PostGreSQL", "Neon"],
      category: "fullstack",
      imageUrl: "/projects/railcon.png",
      githubUrl: "",
      liveUrl: "https://railcon.vercel.app/",
      featured: true
    },
    {
      title: "WEP Platform",
      description: "Health-tech platform for Medicare-covered testing. Features eligibility checking, appointment scheduling, and secure patient data handling.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript", "AI Agent"],
      category: "fullstack",
      imageUrl: "/projects/wep.webp",
      githubUrl: "",
      liveUrl: "https://www.wellnesseligibilityprogram.com/",
      featured: true
    },
    {
      title: "Shahi Durbar",
      description: "Premium brand website for a heritage dessert chain. Showcases products with high-end photography and smooth scroll animations.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript"],
      category: "frontend",
      imageUrl: "/projects/shahidurbar.png",
      githubUrl: "",
      liveUrl: "https://shahidurbar.vercel.app",
      featured: true
    },
    {
      title: "PawFund",
      description: "PawFund is a decentralized crowdfunding platform for animal rescue, connecting donors with urgent cases through blockchain technology.",
      tags: ["React", "Tailwind CSS", "Ethereum", "Hardhat", "IPFS"],
      category: "blockchain",
      imageUrl: "/projects/pawfund.webp",
      githubUrl: "https://github.com/HumayunK01/PawFund",
      liveUrl: "",
      featured: true
    },
    {
      title: "EtherEstate",
      description: "Decentralized real estate marketplace. Handles property listing, buying, and ownership transfer via Ethereum smart contracts.",
      tags: ["React", "Tailwind CSS", "Solidity", "Web3", "Hardhat"],
      category: "blockchain",
      imageUrl: "/projects/etherestate.webp",
      githubUrl: "https://github.com/HumayunK01/EtherEstate",
      liveUrl: "https://ethestate.vercel.app/",
      featured: true
    },
    {
      title: "Programmers' Club",
      description: "Programmers Club is a community-driven platform for coders to learn, collaborate, and grow. Share projects, explore coding resources, join events, and level up your skills with a supportive global network of tech enthusiasts.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      category: "fullstack",
      imageUrl: "/projects/programmersclub.webp",
      githubUrl: "",
      liveUrl: "https://programmersclub.vercel.app/",
      featured: true
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesSearch = searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Consistent Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary cursor-default">
            Feature Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Selected <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated collection of web, blockchain, and full-stack applications I've built.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {(["all", "frontend", "fullstack", "blockchain"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-background border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative group w-full md:w-auto">
            <div className="flex items-center border border-border/50 rounded-full bg-background/50 backdrop-blur-sm px-4 py-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full md:w-48 placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.slice(0, visibleCount).map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  key={project.title}
                >
                  <GlowCard
                    className="h-full flex flex-col !bg-zinc-950/50 hover:!bg-zinc-900/80 transition-colors duration-500 group overflow-hidden"
                    glowColor={project.category === 'blockchain' ? 'blue' : project.category === 'frontend' ? 'purple' : 'green'}
                    customSize={true}
                    disabled={isMobile}
                  >

                    {/* Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden w-full rounded-xl">
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />

                      {/* Category Badge - Minimal */}
                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] tracking-wider uppercase font-medium text-white/80">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow relative z-10">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-zinc-400 text-sm line-clamp-2 leading-relaxed h-[2.5rem]">
                          {project.description}
                        </p>
                      </div>

                      {/* Tags - Neutral & Minimal */}
                      {/* Tags - Stacked Icons */}
                      <div className="flex items-center -space-x-2 mt-auto pt-4 border-t border-white/5 pl-2">
                        {project.tags.map((tag, i) => {
                          const icon = getTechIcon(tag);
                          return (
                            <span
                              key={tag}
                              title={tag}
                              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-white/10 ring-2 ring-zinc-950 transition-transform hover:scale-110 hover:z-10 text-muted-foreground"
                              style={{ zIndex: 5 - i }}
                            >
                              {icon ? icon : <span className="text-[9px] font-bold">{tag.slice(0, 2).toUpperCase()}</span>}
                            </span>
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex w-full mt-6">
                        {project.liveUrl ? (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-full">
                            <Button variant="default" size="sm" className="w-full gap-2 text-xs font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl">
                              <ExternalLink className="h-3.5 w-3.5" /> Live Website
                            </Button>
                          </a>
                        ) : (
                          <Button variant="secondary" size="sm" disabled className="w-full gap-2 text-xs font-semibold opacity-50 rounded-xl">
                            <ExternalLink className="h-3.5 w-3.5" /> Live Website
                          </Button>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No projects found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
                <Button
                  variant="link"
                  onClick={() => { setFilter("all"); setSearchQuery(""); }}
                  className="mt-4 text-primary"
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Show More / Show Less Button */}
        {filteredProjects.length > (isMobile ? 3 : 6) && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => {
                const defaultCount = isMobile ? 3 : 6;
                setVisibleCount(visibleCount > defaultCount ? defaultCount : filteredProjects.length);
              }}
              className="rounded-full px-8 py-6 text-sm font-medium border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
            >
              {visibleCount > (isMobile ? 3 : 6) ? "Show Less" : "Show More Projects"}
            </Button>
          </div>
        )}

      </div>
    </section >
  );
}

export default ProjectsSection;
