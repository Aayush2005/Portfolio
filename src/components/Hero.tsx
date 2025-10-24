'use client';

import { useEffect, useRef, useState } from 'react';
import { TYPE_SCALE } from '@/lib/constants';
import { TypewriterText } from './UIComponents';
import OceanRipple from './EnhancedRipple';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHeading, setShowHeading] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeading(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showHeading) {
      const timer = setTimeout(() => {
        setShowTypewriter(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showHeading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleTypewriterComplete = () => {
    setShowButtons(true);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center px-8 md:px-16 lg:px-24 z-10 pointer-events-none py-20"
    >
      {/* Smooth gradient transition to Featured section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-transparent pointer-events-none z-5"></div>
      <div className="text-center max-w-6xl mx-auto relative z-20 pointer-events-auto space-y-8">
        {/* Hero Name */}
        {showHeading && (
          <div
            className="font-display text-charcoal mb-8 leading-tight px-4"
            style={{
              fontSize: `clamp(${TYPE_SCALE.h2}px, 8vw, ${TYPE_SCALE.h1}px)`,
            }}
          >
            Hey, I am Groot
          </div>
        )}

        {/* Subtitle */}
        <div
          className="font-sans text-deepTeal max-w-3xl mx-auto leading-relaxed min-h-[120px] flex items-center justify-center px-4"
          style={{
            fontSize: `clamp(${TYPE_SCALE.base}px, 2.5vw, ${TYPE_SCALE.h3}px)`,
          }}
        >
          {showTypewriter && (
            <TypewriterText
              text="I am just a Gurllll"
              delay={0}
              speed={30}
              onComplete={handleTypewriterComplete}
              loop={isInViewport}
              minCharsVisible={2}
            />
          )}
        </div>

        {/* Buttons */}
        {showButtons && (
          <>
            <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center relative z-30">
              <OceanRipple className="rounded-lg" intensity="high">
                <button
                  onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative bg-transparent border-2 border-charcoal text-charcoal font-sans text-base hover:bg-charcoal hover:text-cream transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl rounded-lg"
                  style={{ padding: '8px 20px' }}
                >
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-charcoal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-lg"></div>
                </button>
              </OceanRipple>

              <OceanRipple className="rounded-lg" intensity="high">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative bg-burntOrange text-cream font-sans text-base hover:bg-gold transition-all duration-300 ease-out overflow-hidden transform hover:scale-105 hover:shadow-xl rounded-lg"
                  style={{padding: '8px 20px'}}
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold to-burntOrange transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-lg"></div>
                </button>
              </OceanRipple>
            </div>

            {/* Scroll indicator */}
            {/* <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-deepTeal/60 text-sm font-light">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-deepTeal/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-deepTeal/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </section>
  );
}