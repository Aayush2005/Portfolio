'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FishProps {
  delay?: number;
  size?: 'small' | 'medium';
  color?: 'blue' | 'orange';
  followSpeed?: number;
}

function Fish({ delay = 0, size = 'medium', color = 'blue', followSpeed = 0.05 }: FishProps) {
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [fishPos, setFishPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const followMouse = () => {
      setFishPos(prev => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;

        // Calculate rotation angle to point towards cursor
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setRotation(angle);

        return {
          x: prev.x + dx * followSpeed,
          y: prev.y + dy * followSpeed
        };
      });

      animationFrameId = requestAnimationFrame(followMouse);
    };

    animationFrameId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos, followSpeed]);

  const fishSize = size === 'small' ? 'w-16 h-12' : 'w-20 h-14';
  const tailSize = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';
  const eyeSize = size === 'small' ? 'w-2 h-2' : 'w-2.5 h-2.5';
  const finSize = size === 'small' ? 'w-6 h-4' : 'w-8 h-5';

  const fishColors = {
    blue: 'from-cyan-400/60 to-blue-500/70',
    orange: 'from-orange-400/60 to-orange-600/70'
  };

  const tailColors = {
    blue: 'bg-cyan-400/40',
    orange: 'bg-orange-400/40'
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-[99999]"
      style={{
        left: fishPos.x,
        top: fishPos.y,
        rotate: rotation,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { delay, duration: 0.5 }
      }}
    >
      <div className="relative">
        {/* Fish body - more fish-like shape */}
        <div className={`${fishSize} bg-gradient-to-r ${fishColors[color]} rounded-full relative`}
          style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}>

          {/* Fish eye */}
          <div className={`absolute ${eyeSize} bg-white rounded-full right-3 top-2`}>
            <div className={`absolute ${size === 'small' ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-gray-800 rounded-full top-0.5 right-0.5`}></div>
          </div>

          {/* Top fin */}
          <div className={`absolute ${size === 'small' ? 'w-4 h-6' : 'w-5 h-7'} ${tailColors[color]} right-6 -top-2 rounded-tl-full rounded-tr-full`}
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
          </div>

          {/* Side fin */}
          <motion.div
            className={`absolute ${finSize} ${tailColors[color]} rounded-full right-8 bottom-1`}
            style={{ clipPath: 'ellipse(70% 50% at 30% 50%)' }}
            animate={{
              rotate: [0, -15, 0],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Fish tail - behind body */}
        <div className={`absolute ${tailSize} ${tailColors[color]} -left-4 top-3`}
          style={{ clipPath: 'polygon(100% 50%, 0% 0%, 0% 100%)' }}>
          <motion.div
            className="w-full h-full origin-right"
            animate={{
              scaleX: [1, 1.2, 1],
              scaleY: [1, 0.9, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Bubble trail */}
        <motion.div
          className="absolute w-2 h-2 bg-white/30 rounded-full -left-8 top-6"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
            x: [-10, -20, -30],
            y: [-2, -4, -6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </div>
    </motion.div>
  );
}

export default function CursorFish() {
  return (
    <>
      <Fish delay={0} size="medium" color="blue" followSpeed={0.08} />
      <Fish delay={0.3} size="small" color="orange" followSpeed={0.05} />
    </>
  );
}