
import { useEffect, useState, useRef } from 'react';

// Animation states
export const useAnimationOnView = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Staggered animation for multiple items
export const useStaggeredAnimation = (itemCount: number, staggerDelay = 0.1) => {
  return Array.from({ length: itemCount }).map((_, index) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: index * staggerDelay,
    },
  }));
};

// Magnetic effect for buttons and interactive elements
export const useMagneticEffect = () => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const deltaX = (x - centerX) / (width / 2) * 15;
      const deltaY = (y - centerY) / (height / 2) * 15;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

// Hover effect for project cards
export const projectHoverEffect = (setHovered: (value: boolean) => void) => {
  return {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
};

// Smooth scroll to section with improved physics
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const offset = 80; // Account for fixed header
  const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset;
  
  // Enhanced smooth scrolling with cubic-bezier easing
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  // Update URL hash without scrolling
  window.history.pushState(null, '', `#${sectionId}`);
};

// Optimize parallax scrolling effect
export const useParallaxEffect = (speed = 0.5) => {
  const ref = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
        const translateY = (scrollTop - elementTop) * speed;
        element.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return ref;
};

// Handle scroll restoration on page load
export const useScrollRestoration = () => {
  useEffect(() => {
    // If URL has hash, scroll to the section after page loads
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, []);
};
