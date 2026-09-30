import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-[#342F2A] bg-[#0D0C0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-sm text-center md:text-left">
        <p className="text-[#81796F]">© 2025 Sourav Kumar. Built with React &amp; Tailwind CSS.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-[#81796F]">
          <a href="https://github.com/skm151412" target="_blank" rel="noreferrer" className="hover:text-[#F59E0B] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/sourav-kumar-046165369/" target="_blank" rel="noreferrer" className="hover:text-[#F59E0B] transition-colors">LinkedIn</a>
          <a href="mailto:skm151412@gmail.com" className="hover:text-[#F59E0B] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
