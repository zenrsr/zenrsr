import { useRef, useEffect } from "react";
import { useAnimationOnView } from "@/utils/animations";

const techStack = {
  center: { type: 'image', src: '/ai.png', color: "bg-white/20" },
  orbits: [
    {
      radius: 160,
      speed: 30,
      technologies: [
        { type: 'image', src: '/typescript.png', color: "bg-white/20" },
        { type: 'image', src: '/next.png', color: "bg-white/20" },
        { type: 'image', src: '/node.png', color: "bg-white/20" },
      ],
    },
    {
      radius: 240,
      speed: 45,
      technologies: [
        { type: 'image', src: '/mongodb.png', color: "bg-white/20" },
        { type: 'image', src: '/postgresql.png', color: "bg-white/20" },
        { type: 'image', src: '/python.png', color: "bg-white/20" },
      ],
    },
    {
      radius: 320,
      speed: 60,
      technologies: [
        { type: 'image', src: '/aws.png', color: "bg-white/20" },
        { type: 'image', src: '/docker.png', color: "bg-white/20" },
        { type: 'image', src: '/git.png', color: "bg-white/20" },
        { type: 'image', src: '/tailwind.png', color: "bg-white/20" },
      ],
    },
  ],
};

const TechStack = () => {
  const { ref, isVisible } = useAnimationOnView(0.1);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !orbitRef.current) return;

    const orbits = orbitRef.current.querySelectorAll(".orbit");
    orbits.forEach((orbit, index) => {
      const speed = techStack.orbits[index].speed;
      (orbit as HTMLElement).style.animation = `rotate ${speed}s linear infinite`;
    });
  }, [isVisible]);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div
        ref={orbitRef}
        className={`relative w-[800px] h-[800px] transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Center AI tech with enhanced hover effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 z-10 hover:scale-110 hover:bg-white/20 transition-all duration-300 group">
          <img 
            src={techStack.center.src} 
            alt="AI"
            className="w-16 h-16 object-contain group-hover:rotate-12 transition-transform duration-300"
          />
        </div>

        {/* Enhanced Orbits with visible paths */}
        {techStack.orbits.map((orbit, orbitIndex) => (
          <div
            key={orbitIndex}
            className="orbit absolute top-1/2 left-1/2 rounded-full border-[1px] border-white/10"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              animation: `rotate ${orbit.speed}s linear infinite`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
              background: "radial-gradient(circle at center, transparent 99%, rgba(255, 255, 255, 0.05) 100%)"
            }}
          >
            {orbit.technologies.map((tech, techIndex) => (
              <div
                key={techIndex}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${(360 / orbit.technologies.length) * techIndex}deg) translateX(${orbit.radius}px) rotate(-${(360 / orbit.technologies.length) * techIndex}deg)`,
                }}
              >
                <div className="p-4 rounded-full bg-white/10 shadow-lg backdrop-blur-md hover:scale-125 hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20 group cursor-pointer">
                  <img 
                    src={tech.src} 
                    alt="Technology icon" 
                    className="w-8 h-8 object-contain group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;