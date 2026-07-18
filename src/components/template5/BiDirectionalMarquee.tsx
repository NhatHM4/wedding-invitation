"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  MotionStyle,
  useScroll,
  useVelocity,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface BiDirectionalMarqueeProps {
  text: string;
  baseSpeed?: number;
  speedMultiplier?: number;
  fontSize?: string;
  color?: string;
  background?: string;
  paddingY?: string;
  className?: string;
}

/**
 * BiDirectionalMarquee
 *
 * Infinite horizontal ticker that responds to vertical scroll velocity.
 * Scrolling down → text drifts right; scrolling up → text drifts left.
 * Uses rAF + MotionValue for GPU-composited transform only.
 */
export default function BiDirectionalMarquee({
  text,
  baseSpeed = 0.8,
  speedMultiplier = 0.04,
  fontSize = "clamp(1.1rem, 3.5vw, 1.8rem)",
  color = "#C5A880",
  background = "transparent",
  paddingY = "0.75rem",
  className = "",
}: BiDirectionalMarqueeProps) {
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { damping: 50, stiffness: 400 });

  // Pixel translateX — used directly in motion.div style (MotionStyle supports MotionValue)
  const translateX = useMotionValue(0);
  const trackWidthRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      // Half of the total duplicated track
      trackWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, []);

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 50) / (1000 / 60);
    const vel = smoothVelocity.get();

    let next = translateX.get() + baseSpeed * dt + vel * speedMultiplier * dt;

    // Wrap within [-half, 0] for seamless loop
    const half = trackWidthRef.current;
    if (half > 0) {
      if (next > 0) next -= half;
      if (next < -half) next += half;
    }

    translateX.set(next);
  });

  const displayText = `${text}   ·   `;

  // MotionStyle lets us pass MotionValue<number> for x directly
  const trackStyle: MotionStyle = {
    x: translateX,
    display: "flex",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    willChange: "transform",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      className={`overflow-hidden w-full ${className}`}
      style={{ background, paddingTop: paddingY, paddingBottom: paddingY }}
    >
      <motion.div ref={trackRef} style={trackStyle}>
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontSize,
              fontFamily: "var(--font-cormorant-garamond)",
              fontStyle: "italic",
              fontWeight: 400,
              color,
              letterSpacing: "0.12em",
              paddingRight: "2.5rem",
              flexShrink: 0,
              WebkitFontSmoothing: "antialiased",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any}
          >
            {displayText}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
