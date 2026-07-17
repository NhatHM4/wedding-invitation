import { Variants } from "framer-motion";

// ── Spring timing presets ─────────────────────────────────
export const premiumSpring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
};

export const snappySpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export const standardTween = {
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.6,
};

export const slowTween = {
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.8,
};

// Cinematic ease — used for clip-path / dramatic reveals
export const cinematicTween = {
  type: "tween" as const,
  ease: [0.76, 0, 0.24, 1] as const,
  duration: 0.85,
};

// ── Core Framer Motion variants ───────────────────────────

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: premiumSpring,
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: premiumSpring,
  },
  exit: {
    opacity: 0,
    y: 15,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -25 },
  animate: {
    opacity: 1,
    x: 0,
    transition: premiumSpring,
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 25 },
  animate: {
    opacity: 1,
    x: 0,
    transition: premiumSpring,
  },
};

export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: premiumSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const accordion: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.15 },
    },
  },
};

// ── Film Journal additions ────────────────────────────────

/** Cinematic clip-path reveal — slides content up from bottom of element */
export const cinematicReveal: Variants = {
  initial: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  animate: {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: cinematicTween,
  },
};

/** Editorial slide — horizontal entrance from left, softer than fadeInLeft */
export const editorialSlide: Variants = {
  initial: { opacity: 0, x: -18 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 28,
    },
  },
};

/** Scale-up for the asymmetric gold contour line */
export const lineGrow: Variants = {
  initial: { scaleX: 0, opacity: 0 },
  animate: {
    scaleX: 1,
    opacity: 0.55,
    transition: slowTween,
  },
};

/** Botanical ornament entrance */
export const botanicalIn: Variants = {
  initial: { opacity: 0, rotate: -5, scale: 0.92 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 160,
      damping: 22,
      delay: 0.6,
    },
  },
};

/** Hero names — letter-spacing expand */
export const heroNameReveal: Variants = {
  initial: { opacity: 0, letterSpacing: "1px" },
  animate: {
    opacity: 1,
    letterSpacing: "4px",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.35,
    },
  },
};

/** Stagger container with longer delays for hero sequence */
export const heroStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};
