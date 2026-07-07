"use client";

import { useEffect, useRef } from "react";

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function TmdvHeartsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let hearts: Heart[] = [];
    const maxHearts = 35; // Keep it elegant and not too crowded

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Helper to draw a heart
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      
      // Traditional heart curve drawing
      ctx.moveTo(0, -size / 4);
      ctx.quadraticCurveTo(-size / 2, -size / 2, -size / 2, 0);
      ctx.quadraticCurveTo(-size / 2, size / 3, 0, size);
      ctx.quadraticCurveTo(size / 2, size / 3, size / 2, 0);
      ctx.quadraticCurveTo(size / 2, -size / 2, 0, -size / 4);
      
      ctx.closePath();
      ctx.fillStyle = `rgba(244, 143, 177, ${opacity})`; // Soft pink color
      ctx.fill();
      ctx.restore();
    };

    // Initialize hearts
    for (let i = 0; i < maxHearts; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 6, // sizes between 6px and 14px
        speed: Math.random() * 1.5 + 1.0, // vertical speed
        drift: Math.random() * 0.8 - 0.4, // side to side sway
        opacity: Math.random() * 0.5 + 0.3, // opacity between 0.3 and 0.8
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        // Update positions
        heart.y += heart.speed;
        heart.x += Math.sin(heart.y / 30) * 0.5 + heart.drift;
        heart.rotation += heart.rotationSpeed;

        // Draw the heart
        drawHeart(ctx, heart.x, heart.y, heart.size, heart.opacity, heart.rotation);

        // Recycle hearts that go off bottom
        if (heart.y > canvas.height + 20) {
          heart.y = -20;
          heart.x = Math.random() * canvas.width;
          heart.size = Math.random() * 8 + 6;
          heart.speed = Math.random() * 1.5 + 1.0;
          heart.opacity = Math.random() * 0.5 + 0.3;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[8888] w-full h-full"
    />
  );
}
