import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredCollection, collections } from "../data/collections";
import { Hero } from "../components/hero";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { AnimatedText } from "../components/animation/AnimatedText";
import { SplitSection } from "../components/layout/SplitSection";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations";
import { PageTransition } from "../components/animation/PageTransition";

export function Collections() {
  return (
    <PageTransition>
      {/* Hero */}
      <Hero
        imageUrl={featuredCollection.imageUrl}
        title="Our Collections"
        subtitle="Curated selections that celebrate the art of refined living"
        ctaText="Explore All"
        ctaLink="#collections"
        compact
      />

      {/* Featured Collection */}
      <section className="py-20 md:py-32">
        <SplitSection
          imageSrc={featuredCollection.imageUrl}
          imageAlt={featuredCollection.title}
          imagePosition="right"
          ratio="40/60"
        >
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Featured Collection</p>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
              {featuredCollection.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md" style={{ fontWeight: 300 }}>
              {featuredCollection.description}
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
            >
              Shop Collection
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </SplitSection>
      </section>

      {/* Collection Grid */}
      <section id="collections" className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Browse</p>
            <AnimatedText
              text="All Collections"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
          </div>

          <div className="space-y-20">
            {collections.map((col, i) => (
              <RevealOnScroll
                key={col.title}
                variant={i % 2 === 0 ? slideInLeft : slideInRight}
                className="group cursor-pointer"
              >
                <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
                  <div className="w-full md:w-3/5 overflow-hidden">
                    <motion.img
                      src={col.imageUrl}
                      alt={col.title}
                      className="w-full h-[40vh] md:h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full md:w-2/5 space-y-4 px-4 md:px-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Collection {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-3xl md:text-4xl" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
                      {col.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
                      {col.description}
                    </p>
                    <Link
                      to="/shop"
                      className="group/link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors pt-2"
                    >
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
