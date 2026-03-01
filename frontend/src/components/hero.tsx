import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";

interface HeroProps {
  imageUrl: string;
}

export const Hero = React.memo(function Hero({ imageUrl }: HeroProps) {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden mt-20 md:mt-32">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-full"
      >
        {/* use fallback for hero image */}
        <ImageWithFallback
          src={imageUrl}
          alt="Hero"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl mb-6 text-white"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            Spring Collection
          </h2>
          <p
            className="text-white/90 text-base md:text-lg mb-8 tracking-wide max-w-md mx-auto"
            style={{ fontWeight: 300 }}
          >
            Discover timeless elegance in our curated selection
          </p>
          <Link to="/collections" className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-foreground text-primary px-10 py-3.5 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            style={{ letterSpacing: "0.15em" }}
          >
            Explore Now
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});
