import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/utils/animations";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Add line animation variants
const lineVariants = {
  open: {
    rotate: 45,
    y: 0,
    width: "24px",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  closed: {
    rotate: 0,
    y: -4,
    width: "24px",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariants2 = {
  open: {
    rotate: -45,
    y: 0,
    width: "24px",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  closed: {
    rotate: 0,
    y: 4,
    width: "24px",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// Add navigation items
const navItems = [
  { label: "Home", path: "/", section: "hero" },
  { label: "Projects", path: "/projects", section: "projects" },
  { label: "About", path: "/", section: "about" },
  { label: "Contact", path: "/", section: "contact" },
];

// // Add close button variants
// const closeButtonVariants = {
//   initial: { scale: 0.8, opacity: 0 },
//   animate: { scale: 1, opacity: 1 },
//   exit: { scale: 0.8, opacity: 0 },
//   hover: { scale: 1.1 },
// };

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && event.target instanceof Element) {
        const navElement = document.querySelector(".fixed.inset-0");
        const menuButton = document.querySelector("button[aria-label]");

        if (
          navElement &&
          !navElement.contains(event.target) &&
          menuButton &&
          !menuButton.contains(event.target)
        ) {
          setIsOpen(false);
        }
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);
  const handleNavClick = (path: string, sectionId: string) => {
    setIsOpen(false);

    if (window.location.pathname === path) {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="fixed top-0 right-0 z-[60] p-4">
      <motion.button
        className="flex flex-col items-center justify-center w-12 h-12 relative interactive group"
        onClick={() => setIsOpen(!isOpen)}
        animate={isOpen ? "open" : "closed"}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="w-12 h-12 flex items-center justify-center relative">
          <motion.div
            className="absolute h-[2.5px] w-6 bg-current"
            style={{
              top: "calc(50% - 1.25px)",
              left: "50%",
              transform: "translateX(-50%)",
              transformOrigin: "center",
            }}
            variants={lineVariants}
          />
          <motion.div
            className="absolute h-[2.5px] w-6 bg-current"
            style={{
              top: "calc(50% - 1.25px)",
              left: "50%",
              transform: "translateX(-50%)",
              transformOrigin: "center",
            }}
            variants={lineVariants2}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto h-full flex items-center justify-center relative z-50">
              <ul className="space-y-8 text-center">
                {navItems.map((item) => (
                  <motion.li
                    key={item.label}
                    className="interactive cursor-none" // Added cursor-none
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to={item.path}
                      className="text-2xl md:text-3xl font-medium inline-flex items-center group cursor-none" // Added cursor-none
                      onClick={() => handleNavClick(item.path, item.section)}
                      data-cursor="pointer" // Added data attribute for custom cursor
                    >
                      <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                        {item.label}
                      </span>
                      <ArrowUpRight className="ml-1 w-4 h-4 transform transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuButton;
