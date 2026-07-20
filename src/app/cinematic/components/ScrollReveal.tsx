"use client";

import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number;
  blur?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  once = true,
  className = "",
  amount = 0.3,
  blur = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();

  const directionMap: Record<string, { x?: number; y?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  const offset = directionMap[direction] || {};

  const hidden: Variant = prefersReducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        ...offset,
        ...(blur ? { filter: "blur(8px)" } : {}),
      };

  const visible: Variant = prefersReducedMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration: prefersReducedMotion ? 0.2 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
