'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface OceanRippleProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  global?: boolean;
}

function OceanRipple({
  children,
  className = '',
  intensity = 'medium',
  global = false
}: OceanRippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastRippleTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const settings = useMemo(() => {
    const intensitySettings = {
      low: { throttle: 0, maxSize: 120, duration: 1.2, rippleCount: 2 },
      medium: { throttle: 0, maxSize: 180, duration: 1.0, rippleCount: 3 },
      high: { throttle: 0, maxSize: 250, duration: 0.8, rippleCount: 4 }
    };
    return intensitySettings[intensity];
  }, [intensity]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLDivElement> | MouseEvent, globalX?: number, globalY?: number) => {
    const now = Date.now();
    if (now - lastRippleTime.current < settings.throttle) return;
    lastRippleTime.current = now;

    let x: number, y: number;

    if (global && globalX !== undefined && globalY !== undefined) {
      // Global mode: use screen coordinates
      x = globalX;
      y = globalY;
    } else if ('currentTarget' in event && event.currentTarget) {
      // Component mode: use relative coordinates
      const target = event.currentTarget as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      return; // Invalid event type
    }

    // Create multiple concentric ripples for ocean effect
    for (let i = 0; i < settings.rippleCount; i++) {
      const newRipple: Ripple = {
        id: now + Math.random() + i,
        x,
        y,
        size: settings.maxSize + (i * 40),
        delay: i * 0.1,
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, (settings.duration + newRipple.delay) * 1000 + 300);
    }
  }, [settings, global]);

  // Global event handling
  useEffect(() => {
    if (!global) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Only create ripples occasionally during mouse movement (10% chance)
      if (Math.random() < 0.1) {
        createRipple(e, e.clientX, e.clientY);
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      createRipple(e, e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [createRipple, global]);

  if (global) {
    // Global mode: render as fixed overlay
    return (
      <div className="fixed inset-0 pointer-events-none z-[99998]">
        <AnimatePresence>
          {ripples.map((ripple) => {
            // Calculate scroll progress for dynamic colors
            const scrollY = window.scrollY || 0;
            const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

            // Transition from warm colors to blue colors based on scroll
            const r1 = Math.max(25, Math.min(231, 231 - scrollProgress * 206));
            const g1 = Math.max(25, Math.min(111, 111 - scrollProgress * 86));
            const b1 = Math.max(112, Math.min(255, 81 + scrollProgress * 174));

            const r2 = Math.max(0, Math.min(201, 201 - scrollProgress * 201));
            const g2 = Math.max(0, Math.min(162, 162 - scrollProgress * 162));
            const b2 = Math.max(80, Math.min(255, 74 + scrollProgress * 181));

            return (
              <div key={ripple.id}>
                {/* Main ocean ripple */}
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    background: `radial-gradient(circle, 
                      rgba(${r1}, ${g1}, ${b1}, 0.6) 0%, 
                      rgba(${r2}, ${g2}, ${b2}, 0.4) 30%, 
                      rgba(${r1}, ${g1}, ${b1}, 0.2) 60%, 
                      transparent 100%)`,
                    boxShadow: `
                      0 0 20px rgba(${r1}, ${g1}, ${b1}, 0.4),
                      inset 0 0 20px rgba(255, 255, 255, 0.2)
                    `,
                    border: `2px solid rgba(${r1}, ${g1}, ${b1}, 0.8)`,
                  }}
                  initial={{
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0,
                    opacity: 0.8,
                    scale: 0,
                  }}
                  animate={{
                    width: ripple.size,
                    height: ripple.size,
                    x: -ripple.size / 2,
                    y: -ripple.size / 2,
                    opacity: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: settings.duration,
                    delay: ripple.delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />

                {/* Secondary wave ring */}
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    background: `rgba(${r2}, ${g2}, ${b2}, 0.1)`,
                  }}
                  initial={{
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0,
                    opacity: 0.6,
                    scale: 0,
                  }}
                  animate={{
                    width: ripple.size * 0.7,
                    height: ripple.size * 0.7,
                    x: -(ripple.size * 0.7) / 2,
                    y: -(ripple.size * 0.7) / 2,
                    opacity: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: settings.duration * 0.8,
                    delay: ripple.delay + 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />

                {/* Inner sparkle effect */}
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    background: `radial-gradient(circle, 
                      rgba(255, 255, 255, 0.8) 0%, 
                      rgba(${r1}, ${g1}, ${b1}, 0.6) 50%, 
                      transparent 100%)`,
                    filter: 'blur(1px)',
                  }}
                  initial={{
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 0,
                  }}
                  animate={{
                    width: ripple.size * 0.3,
                    height: ripple.size * 0.3,
                    x: -(ripple.size * 0.3) / 2,
                    y: -(ripple.size * 0.3) / 2,
                    opacity: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: settings.duration * 0.5,
                    delay: ripple.delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={createRipple}
      onClick={createRipple}
      onMouseMove={createRipple}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => {
          // Calculate scroll progress for dynamic colors
          const scrollY = window.scrollY || 0;
          const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
          const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

          // Transition from warm colors to blue colors based on scroll
          const r1 = Math.max(25, Math.min(231, 231 - scrollProgress * 206)); // Blue: 25, 25, 112
          const g1 = Math.max(25, Math.min(111, 111 - scrollProgress * 86));
          const b1 = Math.max(112, Math.min(255, 81 + scrollProgress * 174));

          const r2 = Math.max(0, Math.min(201, 201 - scrollProgress * 201)); // Deep blue: 0, 0, 80
          const g2 = Math.max(0, Math.min(162, 162 - scrollProgress * 162));
          const b2 = Math.max(80, Math.min(255, 74 + scrollProgress * 181));

          return (
            <div key={ripple.id}>
              {/* Main ocean ripple */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  background: `radial-gradient(circle, 
                    rgba(${r1}, ${g1}, ${b1}, 0.8) 0%, 
                    rgba(${r2}, ${g2}, ${b2}, 0.6) 20%, 
                    rgba(${r1}, ${g1}, ${b1}, 0.4) 40%, 
                    rgba(${r2}, ${g2}, ${b2}, 0.2) 60%, 
                    transparent 100%)`,
                  boxShadow: `
                    0 0 20px rgba(${r1}, ${g1}, ${b1}, 0.6),
                    inset 0 0 20px rgba(255, 255, 255, 0.3)
                  `,
                  border: `2px solid rgba(${r1}, ${g1}, ${b1}, 0.8)`,
                }}
                initial={{
                  width: 0,
                  height: 0,
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  width: ripple.size,
                  height: ripple.size,
                  x: -ripple.size / 2,
                  y: -ripple.size / 2,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{
                  duration: settings.duration,
                  delay: ripple.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              {/* Secondary wave ring */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  background: `rgba(${r2}, ${g2}, ${b2}, 0.1)`,
                }}
                initial={{
                  width: 0,
                  height: 0,
                  x: 0,
                  y: 0,
                  opacity: 0.8,
                  scale: 0,
                }}
                animate={{
                  width: ripple.size * 0.7,
                  height: ripple.size * 0.7,
                  x: -(ripple.size * 0.7) / 2,
                  y: -(ripple.size * 0.7) / 2,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{
                  duration: settings.duration * 0.8,
                  delay: ripple.delay + 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              {/* Inner sparkle effect */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  background: `radial-gradient(circle, 
                    rgba(255, 255, 255, 0.9) 0%, 
                    rgba(${r1}, ${g1}, ${b1}, 0.7) 30%, 
                    transparent 70%)`,
                  filter: 'blur(1px)',
                }}
                initial={{
                  width: 0,
                  height: 0,
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  width: ripple.size * 0.3,
                  height: ripple.size * 0.3,
                  x: -(ripple.size * 0.3) / 2,
                  y: -(ripple.size * 0.3) / 2,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{
                  duration: settings.duration * 0.5,
                  delay: ripple.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Export as both names for compatibility
export default OceanRipple;
export { OceanRipple as OceanWave };

// Global ripples component for easy migration
export function GlobalOceanRipples() {
  return <OceanRipple global intensity="medium" />;
}