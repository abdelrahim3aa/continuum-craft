import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Mail, ArrowRight, X, HeartHandshake, Zap, Code, ExternalLink, Briefcase, Link as LinkIcon, Download, Database, Phone, Laptop, GraduationCap, Eye, Rocket, Target, Layers } from 'lucide-react';
import {
  SiPhp, SiLaravel, SiMysql, SiNodedotjs, SiExpress, SiMongodb,
  SiHtml5, SiCss3, SiCplusplus, SiJavascript, SiDocker, SiGit,
  SiReact, SiComposer, SiLinux, SiPython, SiNpm
} from 'react-icons/si';
import portraitImage from '@/assets/portrait.jpg';
import fintechImage from '@/assets/project-fintech.jpg';
import subTrack from '@/assets/project-subTrack.jpg';
import ecommerceImage from '@/assets/project-ecommerce.jpg';
import noteApp from '@/assets/project-note.jpg';
import waterStation from '@/assets/project-water.jpg';
import cloudImage from '@/assets/project-cloud.jpg';
import newsImage from '@/assets/project-news.jpg';
import chatImage from '@/assets/project-chat.jpg';
import lmsImage from '@/assets/project-lms.jpg';
import Navigation from '@/components/Navigation';
import BackToTop from '@/components/BackToTop';
import ColorThemeSwitcher from '@/components/ColorThemeSwitcher';
import PwaLogoUrl from '@/assets/icons/logo-pwa.svg';// NEW IMPORTS FOR FILTERING

import { FilterSection, SortOption, FilterState } from '@/components/FilterSection';

// --- DATA STRUCTURES ---

