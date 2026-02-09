import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  icon?: LucideIcon;
  level?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  description: string;
  tech: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
  countTarget?: number;
  suffix?: string;
  padTo?: number;
}
