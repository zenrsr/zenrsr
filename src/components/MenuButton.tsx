
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '@/utils/animations';
import Button from './common/Button';
import { Link } from 'react-router-dom';

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { label: 'Home', path: '/', section: 'hero' },
    { label: 'Projects', path: '/projects', section: 'projects' },
    { label: 'About', path: '/', section: 'about' },
    { label: 'Contact', path: '/', section: 'contact' }
  ];

  // Handle navigation click for same page sections
  const handleNavClick = (path: string, sectionId: string) => {
    setIsOpen(false);
    
    if (window.location.pathname === path) {
      scrollToSection(sectionId);
    }
  };

  // Menu button variants for animation
  const buttonVariants = {
    closed: {
      rotate: 0
    },
    open: {
      rotate: 90
    }
  };

  // Line variants for animation
  const lineVariants = {
    closed: {
      rotate: 0
    },
    open: {
      rotate: 45
    }
  };

  const lineVariants2 = {
    closed: {
      rotate: 0
    },
    open: {
      rotate: -45
    }
  };

  // Menu variants for animation
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween", 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <>
      {/* Stylish menu button */}
      <div 
        className={`fixed top-0 right-0 z-50 px-6 py-6 transition-colors ${
          isScrolled || isOpen ? 'text-foreground' : 'text-foreground'
        }`}
      >
        <motion.button
          className="flex flex-col items-center justify-center w-12 h-12 relative interactive"
          onClick={() => setIsOpen(!isOpen)}
          animate={isOpen ? "open" : "closed"}
          variants={buttonVariants}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-12 h-12 flex items-center justify-center relative">
            <motion.div 
              className="absolute w-6 h-px bg-current"
              variants={lineVariants}
            />
            <motion.div 
              className="absolute w-6 h-px bg-current"
              variants={lineVariants2}
            />
          </div>
        </motion.button>
      </div>

      {/* Logo */}
      <div className={`fixed top-0 left-0 z-50 py-6 px-6 transition-colors ${
        isScrolled || isOpen ? 'text-foreground' : 'text-foreground'
      }`}>
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight interactive"
          onClick={() => {
            setIsOpen(false);
            if (window.location.pathname === '/') {
              scrollToSection('hero');
            }
          }}
        >
          Portfolio
        </Link>
      </div>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-lg flex items-center justify-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="w-full max-w-7xl mx-auto px-6">
              <div className="flex flex-col items-center justify-center h-full py-20">
                <nav className="flex flex-col items-center space-y-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.section}
                      to={item.path}
                      onClick={() => handleNavClick(item.path, item.section)}
                      className="text-4xl md:text-5xl font-medium tracking-tight hover:text-primary transition-colors duration-300 interactive"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-8">
                    <Button 
                      onClick={() => handleNavClick('/', 'contact')} 
                      variant="primary" 
                      size="lg"
                      withArrow
                    >
                      Get in Touch
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuButton;