const PROJECTS = [
  {
    id: 'p-01',
    title: 'Learning Management System (LMS)',
    client: 'Final Year Project',
    date: 'Feb 2025 – Mai 2025',
    role: 'Backend Team Lead & Backend Developer',
    priority: true,
    tag: 'Education Tech / Full Stack',
    stat: '500+',
    statLabel: 'Concurrent Users',
    problem: 'Educational institutions needed a robust platform to manage courses, assignments, and student progress with role-based access control for different user types (admin, instructor, student).',
    insight: 'The key challenge was designing a scalable architecture that could handle concurrent users while maintaining data integrity and implementing granular permissions without compromising performance.',
    solution: 'Architected a Laravel-based LMS with MySQL backend, implementing MVC pattern and Repository design pattern for clean, maintainable code. Integrated Angular for dynamic frontend interactions.',
    process: ['Requirements gathering and system design', 'Database schema design with normalized tables', 'Role-based access control implementation', 'Team management and sprint planning'],
    result: 'Successfully deployed system supporting 500+ concurrent users with 99.9% uptime. Led 5-person development team, managing sprints and deliverables using Agile methodology.',
    image: lmsImage,
    liveUrl: 'https://github.com/abdelrahim3aa/Learning-Management-Systems-LMS_GP',
    // ADDED FOR FILTERING
    type: ['Full Stack', 'Server Rendered', 'Education'],
    technology: ['Laravel', 'MySQL', 'PHP'],
  },
  {
    id: 'p-02',
    title: 'Real-Time Chat Application',
    client: 'Personal Project',
    date: 'Mar 2025 – Apr 2025',
    role: 'Full Stack Developer',
    priority: true,
    tag: 'Real-Time / WebSockets',
    stat: '1,000+',
    statLabel: 'Simultaneous Connections',
    problem: 'Modern applications require instant communication capabilities, but implementing real-time features with security and scalability poses significant technical challenges.',
    insight: 'Laravel Reverb combined with WebSockets provides an elegant solution for bi-directional communication, while event-driven architecture ensures message delivery remains fast even under load.',
    solution: 'Built scalable messaging platform using Laravel 12 and Reverb, implementing WebSocket protocols for real-time communication. Used Laravel Sanctum for secure token-based authentication.',
    process: ['WebSocket server setup and optimization', 'Event-driven architecture design', 'Authentication and authorization implementation', 'Load testing and performance tuning'],
    result: 'Platform handles 1,000+ simultaneous connections with sub-second message delivery. Reduced security vulnerabilities by 95% through proper authentication implementation.',
    image: chatImage,
    liveUrl: 'https://github.com/abdelrahim3aa/Real-time-chat-app',
    // ADDED FOR FILTERING
    type: ['Full Stack', 'Real-Time'],
    technology: ['Laravel', 'PHP', 'WebSockets'],
  },
  {
    id: 'p-03',
    title: 'E-commerce RESTful API',
    client: 'Personal Project',
    date: 'Oct 2024 – Nov 2024',
    role: 'Backend Developer',
    priority: false,
    tag: 'E-commerce / API Development',
    stat: '50K+',
    statLabel: 'Daily Requests',
    problem: 'E-commerce platforms require robust APIs to handle product management, orders, payments, and user authentication while maintaining high availability and performance.',
    insight: 'Proper API design following RESTful principles, combined with caching strategies and query optimization, is crucial for handling high traffic while maintaining fast response times.',
    solution: 'Developed comprehensive RESTful API using Laravel and MySQL, implementing OAuth 2.0 for secure authentication. Created OpenAPI-compliant documentation for easy integration.',
    process: ['RESTful endpoint design and implementation', 'OAuth 2.0 token-based authentication', 'Database query optimization and indexing', 'Redis caching implementation'],
    result: 'API handles 50,000+ daily requests with 99.5% uptime. Improved response times by 60% through database optimization and caching strategies.',
    image: ecommerceImage,
    liveUrl: 'https://github.com/abdelrahim3aa/ecommerce-restful-api',
    // ADDED FOR FILTERING
    type: ['Backend', 'API', 'E-commerce'],
    technology: ['Laravel', 'MySQL', 'PHP', 'API'],
  },
  {
    id: 'p-04',
    title: 'Newssy App',
    client: 'Personal Project',
    date: 'Aug 2024 – Sep 2024',
    role: 'Full Stack Developer',
    priority: false,
    tag: 'Content Management / Full Stack',
    stat: '5,000+',
    statLabel: 'Active Users',
    problem: 'News platforms need to deliver dynamic content efficiently to diverse user bases while supporting multiple languages and providing analytics for content performance.',
    insight: 'Implementing multi-language support from the ground up and optimizing content delivery through lazy loading significantly improves user experience and engagement across different demographics.',
    solution: 'Engineered news management system with Laravel and MySQL backend, implementing multi-language localization (Arabic, English, French) and developing analytics dashboard for content insights.',
    process: ['Content management system architecture', 'Multi-language localization implementation', 'Analytics dashboard development', 'Frontend optimization with lazy loading'],
    result: 'Platform supports 5,000+ users with 35% increase in user engagement. Reduced page load times by 45% through frontend optimization techniques.',
    image: newsImage,
    liveUrl: 'https://github.com/abdelrahim3aa/news-app-laravel',
    // ADDED FOR FILTERING
    type: ['Full Stack', 'Server Rendered', 'Content Management'],
    technology: ['Laravel', 'MySQL', 'PHP', 'Blade'],
  },
  {
    id: 'p-05',
    title: 'SubTrack API',
    client: 'Personal Project',
    date: 'Nov 2024 – Nov 2024',
    role: 'Backend Developer',
    priority: true,
    tag: 'Subscription Management / Backend API',
    stat: '99.9%',
    statLabel: 'Uptime Reliability',
    problem: 'Users struggle to track multiple recurring subscriptions across different services, often missing renewal dates and incurring unexpected charges. Manual tracking methods are inefficient and prone to human error, leading to financial waste and subscription management headaches.',
    insight: 'Automated email reminders sent at user-defined intervals before renewal dates, combined with secure token-based authentication and a comprehensive REST API, provide a reliable solution that proactively prevents missed payments while ensuring user data security.',
    solution: 'Built a high-performance subscription tracking backend with Node.js and Express, implementing JWT authentication with token revocation, automated cron-based email notifications, and a complete RESTful API for subscription CRUD operations.',
    process: [
      'RESTful API architecture with modular routing structure',
      'JWT authentication system with token blacklisting',
      'Automated cron job scheduler for renewal reminders',
      'Email notification system with HTML templates',
      'MongoDB schema design for users and subscriptions'
    ],
    result: 'Achieved 99.9% uptime reliability with automated daily checks for 1,000+ tracked subscriptions. Reduced missed renewals by 85% through precise email notifications. Token revocation system enhances security by preventing replay attacks.',
    image: subTrack, // Replace with your actual image
    liveUrl: 'https://github.com/abdelrahim3aa/Subscription-Tracker-API',
    features: [
      'JWT-based stateless authentication',
      'Automated email reminders (customizable timing)',
      'Token revocation & blacklisting',
      'Full CRUD operations for users & subscriptions',
      'Cron job scheduler with timezone support',
      'Rich HTML email templates (Nodemailer)',
      'MongoDB with Mongoose ODM',
      'RESTful API design (/api/v1 structure)'
    ],
    techStack: {
      backend: ['Node.js', 'Express.js'],
      database: ['MongoDB', 'Mongoose'],
      authentication: ['JWT', 'bcryptjs'],
      automation: ['node-cron'],
      email: ['Nodemailer'],
      utilities: ['dotenv']
    },
    metrics: {
      subscriptionsTracked: '1,000+',
      emailsSent: '5,000+',
      uptimePercentage: '99.9%',
      missedRenewalReduction: '85%',
      responseTime: '<100ms'
    },
    // ADDED FOR FILTERING
    type: ['Backend', 'API', 'Fintech'],
    technology: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    id: 'p-06',
    title: 'MVC Note-Taking Application',
    client: 'Personal Project',
    date: 'Oct 2024 – Nov 2024',
    role: 'Full-Stack Developer',
    priority: false,
    tag: 'Note-Taking / Full-Stack / MVC',
    stat: '99%',
    statLabel: 'Application Reliability',
    problem: 'Users often struggle to organize tasks and notes efficiently. Many basic note-taking tools lack a structured backend, user authentication, or an organized way to manage notes, leading to messy workflows and poor task tracking.',
    insight: 'Implementing a structured MVC architecture with secure user authentication and CRUD operations allows users to manage notes efficiently while keeping data organized, accessible, and secure.',
    solution: 'Built a full-stack MVC web application with PHP, JavaScript, and MySQL, implementing secure login/registration, CRUD functionality, note completion marking, responsive design, and OOP principles for clean, maintainable code.',
    process: [
      'Designed MVC architecture with Models, Views, and Controllers for separation of concerns',
      'Implemented secure user authentication with PHP sessions and password hashing',
      'Developed full CRUD functionality for notes management',
      'Enabled marking notes as completed for better organization',
      'Implemented responsive UI with custom CSS and Font Awesome icons',
      'Configured MySQL database with tables for users and notes',
      'Implemented error handling and logging mechanisms',
      'Optimized frontend with JavaScript for dynamic interactions'
    ],
    result: 'Delivered a fully functional note-taking application with reliable user authentication, smooth CRUD operations, and responsive design. Users can organize notes effectively, mark completion status, and interact seamlessly across devices.',
    image: noteApp, // Replace with your actual image import
    liveUrl: 'https://github.com/abdelrahim3aa/Note-Taking-Application',
    features: [
      'User Authentication (login/register)',
      'CRUD operations for notes',
      'Mark notes as completed',
      'Responsive design across devices',
      'MVC architecture for clean separation of concerns',
      'OOP principles for maintainable PHP code',
      'MySQL backend storage',
      'Session management for secure user state',
      'Error handling and logging',
      'Custom CSS for enhanced styling',
      'Font Awesome icons integration'
    ],
    techStack: {
      frontend: ['HTML', 'CSS', 'JavaScript'],
      backend: ['PHP'],
      database: ['MySQL'],
      utilities: ['Font Awesome']
    },
    metrics: {
      usersSupported: 'Unlimited',
      notesHandled: '1000+ per user',
      uptimePercentage: '99%',
      responseTime: '<200ms',
      successfulLogins: '1000+'
    },
    // ADDED FOR FILTERING
    type: ['Full-Stack', 'MVC', 'Note-Taking'],
    technology: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS']
  },
  {
    id: 'p-07',
    title: 'Water Stations PWA',
    client: 'Personal Project',
    date: 'Dec 2024 – Jan 2025',
    role: 'Full-Stack Developer',
    priority: true,
    tag: 'PWA / Laravel / Full-Stack',
    stat: '99%',
    statLabel: 'Application Reliability',
    problem: 'Water station operators and users need a reliable, offline-capable system to manage water supply, track usage, and generate reports. Traditional web apps fail when offline or under poor network conditions, causing delays and operational inefficiencies.',
    insight: 'A Progressive Web App (PWA) with offline support, JWT authentication, and a modular architecture ensures users can manage water stations reliably even with unstable internet, while maintaining security and performance.',
    solution: 'Built a full-stack PWA using Laravel for backend and HTML/CSS/JS for frontend, implementing secure JWT authentication, offline support via service workers, modular architecture, and database transactions. Included reporting, advanced logging, and queue jobs for reliable operations.',
    process: [
      'Designed backend using Laravel 12 with modular controllers and models',
      'Created 6 models with relationships and 4 controllers for core functionalities',
      'Implemented JWT authentication and middleware protection',
      'Developed frontend PWA with 3 HTML pages, responsive CSS, and 6 JavaScript modules',
      'Added service worker for offline support',
      'Implemented input validation, rate limiting, and database transactions',
      'Integrated reports system, advanced logging, and queue jobs',
      'Structured project folders for maintainability (backend/frontend separation)'
    ],
    result: 'Delivered a fast, secure, and reliable Water Station PWA with full offline functionality, robust JWT authentication, accurate reporting, and smooth user experience across devices. Improved operational reliability and user satisfaction.',
    image: waterStation, // Replace with your actual image import
    liveUrl: 'https://github.com/abdelrahim3aa/Water-station-PWA',
    features: [
      'Progressive Web App with offline support',
      'JWT authentication and middleware protection',
      'Responsive frontend design',
      'CRUD operations for water station management',
      'Database transactions for consistency',
      'Advanced logging and reporting system',
      'Queue jobs for asynchronous processing',
      'Input validation & rate limiting for security',
      'Modular MVC architecture',
      'Service worker for offline caching'
    ],
    techStack: {
      backend: ['Laravel 12', 'MySQL', 'JWT'],
      frontend: ['HTML', 'CSS', 'JavaScript', 'PWA'],
      security: ['Middleware', 'Validation', 'JWT', 'Rate Limiting'],
      utilities: ['Queue Jobs', 'Advanced Logging']
    },
    metrics: {
      uptimePercentage: '99%',
      offlineSupport: '100%',
      responseTime: '<200ms',
      usersSupported: 'Unlimited',
      jobsProcessed: 'Thousands'
    },
    // ADDED FOR FILTERING
    type: ['Full-Stack', 'PWA', 'Laravel', 'Management'],
    technology: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'PWA', 'JWT']
  }


];

