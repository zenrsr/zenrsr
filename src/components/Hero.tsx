
import { useEffect, useRef, useState } from 'react';
import Button from './common/Button';
import { scrollToSection, useParallaxEffect } from '@/utils/animations';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useParallaxEffect(0.2);
  const contentRef = useParallaxEffect(-0.1);

  useEffect(() => {
    // Animate elements after page load
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2400); // Reduced timing for faster initial render

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
      span.innerText = char === ' ' ? '\u00A0' : char; // Preserve spaces
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s`;
      title.appendChild(span);

      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 50); // Reduced timing for faster animation
    });
  }, [isLoaded]);

  // Handle scroll indicator interaction
  const handleScrollClick = () => {
    scrollToSection('projects');
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Enhanced parallax background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-secondary/10" />
      
      {/* Backdrop blur effect on scroll */}
      <div className="absolute inset-0 backdrop-blur-[1px] opacity-30" />

      {/* Floating circle decoration with parallax effect */}
      <div 
        ref={circleRef as React.RefObject<HTMLDivElement>}
        className={`absolute w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-full bg-primary/5 transition-all duration-2000 ease-in-expo ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ 
          top: '10%', 
          right: '5%',
          transformOrigin: 'center',
          transitionDelay: '0.3s',
          filter: 'blur(40px)'
        }}
      />
      
      {/* Secondary decorative element */}
      <div 
        className={`absolute w-40 h-40 md:w-64 md:h-64 rounded-full bg-secondary/10 transition-all duration-2000 ease-in-expo ${
          isLoaded ? 'opacity-70 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ 
          bottom: '15%', 
          left: '10%',
          transformOrigin: 'center',
          transitionDelay: '0.6s',
          filter: 'blur(30px)'
        }}
      />

      {/* Content container with subtle parallax effect */}
      <div 
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Main heading with enhanced animation */}
        <h1 
          ref={titleRef}
          className={`mb-6 text-5xl md:text-7xl transition-all duration-1000 font-bold tracking-tight ${
            isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          Full Stack Engineer
        </h1>

        {/* Subtitle with staggered animation */}
        <p 
          ref={subtitleRef}
          className={`mb-8 md:mb-10 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          Crafting elegant, functional, and user-centered digital experiences with meticulous attention to detail
        </p>

        {/* CTA Buttons with enhanced hover feedback */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <Button 
            onClick={() => scrollToSection('projects')} 
            size="lg"
            withArrow
            className="min-w-[160px]"
          >
            View Projects
          </Button>
          <Button 
            onClick={() => scrollToSection('about')} 
            variant="secondary"
            size="lg"
            className="min-w-[160px]"
          >
            About Me
          </Button>
        </div>

        {/* Enhanced scroll indicator with clear interaction cues */}
        <button 
          onClick={handleScrollClick}
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 cursor-none group ${
            isLoaded ? 'opacity-70' : 'opacity-0'
          }`}
          style={{ transitionDelay: '0.8s' }}
          aria-label="Scroll to projects"
        >
          <span className="text-xs uppercase tracking-widest mb-2 group-hover:text-primary transition-colors">Scroll</span>
          <div className="w-8 h-12 border-2 border-foreground/30 rounded-full flex items-start justify-center p-1 overflow-hidden group-hover:border-primary/50 transition-colors">
            <div className="w-1 h-2 bg-foreground/50 rounded-full animate-[bounce_1.5s_infinite] group-hover:bg-primary transition-colors" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
