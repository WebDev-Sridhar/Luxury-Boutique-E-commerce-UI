import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  category?: string;
}

export const ProductCard = React.memo(function ProductCard({
  name,
  price,
  imageUrl,
  secondaryImageUrl,
  category,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted mb-4 aspect-[3/4]">
        <motion.div
          animate={{ opacity: isHovered && secondaryImageUrl ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {secondaryImageUrl && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ImageWithFallback
              src={secondaryImageUrl}
              alt={`${name} alternate view`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Quick Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <button className="w-full bg-primary/95 backdrop-blur-sm text-primary-foreground py-3 text-sm uppercase tracking-widest hover:bg-primary/80 transition-colors">
            Quick Add
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="space-y-2 px-1">
        {category && (
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {category}
          </p>
        )}
        <h3 className="text-base text-foreground group-hover:text-foreground/70 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-foreground" style={{ fontWeight: 300 }}>
          ${price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
});
