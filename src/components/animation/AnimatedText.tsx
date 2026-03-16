import { motion } from "motion/react";
import { viewportOnce, smooth } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "word" | "char";
  delay?: number;
  className?: string;
  staggerDelay?: number;
}

export function AnimatedText({
  text,
  as: Tag = "h2",
  splitBy = "word",
  delay = 0,
  className = "",
  staggerDelay = 0.08,
}: AnimatedTextProps) {
  const units = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className="inline"
      >
        {units.map((unit, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { ...smooth, duration: 0.6 },
                },
              }}
            >
              {unit}
              {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
