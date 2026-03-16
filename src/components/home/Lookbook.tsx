import { motion } from "motion/react";
import { HorizontalScroll } from "@/components/layout/HorizontalScroll";
import { AnimatedText } from "@/components/animation/AnimatedText";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";

const lookbookItems = [
  {
    image: "https://images.unsplash.com/photo-1761850620808-3191caa1de01?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80",
    title: "The Summer Edit",
    subtitle: "Light & Effortless",
  },
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    title: "Evening Elegance",
    subtitle: "From Dusk to Dawn",
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    title: "Modern Classics",
    subtitle: "Timeless Foundations",
  },
  {
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    title: "Artisan Collection",
    subtitle: "Handcrafted Details",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    title: "Resort Wear",
    subtitle: "Destination Ready",
  },
];

export function Lookbook() {
  return (
    <section>
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto pt-20 md:pt-32 pb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Editorial</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <AnimatedText
            text="The Edit"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          />
          <RevealOnScroll variant={fadeUp} delay={0.2}>
            <p className="text-sm text-muted-foreground max-w-md" style={{ fontWeight: 300 }}>
              A visual journey through our latest collections. Scroll to explore the season's defining looks.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <HorizontalScroll height="250vh">
        {lookbookItems.map((item, i) => (
          <motion.div
            key={i}
            className="relative w-[75vw] md:w-[45vw] lg:w-[35vw] h-[70vh] shrink-0 overflow-hidden group cursor-pointer"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white/70 text-[10px] uppercase tracking-[0.2em] mb-2">{item.subtitle}</p>
              <h3
                className="text-white text-2xl md:text-3xl"
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
              >
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </HorizontalScroll>
    </section>
  );
}
