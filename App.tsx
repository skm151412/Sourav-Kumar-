import React, { useState, useEffect, useRef, ReactNode, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Github, Mail, Code2, Database, Layout, Terminal, ExternalLink, GraduationCap, ArrowRight, Download, Cpu, Rocket } from 'lucide-react';
import { Project, SkillCategory, Stat } from './types';
import quizImage from './src/assets/projects/quiz.png';
import civicfixImage from './src/assets/projects/civicfix.png';
import bookstoreImage from './src/assets/projects/bookstore.png';
import gameImage from './src/assets/projects/game.png';
import housePricePredictionImage from './src/assets/projects/housePricePrediction.png';

type Direction = 'up' | 'down' | 'left' | 'right';

const transitionCurve = 'cubic-bezier(0.4, 0, 0.2, 1)';
const animationConfig = {
  durations: {
    short: 300,
    base: 500,
    long: 700,
  },
  staggering: {
    nav: 80,
    hero: 120,
    list: 100,
    cards: 80,
  },
  easing: transitionCurve,
};

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

const useParallaxShift = (intensity = 0.02) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setOffset(window.scrollY * intensity);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity, prefersReducedMotion]);

  return prefersReducedMotion ? 0 : offset;
};

const useCountUp = (target: number, isActive: boolean, prefersReducedMotion: boolean, duration = 1200) => {
  const [value, setValue] = useState(isActive || prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!isActive) return;
    if (prefersReducedMotion || typeof window === 'undefined') {
      setValue(target);
      return;
    }

    let animationFrame: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      setValue(Math.round(target * eased));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, isActive, prefersReducedMotion, target]);

  return value;
};

const DividerInView = ({ className = '', delay = 0, threshold = 0.35 }: { className?: string; delay?: number; threshold?: number }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(prefersReducedMotion);
  const dividerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const node = dividerRef.current;
    if (!node) return;
    let timeoutId: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = window.setTimeout(() => {
              setVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(node);
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [delay, threshold, prefersReducedMotion]);

  return (
    <div
      ref={dividerRef}
      className={`divider-animated ${className}`.trim()}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
      }}
    />
  );
};

interface HeroRevealProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  distance?: number;
  duration?: number;
  initialTransform?: string;
}

const HeroReveal = ({ children, as: Component = 'div', delay = 0, className = '', distance = 20, duration = animationConfig.durations.base, initialTransform }: HeroRevealProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(prefersReducedMotion);
  const startTransform = initialTransform ?? `translate3d(0, ${distance}px, 0)`;

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    if (typeof window === 'undefined') return;
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay, prefersReducedMotion]);

  return (
    <Component
      className={`motion-safe ${className}`.trim()}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : startTransform,
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: animationConfig.easing,
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};

interface InViewRevealProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  direction?: Direction;
  className?: string;
  threshold?: number;
  distance?: number;
  duration?: number;
}

const getDirectionTransform = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'down':
      return `translate3d(0, -${distance}px, 0)`;
    case 'left':
      return `translate3d(-${distance}px, ${distance}px, 0)`;
    case 'right':
      return `translate3d(${distance}px, ${distance}px, 0)`;
    case 'up':
    default:
      return `translate3d(0, ${distance}px, 0)`;
  }
};

const InViewReveal = ({
  children,
  as: Component = 'div',
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.2,
  distance = 24,
  duration = animationConfig.durations.base,
}: InViewRevealProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(prefersReducedMotion);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const node = elementRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Component
      ref={(node) => {
        elementRef.current = node as HTMLElement | null;
      }}
      className={`motion-safe ${className}`.trim()}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : getDirectionTransform(direction, distance),
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: animationConfig.easing,
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};

const AnimatedStat = ({ stat }: { stat: Stat }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(prefersReducedMotion);
  const statRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(true);
      return;
    }
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const node = statRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const fallback = stat.value.replace(/[0-9]/g, '').trim();
  const suffix = stat.suffix ?? (fallback.length ? fallback : '');
  const padLength = stat.padTo ?? 0;
  const numericTarget = (stat.countTarget ?? Number(stat.value.replace(/[^0-9]/g, ''))) || 0;
  const countedValue = useCountUp(numericTarget, active, prefersReducedMotion);
  const formattedNumber = padLength ? countedValue.toString().padStart(padLength, '0') : countedValue.toString();
  const zeroValueLength = Math.max(1, padLength);
  const zeroDisplay = `${'0'.repeat(zeroValueLength)}${suffix}`;
  const displayValue = active ? `${formattedNumber}${suffix}` : zeroDisplay;

  return (
    <div
      ref={statRef}
      className="stat-card glass-card p-4 rounded-xl"
    >
      <div className="text-3xl font-bold text-cyan-400 mb-1" aria-live="polite">
        {prefersReducedMotion ? stat.value : displayValue}
      </div>
      <div className="text-sm font-semibold text-primary mb-1">{stat.label}</div>
      <div className="text-xs text-muted">{stat.description}</div>
    </div>
  );
};

