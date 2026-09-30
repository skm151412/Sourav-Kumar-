import React from 'react';
import { GraduationCap } from 'lucide-react';
import { InViewReveal, DividerInView } from './animations';

export const Education = () => {
  return (
    <section id="education" className="education-shell py-20 md:py-24 relative bg-[#1C1917]">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <InViewReveal as="div" className="text-center mb-12" direction="up" distance={16}>
          <h2 className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-[#F5F1EA] mb-3 leading-tight">Education</h2>
          <DividerInView className="h-1 w-16 bg-[#F59E0B] mx-auto rounded-full" />
        </InViewReveal>

        <InViewReveal className="education-card bg-[#211E1B] border border-[#342F2A] p-6 sm:p-7 rounded-[14px] flex flex-col sm:flex-row items-start sm:items-center gap-6" direction="up" distance={20}>
          <div className="p-3.5 bg-[#29251F] border border-[#342F2A] text-[#F59E0B] rounded-[10px] flex items-center justify-center">
            <GraduationCap size={28} />
          </div>
          <div>
            <span className="text-[12px] font-semibold tracking-[0.14em] text-[#F59E0B] font-mono uppercase">2024 – 2028</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F1EA] mt-1">B.Tech in Computer Science &amp; Engineering</h3>
            <p className="text-[15px] sm:text-[16px] text-[#B8B0A5] font-medium">KL Deemed to be University</p>
            <p className="text-sm text-[#81796F]">Currently Pursuing</p>
          </div>
        </InViewReveal>
      </div>
    </section>
  );
};

export default Education;
