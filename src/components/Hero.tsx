import React, { useState, useMemo, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Github, ExternalLink } from 'lucide-react';
import { animationConfig, HeroReveal } from './animations';

export const Hero = () => {
  const heroDelays = animationConfig.staggering.hero;
  const [activeSlide, setActiveSlide] = useState(0);
  const codeSlides = useMemo<{ id: string; file: string; content: ReactNode }[]>(
    () => [
      {
        id: 'engineer',
        file: 'developer.ts',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-[#22D3EE]">const</span>
              <span className="text-[#F3F4F6] font-semibold">Developer</span>
              <span className="text-[#6B7280]">=</span>
              <span className="text-[#6B7280]">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">name:</span>
              <span className="text-[#A3E635]">'Sourav Kumar'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">role:</span>
              <span className="text-[#A3E635]">'Frontend & ML Developer'</span>,
            </div>
            <div className="pl-6">
              <span className="text-[#9CA3AF]">frontend:</span>
              <span className="text-[#6B7280]">[</span>
              <span className="text-[#A3E635]">'HTML'</span>,
              <span className="text-[#A3E635]">'CSS'</span>,
              <span className="text-[#A3E635]">'JavaScript'</span>
              <span className="text-[#6B7280]">]</span>,
            </div>
            <div className="pl-6">
              <span className="text-[#9CA3AF]">services:</span>
              <span className="text-[#6B7280]">[</span>
              <span className="text-[#A3E635]">'Spring MVC'</span>,
              <span className="text-[#A3E635]">'Firebase'</span>,
              <span className="text-[#A3E635]">'Flask'</span>
              <span className="text-[#6B7280]">]</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">portfolio:</span>
              <span className="text-[#A3E635]">'React + Vite'</span>
            </div>
            <div><span className="text-[#6B7280]">{`}`}</span>;</div>
            <div className="pt-3 flex gap-2">
              <span className="text-[#22D3EE]">export default</span>
              <span className="text-[#F3F4F6] font-semibold">Developer</span>;
            </div>
          </>
        )
      },
      {
        id: 'focus',
        file: 'focus.ts',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-[#22D3EE]">const</span>
              <span className="text-[#F3F4F6] font-semibold">Focus</span>
              <span className="text-[#6B7280]">=</span>
              <span className="text-[#6B7280]">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">ui:</span>
              <span className="text-[#A3E635]">'Semantic, responsive HTML/CSS'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">interactivity:</span>
              <span className="text-[#A3E635]">'DOM manipulation & game logic'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">machineLearning:</span>
              <span className="text-[#A3E635]">'scikit-learn models in Flask'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">delivery:</span>
              <span className="text-[#A3E635]">'Deployed for public review'</span>
            </div>
            <div><span className="text-[#6B7280]">{`}`}</span>;</div>
          </>
        )
      },
      {
        id: 'projects',
        file: 'projects.ts',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-[#22D3EE]">const</span>
              <span className="text-[#F3F4F6] font-semibold">Projects</span>
              <span className="text-[#6B7280]">=</span>
              <span className="text-[#6B7280]">{`{`}</span>
            </div>
            <div className="pl-6">
              <span className="text-[#9CA3AF]">frontend:</span>
              <span className="text-[#6B7280]">[</span>
              <span className="text-[#A3E635]">'Quiz Portal'</span>,
              <span className="text-[#A3E635]">'Book Store'</span>,
              <span className="text-[#A3E635]">'Browser Game'</span>
              <span className="text-[#6B7280]">]</span>,
            </div>
            <div className="pl-6">
              <span className="text-[#9CA3AF]">ml:</span>
              <span className="text-[#6B7280]">[</span>
              <span className="text-[#A3E635]">'Resource Allocation'</span>,
              <span className="text-[#A3E635]">'House Price'</span>,
              <span className="text-[#A3E635]">'Loan Defaulter'</span>
              <span className="text-[#6B7280]">]</span>,
            </div>
            <div className="pl-6">
              <span className="text-[#9CA3AF]">hosting:</span>
              <span className="text-[#6B7280]">[</span>
              <span className="text-[#A3E635]">'Railway'</span>,
              <span className="text-[#A3E635]">'Render'</span>,
              <span className="text-[#A3E635]">'Firebase'</span>,
              <span className="text-[#A3E635]">'GitHub Pages'</span>
              <span className="text-[#6B7280]">]</span>
            </div>
            <div><span className="text-[#6B7280]">{`}`}</span>;</div>
          </>
        )
      },
      {
        id: 'workstyle',
        file: 'workstyle.ts',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-[#22D3EE]">const</span>
              <span className="text-[#F3F4F6] font-semibold">WorkStyle</span>
              <span className="text-[#6B7280]">=</span>
              <span className="text-[#6B7280]">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">mindset:</span>
              <span className="text-[#A3E635]">'Learn by building & shipping'</span>,
            </div>
            <div className="pl-6">
              <span className="text-[#9CA3AF]">workflow:</span>
              <span className="text-[#6B7280]">[</span>
              <span className="text-[#A3E635]">'Clean code'</span>,
              <span className="text-[#A3E635]">'Live deployment'</span>,
              <span className="text-[#A3E635]">'Iterative testing'</span>
              <span className="text-[#6B7280]">]</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">goal:</span>
              <span className="text-[#A3E635]">'Frontend / Full-Stack Intern'</span>
            </div>
            <div><span className="text-[#6B7280]">{`}`}</span>;</div>
          </>
        )
      },
      {
        id: 'availability',
        file: 'availability.ts',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-[#22D3EE]">const</span>
              <span className="text-[#F3F4F6] font-semibold">Availability</span>
              <span className="text-[#6B7280]">=</span>
              <span className="text-[#6B7280]">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">role:</span>
              <span className="text-[#A3E635]">'Frontend / Full-Stack Intern'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">location:</span>
              <span className="text-[#A3E635]">'India'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-[#9CA3AF]">status:</span>
              <span className="text-[#A3E635]">'Open for Internships'</span>
            </div>
            <div><span className="text-[#6B7280]">{`}`}</span>;</div>
          </>
        )
      }
    ],
    []
  );
  const totalSlides = codeSlides.length;
  const activeCodeSlide = codeSlides[activeSlide] ?? codeSlides[0];
  const handleAdvanceSlide = () => {
    if (!totalSlides) return;
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.25, ease: 'easeIn' }
    }
  } as const;

  return (
    <section id="hero" className="hero-shell relative min-h-[90svh] flex items-center justify-center pt-24 md:pt-28 pb-16 md:pb-24 overflow-x-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 xl:gap-14 items-center">
        <div className="space-y-6 lg:space-y-8 max-w-3xl order-1">
          <HeroReveal delay={heroDelays * 0} initialTransform="translate3d(0, 0, 0) scale(0.95)" distance={0}>
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211E1B] border border-[#342F2A] text-[#F59E0B] text-[12px] font-semibold tracking-[0.14em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="motion-glow-pulse absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]"></span>
              </span>
              <span>Student Builds, Fully Deployed</span>
              <span className="text-[#81796F]" aria-hidden="true">•</span>
              <span className="text-[#A3A635]">Open for Internships</span>
            </div>
          </HeroReveal>

          <HeroReveal delay={heroDelays * 1}>
            <h1 className="text-[42px] sm:text-[56px] lg:text-[68px] font-bold text-[#F5F1EA] tracking-tight leading-[1.04]">
              I build frontend &amp; ML projects
              <span className="hidden md:inline"><br /></span>
              <span className="md:hidden"> </span>and deploy them for real users.
            </h1>
          </HeroReveal>

          <HeroReveal delay={heroDelays * 2}>
            <p className="text-[16px] lg:text-[18px] text-[#B8B0A5] max-w-[65ch] leading-[1.7]">
              Hi, I'm <span className="text-[#F59E0B] font-medium">Sourav Kumar</span>—a Computer Science Engineering student who learns by shipping. I design accessible UIs with HTML, CSS, and JavaScript, build Java/Spring and Firebase services, and deploy practical ML applications like my Academic Resource Allocation system and House Price predictor.
            </p>
          </HeroReveal>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 hero-cta">
            <HeroReveal as="div" delay={heroDelays * 3} distance={0} initialTransform="translate3d(0, 0, 0)">
              <a
                href="#projects"
                className="button-glow-primary w-full sm:w-auto justify-center px-8 py-3.5 bg-[#F59E0B] hover:bg-[#FBBF24] text-[#11100F] text-[15px] font-semibold rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F59E0B] transition-all"
              >
                <span>View Projects</span>
              </a>
            </HeroReveal>
            <HeroReveal as="div" delay={heroDelays * 3 + animationConfig.staggering.hero}>
              <a
                href="#contact"
                className="button-outline-secondary w-full sm:w-auto justify-center px-8 py-3.5 bg-transparent border border-[#342F2A] text-[#F5F1EA] hover:bg-[#26221E] hover:border-[#F59E0B] text-[15px] font-semibold rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F59E0B] transition-all"
              >
                <span>Contact Me</span>
              </a>
            </HeroReveal>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4 text-[#81796F]">
            <a href="https://github.com/skm151412" target="_blank" rel="noreferrer" className="icon-hover text-[#B8B0A5] hover:text-[#F59E0B] transition-colors flex items-center gap-2" aria-label="Sourav's GitHub"><Github size={20} /> <span className="text-sm font-medium">GitHub</span></a>
            <a href="https://www.linkedin.com/in/sourav-kumar-046165369/" target="_blank" rel="noreferrer" className="icon-hover text-[#B8B0A5] hover:text-[#F59E0B] transition-colors flex items-center gap-2" aria-label="Sourav's LinkedIn"><ExternalLink size={20} /> <span className="text-sm font-medium">LinkedIn</span></a>
            <div className="hidden sm:block h-px w-10 bg-[#342F2A]"></div>
            <span className="text-sm text-[#B8B0A5]">Live on Railway · Render · Firebase · GitHub Pages</span>
            <div className="hidden sm:block h-px w-10 bg-[#342F2A]"></div>
            <span className="text-sm text-[#81796F]">Based in India</span>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="order-2 flex justify-center w-full">
          <div className="relative w-full max-w-lg">
            {/* Editor Window */}
            <div className="bg-[#11161D] rounded-[14px] border border-[#26313D] shadow-[0_8px_30px_rgba(0,0,0,0.20)] overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0E131A] border-b border-[#26313D]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80"></div>
                  <span className="ml-2 px-2.5 py-0.5 rounded bg-[#141A22] border border-[#26313D] text-[11px] text-[#CBD5E1] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"></span>
                    {activeCodeSlide?.file}
                  </span>
                </div>
                
                {/* One subtle supporting accent: Clean interactive snippet controller */}
                <button
                  type="button"
                  onClick={handleAdvanceSlide}
                  aria-label="Cycle to next code snippet"
                  className="px-2.5 py-1 text-[11px] font-mono text-[#9CA3AF] hover:text-[#22D3EE] bg-[#141A22] hover:bg-[#1A222D] border border-[#26313D] hover:border-[#374151] rounded-[6px] transition-colors flex items-center gap-1.5"
                  title="Click to cycle code snippet"
                >
                  <Code2 size={12} className="text-[#22D3EE]" />
                  <span>{activeSlide + 1}/{totalSlides}</span>
                </button>
              </div>

              {/* Code Body */}
              <div className="p-4 sm:p-5 font-mono text-[13px] sm:text-[13.5px] leading-relaxed overflow-x-auto min-h-[260px] flex flex-col justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCodeSlide?.id}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-3.5"
                  >
                    {activeCodeSlide?.content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Editor Status Bar */}
              <div className="px-4 py-2 bg-[#0E131A] border-t border-[#26313D] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]"></span>
                  <span className="text-[#9CA3AF]">TypeScript · UTF-8</span>
                </div>
                <button
                  type="button"
                  onClick={handleAdvanceSlide}
                  className="text-[#9CA3AF] hover:text-[#22D3EE] transition-colors"
                >
                  toggle sample →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
