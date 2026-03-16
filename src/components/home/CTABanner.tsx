import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { AnimatedText } from "@/components/animation/AnimatedText";

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80"
          alt="Collection"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-4"
        >
          Spring / Summer 2026
        </motion.p>

        <AnimatedText
          text="Experience the Collection"
          as="h2"
          className="text-white text-4xl md:text-6xl lg:text-7xl mb-8"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative bg-white text-black px-10 py-4 text-[11px] uppercase tracking-[0.2em] overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Shop Now</span>
              <span className="absolute inset-0 bg-black scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
