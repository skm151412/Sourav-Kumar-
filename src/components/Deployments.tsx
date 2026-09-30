import React from 'react';
import { Rocket, ExternalLink } from 'lucide-react';

export const Deployments = () => {
  const platforms = [
    {
      name: 'Railway',
      detail: 'Assisted Academic Resource Allocation ML app with Spring API and React interface.',
      link: 'https://assisted-academic-resource-allocation.onrender.com'
    },
    {
      name: 'Render',
      detail: 'House Price Prediction Flask app wrapping scikit-learn models for live inference.',
      link: 'https://house-price-prediction-model-posc.onrender.com/'
    },
    {
      name: 'Firebase Hosting',
      detail: 'Quiz Portal with authentication, quiz timers, and performance summaries.',
      link: 'https://quiz-app-f2d9e.web.app/'
    },
    {
      name: 'GitHub Pages',
      detail: 'Book Store UI and Interactive Browser Game deployed for instant demos.',
      link: 'https://skm151412.github.io/book-store/'
    }
  ];

  return (
    <section id="deployments" className="deployments-shell py-20 md:py-24 bg-[#171513]">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-12">
        <div className="space-y-4">
          <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#81796F] font-mono">Deployment proof</p>
          <h2 className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-[#F5F1EA] leading-tight">I don’t just build—I publish.</h2>
          <p className="text-[16px] md:text-[18px] text-[#B8B0A5] max-w-[65ch] mx-auto leading-[1.7]">
            Every project on this portfolio runs somewhere public. Deployments help mentors and recruiters validate the work without asking for a private walkthrough.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform) => (
            <div key={platform.name} className="deployment-card bg-[#211E1B] border border-[#342F2A] hover:bg-[#26221E] hover:border-[#443D36] rounded-[14px] p-6 flex flex-col gap-3 text-left transition-all duration-200">
              <div className="w-11 h-11 rounded-[10px] bg-[#29251F] border border-[#342F2A] flex items-center justify-center text-[#F59E0B]">
                <Rocket size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#F5F1EA]">{platform.name}</h3>
                <p className="text-[14px] text-[#B8B0A5] mt-1 leading-relaxed">{platform.detail}</p>
              </div>
              <a href={platform.link} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-[#F59E0B] hover:text-[#FBBF24] inline-flex items-center gap-1.5 mt-auto transition-colors">
                <span>View deployment</span> <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deployments;
