"use client";

import { useEffect, useRef } from "react";

interface T1NebulaBackgroundProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  isOpened: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  colorIndex: number;
  alpha: number;
  decay: number;
}

export default function T1NebulaBackground({ analyser, isPlaying, isOpened }: T1NebulaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize particles
    const particles: Particle[] = [];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseSize: Math.random() * 3 + 1,
        size: 0,
        colorIndex: Math.floor(Math.random() * 5),
        alpha: Math.random() * 0.6 + 0.2,
        decay: Math.random() * 0.002 + 0.001,
      });
    }

    // Set up audio data array
    if (analyser) {
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw glowing space nebulae blobs (slower drifting gradients)
      const time = Date.now() * 0.0005;
      const blob1X = width * 0.5 + Math.sin(time) * 100;
      const blob1Y = height * 0.4 + Math.cos(time * 0.8) * 100;
      const blob2X = width * 0.3 + Math.cos(time * 0.7) * 120;
      const blob2Y = height * 0.7 + Math.sin(time * 0.9) * 120;

      let bassGlow = 0;
      let midGlow = 0;
      let speedMult = 1.0;
      let sizeMult = 1.0;

      // Analyze audio data if available and playing
      if (analyser && isPlaying && dataArrayRef.current) {
        analyser.getByteFrequencyData(dataArrayRef.current as any);
        const data = dataArrayRef.current;

        // Calculate frequency ranges
        // Bass (index 0 to 10)
        let bassSum = 0;
        for (let i = 0; i < 10; i++) bassSum += data[i];
        bassGlow = bassSum / 10 / 255; // 0.0 to 1.0

        // Mid (index 11 to 50)
        let midSum = 0;
        for (let i = 11; i < 50; i++) midSum += data[i];
        midGlow = midSum / 40 / 255;

        // Adjust multipliers based on music beat
        sizeMult = 1.0 + bassGlow * 1.5;
        speedMult = 1.0 + midGlow * 3.0;
      }

      const darkColors = [
        "rgba(147, 51, 234, ",  // purple
        "rgba(79, 70, 229, ",   // indigo
        "rgba(236, 72, 153, ",  // pink
        "rgba(59, 130, 246, ",  // blue
        "rgba(6, 182, 212, ",   // cyan
      ];
      const lightColors = [
        "rgba(244, 63, 94, ",   // rose-500
        "rgba(251, 113, 133, ",  // rose-400
        "rgba(236, 72, 153, ",  // pink-500
        "rgba(244, 114, 182, ",  // pink-400
        "rgba(217, 70, 239, ",   // fuchsia-500
      ];

      const currentColors = isOpened ? lightColors : darkColors;

      // Draw large nebula background clouds
      // Cloud 1 (Purple vs Rose)
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 10, blob1X, blob1Y, 250 + bassGlow * 100);
      if (!isOpened) {
        grad1.addColorStop(0, `rgba(139, 92, 246, ${0.15 + bassGlow * 0.1})`);
        grad1.addColorStop(0.5, `rgba(76, 29, 149, ${0.07 + bassGlow * 0.05})`);
        grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        grad1.addColorStop(0, `rgba(244, 63, 94, ${0.12 + bassGlow * 0.08})`);
        grad1.addColorStop(0.5, `rgba(251, 113, 133, ${0.05 + bassGlow * 0.03})`);
        grad1.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Cloud 2 (Blue vs Pink)
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 10, blob2X, blob2Y, 200 + midGlow * 100);
      if (!isOpened) {
        grad2.addColorStop(0, `rgba(6, 182, 212, ${0.12 + midGlow * 0.1})`);
        grad2.addColorStop(0.5, `rgba(30, 58, 138, ${0.05 + midGlow * 0.05})`);
        grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        grad2.addColorStop(0, `rgba(244, 114, 182, ${0.1 + midGlow * 0.08})`);
        grad2.addColorStop(0.5, `rgba(236, 72, 153, ${0.04 + midGlow * 0.03})`);
        grad2.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        // Move particle (faster on beat)
        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;

        // Warp bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse size on music beat
        p.size = p.baseSize * sizeMult;

        const pColor = currentColors[p.colorIndex];

        // Draw particle glow
        ctx.beginPath();
        const particleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        particleGlow.addColorStop(0, pColor + (p.alpha + bassGlow * 0.3) + ")");
        particleGlow.addColorStop(1, pColor + "0)");
        ctx.fillStyle = particleGlow;
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw core particle
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha + 0.2})`;
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Simple grid overlays for luxury visual texture
      ctx.strokeStyle = !isOpened ? "rgba(255, 255, 255, 0.015)" : "rgba(244, 63, 94, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [analyser, isPlaying, isOpened]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none -z-10 transition-colors duration-1000 ${
        isOpened
          ? "bg-gradient-to-br from-[#fff7f9] via-[#fffbfd] to-[#fff3f6]"
          : "bg-[#060211]"
      }`}
    />
  );
}
