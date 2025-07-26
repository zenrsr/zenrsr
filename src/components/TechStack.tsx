import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useResponsive } from "../hooks/useResponsive";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Types for better type safety
interface TechItem {
  id: string;
  name: string;
  image: string;
  category: 'frontend' | 'backend' | 'cloud' | 'database' | 'tool';
  fallbackIcon?: string;
}

interface OrbitConfig {
  radius: number;
  speed: number; // rotation period in seconds
  direction: 1 | -1; // clockwise or counterclockwise
  items: number;
  offset: number; // starting angle offset
}

interface RippleEffect {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

// Enhanced tech items with categories and fallbacks
const TECH_ITEMS: TechItem[] = [
  { id: 'aws', name: 'AWS', image: '/aws.png', category: 'cloud', fallbackIcon: '☁️' },
  { id: 'docker', name: 'Docker', image: '/docker.png', category: 'tool', fallbackIcon: '🐳' },
  { id: 'git', name: 'Git', image: '/git.png', category: 'tool', fallbackIcon: '🔀' },
  { id: 'mongodb', name: 'MongoDB', image: '/mongodb.png', category: 'database', fallbackIcon: '🍃' },
  { id: 'nextjs', name: 'Next.js', image: '/next.png', category: 'frontend', fallbackIcon: '⚡' },
  { id: 'nodejs', name: 'Node.js', image: '/node.png', category: 'backend', fallbackIcon: '🟢' },
  { id: 'python', name: 'Python', image: '/python.png', category: 'backend', fallbackIcon: '🐍' },
  { id: 'postgresql', name: 'PostgreSQL', image: '/postgresql.png', category: 'database', fallbackIcon: '🐘' },
  { id: 'typescript', name: 'TypeScript', image: '/typescript.png', category: 'frontend', fallbackIcon: '📘' },
  { id: 'tailwind', name: 'Tailwind CSS', image: '/tailwind.png', category: 'frontend', fallbackIcon: '🎨' },
];

// Precise orbital configuration with mathematical ratios
const getOptimalOrbitConfig = (screenSize: 'mobile' | 'tablet' | 'desktop'): OrbitConfig[] => {
  const configs = {
    mobile: {
      baseRadius: 90,
      radiusMultiplier: 1.4,
      baseSpeed: 20,
      speedVariation: 0.8,
    },
    tablet: {
      baseRadius: 120,
      radiusMultiplier: 1.5,
      baseSpeed: 25,
      speedVariation: 0.75,
    },
    desktop: {
      baseRadius: 150,
      radiusMultiplier: 1.6,
      baseSpeed: 30,
      speedVariation: 0.7,
    },
  };

  const config = configs[screenSize];

  return [
    {
      radius: config.baseRadius,
      speed: config.baseSpeed,
      direction: 1,
      items: 3,
      offset: 0,
    },
    {
      radius: config.baseRadius * config.radiusMultiplier,
      speed: config.baseSpeed * config.speedVariation,
      direction: -1,
      items: 3,
      offset: 60,
    },
    {
      radius: config.baseRadius * Math.pow(config.radiusMultiplier, 2),
      speed: config.baseSpeed * Math.pow(config.speedVariation, 2),
      direction: 1,
      items: 2,
      offset: 30,
    },
    {
      radius: config.baseRadius * Math.pow(config.radiusMultiplier, 3),
      speed: config.baseSpeed * Math.pow(config.speedVariation, 3),
      direction: -1,
      items: 2,
      offset: 90,
    },
  ];
};

// Distribute items across orbits with better algorithm
const distributeItemsAcrossOrbits = (items: TechItem[], orbits: OrbitConfig[]) => {
  const totalItems = orbits.reduce((sum, orbit) => sum + orbit.items, 0);
  const itemsToShow = items.slice(0, totalItems);

  const distribution: TechItem[][] = [];
  let currentIndex = 0;

  orbits.forEach((orbit) => {
    distribution.push(itemsToShow.slice(currentIndex, currentIndex + orbit.items));
    currentIndex += orbit.items;
  });

  return distribution;
};

/**
 * TechStack Solar System Component
 * 
 * Conceptual Design:
 * - AI Whale (ai-1.png) = The "Sun" - Central intelligence hub
 * - Technology icons = "Planets" - Orbiting around the AI core
 * - Orbital rings = Different technological layers/categories
 * - Rotation directions alternate for visual interest and natural feel
 * 
 * This represents how AI serves as the central force that modern 
 * technologies revolve around, much like planets around the sun.
 */
const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerElementRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  // Custom hooks for better state management
  const { isIntersecting } = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const { screenSize } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  // Memoized orbital configuration
  const orbitConfig = useMemo(() => getOptimalOrbitConfig(screenSize), [screenSize]);
  const itemDistribution = useMemo(() =>
    distributeItemsAcrossOrbits(TECH_ITEMS, orbitConfig), [orbitConfig]
  );

  // Handle image load errors
  const handleImageError = useCallback((itemId: string) => {
    setImageLoadErrors(prev => new Set([...prev, itemId]));
  }, []);

