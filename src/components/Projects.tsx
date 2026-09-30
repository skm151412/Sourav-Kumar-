import React from 'react';
import { Github } from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { InViewReveal, DividerInView } from './animations';

export const Projects = () => {
  return (
    <section id="projects" className="projects-shell py-20 md:py-28 relative bg-[#171513]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <InViewReveal direction="up" distance={16}>
              <h2 className="text-[36px] sm:text-[42px] lg:text-[48px] font-bold text-[#F5F1EA] mb-3 leading-tight">Selected Projects</h2>
              <DividerInView className="h-1 w-20 bg-[#F59E0B] mb-4 rounded-full" />
              <p className="text-[16px] md:text-[18px] text-[#B8B0A5] max-w-[65ch] leading-[1.7]">
                A collection of web applications and machine learning experiments deployed for real-world testing.
              </p>
            </InViewReveal>
          </div>
          <a
            href="https://github.com/skm151412"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 text-[#F59E0B] text-[15px] font-medium hover:text-[#FBBF24] transition-colors"
          >
            <span>View GitHub Profile</span> <Github size={16} />
          </a>
        </div>

        <div className="space-y-16 md:space-y-20">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
