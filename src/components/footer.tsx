
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Heart, ArrowUp } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/HumayunK01", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/devhumayun/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/humayunkpvt", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/sleepyhumayun", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <footer className="relative bg-background border-t border-border/30 pt-16 pb-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 mx-auto max-w-6xl">
          {/* Brand column */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">DevHumayun</h3>
            <p className="text-muted-foreground">
              Creating digital experiences that blend innovative code with stunning design aesthetics.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground justify-center md:justify-start">
              <Mail className="h-4 w-4" />
              <span>humayunk.pvt@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground justify-center md:justify-start">
              <MapPin className="h-4 w-4" />
              <span>Mumbra, India</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={800}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer flex items-center justify-center md:justify-start"
                  >
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto md:mx-0">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 justify-center md:justify-start"
                >
                  <link.icon size={16} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 pt-8 mt-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} DevHumayun. All rights reserved.
            </p>

            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground flex items-center">
                Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> using Next.js
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
