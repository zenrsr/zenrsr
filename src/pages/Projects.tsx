import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Github } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Loading from "@/components/Loading";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { useAnimationOnView } from "@/utils/animations";

// Project data from ProjectsGrid
const allProjects = [
  {
    id: 1,
    title: "ROVERAI: YOUR FINANCIAL COPILOT",
    category: "AI Finance Assistant",
    image: "/projects/rover.png",
    description:
      "An intelligent financial assistant powered by AI that helps users manage their investments, track expenses, and make informed financial decisions with real-time market insights.",
    url: "https://rover-ai-one.vercel.app/",
    github: "https://github.com/zenrsr/Rover-AI",
    year: "2025",
    isRepoPrivate: true,
  },
  {
    id: 4,
    title: "MILAAP WORKSPACE",
    category: "Team Collaboration Platform",
    image: "/projects/milaap.png",
    description:
      "Slack-inspired platform using WebSockets and GSAP animations. Implemented responsive UI with Spline 3D, improving team efficiency by 25%.",
    url: "https://milaap-three.vercel.app/",
    github: "https://github.com/zenrsr/milaap",
    year: "2024",
    isRepoPrivate: false,
  },
  {
    id: 3,
    title: "PODVERSE AI",
    category: "Podcast Application: AI Image and Voice Generation",
    image: "/projects/podverse.png",
    description:
      "JavaScript/Node.js podcast app with OpenAI Text-to-Speech integration and ClerkJS authentication. Successfully resolved 20+ user-reported issues.",
    url: "https://podverse-ai.vercel.app/",
    github: "https://github.com/zenrsr/podverse-ai",
    year: "2024",
    isRepoPrivate: false,
  },
  {
    id: 2,
    title: "Apple 15",
    category: "UI/UX Application",
    image: "/projects/apple.png",
    description:
      "3D product visualization website showcasing Apple iPhone 15 features using Three.js and GSAP animations, with responsive design and optimized performance.",
    url: "https://apple-15.vercel.app/",
    github: "https://github.com/zenrsr/apple-15",
    year: "2024",
    isRepoPrivate: false,
  },
  {
    id: 5,
    title: "Corn-AI",
    category: "AI Chatbot Integration",
    image: "/projects/corn.png",
    description:
      "A chatbot integration with OpenAI's GPT-3.5 model, providing real-time responses to user queries. Implemented with React, TypeScript, and Tailwind CSS.",
    url: "https://corn-ai-zenrsr.vercel.app",
    github: "https://github.com/zenrsr/corn-ai-domain",
    year: "2024",
    isRepoPrivate: false,
  },
  {
    id: 6,
    title: "Brainwave",
    category: "UI/UX Application",
    image: "/projects/brain.png",
    description:
      "A UI/UX design app, showcasing a GSAP parallax visualization and scroll animations.",
    url: "https://brainrot-green.vercel.app/",
    github: "https://github.com/zenrsr/dev-ai",
    isRepoPrivate: false,
  },
];

const Projects = () => {
  const { ref, isVisible } = useAnimationOnView(0.05);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Get unique years for filtering
  const years = [...new Set(allProjects.map((project) => project.year))];

  // Filter projects based on selected year
  const filteredProjects =
    filter === "all"
      ? allProjects
      : allProjects.filter((project) => project.year === filter);

  useEffect(() => {
    // Simulate page transition
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Add smooth scrolling
      document.documentElement.style.scrollBehavior = "smooth";
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="relative">
      {/* Loading screen with Japanese text */}
      <Loading />

      {/* Page transition overlay */}
      <div
        className={`fixed inset-0 bg-background z-50 pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Custom cursor */}
      <Cursor />

      {/* Header */}
      <Header />

      <main>
        {/* Page header */}
        <section
          className={`py-20 md:py-32 px-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              Projects
            </h1>
            // Update the page description
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              A showcase of my latest work in AI, Fintech, and Full Stack
              Development, demonstrating expertise in TypeScript and modern web
              technologies.
            </p>
          </div>
        </section>

        {/* Projects section */}
        <section
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`pb-24 md:pb-32 px-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                All Projects
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setFilter(year)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    filter === year
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 cursor-none"
              data-cursor="pointer"
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-in-expo ${
                    isVisible ? "opacity-100 translate-y-0" : ""
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden aspect-square mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-expo group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* View and GitHub buttons on hover */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-none"
                        data-cursor="pointer"
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          withArrow
                          className="bg-white text-black hover:bg-white/90 cursor-none"
                          data-cursor="pointer"
                        >
                          View Project
                        </Button>
                      </a>
                      {!project.isRepoPrivate && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-none"
                          data-cursor="pointer"
                        >
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/90 text-black hover:bg-white cursor-none flex items-center gap-2"
                            data-cursor="pointer"
                            withArrow
                          >
                            <p className="flex flex-row items-center gap-2 text-sm">
                              <Github className="w-4 h-4" />
                              Repo
                            </p>
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project info */}
                  <div>
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-muted-foreground">
                        {project.category}
                      </p>
                      <span className="text-sm text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Projects;
