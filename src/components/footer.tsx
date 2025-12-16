import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Heart, ChevronRight } from "lucide-react";
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
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <footer className="relative bg-zinc-950 pt-10 md:pt-20 pb-8 md:pb-10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-30" />

      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  H
                </span>
                DevHumayun
              </h3>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Crafting digital experiences that merge clean code with stunning design.
                Let's build something extraordinary together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 border border-white/5 hover:border-primary/20 group"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={800}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group w-fit"
                  >
                    <ChevronRight className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors" />
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <a href="mailto:humayunk.pvt@gmail.com" className="hover:text-white transition-colors">
                  humayunk.pvt@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-muted-foreground text-center md:text-left"
          >
            © {currentYear} Khan Humayun. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> by Humayun Khan
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
