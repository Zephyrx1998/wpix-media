import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const ParticleBackground = memo(() => {
  // Reduced to 15 particles for better performance
  const particles: Particle[] = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 3,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 will-change-auto">
      {/* Simplified gradient orbs - using CSS animations instead of framer-motion for better perf */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-15 animate-float-slow"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-10 animate-float-medium"
        style={{
          background: "radial-gradient(circle, hsl(142 76% 46% / 0.25) 0%, transparent 70%)",
          right: "15%",
          top: "50%",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />

      {/* Simplified floating particles with CSS animations */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/15 dark:bg-primary/20 animate-float-particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Static mesh gradient overlay - no animation needed */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-15"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(142 76% 46% / 0.06) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
});

ParticleBackground.displayName = "ParticleBackground";

export default ParticleBackground;
