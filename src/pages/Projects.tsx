
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Loading from '@/components/Loading';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { pageTransition, useAnimationOnView } from '@/utils/animations';

// Expanded project data for the projects page
const allProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack Development',
    image: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2023'
  },
  {
    id: 2,
    title: 'Banking Dashboard',
    category: 'Frontend Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2023'
  },
  {
    id: 3,
    title: 'Mobile Payment App',
    category: 'React Native',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2022'
  },
  {
    id: 4,
    title: 'AI Content Generator',
    category: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2022'
  },
  {
    id: 5,
    title: 'Healthcare Management System',
    category: 'Full Stack Development',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2021'
  },
  {
    id: 6,
    title: 'Real Estate Platform',
    category: 'Frontend Development',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2021'
  },
  {
    id: 7,
    title: 'Social Media Analytics',
    category: 'Data Visualization',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2020'
  },
  {
    id: 8,
    title: 'Fitness Tracking App',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '#',
    year: '2020'
  },
];

const Projects = () => {
  const { ref, isVisible } = useAnimationOnView(0.05);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get unique years for filtering
  const years = [...new Set(allProjects.map(project => project.year))];
  
  // Filter projects based on selected year
  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.year === filter);

  useEffect(() => {
    // Simulate page transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Add smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="relative">
      {/* Loading screen with Japanese text */}
      <Loading />
      
      {/* Page transition overlay */}
      <div 
        className={`fixed inset-0 bg-background z-50 pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`} 
      />
      
      {/* Custom cursor */}
      <Cursor />
      
      {/* Header */}
      <Header />
      
      <main>
        {/* Page header */}
        <section 
          className={`py-20 md:py-32 px-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">Projects</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              A complete portfolio of my work, showcasing projects across various domains and technologies.
            </p>
          </div>
        </section>
        
        {/* Projects section */}
        <section 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`pb-24 md:pb-32 px-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-16">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                All Projects
              </button>
              {years.map(year => (
                <button 
                  key={year}
                  onClick={() => setFilter(year)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    filter === year 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            
            {/* Projects grid - Lusion.co style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`group relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-in-expo ${
                    isVisible ? 'opacity-100 translate-y-0' : ''
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden aspect-square mb-4">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-expo group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover overlay */}
                    <div 
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* View button on hover */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <Button 
                        variant="primary" 
                        size="sm"
                        withArrow
                        className="bg-white text-black hover:bg-white/90"
                      >
                        View Project
                      </Button>
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <div>
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-muted-foreground">{project.category}</p>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Projects;
