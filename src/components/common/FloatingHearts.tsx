"use client";

import React, { useEffect, useRef } from "react";

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

export default function FloatingHearts({ count = 32, className = "" }: FloatingHeartsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let animationFrameId: number;
    let particles: HeartParticle[] = [];

    const colors = [
      "rgba(244, 114, 182, ", // soft pink
      "rgba(251, 113, 133, ", // rose pink
      "rgba(244, 63, 94, ",   // vibrant rose
      "rgba(253, 164, 175, ", // blush pink
      "rgba(225, 29, 72, ",   // deep rose
    ];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Helper to draw a smooth vector heart path
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      rotation: number,
      colorBase: string
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();

      // Vector heart geometry
      context.moveTo(0, -size / 4);
      context.quadraticCurveTo(-size / 2, -size / 2, -size / 2, 0);
      context.quadraticCurveTo(-size / 2, size / 3, 0, size);
      context.quadraticCurveTo(size / 2, size / 3, size / 2, 0);
      context.quadraticCurveTo(size / 2, -size / 2, 0, -size / 4);

      context.closePath();
      context.fillStyle = `${colorBase}${opacity})`;
      context.fill();
      context.restore();
    };

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 6,
        speed: Math.random() * 1.2 + 0.8,
        drift: Math.random() * 0.6 - 0.3,
        opacity: Math.random() * 0.45 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += Math.sin(particle.y / 35) * 0.6 + particle.drift;
        particle.rotation += particle.rotationSpeed;

        drawHeart(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.opacity,
          particle.rotation,
          particle.color
        );

        // Recycle particle when moving past viewport bottom
        if (particle.y > canvas.height + 25) {
          particle.y = -25;
          particle.x = Math.random() * canvas.width;
          particle.size = Math.random() * 8 + 6;
          particle.speed = Math.random() * 1.2 + 0.8;
          particle.opacity = Math.random() * 0.45 + 0.25;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-40 w-full h-full ${className}`}
    />
  );
}