// MODIFIED: Added 'iconColor' and 'textColor' properties for separate coloring
const CAPABILITIES = [
  { name: 'PHP', icon: SiPhp, iconColor: '#6c71bbff', textColor: '#6c71bbff' },
  { name: 'Laravel', icon: SiLaravel, iconColor: '#f91f14ff', textColor: '#f91f14ff' },
  { name: 'MySQL', icon: SiMysql, iconColor: '#00758F', textColor: '#F29111' }, // Dolphin colors
  { name: 'Node.js', icon: SiNodedotjs, iconColor: '#299c29ff', textColor: '#299c29ff' },
  { name: 'Express.js', icon: SiExpress, iconColor: '#000000', textColor: '#000000' },
  { name: 'MongoDB', icon: SiMongodb, iconColor: '#47A248', textColor: '#47A248' },
  { name: 'HTML5', icon: SiHtml5, iconColor: '#e64b20ff', textColor: '#e64b20ff' },
  { name: 'CSS3', icon: SiCss3, iconColor: '#1572B6', textColor: '#1572B6' },
  { name: 'C++', icon: SiCplusplus, iconColor: '#00599C', textColor: '#00599C' },
  { name: 'JavaScript', icon: SiJavascript, iconColor: '#F7DF1E', textColor: '#F7DF1E' },
  { name: 'Docker', icon: SiDocker, iconColor: '#2496ED', textColor: '#2496ED' },
  { name: 'Git', icon: SiGit, iconColor: '#F05032', textColor: '#F05032' },
  { name: 'React', icon: SiReact, iconColor: '#61DAFB', textColor: '#61DAFB' },
  { name: 'Composer', icon: SiComposer, iconColor: '#885630', textColor: '#885630' },
  { name: 'Linux', icon: SiLinux, iconColor: '#FCC624', textColor: '#FCC624' },
  { name: 'Python', icon: SiPython, iconColor: '#3776AB', textColor: '#FFD43B' }, // Blue and yellow
  { name: 'npm', icon: SiNpm, iconColor: '#CB3837', textColor: '#CB3837' },
  { name: 'SQL', icon: Database, iconColor: '#8f0086ff', textColor: '#8f0086ff' }, // Using MySQL icon for SQL
  { name: 'PWA', iconUrl: PwaLogoUrl, iconColor: '#00AFFF', textColor: '#00AFFF' }
];

