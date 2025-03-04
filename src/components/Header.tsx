
import { useState, useEffect } from 'react';
import { scrollToSection } from '@/utils/animations';
import Button from './common/Button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: 'Home', section: 'hero' },
    { label: 'Projects', section: 'projects' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' }
  ];

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="z-10">
          <a href="#" onClick={() => handleNavClick('hero')} className="text-xl font-medium tracking-tight interactive">Portfolio</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.section}
              href={`#${item.section}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.section);
              }}
              className="text-foreground/80 hover:text-foreground text-sm uppercase tracking-wider interactive"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button 
            onClick={() => handleNavClick('contact')} 
            variant="primary" 
            size="sm" 
            withArrow
          >
            Get in Touch
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-10 interactive"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-background flex flex-col items-center justify-center transition-all duration-500 ease-in-expo ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <a
                key={item.section}
                href={`#${item.section}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.section);
                }}
                className="text-xl font-medium interactive"
              >
                {item.label}
              </a>
            ))}
            <Button 
              onClick={() => handleNavClick('contact')} 
              variant="primary" 
              withArrow
              className="mt-4"
            >
              Get in Touch
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
