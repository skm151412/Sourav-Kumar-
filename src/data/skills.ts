import { Layout, Terminal, Cpu, Rocket } from 'lucide-react';
import { SkillCategory } from '../../types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    description: 'Interfaces and responsive interactions built with semantic markup and JavaScript, with React powering this portfolio.',
    icon: Layout,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive UI', 'DOM Manipulation'],
  },
  {
    title: 'Backend / Services',
    description: 'Application services, authentication, and endpoints supporting student projects and data workflows.',
    icon: Terminal,
    skills: ['Java', 'Spring MVC', 'Firebase', 'REST Concepts', 'Flask'],
  },
  {
    title: 'Machine Learning',
    description: 'Data analysis and predictive modeling workflows with notebook experimentation deployed to web inference.',
    icon: Cpu,
    skills: ['Python', 'pandas', 'scikit-learn', 'Model Training', 'EDA', 'Flask Inference'],
  },
  {
    title: 'Tools / Deployment',
    description: 'Version control, modern build tooling, and hosting platforms used to ship projects to real users.',
    icon: Rocket,
    skills: ['Git', 'GitHub', 'Railway', 'Render', 'Firebase Hosting', 'GitHub Pages', 'Vite', 'TypeScript'],
  },
];
