import React from "react";
import { motion } from "motion/react";

import { featuredCollection, collections } from "../data/collections";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Collections() {
  return (
    <>
      {/* page heading */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-background py-24"
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          >
            Collections
          </h1>
        </div>
      </motion.header>

      {/* featured banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full overflow-hidden h-[400px] md:h-[600px]">
          <ImageWithFallback
            src={featuredCollection.imageUrl}
            alt={featuredCollection.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>

      {/* grid of collections */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-background"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {collections.map((col) => (
              <div key={col.title} className="relative overflow-hidden">
                <ImageWithFallback
                  src={col.imageUrl}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-90"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-background/60">
                  <h2
                    className="text-2xl"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontWeight: 300,
                    }}
                  >
                    {col.title}
                  </h2>
                  <p className="text-sm text-foreground/70 mt-2">
                    {col.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
