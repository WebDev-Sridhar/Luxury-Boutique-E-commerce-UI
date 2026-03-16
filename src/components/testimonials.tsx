import { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatedText } from "@/components/animation/AnimatedText";
import { testimonials } from "../data/testimonials";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Testimonials</p>
            <AnimatedText
              text="What They Say"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 border border-border/50 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 border border-border/50 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_90%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 pl-6 md:pl-8">
              <motion.div
                animate={{ opacity: Math.abs(selectedIndex - index) <= 1 ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border/30 p-8 md:p-10 h-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-ring text-ring" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-lg md:text-xl text-foreground/80 italic leading-relaxed mb-8"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
                >
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                    {(testimonial as any).avatarUrl ? (
                      <img
                        src={(testimonial as any).avatarUrl}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium tracking-wide">{testimonial.author}</p>
                    {testimonial.title && (
                      <p className="text-xs text-muted-foreground mt-0.5">{testimonial.title}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "w-8 bg-foreground" : "w-1.5 bg-foreground/20"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
