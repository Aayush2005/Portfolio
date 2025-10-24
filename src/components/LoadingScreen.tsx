'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Create film strip frames with deterministic pattern
  const createFrames = (direction: 'left' | 'right') => {
    return Array.from({ length: 20 }, (_, i) => {
      // Use deterministic pattern instead of Math.random() to avoid hydration mismatch
      const isOrange = (i + (direction === 'left' ? 0 : 1)) % 3 === 0;
      return (
        <motion.div
          key={`${direction}-${i}`}
          className={`w-16 h-24 ${isOrange ? 'bg-burntOrange' : 'bg-white'} border-2 border-charcoal flex-shrink-0`}
          initial={{ x: direction === 'left' ? -100 : 100 }}
          animate={{
            x: direction === 'left' ? [0, 100, 0] : [0, -100, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.1
          }}
        >
          {/* Film perforations */}
          <div className="h-full flex flex-col justify-between py-1">
            {Array.from({ length: 6 }, (_, j) => (
              <div key={j} className="w-2 h-2 bg-charcoal rounded-full mx-auto" />
            ))}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-50 bg-cream overflow-hidden"
        >
          {/* Film Roll Top */}
          <div className="absolute top-0 left-0 w-full h-32 overflow-hidden">
            <motion.div
              className="flex gap-2 absolute top-4"
              animate={{ x: [-200, 1400] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              {createFrames('left')}
            </motion.div>
          </div>

          {/* Film Roll Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
            <motion.div
              className="flex gap-2 absolute bottom-4"
              animate={{ x: [1400, -200] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              {createFrames('right')}
            </motion.div>
          </div>

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-24 h-24 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 border-4 border-burntOrange rounded-full" />
                <div className="absolute inset-2 border-2 border-gold rounded-full" />
                <div className="absolute inset-4 bg-charcoal rounded-full" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="font-display text-charcoal text-4xl md:text-5xl mb-4"
              >
                Aayush
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="font-sans text-deepTeal text-lg"
              >
                A lazzzyyy Human
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.8 }}
                className="w-32 h-1 bg-gradient-to-r from-burntOrange to-gold mx-auto mt-6"
              />
            </motion.div>
          </div>

          {/* Cinematic bars */}
          <motion.div
            className="absolute top-0 left-0 w-full h-16 bg-black"
            initial={{ y: -64 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-full h-16 bg-black"
            initial={{ y: 64 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}