import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useResponsive } from "@/hooks/useResponsive";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Refined types for professional implementation
interface TechItem {
  id: string;
  name: string;
  image: string;
  category: 'frontend' | 'backend' | 'cloud' | 'database' | 'tool';
  fallbackIcon: string;
  skillLevel: 1 | 2 | 3 | 4 | 5;
  yearsExperience: number;
  projectCount: number;
  description: string;
  mass: number; // For orbital physics calculations
}

interface OrbitConfig {
  radius: number;
  period: number; // Orbital period in seconds (based on physics)
  eccentricity: number; // Orbital ellipse parameter
  direction: 1 | -1;
  items: TechItem[];
}

interface RippleEffect {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

// Professional tech data with physics properties
const TECH_ITEMS: TechItem[] = [
  {
    id: 'aws', name: 'AWS', image: '/aws.png', category: 'cloud', fallbackIcon: '☁️',
    skillLevel: 4, yearsExperience: 2, projectCount: 3, mass: 0.8,
    description: 'Cloud computing platform for scalable applications'
  },
  {
    id: 'docker', name: 'Docker', image: '/docker.png', category: 'tool', fallbackIcon: '🐳',
    skillLevel: 4, yearsExperience: 3, projectCount: 4, mass: 0.7,
    description: 'Containerization platform for consistent deployments'
  },
  {
    id: 'git', name: 'Git', image: '/git.png', category: 'tool', fallbackIcon: '🔀',
    skillLevel: 5, yearsExperience: 4, projectCount: 6, mass: 1.0,
    description: 'Distributed version control system'
  },
  {
    id: 'mongodb', name: 'MongoDB', image: '/mongodb.png', category: 'database', fallbackIcon: '🍃',
    skillLevel: 4, yearsExperience: 2, projectCount: 2, mass: 0.6,
    description: 'NoSQL document database for modern applications'
  },
  {
    id: 'nextjs', name: 'Next.js', image: '/next.png', category: 'frontend', fallbackIcon: '⚡',
    skillLevel: 5, yearsExperience: 3, projectCount: 4, mass: 0.9,
    description: 'React framework for production-grade applications'
  },
  {
    id: 'nodejs', name: 'Node.js', image: '/node.png', category: 'backend', fallbackIcon: '🟢',
    skillLevel: 5, yearsExperience: 4, projectCount: 5, mass: 1.0,
    description: 'JavaScript runtime for server-side development'
  },
  {
    id: 'python', name: 'Python', image: '/python.png', category: 'backend', fallbackIcon: '🐍',
    skillLevel: 4, yearsExperience: 3, projectCount: 3, mass: 0.8,
    description: 'Versatile programming language for AI and web development'
  },
  {
    id: 'postgresql', name: 'PostgreSQL', image: '/postgresql.png', category: 'database', fallbackIcon: '🐘',
    skillLevel: 4, yearsExperience: 2, projectCount: 2, mass: 0.7,
    description: 'Advanced open-source relational database'
  },
  {
    id: 'typescript', name: 'TypeScript', image: '/typescript.png', category: 'frontend', fallbackIcon: '📘',
    skillLevel: 5, yearsExperience: 3, projectCount: 5, mass: 0.9,
    description: 'Typed superset of JavaScript for better development'
  },
  {
    id: 'tailwind', name: 'Tailwind CSS', image: '/tailwind.png', category: 'frontend', fallbackIcon: '🎨',
    skillLevel: 5, yearsExperience: 2, projectCount: 6, mass: 0.8,
    description: 'Utility-first CSS framework for rapid UI development'
  },
];

// Physics-based orbital calculations using Kepler's laws
const calculateOrbitalPhysics = (screenSize: 'mobile' | 'tablet' | 'desktop', items: TechItem[]) => {
  const configs = {
    mobile: { baseRadius: 80, gravitationalConstant: 50, centralMass: 2.0 },
    tablet: { baseRadius: 110, gravitationalConstant: 65, centralMass: 2.5 },
    desktop: { baseRadius: 140, gravitationalConstant: 80, centralMass: 3.0 },
  };

  const { baseRadius, gravitationalConstant, centralMass } = configs[screenSize];

  // Sort by mass (heavier items orbit closer - like real planets)
  const sortedItems = [...items].sort((a, b) => b.mass - a.mass);

  // Group into orbital shells with natural distribution
  const orbits: OrbitConfig[] = [];
  const maxOrbits = 4;

  // Shuffle items slightly within mass groups for more natural distribution
  const naturallyDistributedItems = [...sortedItems];
  for (let i = naturallyDistributedItems.length - 1; i > 0; i--) {
    // Only shuffle within similar mass ranges to maintain physics accuracy
    const currentMass = naturallyDistributedItems[i].mass;
    const similarMassIndex = naturallyDistributedItems.findIndex((item, idx) =>
      idx < i && Math.abs(item.mass - currentMass) < 0.2
    );

    if (similarMassIndex !== -1 && Math.random() > 0.7) {
      [naturallyDistributedItems[i], naturallyDistributedItems[similarMassIndex]] =
        [naturallyDistributedItems[similarMassIndex], naturallyDistributedItems[i]];
    }
  }

  const itemsPerOrbit = Math.ceil(naturallyDistributedItems.length / maxOrbits);

  for (let i = 0; i < maxOrbits && i * itemsPerOrbit < naturallyDistributedItems.length; i++) {
    const orbitItems = naturallyDistributedItems.slice(i * itemsPerOrbit, (i + 1) * itemsPerOrbit);
    if (orbitItems.length === 0) break;

    const radius = baseRadius + (i * baseRadius * 0.7); // Golden ratio spacing
    const avgMass = orbitItems.reduce((sum, item) => sum + item.mass, 0) / orbitItems.length;

    // Kepler's Third Law: T² ∝ r³ (simplified for UI with faster speeds)
    const period = Math.sqrt(Math.pow(radius, 3) / (gravitationalConstant * (centralMass + avgMass))) * 1.2;

    // Add slight eccentricity for natural movement
    const eccentricity = 0.05 + (Math.random() * 0.1);

    // Random phase offset for each orbit to prevent synchronization
    const phaseOffset = Math.random() * 360;

    orbits.push({
      radius,
      period: Math.max(8, Math.min(35, period)), // Faster orbital speeds
      eccentricity,
      direction: i % 2 === 0 ? 1 : -1, // Alternating directions
      items: orbitItems,
    });
  }

  return orbits;
};

// Performance optimized component with subtle interactions
const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerElementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  // Minimal state for maximum performance
  const [isLoaded, setIsLoaded] = useState(false);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Performance hooks
  const { isIntersecting } = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const { screenSize } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  // Physics-based orbital configuration
  const orbitConfig = useMemo(() =>
    calculateOrbitalPhysics(screenSize, TECH_ITEMS),
    [screenSize]
  );

