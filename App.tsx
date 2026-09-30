import React from 'react';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import About from './src/components/About';
import Skills from './src/components/Skills';
import Projects from './src/components/Projects';
import Deployments from './src/components/Deployments';
import Education from './src/components/Education';
import Contact from './src/components/Contact';
import Footer from './src/components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-[#11100F] text-[#F5F1EA] font-sans selection:bg-[#F59E0B]/25 selection:text-[#F5F1EA]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#F59E0B] focus:text-[#11100F] focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Deployments />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
