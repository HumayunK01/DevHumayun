
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-muted/30 dark:bg-muted/10 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold font-serif">Portfolio</h3>
            <p className="mt-2 text-muted-foreground">
              Creating digital experiences that matter.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-theme"
                aria-label={`Visit ${link.href}`}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
