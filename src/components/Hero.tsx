
import { useEffect, useRef, useState } from 'react';
import Button from './common/Button';
import { scrollToSection } from '@/utils/animations';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Animate elements after page load
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2800);

    return () => clearTimeout(timeout);
  }, []);

  // Text splitting animation for title
  useEffect(() => {
    if (!titleRef.current || !isLoaded) return;

    const title = titleRef.current;
    const text = title.innerText;
    title.innerHTML = '';

    // Split text into individual spans for animation
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s`;
      title.appendChild(span);

      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 100);
    });
  }, [isLoaded]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />

      {/* Circle decoration */}
      <div 
        className={`absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-primary/5 transition-all duration-2000 ease-in-expo ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ 
          top: '15%', 
          right: '10%',
          transformOrigin: 'center',
          transitionDelay: '0.5s'
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 
          ref={titleRef}
          className={`mb-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          Full Stack Engineer
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className={`mb-8 md:mb-10 text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          Crafting elegant, functional, and user-centered digital experiences with meticulous attention to detail
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <Button 
            onClick={() => scrollToSection('projects')} 
            size="lg"
            withArrow
          >
            View Projects
          </Button>
          <Button 
            onClick={() => scrollToSection('about')} 
            variant="secondary"
            size="lg"
          >
            About Me
          </Button>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ${
            isLoaded ? 'opacity-70' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1s' }}
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
