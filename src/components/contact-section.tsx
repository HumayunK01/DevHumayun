
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MessageSquare } from "lucide-react";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });
      setIsSubmitting(false);
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-muted/10 reveal-container">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-2/5 reveal-content" style={{transitionDelay: "0.1s"}}>
            <div className="sticky top-24">
              <div className="inline-block">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative mb-8">
                  <span className="relative z-10">Get In Touch</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10"></span>
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8">
                Have a project in mind or just want to say hello? Feel free to reach out. 
                I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/80 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email</h3>
                    <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-theme">
                      hello@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/80 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Social Media</h3>
                    <p className="text-muted-foreground">
                      Find me on Twitter, LinkedIn, or GitHub
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 reveal-content" style={{transitionDelay: "0.3s"}}>
            <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    required
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={6}
                    required
                    className="resize-none bg-background/50"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
