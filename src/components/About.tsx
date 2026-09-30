import React from 'react';
import { Download } from 'lucide-react';
import { Stat } from '../../types';
import { InViewReveal, DividerInView, AnimatedStat, animationConfig } from './animations';

export const About = () => {
  const stats: Stat[] = [
    { label: 'Production Deployments', value: '05', description: 'Firebase, GitHub Pages (x2), Render, Railway', countTarget: 5, padTo: 2 },
    { label: 'ML Projects', value: '03', description: 'Resource allocation, house price & risk models', countTarget: 3, padTo: 2 },
  ];

  return (
    <section id="about" className="about-shell py-20 md:py-28 relative bg-[#171513]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          
          {/* Left Column: Story */}
          <InViewReveal className="space-y-10" direction="left" threshold={0.35}>
            <div>
              <h2 className="text-[36px] sm:text-[42px] lg:text-[50px] font-bold text-[#F5F1EA] mb-6 leading-tight">About Sourav</h2>
              <DividerInView className="h-1 w-20 bg-[#F59E0B] mb-8 rounded-full" />
              <p className="text-[16px] md:text-[18px] text-[#B8B0A5] leading-[1.7] max-w-[68ch]">
                I am a Computer Science student who learns by building, deploying, and collecting feedback. That continuous shipping loop has helped me build interactive web development projects, integrate Java and Firebase for application auth and services, and deploy practical machine learning models.
              </p>
            </div>

            <div className="space-y-6">
               {[
                 { title: 'Deploy-first mindset', desc: 'Firebase Hosting, Render, and GitHub Pages are part of my definition of done. Shipping publicly verifies edge cases and real-world behavior.' },
                 { title: 'Web & Java/Firebase development', desc: 'Designing responsive interfaces with HTML, CSS, and JavaScript, paired with Firebase Authentication and Java services for structured logic and scoring.' },
                 { title: 'Practical machine learning', desc: 'Training regression and classification models using Python, scikit-learn, and pandas, then deploying inference through lightweight Flask web applications.' }
               ].map((item, idx) => (
                 <InViewReveal key={item.title} className="flex gap-4 group" direction="up" delay={(idx + 1) * animationConfig.staggering.list} distance={12} threshold={0.35}>
                   <span className="text-2xl font-bold text-[#81796F] group-hover:text-[#F59E0B] transition-colors">0{idx + 1}</span>
                   <div>
                     <h3 className="text-xl font-semibold text-[#F5F1EA] mb-1">{item.title}</h3>
                     <p className="text-[15px] sm:text-[16px] text-[#B8B0A5] leading-[1.65]">{item.desc}</p>
                   </div>
                 </InViewReveal>
               ))}
            </div>
          </InViewReveal>

          {/* Right Column: The "Student Advantage" Card */}
          <InViewReveal className="relative" direction="right" threshold={0.35}>
            <div className="relative bg-[#211E1B] border border-[#342F2A] rounded-[16px] p-6 sm:p-8 md:p-9 student-advantage-card">
              <h3 className="text-2xl font-bold text-[#F5F1EA] mb-2">I learn by deploying</h3>
              <p className="text-[16px] text-[#B8B0A5] leading-[1.7] mb-8 max-w-[65ch]">
                As a Computer Science student, every project here is built to be tested by real users—from an ML-assisted resource allocation platform and Java/Firebase Quiz Portal to predictive models on Render and interactive web tools on GitHub Pages. Learning through building and shipping keeps me honest about edge cases, loading states, and clean engineering.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <AnimatedStat key={stat.label} stat={stat} />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#342F2A] flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <a
                  href="/SOURAV_KUMAR.pdf"
                  download="SOURAV_KUMAR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group/resume cursor-pointer"
                  title="Download SOURAV KUMAR.pdf"
                >
                  <div className="p-2.5 bg-[#26221E] border border-[#342F2A] rounded-[8px] group-hover/resume:border-[#F59E0B]/60 transition-colors">
                    <Download className="text-[#F59E0B] w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#F5F1EA] font-medium text-sm group-hover/resume:text-[#F59E0B] transition-colors">SOURAV KUMAR.pdf</div>
                    <div className="text-xs text-[#81796F]">Updated Jan 2026</div>
                  </div>
                </a>
                <a
                  href="/SOURAV_KUMAR.pdf"
                  download="SOURAV_KUMAR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-glow-primary px-5 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 rounded-[11px] text-[#11100F] bg-[#F59E0B] hover:bg-[#FBBF24] active:scale-95 transition-all"
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </InViewReveal>

        </div>
      </div>
    </section>
  );
};

export default About;
