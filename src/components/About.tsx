
import { useRef, useEffect } from 'react';
import { useAnimationOnView } from '@/utils/animations';
import Button from './common/Button';
import { FileText } from 'lucide-react';

// Skill categories
const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL']
  },
  {
    category: 'DevOps',
    items: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'Terraform']
  },
  {
    category: 'Tools',
    items: ['Git', 'VSCode', 'Figma', 'Jest', 'Cypress']
  }
];

const About = () => {
  const { ref, isVisible } = useAnimationOnView(0.1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation for skills list
  useEffect(() => {
    if (isVisible && containerRef.current) {
      const skillItems = containerRef.current.querySelectorAll('.skill-item');
      skillItems.forEach((item, index) => {
        setTimeout(() => {
          (item as HTMLElement).style.opacity = '1';
          (item as HTMLElement).style.transform = 'translateY(0)';
        }, 300 + index * 50);
      });
    }
  }, [isVisible]);

  return (
    <section 
      id="about" 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-24 md:py-32 px-6 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* About content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-8">About Me</h2>
            
            <div className="space-y-4 text-lg mb-8">
              <p>
                I'm a passionate full stack developer with 5+ years of experience building 
                elegant, high-performance web applications. I blend technical expertise with 
                a keen eye for design to create seamless user experiences.
              </p>
              <p>
                My approach focuses on writing clean, maintainable code while staying current 
                with the latest technologies and best practices. I thrive in collaborative 
                environments and enjoy tackling complex challenges.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open source, or sharing knowledge through technical writing and mentoring.
              </p>
            </div>
            
            <Button variant="primary" withArrow className="mt-6">
              <FileText className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </div>
          
          {/* Skills */}
          <div 
            ref={containerRef}
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="text-2xl font-medium mb-8">Expertise</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
              {skills.map((skill, index) => (
                <div key={index} className="skill-category opacity-0 transform translate-y-8 transition-all duration-700 ease-in-expo">
                  <h4 className="text-lg font-medium mb-4">{skill.category}</h4>
                  <ul className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        className="skill-item flex items-center opacity-0 transform translate-y-4 transition-all duration-500 ease-in-expo"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