const PHILOSOPHY = [
  {
    title: 'Clean Code Advocate',
    icon: Code,
    text: 'Following SOLID principles and writing maintainable code isn\'t just best practice—it\'s a commitment to future developers and the longevity of the project. Every function should do one thing well.'
  },
  {
    title: 'Problem Solver',
    icon: Zap,
    text: 'Backend development is about solving complex problems with elegant solutions. Whether optimizing database queries or architecting scalable APIs, the goal is always clarity and efficiency.'
  },
  {
    title: 'Continuous Learner',
    icon: HeartHandshake,
    text: 'Technology evolves rapidly, and staying current is essential. From mastering Laravel patterns to exploring new tools like Docker and WebSockets, growth is a daily practice.'
  },
];

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'Team Leadership',
    description: 'Led 5-person development team using Agile methodology for LMS project'
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    description: 'Reduced page load times by 45% through frontend optimization techniques'
  },
  {
    icon: '🔒',
    title: 'Security Excellence',
    description: 'Reduced security vulnerabilities by 95% through proper authentication implementation'
  },
  {
    icon: '📈',
    title: 'Scalability',
    description: 'Built systems handling 50,000+ daily requests with 99.5% uptime'
  }
];

// --- CUSTOM HOOKS ---

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const storedMode = localStorage.getItem('darkMode');
      return storedMode ? JSON.parse(storedMode) : true;
    } catch {
      return true;
    }
  });

  const toggleMode = useCallback(() => {
    setDarkMode((prev: boolean) => {
      const newMode = !prev;
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode));
        document.documentElement.classList.toggle('dark', newMode);
      } catch {
        // Silent fail
      }
      return newMode;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return [darkMode, toggleMode] as const;
};

const useDebouncedCallback = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

// --- UTILITY COMPONENTS ---

