
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsGrid from '@/components/ProjectsGrid';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Loading from '@/components/Loading';
import { useScrollRestoration } from '@/utils/animations';

const Index = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(true);
  
  // Use the scroll restoration hook to handle hash navigation
  useScrollRestoration();

  useEffect(() => {
    // Optimize loading screen timing
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      
      // Add smooth scrolling to all elements
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Add scroll snap for section navigation
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.add('scroll-mt-20');
      });
      
      // Handle page transition
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 200);
    }, 2500); // Reduced timing for faster initial interaction

    return () => {
      clearTimeout(timer);
      // Remove smooth scrolling on unmount
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Monitor link clicks for page transitions
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const isLink = target.tagName === 'A' || target.closest('a');
      
      if (isLink && (target as HTMLAnchorElement).hostname === window.location.hostname) {
        const href = (target as HTMLAnchorElement).href || (target.closest('a') as HTMLAnchorElement).href;
        
        // Don't transition for hash links (same-page navigation)
        if (href.includes('#') && !href.includes('//')) return;
        
        // Don't prevent default for normal navigation, we'll handle transitions via Loading component
        // which is rendered on each page
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <div className="relative">
      {/* Loading screen */}
      <Loading />
      
      {/* Page transition overlay */}
      <div 
        className={`fixed inset-0 bg-background z-50 pointer-events-none transition-opacity duration-1000 ${
          isPageTransitioning ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      
      {/* Custom cursor */}
      <Cursor />
      
      {/* Navigation */}
      <Header />
      
      {/* Main content with optimized scroll sections */}
      <main>
        <Hero />
        <ProjectsGrid />
        <About />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
