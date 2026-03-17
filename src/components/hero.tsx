import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  compact?: boolean;
}

export function Hero({
  imageUrl,
  title = "The Art of\nTimeless Style",
  subtitle = "Discover our curated collection of refined luxury essentials",
  ctaText = "Explore Collection",
  ctaLink = "/collections",
  compact = false,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const lines = title.split("\n");

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${compact ? "h-[50vh] md:h-[65vh]" : "h-screen"}`}
    >
      {/* Parallax Background */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img src={imageUrl} alt="Hero" className="w-full h-full object-cover" loading="eager" />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content - Asymmetric bottom-left */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-24 lg:pb-32 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-[1800px] mx-auto w-full">
          {/* Oversized Title with staggered reveal */}
          <div className="mb-6">
            {lines.map((line, lineIdx) => (
              <div key={lineIdx} className="overflow-hidden">
                {line.split(" ").map((word, wordIdx) => (
                  <span key={wordIdx} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                      className="inline-block text-white text-[11vw] sm:text-[12vw] md:text-[8vw] lg:text-[6.5vw] leading-[0.95] tracking-[-0.02em]"
                      style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + (lineIdx * 3 + wordIdx) * 0.08,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Subtitle with line accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-6 mb-10"
          >
            <div className="w-12 h-[1px] bg-white/50" />
            <p className="text-white/80 text-sm md:text-base tracking-wide max-w-md" style={{ fontWeight: 300 }}>
              {subtitle}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}>
            <Link to={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative bg-white text-black px-7 py-3.5 md:px-10 md:py-4 text-[11px] uppercase tracking-[0.2em] overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{ctaText}</span>
                <span className="absolute inset-0 bg-foreground scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/50 animate-scroll-hint" />
        </motion.div>
      )}
    </section>
  );
}
