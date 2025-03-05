import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const TechStack = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = window.matchMedia(
    "(min-width: 768px) and (max-width: 1023px)"
  ).matches;

  useEffect(() => {
    setIsLoaded(true);
    const handleResize = () => {
      setIsLoaded((state) => state); // Force re-render on resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getOrbitConfig = () => {
    if (isMobile) {
      return [
        { radius: 100, speed: 18, items: 3 },
        { radius: 140, speed: 22, items: 3 },
        { radius: 180, speed: 26, items: 2 },
        { radius: 220, speed: 30, items: 2 },
      ];
    } else if (isTablet) {
      return [
        { radius: 140, speed: 18, items: 2 },
        { radius: 180, speed: 22, items: 3 },
        { radius: 220, speed: 26, items: 2 },
        { radius: 260, speed: 30, items: 2 },
      ];
    } else {
      return [
        { radius: 170, speed: 18, items: 2 },
        { radius: 220, speed: 22, items: 3 },
        { radius: 270, speed: 26, items: 2 },
        { radius: 320, speed: 30, items: 2 },
      ];
    }
  };

  const orbits = getOrbitConfig();

  const techItems = [
    { name: "AWS", image: "/aws.png" },
    { name: "Docker", image: "/docker.png" },
    { name: "Git", image: "/git.png" },
    { name: "MongoDB", image: "/mongodb.png" },
    { name: "NextJS", image: "/next.png" },
    { name: "NodeJS", image: "/node.png" },
    { name: "Python", image: "/python.png" },
    { name: "PostgreSQL", image: "/postgresql.png" },
    { name: "Typescript", image: "/typescript.png" },
    { name: "Tailwind CSS", image: "/tailwind.png" },
  ];

  const getTechItemSize = () => {
    if (isMobile) return "w-12 h-12";
    if (isTablet) return "w-14 h-14";
    return "w-16 h-16";
  };

  const getIconSize = () => {
    if (isMobile) return "w-6 h-6";
    if (isTablet) return "w-7 h-7";
    return "w-8 h-8";
  };

  const getCenterImageSize = () => {
    if (isMobile) return "w-32 h-32";
    if (isTablet) return "w-40 h-40";
    return "w-48 h-48";
  };

  const getCenterIconSize = () => {
    if (isMobile) return "w-20 h-20";
    if (isTablet) return "w-24 h-24";
    return "w-32 h-32";
  };

  return (
    <div
      id="tech"
      className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden py-20 md:py-0"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none h-full px-4 md:px-0">
        <h1 className="text-[15vw] sm:text-[17vw] md:text-[20vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-black/5 to-black/50 leading-none">
          Tech Stack
        </h1>
      </div>

      {/* Orbital Containers */}
      {orbits.map((orbit, orbitIndex) => (
        <div
          key={orbitIndex}
          className="absolute w-full h-full orbit-container"
          style={{
            animationDuration: `${orbit.speed}s`,
            perspective: "1000px",
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${orbit.radius * 2}px`,
              height: `${orbit.radius * 2}px`,
              borderRadius: "50%",
              border: "1px dashed rgba(0, 0, 0, 0.2)",
            }}
          />
          {techItems
            .slice(
              orbitIndex === 0
                ? 0
                : orbits
                    .slice(0, orbitIndex)
                    .reduce((sum, o) => sum + o.items, 0),
              orbits
                .slice(0, orbitIndex + 1)
                .reduce((sum, o) => sum + o.items, 0)
            )
            .map((item, itemIndex) => {
              const angle = (360 / orbit.items) * itemIndex;
              return (
                <div
                  key={itemIndex}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(${orbit.radius}px) rotate(-${angle}deg)`,
                    transitionDelay: `${orbitIndex * 0.2}s`,
                  }}
                >
                  <div
                    className={`relative ${getTechItemSize()} rounded-full bg-white shadow-lg flex items-center justify-center
                      hover:scale-110 hover:shadow-xl transition-transform duration-200 will-change-transform tech-item`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotate(-${angle}deg)`,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`${getIconSize()} object-contain`}
                    />
                    <div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0
                        transition-opacity duration-200 bg-black text-white px-2 py-1 rounded-md
                        text-xs md:text-sm whitespace-nowrap hover:opacity-100 tech-tooltip z-10"
                    >
                      {item.name}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-black" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}

      {/* Center Image */}
      <div
        className={`relative z-10 ${getCenterImageSize()} rounded-full bg-white/80 shadow-xl flex items-center justify-center overflow-hidden cursor-pointer
          transition-all duration-500 animate-pulse ${isLoaded ? "scale-100 opacity-100" : "scale-90 opacity-0"}
          before:content-[""] before:absolute before:inset-0 before:bg-gradient-radial before:from-white/90 before:to-white/40 before:z-0`}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ripple = document.createElement("div");
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = `${size * 2}px`;
          ripple.style.left = `${e.clientX - rect.left - size}px`;
          ripple.style.top = `${e.clientY - rect.top - size}px`;
          ripple.className =
            "absolute bg-white/30 rounded-full transform scale-0 pointer-events-none animate-ripple";
          e.currentTarget.appendChild(ripple);
          setTimeout(() => ripple.remove(), 1000);
        }}
      >
        <img
          src="/ai.png"
          alt="AI"
          className={`${getCenterIconSize()} object-contain  relative z-10 `}
        />
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/50 to-transparent opacity-50" />
      </div>
    </div>
  );
};

export default TechStack;
