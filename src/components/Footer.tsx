import { useState } from "react";
import Button from "./common/Button";
import { useAnimationOnView } from "@/utils/animations";
import { Send, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Footer = () => {
  const { ref, isVisible } = useAnimationOnView(0.1);
  const [emailValue, setEmailValue] = useState("");
  
  // Add parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  // Social links
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GitHub", url: "https://github.com/zenrsr" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", url: "https://www.linkedin.com/in/raga-sandeep-reddy-bobba" },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      url: "mailto:zenrsrdev@gmail.com",
    },
  ];
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    alert(`Thanks for your message! I'll get back to you soon.`);
    setEmailValue("");
  };
  return (
    <motion.footer
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-6 bg-primary text-primary-foreground relative"
      style={{ y }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Rest of your footer content remains the same */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-8">
              Let's Work Together
            </h2>

            <p className="text-lg mb-12 text-primary-foreground/80 max-w-lg">
              Full Stack Generalist specializing in JavaScript and modern web technologies. 
              Looking forward to discussing potential collaborations and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="flex items-center space-x-2 group interactive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                  <span className="transition-all duration-300">
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-primary-foreground placeholder:text-primary-foreground/50 transition-all duration-200"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-primary-foreground placeholder:text-primary-foreground/50 transition-all duration-200"
                  placeholder="Your email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-primary-foreground placeholder:text-primary-foreground/50 transition-all duration-200 resize-none"
                  placeholder="Your message"
                  required
                />
              </div>

              <Button
                type="submit"
                className="mt-4 bg-white text-primary hover:bg-white/90"
                withArrow
              >
                <p className="flex flex-row items-center justify-center ">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </p>
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-24 pt-12 border-t border-primary-foreground/20 text-center text-primary-foreground/70 text-sm transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <p>© {new Date().getFullYear()} B. Raga Sandeep Reddy. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
