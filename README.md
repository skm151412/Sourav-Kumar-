# Sourav Kumar — Developer Portfolio

## Live Portfolio
https://sourav-kumar-portfolio.firebaseapp.com/

## Overview
A personal developer portfolio for **Sourav Kumar**, a Computer Science & Engineering undergraduate student at KL Deemed to be University. The portfolio showcases deployed frontend web applications, vanilla JavaScript projects, and machine learning models running on production platforms.

## Features
- **Hero & Interactive Code Preview**: Real-time rotating architectural code snippets.
- **Direct Resume Access**: Direct download and in-browser preview for `SOURAV KUMAR.pdf`.
- **Verified Deployments**: Live links to functional applications deployed across Firebase Hosting, GitHub Pages, and Render.
- **Accessible Navigation**: Desktop navbar with scroll spy section detection and an accessible mobile drawer.
- **Categorized Skills**: Organized breakdown across Frontend, Core & Backend, and Tools & Workflows.
- **Direct Contact Hub**: Verified channels for email, GitHub, and LinkedIn outreach.

## Tech Stack
The portfolio application itself uses:
- React
- TypeScript
- Vite
- Framer Motion
- Lucide React

## Project Showcase
Each project is deployed live with open-source repositories across diverse technologies:
- **Quiz App**: React, Firebase, Tailwind CSS — Interactive quiz portal with timer mechanics, authentication, and instant score summaries. Deployed on Firebase Hosting.
- **House Price Prediction**: Python, Flask, Scikit-Learn, HTML/CSS — End-to-end regression model for predicting home values from housing metrics. Deployed on Render.
- **Book Store Application**: HTML5, CSS3, JavaScript — Responsive storefront interface with search filtering and cart interactions. Deployed on GitHub Pages.
- **Loan Defaulter Prediction**: Python, Machine Learning, Pandas, Classification — Exploratory data analysis and predictive classification algorithms evaluating financial risk.
- **Interactive 2D Browser Game**: JavaScript, HTML5 Canvas, CSS Animations — Vanilla JavaScript arcade game utilizing a `requestAnimationFrame` game loop and collision detection. Deployed on GitHub Pages.
- **CivicFix – Public Problem Reporting**: React, Firebase, Tailwind CSS — Civic issue reporting platform with Firestore status tracking and category filtering. Deployed on Firebase Hosting.

## Architecture
```
├── App.tsx                    # Root application component and layout composition
├── index.html                 # HTML entry point with metadata and fonts
├── public/                    # Static assets (including SOURAV_KUMAR.pdf)
├── src/
│   ├── assets/projects/       # Project interface screenshots
│   ├── components/
│   │   ├── About.tsx          # About bio, deployment metrics, and resume card
│   │   ├── Contact.tsx        # Direct contact actions (Email, GitHub, LinkedIn, Resume)
│   │   ├── Deployments.tsx    # Live deployment platform proof cards
│   │   ├── Education.tsx      # Academic background (B.Tech CSE)
│   │   ├── Footer.tsx         # Footer with copyright and profile links
│   │   ├── Hero.tsx           # Hero intro, call-to-action buttons, and code preview
│   │   ├── Navbar.tsx         # Header navigation, active section tracking, mobile menu
│   │   ├── ProjectCard.tsx    # Reusable project card with responsive layout and tags
│   │   ├── Projects.tsx       # Featured projects container
│   │   ├── Skills.tsx         # Technical skills categorized by domain
│   │   └── animations.tsx     # Framer Motion animation wrappers with reduced-motion support
│   ├── data/
│   │   ├── projects.ts        # Project metadata, tech tags, demo URLs, and GitHub links
│   │   └── skills.ts          # Categorized technical competencies
│   ├── index.css              # Global design tokens, typography, and utility classes
│   └── main.tsx               # Application bootstrap
├── firebase.json              # Firebase Hosting configuration with SPA rewrites
└── .firebaserc                # Firebase default project binding (sourav-kumar-portfolio)
```

## Accessibility
- **Skip to Main Content**: Keyboard-accessible bypass link directly targeting `<main id="main-content">`.
- **Keyboard Navigation**: Interactive elements feature high-visibility focus rings (`focus-visible:outline-2 focus-visible:outline-cyan-400`).
- **Semantic HTML & ARIA**: Contextual `aria-label` attributes on external links, SVG icons hidden with `aria-hidden="true"`, and mobile menu state marked with `aria-expanded`.
- **Reduced Motion**: Respects `prefers-reduced-motion` system settings via CSS media queries and custom React hook fallbacks.
- **Descriptive Alt Text**: All project screenshots provide contextual descriptions of the rendered user interface.

## Responsive Design
- **Mobile (< 640px)**: Single-column flows, minimum 44px touch targets, and collapsible navigation drawer.
- **Tablet (768px – 1024px)**: Multi-column skill cards and deployment grid.
- **Desktop (1024px – 1440px)**: Alternating project layout with high-resolution imagery and code preview terminal.
- **Large Desktop (> 1440px)**: Constrained container boundaries (`max-w-7xl`) preventing over-stretched content.

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```

## Firebase Deployment
The project is configured for **Firebase Hosting** under project ID `sourav-kumar-portfolio`:
- Hosting directory: `dist`
- Single Page Application rewrite rules route all paths (`**`) to `/index.html`.

Deploy to Firebase Hosting using the Firebase CLI:
```bash
# 1. Build the production bundle
npm run build

# 2. Deploy to Firebase Hosting
firebase deploy --only hosting
```
