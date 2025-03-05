import React, { useEffect, useState } from "react";

const TechStack = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const orbits = [
    { radius: 150, speed: 20, items: 4 }, // Increased from 140
    { radius: 230, speed: 25, items: 4 }, // Increased from 220
    { radius: 310, speed: 30, items: 3 }, // Increased from 300
  ];

  const techItems = [
    { name: "AI", image: "public/ai.png" },
    { name: "AWS", image: "public/aws.png" },
    { name: "Docker", image: "public/docker.png" },
    { name: "Git", image: "public/git.png" },
    { name: "MongoDB", image: "public/mongodb.png" },
    { name: "NextJS", image: "public/next.png" },
    { name: "NodeJS", image: "public/node.png" },
    { name: "Python", image: "public/python.png" },
    { name: "PostgreSQL", image: "public/postgresql.png" },
    { name: "Typescript", image: "public/typescript.png" },
    { name: "Tailwind CSS", image: "public/tailwind.png" },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Orbital Containers */}
      {orbits.map((orbit, orbitIndex) => (
        <div
          key={orbitIndex}
          className="absolute w-full h-full orbit-container"
          style={{
            animationDuration: `${orbit.speed}s`,
            perspective: "1000px"
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${orbit.radius * 2}px`,
              height: `${orbit.radius * 2}px`,
              borderRadius: "50%",
              border: "1px dashed rgba(0, 0, 0, 0.2)"
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
                    className="relative w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center
                      hover:scale-110 hover:shadow-xl transition-transform duration-200 will-change-transform tech-item"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotate(-${angle}deg)` // Counter-rotate to keep item upright
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 object-contain"
                    />
                    <div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0
    transition-opacity duration-200 bg-black text-white px-2 py-1 rounded-md
    text-sm whitespace-nowrap hover:opacity-100 tech-tooltip"
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
        className={`relative z-10 w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center
          transition-all duration-500 ${
            isLoaded ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
      >
        <img
          src="/ai.png"
          alt="AI"
          className="w-32 h-32 object-contain animate-pulse"
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
