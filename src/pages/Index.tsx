
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsGrid from '@/components/ProjectsGrid';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Loading from '@/components/Loading';

const Index = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after animations complete
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Loading screen */}
      <Loading />
      
      {/* Custom cursor */}
      <Cursor />
      
      {/* Navigation */}
      <Header />
      
      {/* Main content */}
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
