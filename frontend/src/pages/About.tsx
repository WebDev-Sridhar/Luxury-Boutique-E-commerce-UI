import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background"
    >
      {/* hero image */}
      <div className="w-full h-[60vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1518481852452-9415b262eba4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About Hero"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-24">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl mb-8"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          Our Story
        </h1>
        <p
          className="text-lg leading-relaxed text-foreground/80 mb-8"
          style={{ fontWeight: 300 }}
        >
          Founded in the heart of Paris, our maison is rooted in a love for
          handcrafted elegance. For over two decades, we have woven heritage
          techniques with modern sensibilities, creating pieces that speak to
          the soul. Every stitch tells a story—one of passion, resilience, and
          an unwavering commitment to beauty.
        </p>
        <p
          className="text-lg leading-relaxed text-foreground/80"
          style={{ fontWeight: 300 }}
        >
          We believe in slow fashion, in garments that accompany you through
          life's moments rather than fleeting trends. Our ateliers are
          sanctuaries where artisans infuse intention into each creation,
          ensuring that what you wear is not only luxurious but meaningful.
        </p>
      </div>

      <div className="bg-secondary py-24">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="atelier"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2
              className="text-3xl mb-4"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
              }}
            >
              Craftsmanship
            </h2>
            <p
              className="text-base leading-relaxed text-foreground/80"
              style={{ fontWeight: 300 }}
            >
              Every piece begins with a sketch and a vision. Our artisans spend
              hours perfecting seams, selecting the finest fabrics, and ensuring
              that the finishing touches reflect our dedication to excellence.
              It is this reverence for craft that defines our identity.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
