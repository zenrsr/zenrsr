import { useRef, useEffect } from "react";
import { useAnimationOnView, useParallaxEffect } from "@/utils/animations";
import Button from "./common/Button";
import { FileText } from "lucide-react";

const About = () => {
  const { ref, isVisible } = useAnimationOnView(0.1);
  const parallaxRef = useParallaxEffect(0.15);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative py-24 md:py-32 px-6 bg-secondary/50 overflow-hidden"
    >
      {/* Background Image for Mobile */}
      <div className="absolute inset-0 lg:hidden overflow-hidden opacity-30 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[80vw] h-[80vw] rounded-full overflow-hidden">
            <img
              src="/sunny.png"
              alt="Raga Sandeep Reddy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column - About text */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              About Me
            </h2>

            <div className="space-y-6 text-lg mb-10 text-muted-foreground">
              <p className="leading-relaxed">
                A TypeScript & Python - focused Full Stack Developer
                specializing in building scalable web applications, creating
                reusable code, and delivering user-centric solutions.
              </p>
              <p className="leading-relaxed">
                Proficient in Agile methodologies with expertise in debugging
                performance issues and integrating third-party APIs. I thrive in
                collaborative environments and focus on writing clean,
                maintainable code.
              </p>
              <p className="leading-relaxed">
                My approach combines technical expertise with a commitment to
                staying current with the latest technologies and best practices
                in web development.
              </p>
            </div>

            <Button
              variant="primary"
              withArrow
              className="mt-8 hover:scale-105 transform transition-all duration-300 cursor-none"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <p className="flex flex-row items-center justify-center">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </p>
            </Button>
          </div>

          {/* Right column - Image */}
          <div
            ref={parallaxRef as React.RefObject<HTMLDivElement>}
            className={`relative transition-all duration-1000 hidden lg:block ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="relative w-[400px] h-[400px] mx-auto overflow-hidden rounded-full group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 mix-blend-overlay z-10" />
              <img
                src="/sunny.png"
                alt="Raga Sandeep Reddy"
                className="w-full h-full object-cover transition-all duration-700 ease-in-expo group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
