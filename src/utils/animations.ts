import { useEffect, useState, useRef } from "react";

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
      { threshold, rootMargin: "20px" }
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
export const useStaggeredAnimation = (
  itemCount: number,
  staggerDelay = 0.1
) => {
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

      const deltaX = ((x - centerX) / (width / 2)) * 15;
      const deltaY = ((y - centerY) / (height / 2)) * 15;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
};

// Enhanced page transition animation
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

// Use this hook to handle page transitions
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    // Simulate entry transition
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    // Handle navigation events
    const handleBeforeUnload = () => {
      setIsTransitioning(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { isTransitioning, setIsTransitioning };
};

// Hover effect for project cards
export const projectHoverEffect = (setHovered: (value: boolean) => void) => {
  return {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
};

// Enhanced smooth scroll to section with improved physics
interface CustomElement extends Element {
  __locomotiveScroll?: LocomotiveScroll;
}

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  // Use native smooth scrolling
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });

  // Update URL hash without scrolling
  window.history.pushState(null, "", `#${sectionId}`);
};

// Remove or comment out the following functions as they're no longer needed:
// - useScrollRestoration
// - smoothScroll
// - useParallaxEffect (if you want to keep parallax, you can use locomotive-scroll's built-in parallax)
export const useParallaxEffect = (speed = 0.5) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use requestAnimationFrame for better performance
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;

        // Check if element is in viewport with expanded range
        if (
          scrollTop + windowHeight > elementTop - 100 &&
          scrollTop < elementTop + elementHeight + 100
        ) {
          const translateY = (scrollTop - elementTop) * speed;
          element.style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
};

// Enhanced scroll restoration on page load
export const useScrollRestoration = () => {
  useEffect(() => {
    // If URL has hash, scroll to the section after page loads
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(id);
      }, 200);
    }

    // Set smooth scroll behavior globally
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      // Reset scroll behavior on cleanup
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
};

// Text splitting animation for enhanced typography
export const useTextSplitting = (text: string, delay = 0.03) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !text) return;

    element.innerHTML = "";

    // Split text into individual spans for animation
    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.innerText = char === " " ? "\u00A0" : char; // Preserve spaces
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      span.style.display = "inline-block";
      span.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}s`;
      element.appendChild(span);

      // Trigger animation after a slight delay
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, 50);
    });
  }, [text, delay]);

  return ref;
};
