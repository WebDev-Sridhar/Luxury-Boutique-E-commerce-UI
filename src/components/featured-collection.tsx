import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeaturedCollectionProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const FeaturedCollection = React.memo(function FeaturedCollection({
  imageUrl,
  title,
  description,
}: FeaturedCollectionProps) {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="relative overflow-hidden aspect-[3/4] bg-muted">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 space-y-8 lg:pl-12"
        >
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Featured Collection
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
                lineHeight: "1.2",
              }}
            >
              {title}
            </h2>
            <p
              className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-lg"
              style={{ fontWeight: 300 }}
            >
              {description}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-primary-foreground px-10 py-3.5 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
            style={{ letterSpacing: "0.15em" }}
          >
            Discover More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});
