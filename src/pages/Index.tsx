import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Mail, ArrowRight, X, HeartHandshake, Zap, Code, ExternalLink, Briefcase, Link as LinkIcon } from 'lucide-react';
import portraitImage from '@/assets/portrait.jpg';
import fintechImage from '@/assets/project-fintech.jpg';
import ecommerceImage from '@/assets/project-ecommerce.jpg';
import cloudImage from '@/assets/project-cloud.jpg';

// --- DATA STRUCTURES ---

const PROJECTS = [
  {
    id: 'p-01',
    title: 'Cognitive Workflow Engine',
    client: 'Global Fintech Firm',
    date: '2024',
    role: 'Lead UX Architect & Prototyping',
    priority: true,
    tag: 'Fintech / UX Architecture',
    stat: '60%',
    statLabel: 'Latency Reduction',
    problem: 'Existing risk assessment models required manual reconciliation across 12 disparate systems, leading to high latency and human error in critical decision-making.',
    insight: 'The bottleneck wasn\'t the data—it was the cognitive load on analysts. We needed an orchestration layer that prioritized information hierarchy and prediction modeling, turning complexity into clarity.',
    solution: 'Designed and implemented a serverless React/Node.js micro-frontend that aggregates real-time data streams and projects a 9-dimensional risk score, reducing decision latency by 60%.',
    process: ['Deep User Journey Mapping (20+ interviews)', 'System Architecture Blueprinting', 'Atomic Design System Development', 'Performance Tuning & A/B Testing'],
    result: 'Reduced average risk assessment time from 45 minutes to 18 minutes, resulting in a 12% operational efficiency gain and significant reduction in compliance exposure.',
    image: fintechImage,
    liveUrl: '#',
  },
  {
    id: 'p-02',
    title: 'Hyper-Local E-Commerce Platform',
    client: 'Startup Accelerator',
    date: '2023',
    role: 'Full Stack Engineer & Strategy',
    priority: false,
    tag: 'E-commerce / Full Stack',
    stat: '50K',
    statLabel: 'Concurrent Users',
    problem: 'Market entry required rapid scaling and hyper-accurate inventory management with zero tolerance for overselling.',
    insight: 'Leveraging a MongoDB geospatial index allowed us to solve the proximity/delivery challenge, but the crucial need was a robust, low-latency transaction API to prevent race conditions.',
    solution: 'Built the core API and front-end interface using Laravel/MySQL and React, focusing on write optimization and implementing pessimistic locking strategies for inventory management.',
    process: ['Microservices decomposition', 'Database schema optimization for scale', 'CI/CD pipeline implementation', 'Go-to-Market feature prioritization'],
    result: 'Successfully handled 50,000 concurrent users during the launch phase with zero critical transaction failures. Platform grew to 10,000 daily orders within six months.',
    image: ecommerceImage,
    liveUrl: '#',
  },
  {
    id: 'p-03',
    title: 'Cloud Data Migration Blueprint',
    client: 'Fortune 500 Logistics',
    date: '2022',
    role: 'Solution Architect',
    priority: true,
    tag: 'Cloud / Architecture',
    stat: '99.9%',
    statLabel: 'Data Integrity',
    problem: 'Legacy monolithic architecture prevented rapid adoption of cloud-native services and posed a high compliance risk.',
    insight: 'A phased, domain-driven design approach was necessary, prioritizing the migration of non-critical services first to build organizational confidence and optimize resource consumption.',
    solution: 'Developed the blueprint for a hybrid cloud migration strategy, overseeing the transition of 15 core services to AWS and establishing a unified GraphQL gateway.',
    process: ['Risk Assessment & Compliance Review', 'Data Schemas Refactoring', 'Infrastructure-as-Code (Terraform) Setup', 'Continuous Monitoring Implementation'],
    result: 'Achieved 99.9% data migration integrity and reduced quarterly infrastructure spend by 25% within the first year post-migration.',
    image: cloudImage,
    liveUrl: '#',
  },
];

const CAPABILITIES = [
  { name: 'React.js', icon: Code },
  { name: 'Node.js', icon: Code },
  { name: 'PHP', icon: Code },
  { name: 'Laravel', icon: Code },
  { name: 'MySQL', icon: Code },
  { name: 'MongoDB', icon: Code },
  { name: 'TypeScript', icon: Code },
  { name: 'AWS/GCP', icon: Code },
  { name: 'GraphQL', icon: Code },
  { name: 'Design Systems', icon: Code },
  { name: 'Figma', icon: Code },
  { name: 'Prototyping', icon: Code },
];

