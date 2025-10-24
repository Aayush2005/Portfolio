'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// TypewriterText Component with Loop Support
interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  minCharsVisible?: number;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 80,
  className = '',
  onComplete,
  loop = false,
  minCharsVisible = 0
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    if (!loop && hasCalledComplete.current) {
      // If loop is disabled and we've already completed, show full text
      setDisplayText(text);
      setIsErasing(false);
      return;
    }

    let timer: NodeJS.Timeout;

    if (!isErasing) {
      // Typing phase
      if (displayText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, displayText.length === 0 ? delay : speed);
      } else {
        // Completed typing
        if (!hasCalledComplete.current) {
          hasCalledComplete.current = true;
          onComplete?.();
        }

        if (loop) {
          // Wait before starting to erase
          timer = setTimeout(() => {
            setIsErasing(true);
          }, 2000);
        }
      }
    } else {
      // Erasing phase
      if (displayText.length > minCharsVisible) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, speed / 2);
      } else {
        // Wait before starting to type again
        timer = setTimeout(() => {
          setIsErasing(false);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isErasing, text, delay, speed, loop, minCharsVisible, onComplete]);

  // Reset when loop changes from true to false
  useEffect(() => {
    if (!loop && isErasing) {
      setDisplayText(text);
      setIsErasing(false);
    }
  }, [loop, text, isErasing]);

  const showCursor = !hasCalledComplete.current || loop;

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="animate-pulse text-burntOrange">|</span>
      )}
    </span>
  );
}

// CustomCursor Component
export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (['BUTTON', 'A', 'DIV'].includes(tag)) setIsHovering(true);
    };

    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mouseout', handleLeave);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-12 h-12 border-2 rounded-full"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        style={{
          borderColor: 'rgba(231, 111, 81, 0.6)',
          background: 'radial-gradient(circle, rgba(231, 111, 81, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full"
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(231, 111, 81, 0.9) 0%, rgba(201, 162, 74, 0.7) 100%)',
          boxShadow: '0 0 10px rgba(231, 111, 81, 0.6)',
        }}
      />
    </>
  );
}