
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
  const [isPageTransitioning, setIsPageTransitioning] = useState(true);
  
  // Use the scroll restoration hook to handle hash navigation
  useScrollRestoration();
  return (
    <>
      <Header />
      <Hero />
      <TechStack /> {/* Add this line */}
      <ProjectsGrid />
      <About />
      <Footer />
      <Cursor />
    </>
  );
};

export default Index;
