'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function SectionFeatured() {
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setGlobalScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    {
      id: 'f1',
      title: 'Agentic Insurance Voice Agent',
      year: '2024',
      summary: 'Team project: A fully functional AI voice agent with speech-to-text, text-to-speech, and intelligent query handling.',
      description: 'Team development integrating STT (Faster Whisper) and TTS (ElevenLabs) for seamless voice interaction and natural conversation flow. Developed 31 intent classification models with custom utterances, boosting accuracy by 18%.',
      tech: ['Mistral 7B', 'RAG', 'FAISS', 'Faster Whisper', 'ElevenLabs'],
      image: '/placeholders/voice-agent.svg',
      secondaryImage: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop&auto=format&q=80',
      icon: '🎤',
      githubUrl: 'https://github.com/Aayush2005/Insurance-Agent'
    },
    {
      id: 'f2',
      title: 'AI-Based Music Recommendation System',
      year: '2024',
      summary: 'An end-to-end content-based music recommender leveraging audio embeddings and clustering techniques.',
      description: 'Built recommendation engine using YAMNet & Librosa embeddings, improving similarity accuracy by 32%. Clustered 10K+ songs with HDBSCAN to auto-discover subgenres and deliver personalized suggestions.',
      tech: ['FastAPI', 'Librosa', 'HDBSCAN', 'YAMNet', 'JioSaavn API'],
      image: '/placeholders/music-rec.svg',
      secondaryImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&auto=format&q=80',
      icon: '🎵',
      githubUrl: 'https://github.com/Aayush2005/Music-recommendation-system'
    },
    {
      id: 'f3',
      title: 'DeFi AI Assistant',
      year: '2024',
      summary: 'Team project: A modular AI assistant for decentralized finance queries with intelligent routing and caching.',
      description: 'Team development of modular FastAPI backend for DeFi queries using RAG and vector DB thresholds. Added Redis caching with 300s TTL to persist partial action details and reduce latency by 40%.',
      tech: ['LangChain', 'Pinecone', 'Redis', 'FastAPI', 'RAG'],
      image: '/placeholders/defi-ai.svg',
      secondaryImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&auto=format&q=80',
      icon: '💰',
      githubUrl: 'https://github.com/Aayush2005/defi-agent'
    },
    {
      id: 'f4',
      title: 'Euro Hotel - Luxury Booking System',
      year: '2024',
      summary: 'Freelance project: A modern, full-stack hotel booking platform featuring real-time availability, secure payments, and premium user experience.',
      description: 'Freelance development of comprehensive booking management system with FastAPI backend and Next.js frontend. Features real-time booking with 15-minute hold system, Razorpay payment integration, and complete admin dashboard.',
      tech: ['FastAPI', 'MongoDB', 'Next.js 15', 'Razorpay', 'JWT Auth'],
      image: '/placeholders/euro-hotel.svg',
      secondaryImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format&q=80',
      icon: '🏨',
      githubUrl: 'https://eurohotel.in'
    },
    {
      id: 'f5',
      title: 'Women Safety Application',
      year: '2024',
      summary: 'Team project: A comprehensive safety application designed to enhance women\'s security with emergency features and real-time assistance.',
      description: 'Team development of mobile application focused on women\'s safety featuring emergency SOS, location tracking, trusted contacts system, and safety resources. Built with modern mobile development practices for reliable emergency response.',
      tech: ['React Native', 'Firebase', 'GPS Tracking', 'Push Notifications', 'Emergency APIs'],
      image: '/placeholders/women-safety.svg',
      secondaryImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&auto=format&q=80',
      icon: '🛡️',
      githubUrl: 'https://github.com/Aayush2005/Women-Safety'
    },
  ];

  // Calculate project switching based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.1) {
        setCurrentProjectIndex(0);
        return;
      }

      const adjustedProgress = (latest - 0.1) / 0.8;
      const projectProgress = adjustedProgress * items.length;
      const newProjectIndex = Math.floor(projectProgress);
      const clampedIndex = Math.min(newProjectIndex, items.length - 1);

      setCurrentProjectIndex(clampedIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, items.length]);



  const textColor = globalScrollProgress > 0.2 ? 'text-white' : 'text-gray-900';
  const subtextColor = globalScrollProgress > 0.2 ? 'text-white/90' : 'text-gray-700';

  // Pre-calculate transforms for all projects
  const projectTransforms = items.map((_, projectIndex) => {
    const projectStart = 0.1 + (projectIndex * 0.18);
    const entranceEnd = projectStart + 0.05;
    const stickStart = entranceEnd;
    const stickEnd = projectStart + 0.12;
    const projectEnd = stickEnd + 0.03;

    const y = useTransform(
      scrollYProgress,
      [projectStart, entranceEnd, stickStart, stickEnd, projectEnd],
      [400, 0, 0, 0, -400]
    );

    const scaleX = useTransform(
      scrollYProgress,
      [projectStart, projectStart + 0.01, entranceEnd, stickStart, stickEnd, projectEnd],
      [0, 0.4, 1.05, 1, 1, 0]
    );

    const scaleY = useTransform(
      scrollYProgress,
      [projectStart, projectStart + 0.01, entranceEnd, stickStart, stickEnd, projectEnd],
      [0, 0.6, 0.98, 1, 1, 0]
    );

    const opacity = useTransform(
      scrollYProgress,
      [projectStart, entranceEnd, stickStart, stickEnd, projectEnd],
      [0, 1, 1, 1, 0]
    );

    const skewX = useTransform(
      scrollYProgress,
      [projectStart, projectStart + 0.015, entranceEnd, stickStart, stickEnd, projectEnd - 0.01, projectEnd],
      [0, -3, 1, 0, 0, -2, 0]
    );

    const rotateZ = useTransform(
      scrollYProgress,
      [projectStart, entranceEnd, stickStart, stickEnd, projectEnd],
      [1, 0, 0, 0, -3]
    );

    const motionBlur = useTransform(
      scrollYProgress,
      [projectStart, entranceEnd, stickStart, stickEnd, projectEnd],
      [6, 0, 0, 0, 8]
    );

    return { y, scaleX, scaleY, opacity, skewX, rotateZ, motionBlur };
  });

  return (
    <section
      id="featured"
      ref={containerRef}
      className="relative w-full py-20"
      style={{ height: '800vh' }}
    >
      {/* Smooth gradient transition from Hero section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-transparent pointer-events-none z-20"></div>

      {/* Dynamic background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(to bottom, 
            transparent,
            rgba(${Math.round(20 + (100 * globalScrollProgress))}, ${Math.round(51 + (80 * globalScrollProgress))}, ${Math.round(58 + (120 * globalScrollProgress))}, ${0.08 + (0.15 * globalScrollProgress)}),
            rgba(${Math.round(20 + (100 * globalScrollProgress))}, ${Math.round(51 + (80 * globalScrollProgress))}, ${Math.round(58 + (120 * globalScrollProgress))}, ${0.15 + (0.25 * globalScrollProgress)}),
            rgba(${Math.round(20 + (100 * globalScrollProgress))}, ${Math.round(51 + (80 * globalScrollProgress))}, ${Math.round(58 + (120 * globalScrollProgress))}, ${0.20 + (0.35 * globalScrollProgress)}),
            rgba(${Math.round(20 + (100 * globalScrollProgress))}, ${Math.round(51 + (80 * globalScrollProgress))}, ${Math.round(58 + (120 * globalScrollProgress))}, ${0.15 + (0.25 * globalScrollProgress)}),
            transparent
          )`
        }}
      ></div>

      {/* Smooth gradient transition to About section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-transparent pointer-events-none z-20"></div>

      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.h2
              className={`font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${textColor} mb-8 lg:mb-12 leading-tight transition-colors duration-1000 delay-300`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Work
            </motion.h2>
            <motion.p
              className={`${subtextColor} text-lg sm:text-xl md:text-2xl mx-auto leading-relaxed font-light transition-colors duration-1000 delay-500 px-8 text-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Selected work focused on craft, clarity, and meaningful interaction.
            </motion.p>
          </div>

          {/* Ocean Emergence Cards */}
          <div className="flex justify-center items-center perspective-1000">
            <div className="relative w-full max-w-4xl" style={{ height: '500px' }}>
              {items.map((project, index) => {
                const transforms = projectTransforms[index];

                return (
                  <motion.div
                    key={project.id}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      y: transforms.y,
                      scaleX: transforms.scaleX,
                      scaleY: transforms.scaleY,
                      opacity: transforms.opacity,
                      skewX: transforms.skewX,
                      rotateZ: transforms.rotateZ,
                      transformOrigin: "50% 100%", // Single point at bottom center
                      filter: `blur(${transforms.motionBlur}px)`,
                    }}
                  >
                    {/* Logo outside the card - aligned with card top */}
                    <motion.div
                      className="absolute -left-22 -top-7 z-20"
                      animate={hoveredProject === project.id ? {
                        scale: 1.02,
                        rotateY: 5,
                      } : {
                        scale: 1,
                        rotateY: 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F9C7BD]/90 rounded-full border-2 border-[#F7B3A5]/80 flex items-center justify-center backdrop-blur-sm shadow-lg">
                        <span className="text-2xl sm:text-3xl text-[#213740]">
                          {project.icon}
                        </span>
                      </div>
                    </motion.div>

                    <FeaturedCard
                      project={project}
                      isHovered={hoveredProject === project.id}
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                    />

                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Project Progress Indicator */}
          <div className="text-center mt-12 lg:mt-16" style={{ marginTop: '1.5rem' }}>
            <div className="flex justify-center gap-4 mb-8">
              {items.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-1000 delay-300 ${index === currentProjectIndex
                    ? (globalScrollProgress > 0.2 ? 'bg-white' : 'bg-gray-900')
                    : (globalScrollProgress > 0.2 ? 'bg-white/30' : 'bg-gray-900/30')
                    }`}
                />
              ))}
            </div>
            <div className={`w-8 h-12 border-2 ${globalScrollProgress > 0.2 ? 'border-white/60' : 'border-gray-900/60'} rounded-full flex justify-center mx-auto mt-6 transition-colors duration-1000 delay-300`}>
              <div className={`w-1.5 h-4 ${globalScrollProgress > 0.2 ? 'bg-white/60' : 'bg-gray-900/60'} rounded-full mt-2 animate-pulse transition-colors duration-1000 delay-500`}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}

interface FeaturedCardProps {
  project: {
    id: string;
    title: string;
    year: string;
    summary: string;
    description: string;
    tech: string[];
    image: string;
    secondaryImage: string;
    icon: string;
    githubUrl?: string;
  };
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function FeaturedCard({ project, isHovered, onHoverStart, onHoverEnd }: FeaturedCardProps) {

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl lg:rounded-3xl shadow-[0_10px_30px_rgba(40,120,150,0.15)] bg-[#F7F3E8]/95 backdrop-blur-sm border border-[#F0EBE0]/70 overflow-hidden cursor-pointer"
      style={{
        padding: '15px',
        perspective: "1000px",
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >


      {/* Initial state - Project name and bouncing text */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center"
          >
            <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#213740] mb-8">
              {project.title}
            </h3>
            <motion.p
              className="text-[#3C6E71] text-lg md:text-xl font-medium"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Hover over me ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover state - Full card content with bulge effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#F7F3E8]/98 via-[#F0EBE0]/95 to-[#E8DCC6]/90 backdrop-blur-md z-30"
            style={{
              boxShadow: '0 20px 60px rgba(40, 120, 150, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              padding: '10px'
            }}
          >


            {/* Ocean depth gradient overlay with genie shimmer */}
            <motion.div
              className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-50 transition-all duration-1000"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(40, 120, 150, 0.1), 
                  rgba(60, 100, 120, 0.2), 
                  rgba(80, 140, 170, 0.3)
                )`
              }}
              animate={{
                background: [
                  `linear-gradient(135deg, rgba(40, 120, 150, 0.1), rgba(60, 100, 120, 0.2), rgba(80, 140, 170, 0.3))`,
                  `linear-gradient(135deg, rgba(80, 140, 170, 0.2), rgba(40, 120, 150, 0.1), rgba(60, 100, 120, 0.3))`,
                  `linear-gradient(135deg, rgba(40, 120, 150, 0.1), rgba(60, 100, 120, 0.2), rgba(80, 140, 170, 0.3))`
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="relative z-50 h-full p-6 sm:p-8 md:p-10 lg:p-12 flex"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {/* Content area starting from left */}
              <div className="flex-1 flex flex-col justify-between min-h-0 min-w-0 pr-8">
                <div className="space-y-4">
                  {/* Project title and year */}
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#213740] break-words">
                      {project.title}
                    </h3>
                    <span className="text-[#3C6E71] font-medium text-sm bg-[#F0EBE0]/80 px-3 py-1 rounded-full backdrop-blur-sm shrink-0 border border-[#F0EBE0]/90">
                      {project.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#3C6E71] text-base md:text-lg leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-[#F0EBE0]/80 text-[#3C6E71] text-sm rounded-full border border-[#F0EBE0] backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main project image in lower left */}
                <div className="mt-8 w-96 h-56">
                  <div className="w-full h-full bg-[#F0EBE0]/80 rounded-xl border border-[#F0EBE0] overflow-hidden backdrop-blur-sm">
                    <img
                      src={project.secondaryImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* View Project button at bottom */}
                {project.githubUrl ? (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#213740] font-medium hover:text-[#F9C7BD] transition-colors duration-300 flex items-center gap-2 group self-start bg-[#F0EBE0]/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-[#F0EBE0] mt-6 hover:bg-[#F9C7BD]/20 hover:border-[#F9C7BD]/40"
                  >
                    {project.githubUrl.includes('github.com') ? 'View on GitHub' : 'Visit Website'}
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                ) : (
                  <button className="text-[#213740] font-medium hover:text-[#F9C7BD] transition-colors duration-300 flex items-center gap-2 group self-start bg-[#F0EBE0]/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-[#F0EBE0] mt-6 hover:bg-[#F9C7BD]/20 hover:border-[#F9C7BD]/40">
                    View Project
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                )}
              </div>

              {/* Secondary image stuck to right edge center */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-44 h-36 mr-6">
                <div className="w-full h-full bg-[#F0EBE0]/80 rounded-xl border border-[#F0EBE0] overflow-hidden flex items-center justify-center backdrop-blur-sm">
                  <img
                    src={project.image}
                    alt="Secondary Icon"
                    className="w-full h-full object-cover p-2"
                  />
                </div>
              </div>
            </motion.div>

            {/* Genie sparkle effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl lg:rounded-3xl">
              {[...Array(8)].map((_, sparkleIndex) => (
                <motion.div
                  key={sparkleIndex}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    left: `${10 + (sparkleIndex * 10)}%`,
                    top: `${20 + (sparkleIndex * 8)}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2 + (sparkleIndex * 0.3),
                    repeat: Infinity,
                    delay: sparkleIndex * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Genie emergence trail effect */}
              <motion.div
                className="absolute bottom-0 left-1/2 w-2 h-20 bg-gradient-to-t from-white/20 to-transparent rounded-full"
                style={{ x: "-50%" }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </motion.div>
  );
}