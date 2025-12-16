import { useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Social Links Data
const SOCIAL_LINKS = [
  {
    name: "Email",
    icon: <Mail className="w-5 h-5" />,
    url: "mailto:humayunk.pvt@gmail.com",
    label: "humayunk.pvt@gmail.com",
    bg: "hover:bg-red-500/10",
    text: "group-hover:text-red-500",
    border: "group-hover:border-red-500/50"
  },
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    url: "https://github.com/HumayunK01",
    label: "github.com/HumayunK01",
    bg: "hover:bg-zinc-500/10",
    text: "group-hover:text-white",
    border: "group-hover:border-zinc-500/50"
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    url: "https://www.linkedin.com/in/devhumayun/",
    label: "linkedin.com/in/devhumayun",
    bg: "hover:bg-blue-600/10",
    text: "group-hover:text-blue-500",
    border: "group-hover:border-blue-500/50"
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-5 h-5" />,
    url: "https://x.com/humayunkpvt",
    label: "@humayunkpvt",
    bg: "hover:bg-sky-500/10",
    text: "group-hover:text-sky-500",
    border: "group-hover:border-sky-500/50"
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
    url: "https://instagram.com/sleepyhumayun",
    label: "@sleepyhumayun",
    bg: "hover:bg-pink-600/10",
    text: "group-hover:text-pink-500",
    border: "group-hover:border-pink-500/50"
  }
];

function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/meoybrab", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setHasSubmitted(true);
        // Reset form
        (e.target as HTMLFormElement).reset();
        // Reset success message after 5 seconds
        setTimeout(() => setHasSubmitted(false), 5000);
      } else {
        console.error("Formspree submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-10 md:py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary cursor-default"
          >
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Let's Work <span className="text-primary">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left Column: Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Connect with me</h3>
              <p className="text-muted-foreground">
                I'm active on these platforms. Click to visit or copy the handle.
              </p>

              <div className="grid gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300",
                      "hover:bg-zinc-900/80 hover:scale-[1.02]",
                      link.bg,
                      link.border
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-3 rounded-lg bg-white/5 transition-colors duration-300",
                        link.text
                      )}>
                        {link.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground group-hover:text-white transition-colors">{link.name}</h4>
                        <p className="text-sm text-muted-foreground group-hover:text-white/60 transition-colors">{link.label}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-50 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Based in India</h3>
                  <p className="text-muted-foreground text-sm">Open for remote work worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-6 md:p-10 relative overflow-hidden"
          >
            {/* Form Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Send me a message</h3>
              <p className="text-muted-foreground">
                Got a question or proposal? Fill out the form and I'll get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-zinc-800/50 border-white/10 focus:border-primary/50 transition-all py-6 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-zinc-800/50 border-white/10 focus:border-primary/50 transition-all py-6 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  required
                  className="bg-zinc-800/50 border-white/10 focus:border-primary/50 transition-all py-6 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  className="bg-zinc-800/50 border-white/10 focus:border-primary/50 transition-all min-h-[150px] rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || hasSubmitted}
                className={cn(
                  "w-full rounded-xl py-6 text-base font-semibold transition-all duration-300",
                  hasSubmitted ? "bg-green-500 hover:bg-green-600 text-white" : "bg-primary hover:bg-primary/90"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : hasSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
