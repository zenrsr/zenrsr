
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
    }, 2500); // Reduced timing for faster initial interaction

    return () => {
      clearTimeout(timer);
      // Remove smooth scrolling on unmount
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="relative">
      {/* Loading screen */}
      <Loading />
      
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
