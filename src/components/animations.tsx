import React, { useState, useEffect, useRef, ReactNode, ElementType, Key } from 'react';
import { Stat } from '../../types';

export type Direction = 'up' | 'down' | 'left' | 'right';

export const transitionCurve = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const animationConfig = {
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

export const usePrefersReducedMotion = () => {
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

export const useParallaxShift = (intensity = 0.02) => {
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

export const useCountUp = (target: number, isActive: boolean, prefersReducedMotion: boolean, duration = 900) => {
  const [value, setValue] = useState(target);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isActive || animatedRef.current) return;
    if (prefersReducedMotion || typeof window === 'undefined') {
      setValue(target);
      return;
    }

    animatedRef.current = true;
    let animationFrame: number;
    let startTime: number | null = null;
    const startValue = 1;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      setValue(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, isActive, prefersReducedMotion, target]);

  return value;
};

export const DividerInView = ({ className = '', delay = 0, threshold = 0.35 }: { className?: string; delay?: number; threshold?: number }) => {
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

export interface HeroRevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  distance?: number;
  duration?: number;
  initialTransform?: string;
  key?: Key;
}

export const HeroReveal = ({
  children,
  as: Component = 'div',
  delay = 0,
  className = '',
  distance = 20,
  duration = animationConfig.durations.base,
  initialTransform,
}: HeroRevealProps) => {
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

  const Comp = Component as any;

  return (
    <Comp
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
    </Comp>
  );
};

export interface InViewRevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  direction?: Direction;
  className?: string;
  threshold?: number;
  distance?: number;
  duration?: number;
  key?: Key;
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

export const InViewReveal = ({
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
  }, [prefersReducedMotion, threshold]);

  const Comp = Component as any;

  return (
    <Comp
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
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
    </Comp>
  );
};

export const AnimatedStat = ({ stat }: { stat: Stat; key?: Key }) => {
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
  const displayValue = active ? `${formattedNumber}${suffix}` : stat.value;

  return (
    <div
      ref={statRef}
      className="stat-card bg-[#26221E] border border-[#342F2A] p-4 rounded-[10px]"
    >
      <div className="text-3xl font-bold text-[#F59E0B] mb-1" aria-live="polite">
        {prefersReducedMotion ? stat.value : displayValue}
      </div>
      <div className="text-sm font-semibold text-[#F5F1EA] mb-1">{stat.label}</div>
      <div className="text-xs text-[#81796F]">{stat.description}</div>
    </div>
  );
};
