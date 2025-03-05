
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsGrid from '@/components/ProjectsGrid';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Loading from '@/components/Loading';
import { useScrollRestoration } from '@/utils/animations';
import TechStack from '@/components/TechStack';

const Index = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useScrollRestoration();
  
  useEffect(() => {
    // Simulate page transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Add smooth scrolling
      document.documentElement.style.scrollBehavior = "smooth";
    }, 100);
  }, []);
  return (
    <>
      {/* Loading screen */}
      <Loading />
      {/* Page transition overlay */}
      <div
        className={`fixed inset-0 bg-background z-50 pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <Header />
      <Hero />
      <TechStack />
      <ProjectsGrid />
      <About />
      <Footer />
      <Cursor />
    </>
  );
};

export default Index;
