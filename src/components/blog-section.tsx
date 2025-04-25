
import { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Newspaper } from "lucide-react";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl?: string;
  category: string;
  readTime: string;
};

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
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

  const blogPosts: BlogPost[] = [
    {
      title: "The Future of Web Development: Trends to Watch",
      excerpt: "Explore the emerging technologies and methodologies that are reshaping how we build for the web.",
      date: "April 15, 2025",
      author: "John Doe",
      category: "Technology",
      readTime: "5 min read"
    },
    {
      title: "Designing for Accessibility: A Comprehensive Guide",
      excerpt: "Learn how to create websites that are accessible to everyone, regardless of ability or disability.",
      date: "March 28, 2025",
      author: "Jane Smith",
      category: "Design",
      readTime: "8 min read"
    },
    {
      title: "Optimizing Website Performance: Best Practices",
      excerpt: "Discover techniques to improve loading times and create faster, more responsive websites.",
      date: "February 10, 2025",
      author: "Mark Johnson",
      category: "Performance",
      readTime: "6 min read"
    }
  ];

  return (
    <section id="blog" ref={sectionRef} className="section-padding reveal-container">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal-content">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative">
              <span className="relative z-10">Latest Articles</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10"></span>
            </h2>
          </div>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, insights, and expertise on web development and design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-content" style={{transitionDelay: "0.2s"}}>
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="card-hover border-border overflow-hidden h-full flex flex-col bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="relative p-0">
                {post.imageUrl ? (
                  <div className="aspect-[16/9]">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                    <Newspaper size={48} className="text-muted-foreground/30" />
                  </div>
                )}
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {post.category}
                </span>
              </CardHeader>
              
              <CardContent className="flex-grow pt-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 font-serif">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              
              <CardFooter className="pt-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  <Button variant="ghost" size="sm" className="p-0 hover-link">
                    Read More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center reveal-content" style={{transitionDelay: "0.4s"}}>
          <Button variant="outline" className="group">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