  // Optimized event handlers
  const handleImageError = useCallback((itemId: string) => {
    setImageLoadErrors(prev => new Set([...prev, itemId]));
  }, []);

  const createRipple = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!centerElementRef.current) return;

    const rect = centerElementRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple: RippleEffect = {
      id: `ripple-${Date.now()}`,
      x, y, timestamp: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  // Subtle interaction handlers
  const handleItemHover = useCallback((itemId: string | null) => {
    setHoveredItem(itemId);
  }, []);

  const handleContainerInteraction = useCallback((isHovering: boolean) => {
    setIsPaused(!isHovering && !prefersReducedMotion);
  }, [prefersReducedMotion]);

  // Load animation
  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => setIsLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting]);

  // Performance-optimized CSS variables with randomized timing
  const cssVariables = useMemo(() => {
    const variables: Record<string, string> = {};

    orbitConfig.forEach((orbit, index) => {
      variables[`--orbit-${index}-radius`] = `${orbit.radius}px`;
      variables[`--orbit-${index}-period`] = `${orbit.period}s`;
      variables[`--orbit-${index}-direction`] = orbit.direction === 1 ? 'normal' : 'reverse';
      // Add random animation delay to prevent synchronized orbits
      variables[`--orbit-${index}-delay`] = `${-Math.random() * orbit.period}s`;
    });

    return variables;
  }, [orbitConfig]);

  // Subtle category styling
  const getCategoryOpacity = useCallback((category: string) => {
    if (!hoveredItem) return 1;
    const hoveredCategory = TECH_ITEMS.find(item => item.id === hoveredItem)?.category;
    return hoveredCategory === category ? 1 : 0.4;
  }, [hoveredItem]);

  return (
    <section
      id="tech"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden py-20 md:py-0"
      style={cssVariables as React.CSSProperties}
      aria-label="Technology Expertise Solar System"
      onMouseEnter={() => handleContainerInteraction(true)}
      onMouseLeave={() => handleContainerInteraction(false)}
    >
      {/* Imposing background text with strong gradient effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none h-full px-4 md:px-0">
        <h1
          className="text-[15vw] sm:text-[17vw] md:text-[25vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-black/10 via-black/30 to-black/80 leading-none tracking-tighter transform"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            textShadow: "0 0 40px rgba(0,0,0,0.1)",
            WebkitTextStroke: "1px rgba(0,0,0,0.05)",
          }}
          aria-hidden="true"
        >
          Tech Stack
        </h1>
      </div>

      {/* Physics-based orbital system */}
      <div className="relative w-full h-full">
        {orbitConfig.map((orbit, orbitIndex) => (
          <div
            key={`orbit-${orbitIndex}`}
            className={`absolute inset-0 ${isLoaded && !prefersReducedMotion && !isPaused ? 'animate-spin' : ''
              }`}
            style={{
              animationDuration: `var(--orbit-${orbitIndex}-period)`,
              animationDirection: `var(--orbit-${orbitIndex}-direction)`,
              animationDelay: `var(--orbit-${orbitIndex}-delay)`,
              animationTimingFunction: 'linear',
              animationPlayState: isIntersecting && !isPaused ? 'running' : 'paused',
              opacity: getCategoryOpacity(orbit.items[0]?.category || ''),
              transition: 'opacity 0.3s ease',
            }}
            role="group"
            aria-label={`Technology orbit ${orbitIndex + 1}`}
          >
            {/* Enhanced orbit guide with increased boldness */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/8"
              style={{
                width: `calc(var(--orbit-${orbitIndex}-radius) * 2)`,
                height: `calc(var(--orbit-${orbitIndex}-radius) * 2)`,
                borderWidth: '1.25px', // 1.25x bolder than default 1px
              }}
              aria-hidden="true"
            />

            {/* Technology items with randomized initial positioning */}
            {orbit.items.map((item, itemIndex) => {
              // Calculate random starting position for natural distribution
              const baseAngle = (360 / orbit.items.length) * itemIndex;
              const randomOffset = (Math.random() - 0.5) * 120; // ±60 degree random spread
              const angle = baseAngle + randomOffset;

              const hasError = imageLoadErrors.has(item.id);
              const isHovered = hoveredItem === item.id;
              const skillOpacity = 0.3 + (item.skillLevel * 0.14); // Subtle skill indication

              return (
                <div
                  key={item.id}
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(var(--orbit-${orbitIndex}-radius)) rotate(-${angle}deg)`,
                    transitionDelay: `${orbitIndex * 150 + itemIndex * 100}ms`,
                  }}
                >
                  <div
                    className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-md flex items-center justify-center
                      hover:shadow-lg transition-all duration-300 cursor-pointer group ${isHovered ? 'scale-110 shadow-xl' : ''
                      }`}
                    style={{
                      opacity: skillOpacity,
                      backdropFilter: 'blur(8px)',
                      border: `2px solid rgba(59, 130, 246, ${isHovered ? 0.6 : 0.1})`,
                    }}
                    onMouseEnter={() => handleItemHover(item.id)}
                    onMouseLeave={() => handleItemHover(null)}
                    aria-label={`${item.name}: ${item.skillLevel}/5 expertise, ${item.yearsExperience} years experience`}
                  >
                    {/* Skill level subtle indicator */}
                    <div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"
                      style={{
                        opacity: item.skillLevel * 0.2,
                        transform: `scale(${0.6 + item.skillLevel * 0.08})`,
                      }}
                    />

                    {hasError ? (
                      <span
                        className="text-lg md:text-xl"
                        role="img"
                        aria-label={item.name}
                      >
                        {item.fallbackIcon}
                      </span>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-5 h-5 md:w-7 md:h-7 object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={() => handleImageError(item.id)}
                        loading="lazy"
                        style={{ filter: isHovered ? 'none' : 'grayscale(0.2)' }}
                      />
                    )}

                    {/* Refined tooltip */}
                    <div
                      className={`absolute -bottom-14 left-1/2 transform -translate-x-1/2 
                        transition-all duration-300 bg-black/90 text-white px-3 py-2 rounded-lg text-xs 
                        backdrop-blur-sm pointer-events-none z-10 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                      role="tooltip"
                    >
                      <div className="text-center whitespace-nowrap">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {item.yearsExperience}y • {item.projectCount} projects
                        </div>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full mx-0.5 ${i < item.skillLevel ? 'bg-yellow-400' : 'bg-gray-500'
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-2 border-b-black/90" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Central AI Hub - refined and professional */}
        <div
          ref={centerElementRef}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 
            w-24 h-24 md:w-36 md:h-36 rounded-full bg-white/95 shadow-xl flex items-center justify-center overflow-hidden
            cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl
            ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
          onClick={createRipple}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 100%)',
            backdropFilter: 'blur(12px)',
            border: '3px solid rgba(59, 130, 246, 0.1)',
          }}
          aria-label="AI Technology Hub - Central intelligence powering the ecosystem"
        >
          <img
            src="/ai-1.png"
            alt="AI Central Hub"
            className="w-16 h-16 md:w-24 md:h-24 object-contain relative z-10 transition-transform duration-300 hover:scale-105"
            loading="eager"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
          />

          {/* Refined ripple effects */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-blue-200/40 pointer-events-none"
              style={{
                left: ripple.x - 30,
                top: ripple.y - 30,
                width: 60,
                height: 60,
                animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1) forwards',
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-transparent" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-indigo-100/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Accessibility announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isLoaded && `Technology solar system loaded with physics-based orbital mechanics`}
        {hoveredItem && (() => {
          const item = TECH_ITEMS.find(t => t.id === hoveredItem);
          return item ? `Focused on ${item.name}: ${item.skillLevel}/5 expertise, ${item.yearsExperience} years experience` : '';
        })()}
      </div>
    </section>
  );
};

export default TechStack;
