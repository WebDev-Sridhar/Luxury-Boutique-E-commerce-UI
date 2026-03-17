import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SplitSection } from "@/components/layout/SplitSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import { StaggerChildren } from "@/components/animation/StaggerChildren";

const stats = [
  { target: 20, suffix: "+", label: "Years of Heritage" },
  { target: 150, suffix: "+", label: "Master Artisans" },
  { target: 12, suffix: "", label: "Countries Worldwide" },
];

export function BrandStory() {
  return (
    <section className="py-20 md:py-32">
      <SplitSection
        imageSrc="https://images.unsplash.com/photo-1604176354204-9268737828e4?w=900&q=80"
        imageAlt="Maison Atelier"
        imagePosition="left"
        ratio="60/40"
      >
        <div className="space-y-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Our Story</p>
          <blockquote
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground/90 italic"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          >
            "We believe in the beauty of simplicity, the power of quality, and the timelessness of great design."
          </blockquote>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md" style={{ fontWeight: 300 }}>
            Founded on the principle that true luxury lies in the details, Maison has spent over two decades perfecting
            the art of understated elegance. Every piece in our collection tells a story of craftsmanship, heritage, and
            uncompromising quality.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
          >
            Discover Our Story
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </SplitSection>

      {/* Stats Row */}
      <StaggerChildren staggerDelay={0.15} className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mt-20 md:mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border/30 pt-12">
          {stats.map((stat) => (
            <RevealOnScroll key={stat.label} variant={fadeUp} className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 text-foreground"
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            </RevealOnScroll>
          ))}
        </div>
      </StaggerChildren>
    </section>
  );
}
