import { motion } from "motion/react";

import { testimonials } from "../data/testimonials";

interface Testimonial {
  quote: string;
  author: string;
  title?: string;
}

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
      <div className="text-center mb-16 md:mb-20">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl mb-4"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          What They Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center space-y-6"
          >
            {/* Quote */}
            <div className="relative">
              <span
                className="text-6xl md:text-7xl text-accent absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-30"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                "
              </span>
              <p
                className="text-base md:text-lg text-foreground/80 italic leading-relaxed pt-8 px-4"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                }}
              >
                {testimonial.quote}
              </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-border/50 mx-auto max-w-xs">
              <p className="text-sm uppercase tracking-widest text-foreground">
                {testimonial.author}
              </p>
              {testimonial.title && (
                <p className="text-xs text-muted-foreground mt-1 tracking-wide">
                  {testimonial.title}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
