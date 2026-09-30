import React from 'react';
import { skillCategories } from '../data/skills';
import { InViewReveal, DividerInView, animationConfig } from './animations';

export const Skills = () => {
  return (
    <section id="skills" className="skills-shell py-20 md:py-28 relative bg-[#11100F]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <InViewReveal as="div" className="text-center mb-16" direction="up" distance={16}>
          <h2 className="text-[36px] sm:text-[42px] lg:text-[50px] font-bold text-[#F5F1EA] mb-4 leading-tight">Technical Arsenal</h2>
          <DividerInView className="h-1 w-20 bg-[#F59E0B] mx-auto mb-6 rounded-full" />
          <p className="text-[16px] md:text-[18px] text-[#B8B0A5] leading-[1.7] max-w-[68ch] mx-auto">
            A practical toolkit spanning web development, backend services, machine learning, and live deployments. While showcased projects use focused web, Java, and Python stacks, this portfolio itself is engineered with React, TypeScript, and Vite.
          </p>
        </InViewReveal>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {skillCategories.map((category, idx) => (
            <InViewReveal key={category.title} className="h-full" delay={Math.floor(idx / 2) * animationConfig.staggering.cards} distance={16}>
              <div className="group bg-[#211E1B] border border-[#342F2A] hover:bg-[#26221E] hover:border-[#443D36] p-6 sm:p-7 rounded-[14px] relative overflow-hidden skill-card h-full flex flex-col transition-all duration-200">
                <div className="absolute top-0 right-0 p-4 text-[#342F2A] opacity-30 group-hover:opacity-45 transition-opacity duration-300">
                  <category.icon size={110} />
                </div>
                
                <div className="skill-icon w-11 h-11 bg-[#29251F] border border-[#342F2A] rounded-[10px] flex items-center justify-center mb-5 text-[#F59E0B]">
                  <category.icon size={22} />
                </div>

                <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">{category.title}</h3>
                <p className="text-[14px] sm:text-[15px] text-[#B8B0A5] mb-5 leading-relaxed">{category.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill) => (
                    <span key={skill} className="bg-[#29251F] text-[#D6CEC3] border border-[#3A342D] hover:border-[#F59E0B] hover:text-[#F5F1EA] px-3 py-1 text-[13px] font-medium font-mono rounded-full transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </InViewReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
