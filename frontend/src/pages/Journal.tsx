import React from "react";
import { motion } from "motion/react";

import { featuredArticle, articles } from "../data/journal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Journal() {
  return (
    <>
      {/* featured article */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-background py-24"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="relative overflow-hidden h-[400px] md:h-[500px]">
            <ImageWithFallback
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-6 text-center">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
              }}
            >
              {featuredArticle.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {featuredArticle.excerpt}
            </p>
          </div>
        </div>
      </motion.section>

      {/* grid of posts */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-background"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((art) => (
              <div key={art.id} className="group">
                <div className="relative overflow-hidden h-64">
                  <ImageWithFallback
                    src={art.imageUrl}
                    alt={art.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                </div>
                <h3
                  className="mt-4 text-2xl"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 300,
                  }}
                >
                  {art.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {art.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
