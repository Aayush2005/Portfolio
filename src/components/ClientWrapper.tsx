'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import LoadingScreen from '@/components/LoadingScreen';
import FluidOceanBackground from '@/components/FluidOceanBackground';
import { GlobalOceanRipples } from '@/components/EnhancedRipple';
import { CustomCursor } from '@/components/UIComponents';
import CursorFish from '@/components/CursorFish';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initialize smooth scrolling after loading
    if (!isLoading) {
      const lenis = new Lenis({
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 200);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative cursor-none min-h-screen w-full">
      {/* Fluid Ocean Background */}
      <FluidOceanBackground />
      
      {/* Global Ocean Ripples */}
      <GlobalOceanRipples />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Cursor Following Fish */}
      <CursorFish />
      
      {showContent && children}
    </div>
  );
}