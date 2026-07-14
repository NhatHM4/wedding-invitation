import { Variants } from "framer-motion";

// Premium spring timing definitions conforming to animation-motion-design guidelines
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
  ease: [0.16, 1, 0.3, 1], // premium cubic-bezier ease-out
  duration: 0.6,
};

export const slowTween = {
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1],
  duration: 0.8,
};

// Reusable Framer Motion variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 25 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: premiumSpring 
  },
  exit: { 
    opacity: 0, 
    y: -15, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -25 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: premiumSpring 
  },
  exit: { 
    opacity: 0, 
    y: 15, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -25 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: premiumSpring 
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 25 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: premiumSpring 
  },
};

export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: premiumSpring 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
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
    transition: { height: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } 
  },
  exit: { 
    height: 0, 
    opacity: 0, 
    transition: { height: { duration: 0.2 }, opacity: { duration: 0.15 } } 
  },
};
