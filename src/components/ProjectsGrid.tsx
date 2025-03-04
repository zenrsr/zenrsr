import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useAnimationOnView } from "@/utils/animations";
import { Link } from "react-router-dom";
import Button from "./common/Button";

// Mock project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack Development",
    image:
      "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    url: "#",
  },
  {
    id: 2,
    title: "Banking Dashboard",
    category: "Frontend Development",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    url: "#",
  },
  {
    id: 3,
    title: "Mobile Payment App",
    category: "React Native",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    url: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    category: "Machine Learning",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    url: "#",
  },
];

const ProjectsGrid = () => {
  const { ref, isVisible } = useAnimationOnView(0.1);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply staggered animation to project cards
    if (isVisible && containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".project-card");
      cards.forEach((card, index) => {
        setTimeout(
          () => {
            (card as HTMLElement).style.opacity = "1";
            (card as HTMLElement).style.transform = "translateY(0)";
          },
          200 + index * 150
        );
      });
    }
  }, [isVisible]);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
              Featured Projects
            </h2>
            <Link
              to="/projects"
              className="text-base md:text-lg font-medium mt-4 md:mt-0 inline-flex items-center group"
            >
              <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                All Projects
              </span>
              <ArrowUpRight className="ml-1 w-4 h-4 transform transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
            </Link>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            A showcase of my work across various domains, demonstrating my
            technical expertise and problem-solving abilities.
          </p>
        </div>

        {/* Projects grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card opacity-0 transform translate-y-16 transition-all duration-1000 ease-in-expo"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project image */}
              <div className="relative overflow-hidden aspect-[4/3] mb-6 rounded-lg bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Hover arrow */}
                <div
                  className={`absolute right-6 bottom-6 w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-500 ${
                    hoveredProject === project.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>

              {/* Project info */}
              <div className="project-info">
                <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view All Projects button */}
        <div className="mt-16 text-center md:hidden">
          <Button
            onClick={() => (window.location.href = "/projects")}
            variant="secondary"
            withArrow
            className="min-w-[160px]"
          >
            All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
