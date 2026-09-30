import React from 'react';
import { Mail, ExternalLink, Download, Github, Linkedin } from 'lucide-react';
import { InViewReveal, DividerInView } from './animations';

export const Contact = () => {
  return (
    <section id="contact" className="contact-shell py-20 md:py-28 relative bg-[#11100F]">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <InViewReveal direction="up" distance={16}>
          <h2 className="text-[36px] sm:text-[44px] lg:text-[50px] font-bold text-[#F5F1EA] mb-6 leading-tight">Ready to Contribute?</h2>
          <DividerInView className="h-1 w-20 bg-[#F59E0B] mx-auto mb-6 rounded-full" />
          <p className="text-[16px] md:text-[18px] text-[#B8B0A5] mb-10 max-w-[65ch] mx-auto leading-[1.7]">
            Open to internship opportunities and collaboration focused on frontend-heavy web applications.
          </p>
        </InViewReveal>

        <InViewReveal direction="up" distance={20} delay={120}>
          <div className="cta-card bg-[#211E1B] border border-[#342F2A] p-6 sm:p-8 rounded-[16px] inline-block w-full max-w-lg text-left">
            <div className="flex flex-col gap-3.5">
              {/* Email */}
              <a
                href="mailto:skm151412@gmail.com"
                aria-label="Send an email to Sourav Kumar"
                className="button-glow-primary flex items-center justify-between w-full bg-[#F59E0B] hover:bg-[#FBBF24] text-[#11100F] font-bold py-3.5 px-5 rounded-[11px] transition-all group"
              >
                <span className="flex items-center gap-3">
                  <Mail size={20} />
                  <span>Email</span>
                </span>
                <span className="text-sm font-mono opacity-90 group-hover:underline">skm151412@gmail.com</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/skm151412"
                target="_blank"
                rel="noreferrer"
                className="button-outline-secondary flex items-center justify-between w-full bg-[#26221E] border border-[#342F2A] hover:border-[#F59E0B] hover:bg-[#2C2722] text-[#F5F1EA] font-medium py-3.5 px-5 rounded-[11px] transition-all group"
              >
                <span className="flex items-center gap-3 text-[#F5F1EA]">
                  <Github size={20} className="text-[#B8B0A5] group-hover:text-[#F59E0B] transition-colors" />
                  <span className="font-semibold">GitHub</span>
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#B8B0A5] group-hover:text-[#F59E0B] transition-colors">
                  <span>skm151412</span>
                  <ExternalLink size={18} className="icon-hover" />
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sourav-kumar-046165369/"
                target="_blank"
                rel="noreferrer"
                className="button-outline-secondary flex items-center justify-between w-full bg-[#26221E] border border-[#342F2A] hover:border-[#F59E0B] hover:bg-[#2C2722] text-[#F5F1EA] font-medium py-3.5 px-5 rounded-[11px] transition-all group"
              >
                <span className="flex items-center gap-3 text-[#F5F1EA]">
                  <Linkedin size={20} className="text-[#F59E0B]" />
                  <span className="font-semibold">LinkedIn</span>
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#B8B0A5] group-hover:text-[#F59E0B] transition-colors">
                  <span>sourav-kumar</span>
                  <ExternalLink size={18} className="icon-hover" />
                </span>
              </a>

              {/* Resume */}
              <a
                href="/SOURAV_KUMAR.pdf"
                download="SOURAV_KUMAR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline-secondary flex items-center justify-between w-full bg-[#26221E] border border-[#342F2A] hover:border-[#F59E0B] hover:bg-[#2C2722] text-[#F5F1EA] font-medium py-3.5 px-5 rounded-[11px] transition-all group"
              >
                <span className="flex items-center gap-3 text-[#F5F1EA]">
                  <Download size={20} className="text-[#F59E0B]" />
                  <span className="font-semibold">Resume</span>
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#B8B0A5] group-hover:text-[#F59E0B] font-medium transition-colors">
                  <span>SOURAV KUMAR.pdf</span>
                  <Download size={18} className="icon-hover" />
                </span>
              </a>
            </div>

            <p className="mt-6 text-sm text-[#81796F] text-center">
              I deploy on Firebase, GitHub Pages, and Render.
            </p>
          </div>
        </InViewReveal>
      </div>
    </section>
  );
};

export default Contact;
