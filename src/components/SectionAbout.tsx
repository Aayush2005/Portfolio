'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SectionAbout() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic text color based on scroll progress with delay
  const textColor = scrollProgress > 0.25 ? 'text-white' : 'text-charcoal';
  const subtextColor = scrollProgress > 0.25 ? 'text-white/90' : 'text-deepTeal';
  const cardBg = scrollProgress > 0.25 ? 'bg-white/10 border-white/20' : 'bg-cream/80 border-beige/50';

  return (
    <section id="about" className="relative w-full py-40 min-h-screen flex items-center justify-center">
      {/* Smooth gradient transition from Featured section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-transparent to-deepTeal/5 pointer-events-none z-20"></div>

      {/* Ocean-inspired background with subtle shade - no blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deepTeal/5 to-deepTeal/10"></div>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent via-transparent to-deepTeal/5 pointer-events-none z-20"></div>

      {/* Floating fish elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-2 bg-deepTeal/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-deepTeal/30 to-tangerine/20 rounded-full"></div>
            <div className="absolute -right-1 top-0 w-2 h-2 bg-deepTeal/15 rounded-full transform rotate-45"></div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <h2 className={`font-display text-5xl md:text-6xl lg:text-7xl ${textColor} mb-12 leading-tight transition-colors duration-1000 delay-300`}>
            About Me
          </h2>

          <div className="mx-auto space-y-12">
            <p className={`${subtextColor} text-xl md:text-2xl lg:text-3xl leading-relaxed font-light transition-colors duration-1000 delay-500 px-4`}>
              I blend design and engineering to craft digital experiences that feel purposeful and thoughtful.
            </p>

            <p className={`${subtextColor} opacity-90 text-lg md:text-xl lg:text-2xl leading-relaxed mx-auto transition-colors duration-1000 delay-700 px-4`} style={{ marginBottom: '2rem' }}>
              I focus on clarity, performance, and craft — making interactions that feel tactile and intentional.
              Every pixel serves a purpose, every animation tells a story.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mt-20">
              <BulgingCard
                delay={0.2}
                textColor={textColor}
                subtextColor={subtextColor}
                cardBg={cardBg}
                title="Design"
                description="Creating visual narratives that resonate with users on an emotional level."
              />

              <BulgingCard
                delay={0.4}
                textColor={textColor}
                subtextColor={subtextColor}
                cardBg={cardBg}
                title="Engineering"
                description="Building robust, scalable solutions with attention to performance and detail."
              />

              <BulgingCard
                delay={0.6}
                textColor={textColor}
                subtextColor={subtextColor}
                cardBg={cardBg}
                title="Innovation"
                description="Pushing boundaries to create experiences that feel magical yet intuitive."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface BulgingCardProps {
  delay: number;
  textColor: string;
  subtextColor: string;
  cardBg: string;
  title: string;
  description: string;
}

function BulgingCard({ delay, textColor, cardBg, title, description }: BulgingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate distance from mouse to center for more reactive bulge
  const centerX = 150;
  const centerY = 140;
  const distance = isHovered
    ? Math.sqrt(Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2))
    : 0;
  const bulgeIntensity = Math.max(0, 150 - distance) / 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${cardBg} rounded-2xl p-10 border shadow-lg transition-all duration-300 cursor-pointer min-h-[280px] flex items-center justify-center backdrop-blur-sm overflow-hidden`}
      style={{
        perspective: "1000px",
        transform: isHovered ? `scale(${1 + bulgeIntensity * 0.08})` : 'scale(1)',
      }}
    >
      {/* Enhanced localized bulging effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none z-20"
            style={{
              left: mousePosition.x - 100,
              top: mousePosition.y - 100,
              width: 200,
              height: 200,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1 + bulgeIntensity * 0.5, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, 
                  rgba(231, 111, 81, ${0.25 * bulgeIntensity}) 0%, 
                  rgba(231, 111, 81, ${0.15 * bulgeIntensity}) 30%, 
                  rgba(42, 157, 143, ${0.1 * bulgeIntensity}) 50%,
                  transparent 70%)`,
                transform: `translateZ(${40 * bulgeIntensity}px)`,
                filter: `blur(${12 + bulgeIntensity * 8}px)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic mesh distortion effect */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-150"
        style={{
          background: isHovered
            ? `radial-gradient(circle ${120 + bulgeIntensity * 50}px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(231, 111, 81, ${0.15 * bulgeIntensity}) 0%, 
                rgba(231, 111, 81, ${0.08 * bulgeIntensity}) 40%, 
                transparent 70%)`
            : 'transparent',
        }}
      />

      {/* Main title - hidden on hover */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
            style={{
              transform: `translate3d(${(mousePosition.x - centerX) * 0.08}px, ${(mousePosition.y - centerY) * 0.08}px, ${40 * bulgeIntensity}px)`,
            }}
          >
            <h3 className={`font-display text-4xl lg:text-5xl ${textColor} transition-all duration-300`}>
              {title}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description overlay - appears on hover with bulging effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-deepTeal/95 via-deepTeal/90 to-burntOrange/85 backdrop-blur-md flex items-center justify-center p-10 z-30"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Enhanced localized bulging effect for hover text */}
            <motion.div
              className="absolute pointer-events-none z-40"
              style={{
                left: mousePosition.x - 120,
                top: mousePosition.y - 120,
                width: 240,
                height: 240,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1 + bulgeIntensity * 0.6, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(255, 255, 255, ${0.4 * bulgeIntensity}) 0%, 
                    rgba(255, 255, 255, ${0.25 * bulgeIntensity}) 25%, 
                    rgba(231, 111, 81, ${0.15 * bulgeIntensity}) 50%,
                    transparent 70%)`,
                  transform: `translateZ(${50 * bulgeIntensity}px)`,
                  filter: `blur(${10 + bulgeIntensity * 8}px)`,
                }}
              />
            </motion.div>

            {/* Additional surface distortion for hover text */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-150"
              style={{
                background: `radial-gradient(circle ${150 + bulgeIntensity * 80}px at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(255, 255, 255, ${0.2 * bulgeIntensity}) 0%, 
                  rgba(255, 255, 255, ${0.1 * bulgeIntensity}) 30%, 
                  rgba(231, 111, 81, ${0.08 * bulgeIntensity}) 50%,
                  transparent 70%)`,
              }}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-center relative z-35"
              style={{
                transform: `translate3d(${(mousePosition.x - centerX) * 0.08}px, ${(mousePosition.y - centerY) * 0.08}px, ${50 * bulgeIntensity}px)`,
                textShadow: `0 0 ${20 * bulgeIntensity}px rgba(255, 255, 255, 0.5)`,
              }}
            >
              {/* Only show description, no title */}
              <p className="text-white/95 text-lg lg:text-xl leading-relaxed">
                {description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced shadow that follows the bulge */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-black/10 blur-xl -z-10"
        style={{
          transform: isHovered
            ? `translate3d(${(mousePosition.x - centerX) * 0.1}px, ${(mousePosition.y - centerY) * 0.1}px, -10px) scale(${1 + bulgeIntensity * 0.1})`
            : 'translate3d(0px, 0px, -10px) scale(1)',
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
}