  // Enhanced ripple effect with proper cleanup
  const createRipple = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!centerElementRef.current) return;

    const rect = centerElementRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple: RippleEffect = {
      id: `ripple-${Date.now()}-${Math.random()}`,
      x,
      y,
      timestamp: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  }, []);

  // Load animation with staggered timing
  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting]);

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  // CSS variables for dynamic orbit configuration
  const cssVariables = useMemo(() => {
    const variables: Record<string, string> = {};

    orbitConfig.forEach((orbit, index) => {
      variables[`--orbit-${index}-radius`] = `${orbit.radius}px`;
      variables[`--orbit-${index}-speed`] = `${orbit.speed}s`;
      variables[`--orbit-${index}-direction`] = orbit.direction === 1 ? 'normal' : 'reverse';
    });

    return variables;
  }, [orbitConfig]);

  return (
    <section
      id="tech"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden py-20 md:py-0"
      style={cssVariables as React.CSSProperties}
      aria-label="Technology Solar System - AI at the center with tech stacks orbiting around"
    >
      {/* Enhanced background text with better contrast */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none h-full px-4 md:px-0">
        <h1
          className="text-[15vw] sm:text-[17vw] md:text-[20vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-black/5 to-black/50 leading-none"
          aria-hidden="true"
        >
          Tech Stack
        </h1>
      </div>

      {/* Solar System Container - Unified coordinate system for perfect centering */}
      <div className="relative w-full h-full">
        {/* Planetary orbits - Technology stacks revolving around the AI hub */}
        {orbitConfig.map((orbit, orbitIndex) => (
          <div
            key={`orbit-${orbitIndex}`}
            className={`absolute inset-0 ${isLoaded && !prefersReducedMotion ? 'animate-spin' : ''}`}
            style={{
              animationDuration: `var(--orbit-${orbitIndex}-speed)`,
              animationDirection: `var(--orbit-${orbitIndex}-direction)`,
              animationTimingFunction: 'linear',
              animationPlayState: isIntersecting ? 'running' : 'paused',
            }}
            role="group"
            aria-label={`Technology orbit ${orbitIndex + 1} - Planetary ring around AI hub`}
          >
            {/* Orbit guide ring */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/10"
              style={{
                width: `calc(var(--orbit-${orbitIndex}-radius) * 2)`,
                height: `calc(var(--orbit-${orbitIndex}-radius) * 2)`,
              }}
              aria-hidden="true"
            />

            {/* Technology items with precise positioning */}
            {itemDistribution[orbitIndex]?.map((item, itemIndex) => {
              const angle = (360 / orbit.items) * itemIndex + orbit.offset;
              const hasError = imageLoadErrors.has(item.id);

              return (
                <div
                  key={item.id}
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(var(--orbit-${orbitIndex}-radius)) rotate(-${angle}deg)`,
                    transitionDelay: `${orbitIndex * 100 + itemIndex * 50}ms`,
                  }}
                >
                  <div
                    className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center
                      hover:scale-110 hover:shadow-xl focus:scale-110 focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-all duration-300 cursor-pointer group ${focusedItem === item.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${item.name} - ${item.category} technology`}
                    onFocus={() => setFocusedItem(item.id)}
                    onBlur={() => setFocusedItem(null)}
                    onKeyDown={(e) => handleKeyDown(e, () => {
                      // Handle item interaction
                      console.log(`Selected: ${item.name}`);
                    })}
                  >
                    {hasError ? (
                      <span
                        className="text-2xl md:text-3xl"
                        role="img"
                        aria-label={item.name}
                      >
                        {item.fallbackIcon}
                      </span>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                        onError={() => handleImageError(item.id)}
                        loading="lazy"
                      />
                    )}

                    {/* Enhanced tooltip with better accessibility */}
                    <div
                      className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100
                        transition-opacity duration-300 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10
                        pointer-events-none ${focusedItem === item.id ? 'opacity-100' : ''}`}
                      role="tooltip"
                      aria-hidden={focusedItem !== item.id && focusedItem !== null}
                    >
                      <div className="text-center">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-75 capitalize">{item.category}</div>
                      </div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-black" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* AI Central Hub - The "Sun" perfectly centered in the same coordinate system */}
      <div
        ref={centerElementRef}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 
          w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/90 shadow-2xl flex items-center justify-center overflow-hidden
          cursor-pointer transition-all duration-500 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50
          ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
        tabIndex={0}
        role="button"
        aria-label="AI Central Hub - The core intelligence around which all technologies orbit"
        onClick={createRipple}
        onKeyDown={(e) => handleKeyDown(e, () => createRipple(e as any))}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <img
          src="/ai-1.png"
          alt="AI Whale - The central intelligence hub"
          className="w-20 h-20 md:w-32 md:h-32 object-contain relative z-10"
          loading="eager"
          onError={(e) => {
            // Fallback to whale emoji if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('span');
            fallback.innerHTML = '🐋';
            fallback.className = 'text-6xl md:text-8xl';
            fallback.setAttribute('role', 'img');
            fallback.setAttribute('aria-label', 'AI Whale - Central Hub');
            target.parentNode?.appendChild(fallback);
          }}
        />

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
              animationDuration: '1s',
              animationFillMode: 'forwards',
            }}
          />
        ))}
      </div>

      {/* Animated background with better performance */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/30 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-100/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isLoaded && "Technology solar system loaded - AI whale at center with tech stacks orbiting"}
        {focusedItem && `Focused on ${TECH_ITEMS.find(item => item.id === focusedItem)?.name} - orbiting around the AI hub`}
      </div>
    </section>
  );
};

export default TechStack;
