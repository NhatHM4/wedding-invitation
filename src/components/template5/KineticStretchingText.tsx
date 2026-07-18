"use client";

import React from "react";
import {
  motion,
  MotionStyle,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";

interface KineticStretchingTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  baseWeight?: number;
  color?: string;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

/**
 * KineticStretchingText
 *
 * Warps text based on physical scroll velocity. Fast scrolling = text
 * stretches vertically and compresses horizontally. When scroll stops,
 * a spring snaps it back to baseline (with a subtle under-shoot bounce).
 *
 * Performance: Only CSS transform (scale3d) — never mutates font-size.
 */
export default function KineticStretchingText({
  text,
  className = "",
  fontSize = "clamp(2.5rem, 10vw, 5rem)",
  baseWeight = 400,
  color = "#F9F6EE",
  align = "center",
  style,
}: KineticStretchingTextProps) {
  // ── Velocity pipeline ────────────────────────────────────────────────────
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);

  // Tight-but-elastic spring — the snap-back bounce comes from damping < critical
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // ── Property mapping ─────────────────────────────────────────────────────
  const scaleY = useTransform(
    smoothVelocity,
    [-3000, -1500, 0, 1500, 3000],
    [1.35, 1.18, 1.0, 1.18, 1.35]
  );

  const scaleX = useTransform(
    smoothVelocity,
    [-3000, -1500, 0, 1500, 3000],
    [0.82, 0.91, 1.0, 0.91, 0.82]
  );

  // Subtle letter-spacing breath (does NOT change font-size — safe for perf)
  const letterSpacing = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    ["-0.04em", "0.02em", "-0.04em"]
  );

  // MotionStyle properly accepts MotionValue types
  const spanStyle: MotionStyle = {
    scaleY,
    scaleX,
    letterSpacing,
    display: "inline-block",
    fontSize,
    color,
    fontFamily: "var(--font-cormorant-garamond)",
    fontWeight: baseWeight,
    lineHeight: 1,
    WebkitFontSmoothing: "antialiased",
    backfaceVisibility: "hidden",
    willChange: "transform",
    transformOrigin: "center center",
  };

  return (
    <div
      className={`kinetic-text-wrapper ${className}`}
      style={{ textAlign: align, display: "block", ...style }}
    >
      <motion.span style={spanStyle}>{text}</motion.span>
    </div>
  );
}
