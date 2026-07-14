"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  spinSpeed: number;
}

export default function Cl46AmbientPetals() {
  const shouldReduceMotion = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    // Generate rose petals
    const newPetals = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 95, // left position percent
      delay: Math.random() * 8, // staggered start delays
      duration: 12 + Math.random() * 12, // slow drop duration (12s - 24s)
      size: 8 + Math.random() * 8, // size in pixels (8px - 16px)
      spinSpeed: 180 + Math.random() * 180, // rotate degree per keyframe
    }));
    
    setPetals(newPetals);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion || petals.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden select-none">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-5%", x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "105%",
            x: [0, 15, -15, 0], // sway left/right during descent
            opacity: [0, 0.5, 0.5, 0], // fade-in then fade-out near bottom
            rotate: p.spinSpeed,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "#fbe2e2", // soft romantic rose pink
            borderRadius: "50% 0 50% 50%", // organic rose petal shape
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}
