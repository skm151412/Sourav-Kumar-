import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { animationConfig, usePrefersReducedMotion } from './animations';

export const Navbar = () => {
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
      { threshold: 0.15, rootMargin: '-10% 0px -30% 0px' }
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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

  const navBackground = scrolled
    ? 'py-3.5 bg-[#11100F] border-b border-[#342F2A]'
    : 'py-5 bg-transparent';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-200 ${navBackground}`}
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
        <a 
          href="#" 
          className="text-xl font-bold tracking-tight text-[#F5F1EA] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] rounded-[4px]"
        >
          <span className="text-[#F59E0B] group-hover:text-[#FBBF24] transition-colors">&lt;</span>
          Sourav
          <span className="text-[#F59E0B] group-hover:text-[#FBBF24] transition-colors">/&gt;</span>
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
                className={`nav-link-animated text-[15px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] rounded-[4px] ${
                  isActive ? 'text-[#F59E0B] is-active' : 'text-[#B8B0A5] hover:text-[#F59E0B]'
                }`}
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
            href="/SOURAV_KUMAR.pdf"
            download="SOURAV_KUMAR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-animated text-[15px] font-medium text-[#B8B0A5] hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] rounded-[4px]"
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
            <Download size={14} className="text-[#F59E0B]" />
            Resume
          </a>
          <a
            href="#contact"
            className="px-4.5 py-2 text-[14px] font-semibold bg-[#F59E0B] hover:bg-[#FBBF24] text-[#11100F] rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.22)] hover:shadow-[0_4px_14px_rgba(245,158,11,0.20)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    transitionDelay: `${(navLinks.length + 2) * animationConfig.staggering.nav}ms`,
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
                  }
            }
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          id="mobile-menu-toggle"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-[#F5F1EA] hover:text-[#F59E0B] p-1.5 rounded-[8px] border border-transparent hover:border-[#342F2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-full left-0 w-full bg-[#171513] border-t border-b border-[#342F2A] p-5 sm:p-6 flex flex-col gap-3.5 max-h-[calc(100svh-4.5rem)] overflow-y-auto overflow-x-hidden shadow-[0_12px_24px_rgba(0,0,0,0.40)]"
        >
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={link.label} 
                href={link.href} 
                className={`flex items-center justify-between py-2 text-[15px] font-medium transition-colors border-b border-[#342F2A]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F59E0B] rounded-[4px] ${
                  isActive ? 'text-[#F59E0B] font-semibold' : 'text-[#B8B0A5] hover:text-[#F59E0B]'
                }`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="text-[11px] font-mono text-[#F59E0B] uppercase tracking-wider">active</span>
                )}
              </a>
            );
          })}
          <a
            href="/SOURAV_KUMAR.pdf"
            download="SOURAV_KUMAR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 bg-[#211E1B] border border-[#342F2A] text-[#F5F1EA] hover:text-[#F59E0B] hover:border-[#F59E0B] rounded-[10px] text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
            onClick={() => setIsOpen(false)}
          >
            <Download size={15} className="text-[#F59E0B]" />
            <span>Download Resume</span>
          </a>
          <a 
            href="#contact" 
            className="text-center py-2.5 bg-[#F59E0B] text-[#11100F] font-semibold text-[14px] rounded-[10px] hover:bg-[#FBBF24] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
            onClick={() => setIsOpen(false)}
          >
            Let's Talk
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