const CustomCursor = ({ cursorText }: { cursorText: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMoveDebounced = useDebouncedCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, 10);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMoveDebounced as any);
    return () => {
      window.removeEventListener('mousemove', onMouseMoveDebounced as any);
    };
  }, [onMouseMoveDebounced]);

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: cursorText ? 1.5 : 1,
        opacity: cursorText ? 1 : 0.8,
        width: cursorText ? 100 : 20,
        height: cursorText ? 100 : 20,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      aria-hidden="true"
    >
      <div className={`w-full h-full rounded-full ${cursorText ? 'bg-accent' : 'bg-foreground'} flex items-center justify-center`}>
        {cursorText && (
          <span className="text-sm font-medium text-accent-foreground">
            {cursorText}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const ToggleDarkMode = ({ darkMode, toggleMode }: { darkMode: boolean; toggleMode: () => void }) => {
  const Icon = darkMode ? Sun : Moon;
  const text = darkMode ? 'Light Mode' : 'Dark Mode';

  return (
    <motion.button
      onClick={toggleMode}
      className="flex items-center space-x-2 p-2 rounded-full border border-divider transition-colors duration-300 hover:bg-accent/10 absolute top-8 right-8 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      aria-label={text}
    >
      <Icon size={20} />
      <span className="text-sm font-medium hidden sm:inline">{text}</span>
    </motion.button>
  );
};

// --- SECTION COMPONENTS ---

const Hero = ({ handleHover, handleLeave }: { handleHover: (text: string) => void; handleLeave: () => void }) => {
  return (
    <header id="home" className="min-h-[90vh] flex items-center pt-32 pb-48 max-w-[1600px] mx-auto">
      <motion.div
        className="grid lg:grid-cols-7 gap-16 w-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Mobile Portrait - Small Circle */}
          <motion.div
            className="lg:hidden flex justify-center mb-8"
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.2 } } }}
          >
            <img
              src={portraitImage}
              alt="Abdelrahim Abuelmaaref"
              className="w-24 h-24 object-cover rounded-full border-2 border-accent shadow-lg"
            />
          </motion.div>

          <motion.div className="flex items-center gap-3 flex-wrap">
            <motion.h2
              className="text-lg font-bold tracking-wide"
              style={{ fontFamily: "'Poppins', 'Montserrat', 'Roboto', sans-serif" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {"Abdelrahim Abuelmaaref".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "grayscale(0%)",
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + index * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.4,
                    filter: "grayscale(100%) brightness(0.7)",
                    rotate: [0, -10, 10, -5, 0],
                    y: -5,
                    transition: {
                      duration: 0.4,
                      rotate: { duration: 0.5 }
                    }
                  }}
                  className="inline-block cursor-pointer transition-all duration-200 text-accent drop-shadow-[0_0_15px_hsl(var(--accent)/0.6)] hover:text-muted-foreground hover:drop-shadow-none"
                  style={{
                    fontWeight: 600,
                    letterSpacing: "0.02em"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              className="text-sm font-light text-muted-foreground"
              style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Junior Full-Stack Developer
            </motion.p>
          </motion.div>
          <motion.h1
            className="text-balance font-extrabold leading-tight tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            variants={{
              hidden: { scale: 0.98, opacity: 0, filter: 'blur(5px)' },
              visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } }
            }}
          >
            Building scalable web applications
            <span className="text-accent">.</span>
          </motion.h1>
          <motion.p
            className="text-xl font-light mt-6 text-muted-foreground max-w-2xl"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
          >
            Full-Stack Developer focused on Backend. Skilled in{' '}
            <span className="font-medium text-primary/50 hover:text-[#9CFF00] transition-colors duration-200">
              PHP/Laravel
            </span>,{' '}
            <span className="font-medium text-primary/50 hover:text-[#9CFF00] transition-colors duration-200">
              Node.js/Express
            </span>, and{' '}
            <span className="font-medium text-primary/50 hover:text-[#9CFF00] transition-colors duration-200">
              MERN stack
            </span>. Passionate about clean, scalable, and maintainable web applications.
          </motion.p>


          <div className="flex flex-wrap gap-4 mt-12">
            <motion.a
              href="mailto:abdelrahimabuelmaaref@gmail.com"
              className="text-lg font-medium tracking-wider inline-flex items-center group relative text-accent hover:text-accent/80 transition-colors"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.4 } } }}
              onMouseEnter={() => handleHover('TALK')}
              onMouseLeave={handleLeave}
              aria-label="Start Conversation via Email"
            >
              Start Conversation
              <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="/AbdelrahimAbuelmaaref-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium tracking-wider inline-flex items-center group relative border border-accent/50 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 px-6 py-2 rounded-lg"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5 } } }}
              onMouseEnter={() => handleHover('Resume')}
              onMouseLeave={handleLeave}
              aria-label="Preview Resume"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview
            </motion.a>

            <motion.a
              href="/AbdelrahimAbuelmaaref-Resume.pdf"
              download="Abdelrahim_Abuelmaaref_Resume.pdf"
              className="text-lg font-medium tracking-wider inline-flex items-center group relative bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 px-6 py-2 rounded-lg"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.6 } } }}
              onMouseEnter={() => handleHover('Resume')}
              onMouseLeave={handleLeave}
              aria-label="Download Resume"
            >
              <Download className="w-5 h-5 mr-2" />
              Download
            </motion.a>
          </div>
        </div>

        <motion.div
          className="lg:col-span-2 hidden lg:flex justify-end relative"
          variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.8 } } }}
        >
          <div className="relative aspect-[4/6] w-full rounded-xl p-1.5 bg-gradient-to-br from-secondary via-primary to-accent shadow-2xl">
            <div
              className="w-full h-full overflow-hidden rounded-lg relative"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 80% 100%, 0% 100%)'
              }}
            >
              <img
                src={portraitImage}
                alt="Professional Portrait"
                className="w-full h-full object-cover transition-opacity duration-500 opacity-90"
                loading="eager"
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24 max-w-[1600px] mx-auto px-4 sm:px-8">

    {/* IMPACTFUL HEADER */}
    <motion.h2
      className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-center sm:text-left max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Building the Next-Gen Stack.
      </span>
    </motion.h2>
    <motion.p
      className="text-xl font-light leading-relaxed mb-12 text-muted-foreground max-w-7xl mx-auto text-center sm:text-left"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.1 }}
    >
      A dedicated Full-Stack Developer focused on scalable and robust solutions.
    </motion.p>

    <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

      {/* PERSONAL SUMMARY */}
      <motion.div
        className="lg:col-span-1 space-y-8"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground border-b border-divider pb-2 flex items-center gap-2">
            <Target size={20} className="text-accent" /> My Focus
          </h3>

          {/* Enhanced Highlighted Points with Cards */}
          <div className="space-y-4">
            {[
              {
                icon: Layers,
                title: "Full-Stack Expertise",
                description: "Hands-on experience with PHP, Laravel, Node.js, Express, MERN stack. Build scalable web applications and RESTful APIs.",
                gradient: "from-blue-500/20 to-purple-500/20",
                iconColor: "text-blue-500"
              },
              {
                icon: Zap,
                title: "Performance & Clean Code",
                description: "Writing clean, maintainable code following SOLID principles and best practices.",
                gradient: "from-amber-500/20 to-orange-500/20",
                iconColor: "text-amber-500"
              },
              {
                icon: Rocket,
                title: "Projects & Impact",
                description: "Developed real-time chat apps, e-commerce APIs, LMS platforms serving thousands of users.",
                gradient: "from-emerald-500/20 to-teal-500/20",
                iconColor: "text-emerald-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className={`relative p-4 rounded-xl border border-divider/50 bg-gradient-to-br ${item.gradient} backdrop-blur-sm overflow-hidden group cursor-default`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg bg-card/80 ${item.iconColor} flex items-center justify-center shadow-sm`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <item.icon size={20} />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-base mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>


      {/* CORE STRENGTHS CARD */}
      <motion.div
        className="p-6 sm:p-8 rounded-xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 relative overflow-hidden group h-full shadow-md hover:shadow-2xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-card transition-all duration-300">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Core Strengths</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border border-divider/50 hover:bg-primary/5 transition-colors duration-300">
              <p className="text-base font-semibold text-primary mb-1 flex items-center gap-2">
                <Laptop size={16} /> Backend Proficiency
              </p>
              <p className="text-sm text-muted-foreground">
                Expert in <strong>Laravel, Node/Express, RESTful API design</strong> and <strong>MySQL & MongoDB</strong>
              </p>
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-divider/50 hover:bg-primary/5 transition-colors duration-300">
              <p className="text-base font-semibold text-primary mb-1 flex items-center gap-2">
                <HeartHandshake size={16} /> Clean Code Advocate
              </p>
              <p className="text-sm text-muted-foreground">
                Committed to <strong>SOLID principles, MVC architecture</strong>, and automated testing.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* EDUCATION CARD */}
      <motion.div
        className="p-6 sm:p-8 rounded-xl border border-accent/20 bg-gradient-to-br from-card via-card to-accent/10 relative overflow-hidden group h-full shadow-md hover:shadow-2xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-card transition-all duration-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
          </div>

          <p className="text-xl font-semibold mb-2">
            Bachelor of Computers & AI
          </p>
          <p className="text-base text-muted-foreground mb-6 flex items-center gap-2">
            <span className="text-accent">📍</span>
            Sohag University | Sept 2021 – June 2025
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border border-divider/50 hover:bg-accent/10 transition-colors duration-300">
              <p className="text-sm font-medium text-accent mb-2">Relevant Coursework</p>
              <p className="text-sm text-muted-foreground">
                Data Structures & Algorithms • Database Management • Web Development • Software Engineering
              </p>
            </div>

            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-accent mb-1">Final Year Project</p>
                  <p className="text-base font-semibold mb-2">AI Learning Management System (AI-LMS)</p>
                  <p className="text-sm text-muted-foreground">
                    Laravel-based LMS supporting 500+ concurrent users with role-based access control
                  </p>
                </div>
                <motion.a
                  href="https://github.com/abdelrahim3aa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-accent/10 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View LMS project on GitHub"
                >
                  <Github size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  </section>
);


// Updated component definition to accept 'projects' prop
const PriorityProjectsGrid = ({
  projects, // <--- ADDED PROP
  handleHover,
  handleLeave,
  toggleProjectExpansion
}: {
  projects: typeof PROJECTS; // <--- ADDED TYPE
  handleHover: (text: string) => void;
  handleLeave: () => void;
  toggleProjectExpansion: (id: string) => void;
}) => {
  // const priorityProjects = PROJECTS.filter(p => p.priority); // REMOVED: Now uses the 'projects' prop

  return (
    <section id="priority-work" className="py-24 max-w-[1600px] mx-auto">
      <motion.h2
        className="text-4xl sm:text-5xl font-light tracking-wide mb-12 max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Featured Projects <Briefcase size={36} className="inline-block ml-2 mb-1 text-accent" />
      </motion.h2>
      <motion.p
        className="text-xl font-light max-w-3xl mb-16 leading-relaxed text-muted-foreground"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
      >
        Real-world projects showcasing technical problem-solving and measurable results.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-10">
        {projects.length > 0 ? ( // Use the 'projects' prop
          projects.map((project) => (
            <motion.div
              key={project.id}
              className="p-6 rounded-xl border border-divider bg-card relative overflow-hidden flex flex-col justify-between h-full group transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => handleHover('VIEW')}
              onMouseLeave={handleLeave}
            >
              <div className="z-10">
                <span className="text-xs font-mono uppercase tracking-widest block mb-4 text-accent">{project.tag}</span>
                <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                <p className="text-base font-light mb-8 text-muted-foreground">{project.problem}</p>
              </div>

              <div className="flex justify-between items-end border-t border-divider pt-4">
                <div>
                  <p className="text-4xl font-extrabold text-accent">{project.stat}</p>
                  <p className="text-xs uppercase font-medium mt-1 text-muted-foreground">{project.statLabel}</p>
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium transition-colors hover:text-accent hover:underline"
                >
                  View on GitHub
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="lg:col-span-2 text-center py-12 text-xl text-muted-foreground">
            No featured projects match the current filters.
          </div>
        )}
      </div>
    </section>
  );
};

// Updated component definition to accept 'projects' prop
const WorkTimeline = ({
  projects, // <--- ADDED PROP
  expandedProjects,
  toggleProjectExpansion,
  handleHover,
  handleLeave
}: {
  projects: typeof PROJECTS; // <--- ADDED TYPE
  expandedProjects: string[];
  toggleProjectExpansion: (id: string) => void;
  handleHover: (text: string) => void;
  handleLeave: () => void;
}) => (
  <section id="work-archive" className="py-24 max-w-[1600px] mx-auto">
    <motion.h2
      className="text-4xl sm:text-5xl font-light tracking-wide mb-24 max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      All Projects
    </motion.h2>

    <div className="relative border-l-2 border-divider ml-4 lg:ml-0">
      {projects.length > 0 ? ( // Use the 'projects' prop
        projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="mb-24 lg:ml-24 pl-6 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="absolute left-0 top-1 w-4 h-4 rounded-full bg-foreground -translate-x-[calc(100%+3px)]"
              aria-hidden="true"
            />

            <ProjectPreview
              project={project}
              isExpanded={expandedProjects.includes(project.id)}
              toggleProjectExpansion={toggleProjectExpansion}
              handleHover={handleHover}
              handleLeave={handleLeave}
            />
          </motion.div>
        ))
      ) : (
        <motion.div
          className="lg:ml-24 pl-6 py-12 text-xl text-muted-foreground"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          No projects match the current filters.
        </motion.div>
      )}
    </div>
  </section>
);

const ProjectPreview = ({
  project,
  isExpanded,
  toggleProjectExpansion,
  handleHover,
  handleLeave
}: any) => {
  const handleToggle = () => {
    toggleProjectExpansion(project.id);
  };

  return (
    <article className="rounded-xl overflow-hidden relative">
      <motion.div
        className="cursor-pointer rounded-xl p-8 border border-divider hover:bg-muted/5"
        onClick={handleToggle}
        animate={{
          backgroundColor: isExpanded ? 'hsl(var(--muted))' : 'transparent',
          borderColor: isExpanded ? 'hsl(var(--accent))' : 'hsl(var(--divider))'
        }}
        transition={{ duration: 0.3 }}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`case-study-${project.id}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-medium mb-1">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.role} ({project.date})</p>
          </div>
          <div className="p-2 rounded-full border border-accent text-accent">
            {isExpanded ? <X size={20} aria-label="Collapse" /> : <ArrowRight size={20} aria-label="Expand" />}
          </div>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`case-study-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            className="overflow-hidden pt-8 px-4 sm:px-8"
          >
            <CaseStudyContent project={project} handleHover={handleHover} handleLeave={handleLeave} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

const CaseStudyContent = ({ project, handleHover, handleLeave }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.4 }}
    className="space-y-12 pb-8"
  >
    <div className="grid md:grid-cols-2 gap-8">
      <ContentBlock title="Problem" text={project.problem} />
      <ContentBlock title="Insight" text={project.insight} highlighted />
    </div>

    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative overflow-hidden rounded-xl group"
      onMouseEnter={() => handleHover('VIEW SITE')}
      onMouseLeave={handleLeave}
    >
      <img
        src={project.image}
        alt={`Mockup for ${project.title}`}
        className="w-full h-auto shadow-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm bg-black/30 text-white group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        <ExternalLink size={20} />
      </div>
    </a>

    <ContentBlock title="Solution" text={project.solution} />

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xl font-medium mb-4 text-accent">Process</h4>
        <ul className="list-none space-y-3">
          {project.process.map((step: string, i: number) => (
            <li key={i} className="flex items-start text-base font-light text-muted-foreground">
              <span className="mr-3 font-bold text-accent">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
      <ContentBlock title="Result" text={project.result} />
    </div>
  </motion.div>
);

const ContentBlock = ({ title, text, highlighted }: { title: string; text: string; highlighted?: boolean }) => (
  <div className={highlighted ? 'rounded-xl p-6 border border-divider bg-muted/30' : ''}>
    <h4 className="text-xl font-medium mb-4">{title}</h4>
    <p className="text-base font-light text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

// FIX IMPLEMENTED HERE
const CapabilitySignal = () => {
  const [activeCap, setActiveCap] = useState<string | null>(null);

  return (
    <section id="capabilities" className="py-24 max-w-[1600px] mx-auto px-4 sm:px-8">
      <motion.h2
        className="text-4xl sm:text-5xl font-light tracking-wide mb-24 max-w-7xl text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Tech Stack
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-4xl mx-auto">
        {CAPABILITIES.map((cap, index) => {
          const isActive = activeCap === cap.name;
          
          return (
            <motion.div
              key={cap.name}
              className="relative w-16 h-16 flex flex-col items-center justify-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              role="img"
              aria-label={`${cap.name} technical skill`}
              onClick={() => setActiveCap(isActive ? null : cap.name)}
              onMouseEnter={() => setActiveCap(cap.name)}
              onMouseLeave={() => setActiveCap(null)}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  rotate: isActive ? 3 : 0,
                  color: isActive ? cap.iconColor : 'hsl(var(--foreground) / 0.7)',
                  filter: isActive && (cap.icon || cap.iconUrl) ? `drop-shadow(0px 0px 8px ${cap.iconColor})` : 'none'
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  color: { duration: 0.3 },
                  filter: { duration: 0.3 }
                }}
                className="flex items-center justify-center"
              >
                {cap.icon ? (
                  <cap.icon size={48} />
                ) : cap.iconUrl ? (
                  <img src={cap.iconUrl} alt={cap.name} className="w-12 h-12" style={{ filter: isActive ? 'none' : 'grayscale(50%) opacity(0.7)' }} />
                ) : null}
              </motion.div>

              <AnimatePresence>
                {isActive && (
                  <motion.span
                    className="absolute -bottom-8 text-sm font-medium whitespace-nowrap"
                    style={{ color: cap.textColor }}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cap.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const HumanLayer = () => (
  <section id="philosophy" className="py-24 max-w-[1600px] mx-auto">
    <motion.h2
      className="text-4xl sm:text-5xl font-light tracking-wide mb-24 max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      My Approach
    </motion.h2>
    <div className="grid lg:grid-cols-3 gap-12">
      {PHILOSOPHY.map((item, index) => (
        <motion.div
          key={item.title}
          className="p-8 rounded-xl border border-divider bg-card relative overflow-hidden group"
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.6,
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{
            y: -10,
            transition: { duration: 0.3 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
          >
            <item.icon
              size={40}
              className="mb-6 text-accent group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {item.title}
          </motion.h3>

          <motion.p
            className="text-base font-light leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {item.text}
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-accent"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
          />
        </motion.div>
      ))}
    </div>
  </section>
);

const ContactLayer = ({ handleHover, handleLeave }: any) => (
  <section id="contact" className="py-32 max-w-[1600px] mx-auto text-center">
    <motion.h2
      className="text-4xl sm:text-5xl font-light tracking-wide mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Get In Touch
    </motion.h2>
    <motion.a
      href="mailto:abdelrahim.abuelmaaref@gmail.com"
      className="text-2xl sm:text-4xl lg:text-6xl font-extralight tracking-tighter mb-12 block group relative w-fit mx-auto transition-colors duration-300 hover:text-accent break-all px-4"
      whileHover={{ scale: 1.02 }}
    >
      abdelrahim.abuelmaaref@gmail.com
      <motion.span
        className="absolute left-0 bottom-0 w-full h-[2px] rounded-full bg-accent origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>

    <motion.div
      className="flex justify-center space-x-8 mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.4 }}
    >
      <SocialIcon Icon={Linkedin} href="https://linkedin.com/in/elmaaref" label="LinkedIn" handleHover={handleHover} handleLeave={handleLeave} />
      <SocialIcon Icon={Github} href="https://github.com/abdelrahim3aa" label="GitHub" handleHover={handleHover} handleLeave={handleLeave} />
      <SocialIcon Icon={Phone} href="tel:+201015366195" label="Phone" handleHover={handleHover} handleLeave={handleLeave} />
    </motion.div>
  </section>
);

const SocialIcon = ({ Icon, href, label, handleHover, handleLeave }: any) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full border border-divider opacity-50 hover:opacity-100 transition-all duration-300"
    whileHover={{ scale: 1.1 }}
    onMouseEnter={() => handleHover(label)}
    onMouseLeave={handleLeave}
    aria-label={`Link to ${label}`}
  >
    <Icon size={24} />
  </motion.a>
);

const AchievementsSection = () => (
  <section className="py-24 max-w-[1600px] mx-auto">
    <motion.h2
      className="text-4xl sm:text-5xl font-light tracking-wide mb-16 max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Key Achievements
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {ACHIEVEMENTS.map((achievement, index) => (
        <motion.div
          key={achievement.title}
          className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-divider relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

          <div className="relative z-10">
            <div className="text-4xl mb-4">{achievement.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-accent">{achievement.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// --- MAIN APP ---

const Index = () => {
  const [darkMode, toggleMode] = useDarkMode();
  const [cursorText, setCursorText] = useState('');
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  // NEW STATE FOR FILTERING, SEARCHING, AND SORTING
  const [filters, setFilters] = useState<FilterState>({ type: ["All"], technology: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');

  const toggleProjectExpansion = useCallback((id: string) => {
    setExpandedProjects(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  }, []);

  const handleHover = (text: string) => setCursorText(text);
  const handleLeave = () => setCursorText('');

  // HANDLER FUNCTIONS FOR FILTERSECTION
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearchQuery(newSearch);
  }, []);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortOption(newSort);
  }, []);

  // FILTERING, SEARCHING, AND SORTING LOGIC
  const filteredProjects = useMemo(() => {
    let result = [...PROJECTS];

    // 1. Filtering by Type (OR logic for selected types)
    const selectedTypes = filters.type.filter(t => t !== "All");
    if (selectedTypes.length > 0) {
      result = result.filter(project =>
        selectedTypes.some(selectedType =>
          (project as any).type?.includes(selectedType) // Safely check 'type'
        )
      );
    }

    // 2. Filtering by Technology (AND logic: project must have ALL selected technologies)
    if (filters.technology.length > 0) {
      result = result.filter(project =>
        filters.technology.every(selectedTech =>
          (project as any).technology?.includes(selectedTech) // Safely check 'technology'
        )
      );
    }

    // 3. Searching (by title, tag, problem, solution)
    if (searchQuery.length > 0) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(project =>
        project.title.toLowerCase().includes(lowerCaseQuery) ||
        project.tag.toLowerCase().includes(lowerCaseQuery) ||
        project.problem.toLowerCase().includes(lowerCaseQuery) ||
        project.solution.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // 4. Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          // Extracts the first date part (e.g., 'Feb 2025' from 'Feb 2025 – Present')
          return new Date(b.date.split(' – ')[0]).getTime() - new Date(a.date.split(' – ')[0]).getTime();
        case 'date-asc':
          return new Date(a.date.split(' – ')[0]).getTime() - new Date(b.date.split(' – ')[0]).getTime();
        case 'alpha-asc':
          return a.title.localeCompare(b.title);
        case 'alpha-desc':
          return b.title.localeCompare(a.title);
        case 'priority':
          // Sorts priority: true projects first, then by date-desc
          if (a.priority && !b.priority) return -1;
          if (!a.priority && b.priority) return 1;
          return new Date(b.date.split(' – ')[0]).getTime() - new Date(a.date.split(' – ')[0]).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [filters, searchQuery, sortOption]);

  // Separate filtered projects for the two display sections
  const filteredPriorityProjects = useMemo(() => filteredProjects.filter(p => p.priority), [filteredProjects]);
  const filteredArchiveProjects = filteredProjects; // WorkTimeline uses all filtered projects

  return (
    <div className="min-h-screen relative p-4 sm:p-8 lg:p-12 transition-smooth">
      <Navigation darkMode={darkMode} toggleMode={toggleMode} />
      <BackToTop />
      <ColorThemeSwitcher />

      <main className="max-w-[1920px] mx-auto" id="main-content">
        <Hero handleHover={handleHover} handleLeave={handleLeave} />
        <AboutSection />

        {/* FILTER SECTION - ADD id="filter-section" HERE */}
        <section id="filter-section" className="py-24 max-w-[1600px] mx-auto">
          <FilterSection
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
          />
        </section>

        {/* PRIORITY PROJECTS GRID - UPDATED TO USE filteredPriorityProjects */}
        <PriorityProjectsGrid
          projects={filteredPriorityProjects} // Pass filtered projects
          handleHover={handleHover}
          handleLeave={handleLeave}
          toggleProjectExpansion={toggleProjectExpansion}
        />

        {/* WORK TIMELINE - UPDATED TO USE filteredArchiveProjects */}
        <WorkTimeline
          projects={filteredArchiveProjects} // Pass filtered projects
          expandedProjects={expandedProjects}
          toggleProjectExpansion={toggleProjectExpansion}
          handleHover={handleHover}
          handleLeave={handleLeave}
        />
        <CapabilitySignal />
        <AchievementsSection />
        <HumanLayer />
        <ContactLayer handleHover={handleHover} handleLeave={handleLeave} />
      </main>

      <footer className="text-center py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Abdelrahim Abuelmaaref. Built with React, Tailwind & Framer Motion.
      </footer>
    </div>
  );
};

export default Index;