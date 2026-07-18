"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TextSilhouetteMaskProps {
  /** Path to the wedding photo used as background inside letter shapes */
  imageSrc: string;
  /** The couple's names displayed as the mask (e.g. "ANH & LINH") */
  coupleNames: string;
  /** Alt text for accessibility */
  imageAlt?: string;
  /** Additional container class */
  className?: string;
  /** Font size of the mask text */
  fontSize?: string;
}

/**
 * TextSilhouetteMask
 *
 * Renders the couple's names as HUGE display text that acts as a window into
 * a wedding photograph. The photo is visible only INSIDE the letter outlines
 * using `background-clip: text`.
 *
 * On tap/click:
 * 1. The photo expands via Framer Motion layoutId to fill the full viewport.
 * 2. The names gracefully shrink to a small header at the top-left corner.
 * 3. Tapping again collapses it back.
 *
 * z-index: z-20 (sits above marquee z-0 and kinetic text z-10)
 */
export default function TextSilhouetteMask({
  imageSrc,
  coupleNames,
  imageAlt = "Wedding photo",
  className = "",
  fontSize = "clamp(2rem, 10.5vw, 4.5rem)",
}: TextSilhouetteMaskProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = useCallback(() => setIsExpanded((v) => !v), []);

  return (
    <>
      {/* ── COLLAPSED STATE ─────────────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        {!isExpanded && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            onClick={toggle}
            className={`relative cursor-pointer select-none ${className}`}
            style={{ zIndex: 20 }}
          >
            {/* Photo-inside-text effect */}
            <div
              style={{
                fontSize,
                fontFamily: "var(--font-cormorant-garamond)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                // The core CSS trick
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "1px rgba(249, 246, 238, 0.35)", // Elegant light gold/cream outline
                filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.5))", // Stand out shadow
                // Performance
                WebkitFontSmoothing: "antialiased",
                willChange: "transform",
              } as React.CSSProperties}
            >
              {coupleNames}
            </div>

            {/* Tap hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{
                textAlign: "center",
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C5A880",
                marginTop: "1rem",
              }}
            >
              chạm để xem ảnh
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EXPANDED STATE ───────────────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
            }}
          >
            {/* Full-screen photo */}
            <motion.div
              layoutId="silhouette-photo"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 180,
              }}
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
              />
              {/* Scrim gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(17,17,17,0.55) 0%, transparent 40%, rgba(17,17,17,0.7) 100%)",
                }}
              />
            </motion.div>

            {/* Couple names relocated to top-left as white header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              style={{
                position: "absolute",
                top: "2rem",
                left: "1.5rem",
                zIndex: 10,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant-garamond)",
                  fontWeight: 600,
                  fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                  color: "#F9F6EE",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  WebkitFontSmoothing: "antialiased",
                } as React.CSSProperties}
              >
                {coupleNames}
              </p>
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={toggle}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                zIndex: 10,
                background: "rgba(249,246,238,0.15)",
                border: "1px solid rgba(249,246,238,0.3)",
                backdropFilter: "blur(8px)",
                borderRadius: "50%",
                width: "2.75rem",
                height: "2.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#F9F6EE",
                fontSize: "1.1rem",
              }}
              aria-label="Đóng ảnh"
            >
              ✕
            </motion.button>

            {/* Tap anywhere to close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggle}
              style={{
                position: "absolute",
                bottom: "2.5rem",
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "var(--font-inter)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(249,246,238,0.6)",
                cursor: "pointer",
              }}
            >
              chạm để đóng
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