// --- COMPONENTS ---

// 1. Navigation
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(prefersReducedMotion);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setMounted(true);
      return;
    }
    if (typeof window === 'undefined') return;
    const timer = window.setTimeout(() => setMounted(true), 100);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'deployments', 'education', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || '');
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Deployments', href: '#deployments' },
    { label: 'Education', href: '#education' },
  ];

  const navStyle = prefersReducedMotion
    ? undefined
    : {
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translate3d(0, 0, 0)' : 'translate3d(0, -12px, 0)',
        transition: `opacity ${animationConfig.durations.base}ms ${animationConfig.easing}, transform ${animationConfig.durations.base}ms ${animationConfig.easing}`,
      };

  const navBackground = scrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-white/70 shadow-[0_10px_30px_rgba(15,23,42,0.08)]' : 'py-6 bg-transparent';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tight text-primary group">
          <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">&lt;</span>
          Sourav
          <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            const transitionDelay = mounted ? (idx + 1) * animationConfig.staggering.nav : 0;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link-animated text-sm font-medium ${isActive ? 'text-primary is-active' : 'text-secondary hover:text-cyan-400'} transition-colors`}
                aria-current={isActive ? 'page' : undefined}
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        transitionDelay: `${transitionDelay}ms`,
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
                      }
                }
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="button-glow-primary px-5 py-2 text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded-full hover:bg-cyan-500 hover:text-primary"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    transitionDelay: `${(navLinks.length + 1) * animationConfig.staggering.nav}ms`,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
                  }
            }
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-card border-t border-white/60 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-secondary hover:text-cyan-400 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="text-center py-3 bg-cyan-600/20 text-cyan-400 rounded-lg border border-cyan-500/30 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
};

// 2. Hero Section
const Hero = () => {
  const parallaxOffset = useParallaxShift(0.04);
  const heroDelays = animationConfig.staggering.hero;
  const warmBlobStyle = {
    top: '-140px',
    left: '8%',
    transform: `translateY(${parallaxOffset * 0.1}px)`
  } as React.CSSProperties;
  const softBlobStyle = {
    bottom: '-160px',
    right: '5%',
    transform: `translateY(${parallaxOffset * 0.2}px)`
  } as React.CSSProperties;
  const [activeSlide, setActiveSlide] = useState(0);
  const codeSlides = useMemo<{ id: string; content: ReactNode }[]>(
    () => [
      {
        id: 'engineer',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-purple-400">const</span>
              <span className="text-yellow-200">Engineer</span>
              <span className="text-primary">=</span>
              <span className="text-primary">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">name:</span>
              <span className="text-green-400">'Sourav Kumar'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">role:</span>
              <span className="text-green-400">'Frontend-Focused Full-Stack'</span>,
            </div>
            <div className="pl-6">
              <span className="text-muted">skills:</span>
              <span className="text-primary">[</span>
              <span className="text-cyan-400">'React'</span>,
              <span className="text-cyan-400">'Tailwind CSS'</span>,
              <span className="text-cyan-400">'Node.js'</span>
              <span className="text-primary">]</span>,
            </div>
            <div className="pl-6">
              <span className="text-muted">learning:</span>
              <span className="text-red-400">'Express.js'</span>
            </div>
            <div><span className="text-primary">{`}`}</span>;</div>
            <div className="pt-4 flex gap-2">
              <span className="text-purple-400">export default</span>
              <span className="text-yellow-200">Engineer</span>;
            </div>
          </>
        )
      },
      {
        id: 'focus',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-purple-400">const</span>
              <span className="text-yellow-200">Focus</span>
              <span className="text-primary">=</span>
              <span className="text-primary">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">ui:</span>
              <span className="text-green-400">'Clean, accessible interfaces'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">ux:</span>
              <span className="text-green-400">'Human-centered design'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">performance:</span>
              <span className="text-green-400">'Fast, scalable React apps'</span>
            </div>
            <div><span className="text-primary">{`}`}</span>;</div>
          </>
        )
      },
      {
        id: 'projects',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-purple-400">const</span>
              <span className="text-yellow-200">Projects</span>
              <span className="text-primary">=</span>
              <span className="text-primary">{`{`}</span>
            </div>
            <div className="pl-6">
              <span className="text-muted">frontend:</span>
              <span className="text-primary">[</span>
              <span className="text-cyan-400">'Quiz App'</span>,
              <span className="text-cyan-400">'Book Store'</span>,
              <span className="text-cyan-400">'Games'</span>
              <span className="text-primary">]</span>,
            </div>
            <div className="pl-6">
              <span className="text-muted">ml:</span>
              <span className="text-primary">[</span>
              <span className="text-cyan-400">'House Price Prediction'</span>,
              <span className="text-cyan-400">'Loan Defaulter'</span>
              <span className="text-primary">]</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">deployed:</span>
              <span className="text-emerald-400">true</span>
            </div>
            <div><span className="text-primary">{`}`}</span>;</div>
          </>
        )
      },
      {
        id: 'workstyle',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-purple-400">const</span>
              <span className="text-yellow-200">WorkStyle</span>
              <span className="text-primary">=</span>
              <span className="text-primary">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">mindset:</span>
              <span className="text-green-400">'Learn by building'</span>,
            </div>
            <div className="pl-6">
              <span className="text-muted">habits:</span>
              <span className="text-primary">[</span>
              <span className="text-cyan-400">'Clean code'</span>,
              <span className="text-cyan-400">'Refactoring'</span>,
              <span className="text-cyan-400">'UI polish'</span>
              <span className="text-primary">]</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">goal:</span>
              <span className="text-green-400">'Internship-ready engineer'</span>
            </div>
            <div><span className="text-primary">{`}`}</span>;</div>
          </>
        )
      },
      {
        id: 'availability',
        content: (
          <>
            <div className="flex gap-2">
              <span className="text-purple-400">const</span>
              <span className="text-yellow-200">Availability</span>
              <span className="text-primary">=</span>
              <span className="text-primary">{`{`}</span>
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">role:</span>
              <span className="text-green-400">'Frontend / Full-Stack Intern'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">location:</span>
              <span className="text-green-400">'India'</span>,
            </div>
            <div className="pl-6 flex gap-2">
              <span className="text-muted">year:</span>
              <span className="text-blue-400">2025</span>
            </div>
            <div><span className="text-primary">{`}`}</span>;</div>
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
    initial: { opacity: 0, x: 40, scale: 1 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      x: -40,
      scale: 0.98,
      transition: { duration: 0.45, ease: 'easeInOut' }
    }
  } as const;

  return (
    <section id="hero" className="hero-shell relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Effects */}
      <div className="gradient-blob hero-blob-warm" style={warmBlobStyle} aria-hidden="true"></div>
      <div className="gradient-blob hero-blob-soft" style={softBlobStyle} aria-hidden="true"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <HeroReveal delay={heroDelays * 0} initialTransform="translate3d(0, 0, 0) scale(0.95)" distance={0}>
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/90 text-[#b45309] text-xs font-semibold tracking-wide uppercase shadow-[0_15px_35px_rgba(255,221,173,0.45)]">
              <span className="relative flex h-2 w-2">
                <span className="motion-glow-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Student Builds, Fully Deployed
              <span className="text-muted" aria-hidden="true">•</span>
              Open for Internships
            </div>
          </HeroReveal>

          <HeroReveal delay={heroDelays * 1}>
            <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight leading-[1.1]">
              I build frontend &amp; ML projects
              <br className="hidden md:block" />
              and deploy them for real users.
            </h1>
          </HeroReveal>

          <HeroReveal delay={heroDelays * 2}>
            <p className="text-lg text-secondary max-w-xl leading-relaxed">
              Hi, I'm <span className="text-primary font-medium">Sourav Kumar</span>—a Computer Science Engineering student who learns by shipping. I design accessible UIs with HTML, CSS, and JavaScript, plug them into Java/Firebase services when needed, and turn ML notebooks into Flask web apps like my House Price and Loan Defaulter predictors.
            </p>
          </HeroReveal>

          <div className="flex flex-wrap items-center gap-4">
            <HeroReveal as="div" delay={heroDelays * 3}>
              <a
                href="#projects"
                className="button-glow-primary px-8 py-3.5 bg-cyan-500 text-[#0f172a] font-bold rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                View Projects
              </a>
            </HeroReveal>
            <HeroReveal as="div" delay={heroDelays * 3 + animationConfig.staggering.hero}>
              <a
                href="#contact"
                className="button-outline-secondary px-8 py-3.5 bg-transparent text-primary font-medium rounded-xl"
              >
                Contact Me
              </a>
            </HeroReveal>
          </div>

          <div className="flex items-center gap-4 pt-4 text-muted flex-wrap">
            <a href="https://github.com/skm151412" target="_blank" rel="noreferrer" className="icon-hover text-muted hover:text-primary transition-colors flex items-center gap-2" aria-label="Sourav's GitHub"><Github size={24} /> <span className="text-sm font-medium">GitHub</span></a>
            <div className="h-px w-12 bg-[#cbd5f5]"></div>
            <span className="text-sm text-muted">Live on Firebase · GitHub Pages · Render</span>
            <div className="h-px w-12 bg-[#cbd5f5]"></div>
            <span className="text-sm text-muted">Based in India</span>
          </div>
        </div>

        {/* Abstract Tech Visual */}
        <div className="hidden md:flex justify-center relative">
          <div className="relative w-full max-w-md aspect-square motion-float-slow">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-transparent to-transparent rounded-2xl border border-white/70 backdrop-blur-md transform rotate-3"></div>
            <div className="absolute inset-0 bg-white/95 rounded-2xl border border-white/80 backdrop-blur-md flex flex-col p-6 shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-6 border-b border-[#e2e8f0] pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-auto text-xs text-muted font-mono">App.tsx</span>
              </div>
              <div className="font-mono text-sm text-secondary">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCodeSlide?.id}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-4"
                  >
                    {activeCodeSlide?.content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* Decorative floaters */}
            <button
              type="button"
              onClick={handleAdvanceSlide}
              aria-label="Show next code insight"
              className="absolute -top-6 -right-6 p-4 glass-card rounded-xl shadow-lg motion-float-reverse transition-transform duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <Code2 className="text-[#2563eb]" size={24} />
            </button>
            <div className="absolute -bottom-8 -left-4 p-4 glass-card rounded-xl shadow-lg motion-float-slow">
              <Database className="text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. About Section
const About = () => {
  const stats: Stat[] = [
    { label: 'Production Deployments', value: '04', description: 'Firebase, GitHub Pages (x2), Render', countTarget: 4, padTo: 2 },
    { label: 'ML Projects', value: '02', description: 'House price + loan defaulter predictors', countTarget: 2, padTo: 2 },
  ];

  return (
    <section id="about" className="about-shell py-28 relative">
      <div className="gradient-blob about-blob" style={{ top: '-120px', right: '5%' }} aria-hidden="true"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Story */}
          <InViewReveal className="space-y-10" direction="left" threshold={0.35}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">About Sourav</h2>
              <DividerInView className="h-1 w-20 bg-cyan-500 mb-8 rounded-full" />
              <p className="text-secondary leading-relaxed text-lg">
                I learn by building a feature, putting it online, and collecting feedback. That loop has helped me ship quiz tooling on Firebase, interactive JavaScript interfaces on GitHub Pages, and ML predictors in Flask.
              </p>
            </div>

            <div className="space-y-6">
               {[
                 { title: 'Deploy-first mindset', desc: 'Firebase Hosting, Render, and GitHub Pages are part of my definition of done.' },
                 { title: 'Frontend-focused problem solving', desc: 'Quiz Portal UI, Book Store catalog, and small games built with HTML, CSS, and vanilla JavaScript.' },
                 { title: 'Practical ML exposure', desc: 'House and loan predictors trained with scikit-learn then surfaced through Flask forms.' }
               ].map((item, idx) => (
                 <InViewReveal key={item.title} className="flex gap-4 group" direction="up" delay={(idx + 1) * animationConfig.staggering.list} distance={12} threshold={0.35}>
                   <span className="text-2xl font-bold text-muted group-hover:text-cyan-500 transition-colors">0{idx + 1}</span>
                   <div>
                     <h3 className="text-xl font-semibold text-primary mb-1">{item.title}</h3>
                     <p className="text-secondary">{item.desc}</p>
                   </div>
                 </InViewReveal>
               ))}
            </div>
          </InViewReveal>

          {/* Right Column: The "Student Advantage" Card */}
          <InViewReveal className="relative" direction="right" threshold={0.35}>
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="relative glass-card rounded-2xl p-8 md:p-10 student-advantage-card">
              <h3 className="text-2xl font-bold text-primary mb-2">I learn by deploying</h3>
              <p className="text-secondary mb-8">
                Every project here is verifiable—Quiz Portal on Firebase, ML predictors on Render, and UI experiments on GitHub Pages. Shipping keeps me honest about edge cases, loading states, and documentation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <AnimatedStat key={stat.label} stat={stat} />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <Download className="text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-primary font-medium text-sm">Resume.pdf</div>
                    <div className="text-xs text-muted">Updated Jan 2026</div>
                  </div>
                </div>
                <a href="mailto:skm151412@gmail.com?subject=Resume%20Request" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
                  Request Copy <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </InViewReveal>

        </div>
      </div>
    </section>
  );
};

// 4. Skills Section
const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      description: 'Interfaces and interactions built with semantic HTML, modern CSS, and JavaScript.',
      icon: Layout,
      skills: ['HTML', 'CSS', 'JavaScript', 'Responsive UI', 'DOM Manipulation']
    },
    {
      title: 'Backend / Services',
      description: 'Lightweight services powering auth, scoring, and data access for student builds.',
      icon: Terminal,
      skills: ['Firebase Auth + Hosting', 'Java backend basics', 'REST Concepts']
    },
    {
      title: 'Machine Learning',
      description: 'Notebook-to-web workflows for price and risk prediction tools.',
      icon: Cpu,
      skills: ['Python', 'scikit-learn', 'Model Training', 'Inference via Flask']
    },
    {
      title: 'Deployment & Tools',
      description: 'Platforms I use to make projects reviewable by recruiters and mentors.',
      icon: Rocket,
      skills: ['Firebase Hosting', 'GitHub Pages', 'Render', 'Git & GitHub']
    }
  ];

  return (
    <section id="skills" className="skills-shell py-28 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <InViewReveal as="div" className="text-center mb-16" direction="up" distance={16}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Technical Arsenal</h2>
          <DividerInView className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full" />
          <p className="text-secondary max-w-2xl mx-auto">
            My stack is focused on the JavaScript ecosystem, utilizing strict typing and modern frameworks to build scalable web applications.
          </p>
        </InViewReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <InViewReveal key={category.title} delay={Math.floor(idx / 3) * animationConfig.staggering.cards} distance={16}>
              <div className="group glass-card p-8 rounded-2xl relative overflow-hidden skill-card">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <category.icon size={120} />
                </div>
                
                <div className="skill-icon w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center mb-6 text-cyan-400">
                  <category.icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-primary mb-2">{category.title}</h3>
                <p className="text-sm text-secondary mb-6 h-10">{category.description}</p>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-pill px-3 py-1 text-xs font-medium">
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

// 5. Projects Section
const Projects = () => {
  const projects: Project[] = [
    {
      id: 'quiz-portal',
      title: 'Quiz Portal',
      problem: 'Students needed timed, subject-wise quizzes with consistent scoring.',
      description: 'Built the full experience with HTML, CSS, and JavaScript, wired Firebase Auth for signup/login, and used Java services for timers, question pools, and auto scoring. Deployed on Firebase Hosting so mentors could review every build.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Java', 'Firebase Auth', 'Firebase Hosting'],
      imageUrl: quizImage,
      demoUrl: 'https://quiz-app-f2d9e.web.app/',
      repoUrl: 'https://github.com/skm151412/quiz-system-100q',
    },
    {
      id: 'house-price',
      title: 'House Price Prediction Model',
      problem: 'Needed fast property estimates based on location and home features.',
      description: 'Trained multiple scikit-learn regressors, picked the best performer through cross-validation, wrapped it with a clean Flask + HTML form, and deployed to Render so classmates could test results on their own data.',
      tech: ['Python', 'scikit-learn', 'Flask', 'HTML', 'Render'],
      imageUrl: housePricePredictionImage,
      demoUrl: 'https://house-price-prediction-model-posc.onrender.com/',
    },
    {
      id: 'loan-defaulter',
      title: 'Loan Defaulter Prediction',
      problem: 'College lab wanted a baseline indicator for high-risk loan applicants.',
      description: 'Cleaned lending data in pandas, engineered repayment-focused features, trained and evaluated multiple scikit-learn classifiers, and documented metrics plus confusion matrices inside the repo for reuse.',
      tech: ['Python', 'pandas', 'scikit-learn', 'EDA'],
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      repoUrl: 'https://github.com/2410030075/loan-defaulter',
    },
    {
      id: 'book-store-ui',
      title: 'Book Store UI',
      problem: 'Needed a searchable catalog to highlight student reading lists.',
      description: 'Designed a responsive layout, added live search filtering and add/remove actions with vanilla JavaScript, and shipped the build on GitHub Pages for mentors to browse.',
      tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      imageUrl: bookstoreImage,
      demoUrl: 'https://skm151412.github.io/book-store/',
      repoUrl: 'https://github.com/skm151412/book-store',
    },
    {
      id: 'browser-game',
      title: 'Interactive Browser Game',
      problem: 'Wanted a quick, fun way to practice JavaScript event handling.',
      description: 'Implemented keyboard controls, collision detection, and score tracking using vanilla JavaScript animations, then pushed the build to GitHub Pages for easy sharing.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Game Loop'],
      imageUrl: gameImage,
      demoUrl: 'https://skm151412.github.io/game/',
      repoUrl: 'https://github.com/skm151412/game',
    },
    {
      id: 'civic-issues',
      title: 'Crowdsourced Civic Issue Reporting (EPICS)',
      problem: 'Communities needed a single place to log civic issues and view responses.',
      description: 'Scoped citizen and authority flows, mocked up the map-based UI, and documented the overall system so the EPICS team could pilot reporting and status tracking with local stakeholders.',
      tech: ['UI/UX', 'System Design', 'Civic Tech'],
      imageUrl: civicfixImage,
      demoUrl: 'https://civicfix-821dd.web.app/',
      repoUrl: 'https://github.com/skm151412/civicfix',
    }
  ];

  return (
    <section id="projects" className="projects-shell py-28 relative">
      <div className="gradient-blob projects-blob" style={{ top: '-80px', left: '10%' }} aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Projects</h2>
            <p className="text-secondary">Each project links to a live deployment or repository so you can verify the work.</p>
          </div>
          <a href="https://github.com/skm151412" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-cyan-400 font-medium hover:underline underline-offset-4">
            View GitHub Profile <Github size={16} />
          </a>
        </div>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <InViewReveal
              key={project.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              delay={idx * 120}
            >
              <article className={`project-card glass-card w-full flex flex-col lg:flex-row gap-12 items-center p-8 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image Card */}
                <div className="w-full lg:w-1/2 group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <div className="aspect-video bg-white overflow-hidden relative">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                       <div className="absolute inset-0 bg-white/60 opacity-60 group-hover:opacity-30 transition-opacity duration-500" aria-hidden="true"></div>
                       <div className="project-overlay">
                         <p className="text-sm text-primary mb-3">{project.problem}</p>
                         <div className="flex flex-wrap gap-2">
                           {project.tech.slice(0, 4).map((tech, tagIdx) => (
                             <span
                               key={`${project.id}-${tech}-overlay`}
                               className="project-tag tech-pill px-3 py-1 text-xs font-semibold bg-white/85 text-primary rounded-full border border-white/70"
                               style={{ transitionDelay: `${tagIdx * 80}ms` }}
                             >
                               {tech}
                             </span>
                           ))}
                         </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Project 0{idx + 1}</div>
                  <h3 className="text-3xl font-bold text-primary">{project.title}</h3>
                  
                  <div className="p-4 rounded-lg bg-white/90 border-l-4 border-[#38bdf8]/40">
                    <p className="text-primary italic">"{project.problem}"</p>
                  </div>
                  
                  <p className="text-secondary leading-relaxed text-lg">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, techIdx) => (
                      <span
                        key={`${project.id}-${t}`}
                        className="tech-pill project-tech-pill px-3 py-1 text-sm"
                        style={{ transitionDelay: `${techIdx * 60}ms` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                     {project.repoUrl && (
                       <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-cyan-400 transition-colors">
                         <Github size={20} className="icon-hover" /> <span className="font-medium">Code</span>
                       </a>
                     )}
                     {project.demoUrl && (
                       <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-cyan-400 transition-colors">
                         <ExternalLink size={20} className="icon-hover" /> <span className="font-medium">Live Demo</span>
                       </a>
                     )}
                  </div>
                </div>
              </article>
            </InViewReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Deployments = () => {
  const platforms = [
    {
      name: 'Firebase Hosting',
      detail: 'Quiz Portal with authentication, quiz timers, and performance summaries.',
      link: 'https://quiz-app-f2d9e.web.app/'
    },
    {
      name: 'GitHub Pages',
      detail: 'Book Store UI and Interactive Browser Game deployed for instant demos.',
      link: 'https://skm151412.github.io/book-store/'
    },
    {
      name: 'Render',
      detail: 'House Price Prediction Flask app wrapping scikit-learn models.',
      link: 'https://house-price-prediction-model-posc.onrender.com/'
    }
  ];

  return (
    <section id="deployments" className="deployments-shell py-24">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Deployment proof</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">I don’t just build—I publish.</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Every project on this portfolio runs somewhere public. Deployments help mentors and recruiters validate the work without asking for a private walkthrough.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="glass-card p-6 flex flex-col gap-3 text-left">
              <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center shadow-inner">
                <Rocket className="text-[#2563eb]" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">{platform.name}</h3>
                <p className="text-sm text-secondary">{platform.detail}</p>
              </div>
              <a href={platform.link} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#2563eb] inline-flex items-center gap-1">
                View deployment <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Education Section
const Education = () => {
  return (
    <section id="education" className="education-shell py-28 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Education</h2>
          <p className="text-secondary">Academic path I'm currently pursuing.</p>
        </div>

        <div className="flex flex-col items-center mb-8" aria-hidden="true">
          <DividerInView className="h-12 w-px bg-cyan-500/40" />
          <div className="w-3 h-3 rounded-full bg-cyan-400 motion-glow-pulse"></div>
        </div>
        <InViewReveal direction="up" distance={12}>
          <div className="glass-card rounded-2xl p-10 flex flex-col gap-3 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-2">
              <GraduationCap className="text-cyan-400" size={24} />
            </div>
            <p className="text-xl font-semibold text-primary">B.Tech in Computer Science &amp; Engineering</p>
            <p className="text-secondary">KL Deemed to be University</p>
            <p className="text-sm text-muted">Currently Pursuing</p>
          </div>
        </InViewReveal>
      </div>
    </section>
  );
};

// 7. Contact Section
const Contact = () => {
  return (
    <section id="contact" className="contact-shell py-28 relative">
      <div className="gradient-blob contact-blob" style={{ top: '-60px', right: '15%' }} aria-hidden="true"></div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <InViewReveal direction="up" distance={16}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Ready to Contribute?</h2>
          <DividerInView className="h-1 w-24 bg-cyan-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-secondary mb-10 max-w-xl mx-auto">
            Open to internship opportunities and collaboration focused on frontend-heavy web applications.
          </p>
        </InViewReveal>

        <InViewReveal direction="up" distance={20} delay={120}>
          <div className="cta-card glass-card p-8 rounded-2xl inline-block w-full max-w-lg text-left">
            <div className="flex flex-col gap-4">
               <a
                 href="mailto:skm151412@gmail.com"
                 aria-label="Send an email to Sourav Kumar"
                 className="button-glow-primary flex items-center gap-3 w-full bg-cyan-500 text-[#0f172a] font-bold py-4 rounded-xl justify-center"
               >
                 <Mail size={20} />
                 skm151412@gmail.com
               </a>
               <a href="https://github.com/skm151412" target="_blank" rel="noreferrer" className="button-outline-secondary flex items-center justify-between w-full font-medium py-4 px-5 rounded-xl">
                 <span>GitHub Profile</span>
                 <ExternalLink size={20} className="icon-hover" />
               </a>
            </div>
            <p className="mt-6 text-sm text-muted text-center">
              I deploy on Firebase, GitHub Pages, and Render so reviewers can try everything themselves.
            </p>
          </div>
        </InViewReveal>
      </div>
    </section>
  );
};

// 8. Footer
const Footer = () => {
  return (
    <footer className="py-8 border-t border-[#e2e8f0] bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-secondary text-sm">
        <p className="text-secondary">© 2025 Sourav Kumar. Built with React & Tailwind CSS.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://github.com/skm151412" target="_blank" rel="noreferrer" className="hover:text-[#2563eb] transition-colors">GitHub</a>
          <a href="mailto:skm151412@gmail.com" className="hover:text-[#2563eb] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen light-page font-sans selection:bg-[rgba(37,99,235,0.18)] selection:text-[#0f172a]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
