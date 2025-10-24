'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function SectionTechStack() {
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
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

  const techStacks = [
    // Web Development
    { name: 'React', category: 'Frontend', logo: '⚛️', color: '#61DAFB', bgColor: '#282c34' },
    { name: 'Next.js', category: 'Framework', logo: '▲', color: '#000000', bgColor: '#ffffff' },
    { name: 'TypeScript', category: 'Language', logo: 'TS', color: '#ffffff', bgColor: '#3178C6' },
    { name: 'Node.js', category: 'Backend', logo: '🟢', color: '#339933', bgColor: '#f0f0f0' },
    { name: 'Express', category: 'Backend', logo: 'Ex', color: '#ffffff', bgColor: '#000000' },
    
    { name: 'MongoDB', category: 'Database', logo: '🍃', color: '#47A248', bgColor: '#f0f8f0' },
    { name: 'PostgreSQL', category: 'Database', logo: '🐘', color: '#336791', bgColor: '#f0f4f8' },
    { name: 'GraphQL', category: 'API', logo: '◇', color: '#E10098', bgColor: '#f8f0f4' },
    { name: 'Docker', category: 'DevOps', logo: '🐳', color: '#2496ED', bgColor: '#f0f8ff' },
    { name: 'AWS', category: 'Cloud', logo: '☁️', color: '#FF9900', bgColor: '#fff8f0' },
    
    { name: 'Tailwind', category: 'Styling', logo: '💨', color: '#06B6D4', bgColor: '#f0fcff' },
    { name: 'Three.js', category: 'Graphics', logo: '🎮', color: '#000000', bgColor: '#ffffff' },
    { name: 'WebGL', category: 'Graphics', logo: '🔺', color: '#990000', bgColor: '#fff0f0' },
    { name: 'Python', category: 'Language', logo: '🐍', color: '#3776AB', bgColor: '#f0f4f8' },
    { name: 'TensorFlow', category: 'ML', logo: '🧠', color: '#FF6F00', bgColor: '#fff8f0' },
    
    { name: 'PyTorch', category: 'ML', logo: '🔥', color: '#EE4C2C', bgColor: '#fff4f0' },
    { name: 'Scikit-learn', category: 'ML', logo: '📊', color: '#F7931E', bgColor: '#fff8f0' },
    { name: 'Pandas', category: 'Data', logo: '🐼', color: '#150458', bgColor: '#f8f0ff' },
    { name: 'NumPy', category: 'Data', logo: '🔢', color: '#013243', bgColor: '#f0f8f8' },
    { name: 'Jupyter', category: 'Tools', logo: '📓', color: '#F37626', bgColor: '#fff4f0' },
    
    { name: 'OpenCV', category: 'Vision', logo: '👁️', color: '#5C3EE8', bgColor: '#f4f0ff' },
    { name: 'Hugging Face', category: 'NLP', logo: '🤗', color: '#FFD21E', bgColor: '#fffcf0' },
    { name: 'FastAPI', category: 'API', logo: '⚡', color: '#009688', bgColor: '#f0fff8' },
    { name: 'MLflow', category: 'MLOps', logo: '🔄', color: '#0194E2', bgColor: '#f0f8ff' },
    { name: 'Kubernetes', category: 'DevOps', logo: '☸️', color: '#326CE5', bgColor: '#f0f4ff' }
  ];

  // Group tech stacks into batches of 5
  const techBatches = [];
  for (let i = 0; i < techStacks.length; i += 5) {
    techBatches.push(techStacks.slice(i, i + 5));
  }

  // Calculate batch switching based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.1) {
        setCurrentBatchIndex(0);
        return;
      }

      const adjustedProgress = (latest - 0.1) / 0.8;
      const batchProgress = adjustedProgress * techBatches.length;
      const newBatchIndex = Math.floor(batchProgress);
      const clampedIndex = Math.min(newBatchIndex, techBatches.length - 1);

      setCurrentBatchIndex(clampedIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, techBatches.length]);

  const textColor = globalScrollProgress > 0.45 ? 'text-white' : 'text-gray-900';
  const subtextColor = globalScrollProgress > 0.45 ? 'text-white/90' : 'text-gray-700';

  // Pre-calculate transforms for all batches
  const batchTransforms = techBatches.map((_, batchIndex) => {
    const batchStart = 0.1 + (batchIndex * 0.16);
    const entranceEnd = batchStart + 0.04;
    const stickStart = entranceEnd;
    const stickEnd = batchStart + 0.12;
    const batchEnd = stickEnd + 0.04;

    const y = useTransform(
      scrollYProgress,
      [batchStart, entranceEnd, stickStart, stickEnd, batchEnd],
      [400, 0, 0, 0, -400]
    );

    const scaleX = useTransform(
      scrollYProgress,
      [batchStart, batchStart + 0.01, entranceEnd, stickStart, stickEnd, batchEnd - 0.01, batchEnd],
      [0, 0.3, 1.2, 1, 1, 0.3, 0]
    );

    const scaleY = useTransform(
      scrollYProgress,
      [batchStart, batchStart + 0.01, entranceEnd, stickStart, stickEnd, batchEnd - 0.01, batchEnd],
      [0, 2.5, 0.8, 1, 1, 2.5, 0]
    );

    const opacity = useTransform(
      scrollYProgress,
      [batchStart, entranceEnd, stickStart, stickEnd, batchEnd],
      [0, 1, 1, 1, 0]
    );

    const skewX = useTransform(
      scrollYProgress,
      [batchStart, batchStart + 0.02, entranceEnd, stickStart, stickEnd, batchEnd - 0.02, batchEnd],
      [0, -15, 2, 0, 0, 15, 0]
    );

    const motionBlur = useTransform(
      scrollYProgress,
      [batchStart, entranceEnd, stickStart, stickEnd, batchEnd],
      [12, 0, 0, 0, 12]
    );

    return { y, scaleX, scaleY, opacity, skewX, motionBlur };
  });

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="relative w-full py-20"
      style={{ height: '800vh' }} // Increased height for slower scrolling
    >
      {/* Smooth gradient transition from About section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-transparent pointer-events-none z-20"></div>
      
      {/* Dynamic background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(to bottom, 
            transparent,
            rgba(${Math.round(15 + (85 * globalScrollProgress))}, ${Math.round(45 + (75 * globalScrollProgress))}, ${Math.round(65 + (100 * globalScrollProgress))}, ${0.05 + (0.2 * globalScrollProgress)}),
            rgba(${Math.round(25 + (95 * globalScrollProgress))}, ${Math.round(55 + (85 * globalScrollProgress))}, ${Math.round(75 + (110 * globalScrollProgress))}, ${0.1 + (0.3 * globalScrollProgress)}),
            rgba(${Math.round(15 + (85 * globalScrollProgress))}, ${Math.round(45 + (75 * globalScrollProgress))}, ${Math.round(65 + (100 * globalScrollProgress))}, ${0.05 + (0.2 * globalScrollProgress)}),
            transparent
          )`
        }}
      ></div>
      
      {/* Smooth gradient transition to Contact section */}
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
              Tech Stack
            </motion.h2>
            <motion.p
              className={`${subtextColor} text-lg sm:text-xl md:text-2xl mx-auto leading-relaxed font-light transition-colors duration-1000 delay-500 px-8 text-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Technologies I work with across web development and machine learning.
            </motion.p>
          </div>

          {/* Tech Stack Genie Emergence */}
          <div className="flex justify-center items-center perspective-1000">
            <div className="relative w-full max-w-6xl" style={{ height: '500px' }}>
              {techBatches.map((batch, batchIndex) => {
                const transforms = batchTransforms[batchIndex];

                return (
                  <motion.div
                    key={batchIndex}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      y: transforms.y,
                      scaleX: transforms.scaleX,
                      scaleY: transforms.scaleY,
                      opacity: transforms.opacity,
                      skewX: transforms.skewX,
                      transformOrigin: "50% 100%", // Genie emergence point
                      filter: `blur(${transforms.motionBlur}px)`,
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Batch container with spread layout */}
                      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-4xl">
                        {batch.map((tech, techIndex) => {
                          // Calculate spread positions
                          const positions = [
                            { x: 0, y: -60 }, // Center top
                            { x: -120, y: 0 }, // Left
                            { x: 120, y: 0 }, // Right
                            { x: -80, y: 80 }, // Bottom left
                            { x: 80, y: 80 }, // Bottom right
                          ];
                          
                          const position = positions[techIndex] || { x: 0, y: 0 };

                          return (
                            <motion.div
                              key={tech.name}
                              className="relative"
                              style={{
                                x: position.x,
                                y: position.y,
                              }}
                              initial={{ scale: 0, rotate: 180 }}
                              animate={{ 
                                scale: 1, 
                                rotate: 0,
                                transition: {
                                  delay: techIndex * 0.1,
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 15
                                }
                              }}
                            >
                              <motion.div
                                className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-200/50 overflow-hidden cursor-pointer flex flex-col items-center justify-center"
                                whileHover={{
                                  scale: 1.15,
                                  rotateY: 15,
                                  z: 50,
                                  transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                                style={{
                                  backgroundColor: tech.bgColor || '#ffffff',
                                  boxShadow: `0 15px 40px rgba(${parseInt(tech.color.slice(1, 3), 16)}, ${parseInt(tech.color.slice(3, 5), 16)}, ${parseInt(tech.color.slice(5, 7), 16)}, 0.4)`
                                }}
                              >
                                {/* Tech logo */}
                                <div 
                                  className="text-3xl sm:text-4xl md:text-5xl mb-2"
                                  style={{ color: tech.color }}
                                >
                                  {tech.logo}
                                </div>
                                
                                {/* Tech name */}
                                <div className="text-xs sm:text-sm font-bold text-gray-800 text-center px-2">
                                  {tech.name}
                                </div>
                                
                                {/* Category badge */}
                                <div 
                                  className="absolute -top-3 -right-3 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                                  style={{ backgroundColor: tech.color }}
                                >
                                  {tech.category}
                                </div>

                                {/* Genie shimmer effect */}
                                <motion.div
                                  className="absolute inset-0 rounded-2xl opacity-40"
                                  style={{
                                    background: `linear-gradient(135deg, 
                                      transparent, 
                                      rgba(255, 255, 255, 0.6), 
                                      transparent
                                    )`
                                  }}
                                  animate={{
                                    x: [-120, 120],
                                    rotate: [0, 360],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: techIndex * 0.2
                                  }}
                                />

                                {/* Genie sparkles */}
                                {[...Array(6)].map((_, sparkleIndex) => (
                                  <motion.div
                                    key={sparkleIndex}
                                    className="absolute w-1 h-1 bg-white/80 rounded-full"
                                    style={{
                                      left: `${20 + (sparkleIndex * 12)}%`,
                                      top: `${15 + (sparkleIndex * 10)}%`,
                                    }}
                                    animate={{
                                      scale: [0, 1.5, 0],
                                      opacity: [0, 1, 0],
                                      rotate: [0, 360],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: sparkleIndex * 0.3,
                                      ease: "easeInOut"
                                    }}
                                  />
                                ))}
                              </motion.div>

                              {/* Genie trail effect */}
                              <motion.div
                                className="absolute bottom-0 left-1/2 w-2 h-24 bg-gradient-to-t from-white/60 to-transparent rounded-full"
                                style={{ x: "-50%" }}
                                animate={{
                                  scaleY: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                  scaleX: [1, 0.5, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: techIndex * 0.1
                                }}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Central emergence point indicator */}
              {/* <motion.div
                className="absolute left-1/2 top-1/2 w-6 h-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
                style={{ x: "-50%", y: "200px" }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 1, 0.3],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              /> */}

              {/* Floating particles around emergence point */}
              {/* {[...Array(16)].map((_, particleIndex) => (
                <motion.div
                  key={particleIndex}
                  className="absolute left-1/2 top-1/2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{
                    x: "-50%",
                    y: "200px",
                  }}
                  animate={{
                    x: [
                      -6,
                      Math.cos((particleIndex * 22.5) * (Math.PI / 180)) * 100,
                      -6
                    ],
                    y: [
                      200,
                      200 + Math.sin((particleIndex * 22.5) * (Math.PI / 180)) * 100,
                      200
                    ],
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: particleIndex * 0.15,
                    ease: "easeInOut"
                  }}
                />

              ))} */}
            </div>
          </div>

          {/* Batch Progress Indicator */}
          <div className="text-center mt-12 lg:mt-16">
            <div className="flex justify-center gap-4 mb-8">
              {techBatches.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-1000 delay-300 ${index === currentBatchIndex
                    ? (globalScrollProgress > 0.45 ? 'bg-white' : 'bg-gray-900')
                    : (globalScrollProgress > 0.45 ? 'bg-white/30' : 'bg-gray-900/30')
                    }`}
                />
              ))}
            </div>
            {/* <p className={`${subtextColor} text-base lg:text-lg mb-4 transition-colors duration-1000 delay-500`}>
              Batch {currentBatchIndex + 1} of {techBatches.length}
            </p> */}
            {/* <p className={`${subtextColor} text-sm transition-colors duration-1000 delay-700 mb-6`}>
              {techBatches[currentBatchIndex]?.length || 0}
            </p> */}
            <div className={`w-8 h-12 border-2 ${globalScrollProgress > 0.45 ? 'border-white/60' : 'border-gray-900/60'} rounded-full flex justify-center mx-auto mt-6 transition-colors duration-1000 delay-300`}>
              <div className={`w-1.5 h-4 ${globalScrollProgress > 0.45 ? 'bg-white/60' : 'bg-gray-900/60'} rounded-full mt-2 animate-pulse transition-colors duration-1000 delay-500`}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}