"use client";

import React, { useRef, useImperativeHandle, forwardRef, useEffect } from "react";

export interface T6CanvasHeartsRef {
  emit: (x: number, y: number) => void;
}

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayOffset: number;
}

const COLORS = [
  "#FF6B6B", // Coral Red
  "#FF8E8E", // Soft Red
  "#E84A5F", // Rose Pink
  "#FF7597", // Hot Pink
  "#D789D7", // Lilac
  "#FFB4B4", // Blush Pink
  "#C5A880", // Soft Gold
];

export interface T6CanvasHeartsProps {}

export const T6CanvasHearts = forwardRef<T6CanvasHeartsRef, T6CanvasHeartsProps>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HeartParticle[]>([]);

  useImperativeHandle(ref, () => ({
    emit(x: number, y: number) {
      const count = 12; // Number of hearts per click
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x,
          y,
          size: Math.random() * 14 + 10, // 10px to 24px
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          vx: (Math.random() - 0.5) * 5, // horizontal drift
          vy: -(Math.random() * 4 + 3), // rise up
          opacity: 1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          swaySpeed: Math.random() * 0.03 + 0.01,
          swayOffset: Math.random() * 100,
        });
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Draw a single heart path on canvas
    const drawHeart = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = opacity;
      c.fillStyle = color;
      c.beginPath();
      // Draw heart using curves
      c.moveTo(0, -size / 4);
      c.bezierCurveTo(-size / 2, -size * 0.8, -size, -size * 0.3, -size, size / 6);
      c.bezierCurveTo(-size, size * 0.6, -size / 2, size * 0.9, 0, size);
      c.bezierCurveTo(size / 2, size * 0.9, size, size * 0.6, size, size / 6);
      c.bezierCurveTo(size, -size * 0.3, size / 2, -size * 0.8, 0, -size / 4);
      c.closePath();
      c.fill();
      c.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.swayOffset) * 0.5;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.swayOffset += p.swaySpeed;
        p.opacity -= 0.012; // Fade out slowly

        if (p.opacity <= 0 || p.y < -50 || p.x < -50 || p.x > canvas.width + 50) {
          particles.splice(i, 1);
        } else {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
});

T6CanvasHearts.displayName = "T6CanvasHearts";
