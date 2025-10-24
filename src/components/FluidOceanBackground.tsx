'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function FluidOceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Wave parameters
    let time = 0;
    const waves = [
      { amplitude: 50, frequency: 0.02, speed: 0.01, offset: 0 },
      { amplitude: 30, frequency: 0.03, speed: 0.015, offset: Math.PI / 3 },
      { amplitude: 40, frequency: 0.025, speed: 0.008, offset: Math.PI / 2 },
      { amplitude: 25, frequency: 0.035, speed: 0.012, offset: Math.PI },
    ];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background that gets bluer with scroll
      const scrollY = window.scrollY || 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Transition from cream to sky blue (top) and navy blue (bottom)
      // Top: cream to sky blue
      const r1 = Math.max(135, Math.min(255, 247 - scrollProgress * 112)); // Sky blue: 135, 206, 235
      const g1 = Math.max(206, Math.min(255, 245 - scrollProgress * 39));
      const b1 = Math.max(235, Math.min(255, 239 - scrollProgress * 4));
      
      // Mid-top: cream to light sky blue
      const r2 = Math.max(100, Math.min(255, 242 - scrollProgress * 142));
      const g2 = Math.max(180, Math.min(255, 232 - scrollProgress * 52));
      const b2 = Math.max(220, Math.min(255, 207 - scrollProgress * -13));
      
      // Mid-bottom: cream to deeper blue
      const r3 = Math.max(25, Math.min(255, 231 - scrollProgress * 206));  // Navy: 25, 25, 112
      const g3 = Math.max(25, Math.min(255, 111 - scrollProgress * 86));
      const b3 = Math.max(112, Math.min(255, 81 + scrollProgress * 31));
      
      // Bottom: cream to navy blue
      const r4 = Math.max(0, Math.min(255, 201 - scrollProgress * 201));   // Deep navy: 0, 0, 80
      const g4 = Math.max(0, Math.min(255, 162 - scrollProgress * 162));
      const b4 = Math.max(80, Math.min(255, 74 + scrollProgress * 6));
      
      const topColor = `rgba(${r1}, ${g1}, ${b1}, 1)`;
      const midColor = `rgba(${r2}, ${g2}, ${b2}, ${Math.max(0, Math.min(1, 0.9 + scrollProgress * 0.1))})`;
      const bottomColor1 = `rgba(${r3}, ${g3}, ${b3}, ${Math.max(0, Math.min(1, 0.3 + scrollProgress * 0.4))})`;
      const bottomColor2 = `rgba(${r4}, ${g4}, ${b4}, ${Math.max(0, Math.min(1, 0.4 + scrollProgress * 0.4))})`;
      
      gradient.addColorStop(0, topColor);
      gradient.addColorStop(0.3, midColor);
      gradient.addColorStop(0.7, bottomColor1);
      gradient.addColorStop(1, bottomColor2);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse influence - larger radius and stronger effect for fish
      const mouseInfluence = {
        x: mouseRef.current.x * canvas.width,
        y: mouseRef.current.y * canvas.height,
        radius: 300,
        strength: 1.2
      };

      // Draw waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.globalAlpha = 0.1 + (index * 0.05);
        
        const points: { x: number; y: number }[] = [];
        
        for (let x = 0; x <= canvas.width; x += 5) {
          // Base wave calculation
          let y = canvas.height * 0.6 + 
                  Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
          
          // Mouse influence on waves
          const distanceToMouse = Math.sqrt(
            Math.pow(x - mouseInfluence.x, 2) + Math.pow(y - mouseInfluence.y, 2)
          );
          
          if (distanceToMouse < mouseInfluence.radius) {
            const influence = (1 - distanceToMouse / mouseInfluence.radius) * mouseInfluence.strength;
            y += Math.sin(influence * Math.PI) * 30 * (index + 1);
          }
          
          points.push({ x, y });
        }
        
        // Draw smooth curve through points
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        
        // Complete the wave shape
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Ocean gradient for waves that gets bluer with scroll
        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const waveOpacity = Math.max(0, Math.min(1, 0.1 + index * 0.05 + scrollProgress * 0.1));
        
        const wr1 = Math.max(25, Math.min(255, 231 - scrollProgress * 206));
        const wg1 = Math.max(25, Math.min(255, 111 - scrollProgress * 86));
        const wb1 = Math.max(112, Math.min(255, 81 + scrollProgress * 31));
        
        const wr2 = Math.max(0, Math.min(255, 201 - scrollProgress * 201));
        const wg2 = Math.max(0, Math.min(255, 162 - scrollProgress * 162));
        const wb2 = Math.max(80, Math.min(255, 74 + scrollProgress * 6));
        
        waveGradient.addColorStop(0, `rgba(${wr1}, ${wg1}, ${wb1}, ${waveOpacity})`);
        waveGradient.addColorStop(0.5, `rgba(${wr2}, ${wg2}, ${wb2}, ${Math.max(0, Math.min(1, 0.08 + index * 0.03 + scrollProgress * 0.1))})`);
        waveGradient.addColorStop(1, `rgba(${wr1}, ${wg1}, ${wb1}, ${Math.max(0, Math.min(1, 0.15 + index * 0.05 + scrollProgress * 0.1))})`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      });

      // Add bigger, more identifiable fish swimming throughout the page
      ctx.globalAlpha = 0.8;
      const fishCount = Math.max(12, 12 + Math.floor(scrollProgress * 8));
      
      for (let i = 0; i < fishCount; i++) {
        // Fish swim across the entire screen height
        const fishX = ((i * canvas.width * 1.5) / fishCount + time * (2 + i * 0.5)) % (canvas.width + 200) - 100;
        const fishY = (canvas.height * 0.1) + (i % 4) * (canvas.height * 0.2) + Math.sin(time * 0.008 + i * 0.5) * 80;
        
        // Mouse influence on fish - make them run away
        const distanceToMouse = Math.sqrt(
          Math.pow(fishX - mouseInfluence.x, 2) + Math.pow(fishY - mouseInfluence.y, 2)
        );
        
        let offsetX = 0, offsetY = 0;
        if (distanceToMouse < mouseInfluence.radius) {
          const influence = (1 - distanceToMouse / mouseInfluence.radius) * mouseInfluence.strength;
          // Reverse the direction to make fish run away from cursor
          offsetX = -(mouseInfluence.x - fishX) * influence * 0.8;
          offsetY = -(mouseInfluence.y - fishY) * influence * 0.8;
        }
        
        const finalFishX = fishX + offsetX;
        const finalFishY = fishY + offsetY;
        
        // Bigger, more detailed fish
        const fishSize = Math.max(8, 12 + Math.sin(time * 0.02 + i) * 3 + scrollProgress * 6);
        const fishRotation = Math.sin(time * 0.005 + i) * 0.3;
        
        // Fish colors that become more blue with depth - sky to navy transition
        const fr = Math.max(50, Math.min(255, 180 - scrollProgress * 130));
        const fg = Math.max(100, Math.min(255, 140 - scrollProgress * 40));
        const fb = Math.max(150, Math.min(255, 120 + scrollProgress * 135));
        const fishAlpha = Math.max(0.4, Math.min(0.9, 0.5 + Math.sin(time * 0.01 + i) * 0.2 + scrollProgress * 0.2));
        
        ctx.save();
        ctx.translate(finalFishX, finalFishY);
        ctx.rotate(fishRotation);
        
        // Fish body (main ellipse)
        ctx.beginPath();
        ctx.ellipse(0, 0, fishSize * 2, fishSize, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${fr}, ${fg}, ${fb}, ${fishAlpha})`;
        ctx.fill();
        
        // Fish belly (lighter)
        ctx.beginPath();
        ctx.ellipse(0, fishSize * 0.3, fishSize * 1.5, fishSize * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(255, fr + 40)}, ${Math.min(255, fg + 30)}, ${Math.min(255, fb + 20)}, ${fishAlpha * 0.7})`;
        ctx.fill();
        
        // Fish tail
        ctx.beginPath();
        ctx.moveTo(-fishSize * 2, 0);
        ctx.lineTo(-fishSize * 3.5, -fishSize * 1.2);
        ctx.lineTo(-fishSize * 4, 0);
        ctx.lineTo(-fishSize * 3.5, fishSize * 1.2);
        ctx.closePath();
        ctx.fillStyle = `rgba(${Math.max(0, fr - 20)}, ${Math.max(0, fg - 15)}, ${fb}, ${fishAlpha * 0.8})`;
        ctx.fill();
        
        // Fish eye
        ctx.beginPath();
        ctx.arc(fishSize * 0.8, -fishSize * 0.3, fishSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${fishAlpha})`;
        ctx.fill();
        
        // Eye pupil
        ctx.beginPath();
        ctx.arc(fishSize * 0.9, -fishSize * 0.3, fishSize * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${fishAlpha})`;
        ctx.fill();
        
        // Dorsal fin
        ctx.beginPath();
        ctx.moveTo(fishSize * 0.5, -fishSize);
        ctx.lineTo(0, -fishSize * 1.8);
        ctx.lineTo(-fishSize * 0.5, -fishSize);
        ctx.closePath();
        ctx.fillStyle = `rgba(${Math.max(0, fr - 30)}, ${Math.max(0, fg - 20)}, ${fb}, ${fishAlpha * 0.6})`;
        ctx.fill();
        
        ctx.restore();
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    setIsLoaded(true);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 -z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 2 }}
        style={{
          background: 'linear-gradient(135deg, #F7F5EF 0%, #F2E8CF 50%, #F7F5EF 100%)',
        }}
      />
      
      {/* Additional overlay for depth */}
      <div 
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(231, 111, 81, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201, 162, 74, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(231, 111, 81, 0.05) 0%, transparent 50%)
          `,
        }}
      />
    </>
  );
}