const PHILOSOPHY = [
  { 
    title: 'Beliefs on Software Quality', 
    icon: HeartHandshake, 
    text: 'Quality is the measurable distance between what a system promises and what it delivers. It\'s not a feature; it\'s the foundational contract with the user. We build systems to endure, not just to launch.' 
  },
  { 
    title: 'The Power of Subtraction', 
    icon: Zap, 
    text: 'Design maturity is knowing what to remove. Every unnecessary element—be it a line of code or a decorative flourish—adds cognitive debt. Clarity emerges from the deliberate absence of clutter.' 
  },
  { 
    title: 'Aesthetics of Performance', 
    icon: Code, 
    text: 'The fastest interface is the most elegant one. Performance is the final layer of polish. Janky experiences signal a lack of structural integrity; smoothness is an architectural choice.' 
  },
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
    <header className="min-h-[90vh] flex items-center pt-32 pb-48 max-w-[1600px] mx-auto">
      <motion.div
        className="grid lg:grid-cols-7 gap-16 w-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.p
            className="text-lg font-light mb-4 text-muted-foreground"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            Digital Experience Architect & Design Technologist.
          </motion.p>
          <motion.h1
            className="text-balance font-extrabold leading-tight tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            variants={{ 
              hidden: { scale: 0.98, opacity: 0, filter: 'blur(5px)' }, 
              visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } } 
            }}
          >
            Architecting maturity. Digital systems that endure
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.a
            href="mailto:contact@example.com"
            className="mt-12 text-lg font-medium tracking-wider inline-flex items-center group relative w-fit text-accent hover:text-accent/80 transition-colors"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.4 } } }}
            onMouseEnter={() => handleHover('TALK')}
            onMouseLeave={handleLeave}
            aria-label="Start Conversation via Email"
          >
            Start Conversation
            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        <motion.div
          className="lg:col-span-2 hidden lg:flex justify-end relative aspect-[4/6] overflow-hidden rounded-xl shadow-2xl"
          variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.8 } } }}
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
        </motion.div>
      </motion.div>
    </header>
  );
};

const AboutSection = () => (
  <section className="py-24 max-w-[1600px] mx-auto">
    <motion.h2
      className="text-4xl sm:text-5xl font-light tracking-wide mb-12 max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      The Practice.
    </motion.h2>
    <motion.p
      className="text-xl font-light max-w-3xl leading-relaxed text-muted-foreground"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.2 }}
    >
      I bridge the gap between abstract design principles and concrete, scalable engineering solutions. My focus is on <strong className="text-foreground">systemic elegance</strong>—designing APIs and user experiences that minimize complexity at the human layer while maximizing operational integrity at the machine layer.
    </motion.p>
  </section>
);

