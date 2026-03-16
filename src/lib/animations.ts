import type { Variants, Transition } from "motion/react";

// --- Reveal Variants ---

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: { clipPath: "inset(0% 0 0 0)" },
};

export const clipRevealDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)" },
};

// --- Stagger Container ---

export const staggerContainer = (staggerDelay = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

// --- Transition Presets ---

export const smooth: Transition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

export const smoothSlow: Transition = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1],
};

export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const snappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// --- Viewport Config ---

export const viewportOnce = { once: true, margin: "-100px" as const };
export const viewportOnceEarly = { once: true, margin: "-50px" as const };
