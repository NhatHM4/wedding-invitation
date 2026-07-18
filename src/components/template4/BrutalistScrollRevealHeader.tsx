"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BrutalistScrollRevealHeaderProps {
  text: string;
  className?: string;
}

export default function BrutalistScrollRevealHeader({ text, className = "" }: BrutalistScrollRevealHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  // Split the text into characters, converting normal spaces into non-breaking spaces to ensure wrapping works correctly.
  const characters = text.split("").map((char) => (char === " " ? "\u00A0" : char));

  // Parent variants to orchestrate staggered children reveal
  const parentVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.1,
      },
    },
  };

  // Child variants with physical inertia curves and prefers-reduced-motion guards
  const childVariants = {
    initial: {
      y: shouldReduceMotion ? "0%" : "105%",
      rotate: shouldReduceMotion ? 0 : 8,
      opacity: 0,
      skewY: shouldReduceMotion ? 0 : 6,
    },
    animate: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      skewY: 0,
      transition: {
        type: "tween" as const,
        ease: [0.16, 1, 0.3, 1] as const, // Custom cubic-bezier curve mimicking organic physical inertia
        duration: shouldReduceMotion ? 0.3 : 0.85,
      },
    },
  };

  return (
    <motion.h2
      className={`flex flex-wrap select-none ${className}`}
      variants={parentVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.3 }}
    >
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block overflow-hidden vertical-align-bottom will-change-transform"
          style={{ backfaceVisibility: "hidden", transform: "translate3d(0,0,0)" }}
        >
          <motion.span
            className="inline-block origin-bottom-left will-change-transform"
            variants={childVariants}
            style={{ backfaceVisibility: "hidden", transform: "translate3d(0,0,0)" }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
