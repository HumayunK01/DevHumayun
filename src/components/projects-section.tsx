import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Folder, Filter, Code, Layout, Server, Search, GitBranch } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectCategory = "frontend" | "blockchain" | "fullstack" | "design" | "all";

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

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Category icons are used directly in the buttons

  const projects: Project[] = [
    {
      title: "ChatFlow",
      description: "A modern, feature-rich AI chat assistant powered by OpenRouter. Features multiple AI models, real-time streaming, code highlighting, chat history, voice input, image support, and export capabilities. Built as a ChatGPT alternative with a beautiful, responsive interface.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "OpenRouter API", "shadcn/ui"],
      category: "fullstack",
      imageUrl: "/projects/chatflow.png",
      githubUrl: "https://github.com/HumayunK01/ChatFlow",
      liveUrl: "https://chatflowaibot.vercel.app/",
      featured: true
    },
    {
      title: "Asmeera Stays",
      description: "Asmeera Stays offers an exclusive collection of luxury villas across Mumbai, Lonavala, Karjat, Igatpuri, and Mahabaleshwar. Our platform provides a seamless booking experience for discerning travelers seeking premium accommodations with unparalleled service.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript"],
      category: "frontend",
      imageUrl: "/projects/asmeera.webp",
      githubUrl: "",
      liveUrl: "https://asmeerastays.com/",
      featured: true
    },
    {
      title: "RailCon MHSSCE",
      description: "Railway Concession Form is a full-stack web app to apply for and track railway concession passes. Frontend offers a guided, responsive form with document upload, success flow, and a tracker. Backend stores submissions, handles uploads, and exposes REST APIs.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript", "Prisma ORM", "PostGreSQL", "Neon"],
      category: "fullstack",
      imageUrl: "/projects/railcon.png",
      githubUrl: "",
      liveUrl: "https://railcon.vercel.app/",
      featured: true
    },
    {
      title: "WEP | Wellness Eligibility Program",
      description: "Modern web platform offering Medicare-covered genetic testing for eligible beneficiaries. Features at-home cheek swab collection, comprehensive health screening programs, and physician-reviewed results with no upfront cost for qualified individuals.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript", "AI Agent"],
      category: "fullstack",
      imageUrl: "/projects/wep.webp",
      githubUrl: "",
      liveUrl: "https://www.wellnesseligibilityprogram.com/",
      featured: true
    },
    // {
    //   title: "PS Foundation",
    //   description: "A modern React website for a non-profit organization showcasing sustainable development projects, mission, and impact. Features interactive components, responsive design, and donation/volunteering opportunities.",
    //   tags: ["React", "Tailwind CSS", "Vite", "TypeScript"],
    //   category: "frontend",
    //   imageUrl: "/projects/psfoundation.webp",
    //   githubUrl: "",
    //   liveUrl: "https://psfoundationforyou.vercel.app/",
    //   featured: true
    // },
    {
      title: "Shahi Durbar",
      description: "Shahi Durbar - A modern web application showcasing premium Indian desserts and ice creams. Built with React, TypeScript, and Tailwind CSS, featuring responsive design, smooth animations, and an elegant UI that highlights the brand's royal heritage since 2011.",
      tags: ["React", "Tailwind CSS", "Vite", "TypeScript"],
      category: "frontend",
      imageUrl: "/projects/shahidurbar.png",
      githubUrl: "",
      liveUrl: "https://shahidurbar.vercel.app",
      featured: true
    },
    {
      title: "EtherEstate",
      description: "A blockchain-based DApp to simplify real estate transactions using Ethereum smart contracts. Built with React, Solidity, Hardhat & Ethers.js, it enables wallet-based property listing, purchase, and secure on-chain ownership transfer.",
      tags: ["React", "Tailwind CSS", "Solidity", "Web3"],
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
      githubUrl: "https://github.com/HumayunK01/programmersclub",
      liveUrl: "https://programmersclub.vercel.app/"
    },
  ];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesSearch = searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" ref={sectionRef} className="relative py-10 md:py-22 md:px-12 lg:px-24 overflow-hidden reveal-container">
      {/* Local decorative elements - reduced for better performance */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 reveal-content">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm text-sm font-medium">
            <span className="text-primary mr-2">✦</span>
            My Work
            <span className="text-primary ml-2">✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover my portfolio of web, blockchain, and full-stack development projects.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal-content" style={{ transitionDelay: "0.1s" }}>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            All Projects
          </Button>
          <Button
            variant={filter === "frontend" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("frontend")}
            className="rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <Layout className="h-4 w-4" />
            Frontend
          </Button>
          <Button
            variant={filter === "blockchain" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("blockchain")}
            className="rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <Server className="h-4 w-4" />
            Blockchain
          </Button>
          <Button
            variant={filter === "fullstack" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("fullstack")}
            className="rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <Code className="h-4 w-4" />
            Full Stack
          </Button>

          {/* Search Input */}
          <div className="relative ml-2">
            <div className="flex items-center border border-primary/20 rounded-full bg-background/50 backdrop-blur-sm overflow-hidden">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 px-4 bg-transparent outline-none text-sm w-full max-w-[150px] md:max-w-[200px]"
              />
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project Count */}
        <div className="text-center mb-8 text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 reveal-content" style={{ transitionDelay: "0.2s" }}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="card-hover border-border overflow-hidden bg-background/30 backdrop-blur-md hover:bg-background/40 transition-all duration-300 flex flex-col h-full"
              >
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                <CardHeader className="relative p-0">
                  {project.imageUrl ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-secondary/30 backdrop-blur-sm flex items-center justify-center">
                      <Folder size={64} className="text-muted-foreground/50" />
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex-grow p-6">
                  <div className="mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${project.category === 'frontend' ? 'bg-blue-500/10 text-blue-500' :
                      project.category === 'blockchain' ? 'bg-green-500/10 text-green-500' :
                        'bg-purple-500/10 text-purple-500'
                      }`}>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-serif">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/50 backdrop-blur-sm text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between p-6 pt-0 mt-auto">
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-theme"
                    >
                      <GitBranch size={20} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-theme"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* <div className="mt-12 text-center reveal-content" style={{transitionDelay: "0.4s"}}>
          <Button variant="outline" className="group btn-glow pulse-glow">
            <span className="flex items-center text-white">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div> */}
      </div>
    </section>
  );
}

export default ProjectsSection;
