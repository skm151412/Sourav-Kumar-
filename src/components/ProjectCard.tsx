import React, { Key } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { InViewReveal } from './animations';

interface ProjectCardProps {
  project: Project;
  index: number;
  key?: Key;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <InViewReveal
      direction={index % 2 === 0 ? 'left' : 'right'}
      delay={index * 100}
    >
      <article className={`project-card bg-[#211E1B] border border-[#342F2A] hover:border-[#443D36] rounded-[18px] w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-9 transition-all duration-200 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        {/* Project Screenshot */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="relative rounded-[12px] overflow-hidden border border-[#342F2A] bg-[#171513] shadow-[0_4px_20px_rgba(0,0,0,0.30)]">
            <div className="aspect-[16/10] overflow-hidden relative flex items-center justify-center bg-[#171513]">
              <img 
                src={project.imageUrl} 
                alt={`Screenshot of ${project.title} interface`} 
                loading="lazy"
                className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-300 ease-out"
              />
            </div>
          </div>
        </div>

        {/* Case Study Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-5">
          {/* Project Number & Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-[#F59E0B] font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase font-semibold">
                PROJECT 0{index + 1}
              </span>
              {project.status && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#342F2A]"></span>
                  <span className="text-[#81796F] font-mono text-[11px] sm:text-[12px] tracking-normal">
                    {project.status}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-[#F5F1EA] leading-snug">
              {project.title}
            </h3>
          </div>
          
          {/* Short Problem Statement */}
          <div className="p-3.5 sm:p-4 rounded-[10px] bg-[#26221E] border-l-2 border-[#F59E0B]">
            <span className="block text-[11px] font-mono font-medium tracking-wider text-[#81796F] uppercase mb-1">
              Problem
            </span>
            <p className="text-[#D6CEC3] italic text-[14px] sm:text-[15px] leading-[1.6]">
              "{project.problem}"
            </p>
          </div>
          
          {/* What I Built */}
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono font-medium tracking-wider text-[#81796F] uppercase">
              What I Built
            </span>
            <p className="text-[15px] sm:text-[16px] text-[#B8B0A5] leading-[1.7] max-w-[65ch]">
              {project.description}
            </p>
          </div>
          
          {/* Technology Tags */}
          <div className="space-y-2 pt-1">
            <span className="block text-[11px] font-mono font-medium tracking-wider text-[#81796F] uppercase">
              Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={`${project.id}-${t}`}
                  className="bg-[#29251F] text-[#D6CEC3] border border-[#3A342D] px-2.5 py-1 text-[12px] font-medium font-mono rounded-full hover:border-[#F59E0B] hover:text-[#F5F1EA] transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links / Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} live demo in a new tab`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#F59E0B] text-[#11100F] font-semibold text-[13px] rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.22)] hover:bg-[#FBBF24] hover:shadow-[0_4px_14px_rgba(245,158,11,0.20)] transition-all"
              >
                <ExternalLink size={15} />
                <span>Live Demo</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#26221E] hover:bg-[#2C2722] text-[#F5F1EA] hover:text-[#FFFFFF] border border-[#342F2A] hover:border-[#F59E0B] rounded-[10px] text-[13px] font-medium transition-all"
              >
                <Github size={15} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </InViewReveal>
  );
};

export default ProjectCard;
