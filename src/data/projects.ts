import { Project } from '../../types';
import araImage from '../assets/projects/ARA.png';
import quizImage from '../assets/projects/quiz.png';
import civicfixImage from '../assets/projects/civicfix.png';
import bookstoreImage from '../assets/projects/bookstore.png';
import gameImage from '../assets/projects/game.png';
import housePricePredictionImage from '../assets/projects/housePricePrediction.png';
import loanDefaultImage from '../assets/projects/LoanDefault.png';

export const projects: Project[] = [
  {
    id: 'academic-resource-allocation',
    title: 'Academic Resource Allocation System (ARA)',
    status: 'Deployed ML Application',
    problem: 'Manual classroom and lab scheduling leads to timetable conflicts, room contention, and inefficient campus space utilization.',
    description: 'Developed a full-stack, ML-assisted academic resource allocation platform that automatically assigns classrooms and labs from timetable data. Built with a Spring MVC & JPA backend and a React client, featuring automated conflict prevention logic and room utilization analysis. Deployed live with continuous cloud hosting.',
    tech: ['React', 'Java 17', 'Spring MVC', 'Machine Learning', 'JPA', 'Railway', 'Render'],
    imageUrl: araImage,
    demoUrl: 'https://assisted-academic-resource-allocation.onrender.com',
    repoUrl: 'https://github.com/skm151412/Assisted-Academic-Resource-Allocation-Using-ML',
  },
  {
    id: 'quiz-portal',
    title: 'Quiz Portal',
    status: 'Deployed Application',
    problem: 'Students needed a reliable web interface for timed, subject-wise quizzes with automated scoring.',
    description: 'Built a responsive web application using HTML, CSS, and JavaScript featuring countdown timers and instant quiz evaluation. Integrated Firebase Authentication for user accounts and Java services for structured quiz logic, deployed live on Firebase Hosting.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Java', 'Firebase Auth', 'Firebase Hosting'],
    imageUrl: quizImage,
    demoUrl: 'https://quiz-app-f2d9e.web.app/',
    repoUrl: 'https://github.com/skm151412/quiz-system-100q',
  },
  {
    id: 'house-price',
    title: 'House Price Prediction Model',
    status: 'Deployed ML Application',
    problem: 'Needed property price estimates based on continuous and categorical housing features.',
    description: 'Trained regression algorithms in Python using scikit-learn to predict property values from housing features. Packaged the trained model inside a Flask backend with a web form for inputs and deployed the application live on Render for real-time browser inference.',
    tech: ['Python', 'scikit-learn', 'Flask', 'HTML', 'Render'],
    imageUrl: housePricePredictionImage,
    demoUrl: 'https://house-price-prediction-model-posc.onrender.com/',
  },
  {
    id: 'loan-defaulter',
    title: 'Loan Defaulter Prediction',
    status: 'Academic Lab Project',
    problem: 'College lab coursework required evaluating credit risk and identifying indicators for high-risk loan applicants.',
    description: 'Collaborated on an academic machine learning lab project to analyze borrower risk factors. Performed data cleaning and exploratory data analysis using pandas, then trained baseline classification models in scikit-learn, documenting the training pipeline and confusion matrix metrics in the shared academic repository.',
    tech: ['Python', 'pandas', 'scikit-learn', 'EDA'],
    imageUrl: loanDefaultImage,
    repoUrl: 'https://github.com/2410030075/loan-defaulter',
  },
  {
    id: 'book-store-ui',
    title: 'Book Store UI',
    status: 'Deployed UI Application',
    problem: 'Needed an intuitive, searchable catalog interface for students to browse and select reading materials.',
    description: 'Built a responsive bookstore catalog interface using semantic HTML, CSS, and vanilla JavaScript DOM manipulation. Features real-time client-side search filtering across titles and categories, with interactive cart actions. Deployed and hosted live on GitHub Pages.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    imageUrl: bookstoreImage,
    demoUrl: 'https://skm151412.github.io/book-store/',
    repoUrl: 'https://github.com/skm151412/book-store',
  },
  {
    id: 'browser-game',
    title: 'Interactive Browser Game',
    status: 'Deployed UI Application',
    problem: 'Created to practice real-time DOM manipulation, collision detection, and event loop handling in JavaScript.',
    description: 'Developed an interactive 2D browser game using vanilla JavaScript and CSS animations. Implemented keyboard controls, requestAnimationFrame game loop timing, boundary collision detection, and dynamic score tracking. Published live on GitHub Pages.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Game Loop', 'GitHub Pages'],
    imageUrl: gameImage,
    demoUrl: 'https://skm151412.github.io/game/',
    repoUrl: 'https://github.com/skm151412/game',
  },
  {
    id: 'civic-issues',
    title: 'Crowdsourced Civic Issue Reporting',
    status: 'Academic Design Prototype',
    problem: 'Communities and academic teams needed structured workflows to document local civic issues and route them to authorities.',
    description: 'Designed as an academic prototype and system design project for the EPICS program. Mapped user workflows for citizens and municipal administrators, structured system specifications, and published an interactive frontend prototype on Firebase to demonstrate issue reporting flows for stakeholder feedback.',
    tech: ['System Design', 'UI/UX Prototype', 'HTML', 'CSS', 'Firebase'],
    imageUrl: civicfixImage,
    demoUrl: 'https://civicfix-821dd.web.app/',
    repoUrl: 'https://github.com/skm151412/civicfix',
  },
];
