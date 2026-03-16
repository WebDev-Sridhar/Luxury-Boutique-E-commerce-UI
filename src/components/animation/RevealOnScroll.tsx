import { motion, type Variants } from "motion/react";
import { fadeUp, smooth, viewportOnce } from "@/lib/animations";

interface RevealOnScrollProps {
  children: React.ReactNode;
  variant?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

export function RevealOnScroll({
  children,
  variant = fadeUp,
  delay = 0,
  duration = 0.8,
  className = "",
  as = "div",
}: RevealOnScrollProps) {
  const Component = motion.create(as);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variant}
      transition={{ ...smooth, duration, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
