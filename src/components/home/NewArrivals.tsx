import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { AnimatedText } from "@/components/animation/AnimatedText";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";

export function NewArrivals() {
  const featured = products.slice(0, 6);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Curated Selection</p>
          <AnimatedText
            text="New Arrivals"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          />
        </div>
        <RevealOnScroll variant={fadeUp} delay={0.3}>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </RevealOnScroll>
      </div>

      {/* Asymmetric Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
        {featured.map((product, i) => (
          <motion.div
            key={product.id}
            className={i === 0 ? "lg:row-span-1" : ""}
            style={i === 1 ? { marginTop: "3rem" } : i === 4 ? { marginTop: "-2rem" } : {}}
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
