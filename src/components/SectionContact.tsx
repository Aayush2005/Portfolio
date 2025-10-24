'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function SectionContact() {
  // Contact is at the bottom so it's always in the deep blue section
  const textColor = 'text-white';
  const subtextColor = 'text-white/90';
  const cardBg = 'bg-white/10 border-white/20';

  return (
    <section id="contact" className="relative w-full py-32 min-h-screen flex items-center justify-center">
      {/* Smooth gradient transition from About section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-deepTeal/8 to-deepTeal/15 pointer-events-none z-20"></div>

      {/* Deep ocean background - no blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-deepTeal/15 via-deepTeal/25 to-deepTeal/35"></div>

      {/* Ocean floor elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deepTeal/40 to-transparent"></div>

      {/* Deep sea fish and elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Larger fish swimming deeper */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`deep-fish-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${40 + i * 15}%`,
            }}
            animate={{
              x: [0, 120, 0],
              y: [0, -20, 15, 0],
              rotate: [0, 8, -5, 0],
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
          >
            <div className="relative">
              <div className={`w-8 h-4 bg-gradient-to-r from-deepTeal/40 to-gold/30 rounded-full transform ${i % 2 === 0 ? 'scale-x-[-1]' : ''}`}></div>
              <div className={`absolute ${i % 2 === 0 ? '-left-3' : '-right-3'} top-0.5 w-4 h-4 bg-deepTeal/25 rounded-full transform rotate-45`}></div>
              <div className={`absolute ${i % 2 === 0 ? 'right-1.5' : 'left-1.5'} top-1 w-1.5 h-1.5 bg-charcoal/50 rounded-full`}></div>
            </div>
          </motion.div>
        ))}

        {/* Seaweed-like elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`seaweed-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${10 + i * 15}%`,
            }}
            animate={{
              rotate: [-5, 5, -5],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <div className={`w-2 bg-gradient-to-t from-deepTeal/30 to-deepTeal/10 rounded-t-full origin-bottom`} style={{ height: `${60 + i * 20}px` }}></div>
          </motion.div>
        ))}

        {/* Deep bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`deep-bubble-${i}`}
            className="absolute w-3 h-3 bg-deepTeal/15 rounded-full"
            style={{
              left: `${5 + i * 6}%`,
              top: `${70 + (i % 4) * 8}%`,
            }}
            animate={{
              y: [-30, -150],
              opacity: [0.2, 0.5, 0],
              scale: [0.3, 1.2, 0.2],
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 md:px-16 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ margin: '30px' }}
        >
          <h2 className={`font-display text-5xl md:text-6xl lg:text-7xl ${textColor} mb-8 leading-tight`}>
            Let&apos;s Create Together
          </h2>

          <p className={`${subtextColor} text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mx-auto mb-16 p-6`}>
            Interested in collaborating? I&apos;d love to hear about your ideas and explore how we can bring them to life.
          </p>

          {/* Button row */}
          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
            style={{ marginBottom: '2rem' }}
          >
            <motion.a
              href="mailto:aayushkr646@gmail.com"
              className="group relative bg-burntOrange text-cream font-medium text-lg rounded-2xl hover:bg-tangerine transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden flex items-center justify-center"
              style={{ padding: '12px 28px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-tangerine to-gold transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-2xl"></div>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              className="group relative bg-white/20 border-2 border-white text-white font-medium text-lg rounded-2xl hover:bg-white hover:text-charcoal transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
              style={{ padding: '12px 28px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Download Resume</span>
              <div className="absolute inset-0 bg-white text-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-2xl"></div>
            </motion.a>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mt-20">
            <BulgingCard
              delay={0.2}
              textColor={textColor}
              subtextColor={subtextColor}
              cardBg={cardBg}
              title="Email"
              description="aayushkr646@gmail.com - Ready to discuss your next project and bring ideas to life."
            />

            <BulgingCard
              delay={0.4}
              textColor={textColor}
              subtextColor={subtextColor}
              cardBg={cardBg}
              title="Location"
              description="Remote collaboration worldwide with flexible timezone coverage."
            />

            <BulgingCard
              delay={0.6}
              textColor={textColor}
              subtextColor={subtextColor}
              cardBg={cardBg}
              title="Response Time"
              description="I won't reply to you bruhh - Just kidding! Usually respond within 24 hours during business days."
            />
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
            className="relative z-10 text-center"
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

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: (mousePosition.y - centerY) * 0.08,
                opacity: 1,
                x: (mousePosition.x - centerX) * 0.08,
                z: 50 * bulgeIntensity
              }}
              exit={{ y: 20, opacity: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.3,
                x: { duration: 0.15 },
                y: { duration: 0.15 },
                z: { duration: 0.15 }
              }}
              className="text-white/95 text-lg lg:text-xl leading-relaxed text-center relative z-50"
              style={{
                textShadow: `0 0 ${20 * bulgeIntensity}px rgba(255, 255, 255, 0.5)`,
              }}
            >
              {description}
            </motion.p>
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
