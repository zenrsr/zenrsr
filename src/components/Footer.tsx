import { useState } from "react";
import Button from "./common/Button";
import { useAnimationOnView } from "@/utils/animations";
import { Send, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import toast from "react-hot-toast";

const Footer = () => {
  const { ref, isVisible } = useAnimationOnView(0.1);
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  // Social links
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      url: "https://github.com/zenrsr",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/raga-sandeep-reddy-bobba",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      url: "mailto:zenrsrdev@gmail.com",
    },
  ];
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

    try {
      const message = `
          New Contact Form Submission
          ------------------------
          Name: ${nameValue}
          Email: ${emailValue}
          Message: ${messageValue}
          `;

      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Reset form
      setNameValue("");
      setEmailValue("");
      setMessageValue("");

      // Show success toast
      toast.success("Thanks for your message! I'll get back to you soon.");
    } catch (error) {
      // Show error toast
      toast.error("Sorry, something went wrong. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
              Full Stack Generalist specializing in Typescript and modern web
              technologies. Looking forward to discussing potential
              collaborations and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="flex items-center space-x-2 group interactive cursor-none"
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
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="w-full px-4 py-3 cursor-none bg-primary-foreground/10 border border-primary-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-primary-foreground placeholder:text-primary-foreground/50 transition-all duration-200"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
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
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full px-4 py-3 cursor-none bg-primary-foreground/10 border border-primary-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-primary-foreground placeholder:text-primary-foreground/50 transition-all duration-200"
                  placeholder="Your email"
                  required
                  disabled={isSubmitting}
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
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  className="w-full px-4 py-3 cursor-none bg-primary-foreground/10 border border-primary-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-primary-foreground placeholder:text-primary-foreground/50 transition-all duration-200 resize-none"
                  placeholder="Your message"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="mt-4 bg-white text-primary hover:bg-white/90 cursor-none"
                withArrow
                disabled={isSubmitting}
              >
                <p className="flex flex-row items-center justify-center">
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </p>
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-24 pt-12 border-t border-primary-foreground/20 text-center text-primary-foreground/70 text-sm transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <p>
            © {new Date().getFullYear()} B. Raga Sandeep Reddy. All rights
            reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
