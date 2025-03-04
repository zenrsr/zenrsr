import { useRef, useEffect } from "react";
import { useAnimationOnView } from "@/utils/animations";
import Button from "./common/Button";
import { FileText } from "lucide-react";

const About = () => {
  const { ref, isVisible } = useAnimationOnView(0.1);
  const orbitRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-24 md:py-32 px-6 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column - About text */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-8">
              About Me
            </h2>

            <div className="space-y-4 text-lg mb-8">
              <p>
                A JavaScript-focused Full Stack Developer specializing in
                building scalable web applications, creating reusable code, and
                delivering user-centric solutions.
              </p>
              <p>
                Proficient in Agile methodologies with expertise in debugging
                performance issues and integrating third-party APIs. I thrive in
                collaborative environments and focus on writing clean,
                maintainable code.
              </p>
              <p>
                My approach combines technical expertise with a commitment to
                staying current with the latest technologies and best practices
                in web development.
              </p>
            </div>

            <Button variant="primary" withArrow className="mt-6">
              <p className="flex flex-row items-center justify-center">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </p>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