const PriorityProjectsGrid = ({ 
  handleHover, 
  handleLeave, 
  setExpandedProjectId 
}: { 
  handleHover: (text: string) => void; 
  handleLeave: () => void;
  setExpandedProjectId: (id: string) => void;
}) => {
  const priorityProjects = PROJECTS.filter(p => p.priority);

  return (
    <section id="priority-work" className="py-24 max-w-[1600px] mx-auto">
      <motion.h2
        className="text-4xl sm:text-5xl font-light tracking-wide mb-12 max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Featured Engagements <Briefcase size={36} className="inline-block ml-2 mb-1 text-accent" />
      </motion.h2>
      <motion.p
        className="text-xl font-light max-w-3xl mb-16 leading-relaxed text-muted-foreground"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
      >
        Case studies that highlight strategic architectural decisions and measurable business outcomes.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-10">
        {priorityProjects.map((project) => (
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

              <button
                className="inline-flex items-center text-sm font-medium transition-colors group-hover:underline"
                onClick={() => setExpandedProjectId(project.id)}
              >
                View Case Study
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const WorkTimeline = ({ 
  expandedProjectId, 
  setExpandedProjectId, 
  handleHover, 
  handleLeave 
}: { 
  expandedProjectId: string | null; 
  setExpandedProjectId: (id: string | null) => void;
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
      The Full Continuum
    </motion.h2>

    <div className="relative border-l-2 border-divider ml-4 lg:ml-0">
      {PROJECTS.map((project, index) => (
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
            isExpanded={expandedProjectId === project.id}
            setExpandedProjectId={setExpandedProjectId}
            handleHover={handleHover}
            handleLeave={handleLeave}
          />
        </motion.div>
      ))}
    </div>
  </section>
);

const ProjectPreview = ({ 
  project, 
  isExpanded, 
  setExpandedProjectId, 
  handleHover, 
  handleLeave 
}: any) => {
  const handleToggle = () => {
    setExpandedProjectId(isExpanded ? null : project.id);
  };

  return (
    <article className="rounded-xl overflow-hidden relative">
      <motion.div
        className="cursor-pointer rounded-xl p-8 border border-divider hover:bg-muted/5"
        onClick={handleToggle}
        onMouseEnter={() => handleHover(isExpanded ? 'CLOSE' : 'VIEW')}
        onMouseLeave={handleLeave}
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

const CapabilitySignal = ({ handleHover, handleLeave, cursorText }: any) => (
  <section id="capabilities" className="py-24 max-w-[1600px] mx-auto">
    <motion.h2
      className="text-4xl sm:text-5xl font-light tracking-wide mb-24 max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      System Palette
    </motion.h2>

    <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-4xl mx-auto">
      {CAPABILITIES.map((cap, index) => (
        <motion.div
          key={cap.name}
          className="relative w-12 h-12 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ scale: 1.1, rotate: 3 }}
          onMouseEnter={() => handleHover(cap.name)}
          onMouseLeave={handleLeave}
          role="img"
          aria-label={`${cap.name} technical skill`}
        >
          <cap.icon
            size={48}
            strokeWidth={1.5}
            className="transition-colors duration-300"
            style={{ 
              color: 'hsl(var(--foreground))', 
              filter: cursorText === cap.name ? 'drop-shadow(0 0 5px hsl(var(--accent)))' : 'none' 
            }}
          />
          {cursorText === cap.name && (
            <motion.div
              className="absolute inset-0 rounded-full bg-accent mix-blend-color"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-hidden="true"
            />
          )}
        </motion.div>
      ))}
    </div>
  </section>
);

const HumanLayer = () => (
  <section id="philosophy" className="py-24 max-w-[1600px] mx-auto">
    <motion.h2
      className="text-4xl sm:text-5xl font-light tracking-wide mb-24 max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      On Craft.
    </motion.h2>
    <div className="grid lg:grid-cols-3 gap-12">
      {PHILOSOPHY.map((item, index) => (
        <motion.div
          key={item.title}
          className="p-6 rounded-xl border border-divider bg-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          <item.icon size={32} className="mb-4 text-accent" aria-hidden="true" />
          <h3 className="text-xl font-medium mb-3">{item.title}</h3>
          <p className="text-base font-light leading-relaxed text-muted-foreground">
            {item.text}
          </p>
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
      Direct.
    </motion.h2>
    <motion.a
      href="mailto:senior.architect@manifest.com"
      className="text-4xl sm:text-6xl font-extralight tracking-tighter mb-12 block group relative w-fit mx-auto transition-colors duration-300 hover:text-accent"
      onMouseEnter={() => handleHover('EMAIL')}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
    >
      senior.architect@manifest.com
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
      <SocialIcon Icon={Linkedin} href="#" label="LinkedIn" handleHover={handleHover} handleLeave={handleLeave} />
      <SocialIcon Icon={Github} href="#" label="GitHub" handleHover={handleHover} handleLeave={handleLeave} />
      <SocialIcon Icon={LinkIcon} href="#" label="Book Intro" handleHover={handleHover} handleLeave={handleLeave} />
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

// --- MAIN APP ---

const Index = () => {
  const [darkMode, toggleMode] = useDarkMode();
  const [cursorText, setCursorText] = useState('');

  const expandedProjectId = useMemo(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.substring(1) : '';
    const project = PROJECTS.find(p => p.id === hash);
    return project ? project.id : null;
  }, []);

  const setExpandedProjectId = useCallback((id: string | null) => {
    const newHash = id ? `#${id}` : '';
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', newHash);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash && !expandedProjectId) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [expandedProjectId]);

  const handleHover = (text: string) => setCursorText(text);
  const handleLeave = () => setCursorText('');

  return (
    <div className="min-h-screen relative p-4 sm:p-8 lg:p-12 transition-smooth">
      <CustomCursor cursorText={cursorText} />
      <ToggleDarkMode darkMode={darkMode} toggleMode={toggleMode} />

      <main className="max-w-[1920px] mx-auto" id="main-content">
        <Hero handleHover={handleHover} handleLeave={handleLeave} />
        <AboutSection />
        <PriorityProjectsGrid 
          handleHover={handleHover} 
          handleLeave={handleLeave} 
          setExpandedProjectId={setExpandedProjectId}
        />
        <WorkTimeline
          expandedProjectId={expandedProjectId}
          setExpandedProjectId={setExpandedProjectId}
          handleHover={handleHover}
          handleLeave={handleLeave}
        />
        <CapabilitySignal handleHover={handleHover} handleLeave={handleLeave} cursorText={cursorText} />
        <HumanLayer />
        <ContactLayer handleHover={handleHover} handleLeave={handleLeave} />
      </main>

      <footer className="text-center py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} The Continuum. Design Manifest. Built with React & Tailwind.
      </footer>
    </div>
  );
};

export default Index;
