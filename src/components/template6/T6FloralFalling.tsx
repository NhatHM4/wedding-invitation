"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: "petal" | "sparkle";
}

const COLORS = [
  "rgba(240, 128, 128, 0.4)", // Light Coral/Rose
  "rgba(255, 182, 193, 0.35)", // Light Pink
  "rgba(224, 176, 255, 0.3)", // Mauve
  "rgba(197, 168, 128, 0.45)", // Soft Gold
];

export default function T6FloralFalling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Petal[] = [];
    const maxParticles = 25; // Keep it low for performance on mobile

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Helper to generate a new petal
    const createPetal = (isInitial = false): Petal => {
      const type = Math.random() > 0.3 ? "petal" : "sparkle";
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : -20,
        size: Math.random() * 8 + (type === "petal" ? 6 : 4), // 6px to 14px for petals, 4px to 12px for sparkles
        speedY: Math.random() * 0.8 + 0.4, // slow descent
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createPetal(true));
    }

    // Draw stylized cherry blossom petal
    const drawPetalPath = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size / 2);
      c.bezierCurveTo(size / 2, -size / 2, size, -size / 4, size / 2, size / 2);
      c.bezierCurveTo(0, size, -size / 2, size / 2, -size / 2, -size / 4);
      c.closePath();
      c.fill();
    };

    // Draw 4-point sparkle
    const drawSparklePath = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update physics
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 30) * 0.2; // swaying
        p.rotation += p.rotationSpeed;

        // Reset if goes offscreen
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[i] = createPetal(false);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === "petal") {
          drawPetalPath(ctx, p.size);
        } else {
          drawSparklePath(ctx, p.size);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
