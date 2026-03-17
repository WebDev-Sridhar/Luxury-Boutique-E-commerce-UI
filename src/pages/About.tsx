import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Gem, Leaf, Award, Globe } from "lucide-react";
import { Hero } from "../components/hero";
import { SplitSection } from "../components/layout/SplitSection";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { AnimatedText } from "../components/animation/AnimatedText";
import { Marquee } from "../components/layout/Marquee";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations";
import { PageTransition } from "../components/animation/PageTransition";

const timeline = [
  { year: "2003", title: "The Beginning", description: "Maison was founded in a small Parisian atelier with a vision to redefine modern luxury." },
  { year: "2008", title: "First Flagship", description: "Opening of our flagship boutique on Rue du Faubourg Saint-Honoré." },
  { year: "2014", title: "Global Expansion", description: "Expansion to 12 countries with partnerships with the world's finest retailers." },
  { year: "2020", title: "Digital Maison", description: "Launch of our digital experience, bringing the atelier to clients worldwide." },
  { year: "2024", title: "Sustainable Future", description: "Commitment to 100% sustainable sourcing and carbon-neutral operations by 2026." },
];

const values = [
  { icon: Gem, title: "Craftsmanship", description: "Every piece is meticulously crafted by master artisans with decades of experience." },
  { icon: Leaf, title: "Sustainability", description: "Committed to ethical sourcing and sustainable practices across our supply chain." },
  { icon: Award, title: "Heritage", description: "Two decades of excellence in creating timeless luxury that transcends trends." },
  { icon: Globe, title: "Global Vision", description: "A worldwide community united by an appreciation for refined, purposeful design." },
];

const team = [
  { name: "Isabelle Moreau", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Alexandre Dupont", role: "Head of Design", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Sophie Laurent", role: "Atelier Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Marco Bellini", role: "Master Tailor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

export function About() {
  return (
    <PageTransition>
      {/* Cinematic Hero */}
      <Hero
        imageUrl="https://images.unsplash.com/photo-1596609548164-aee7658cb54f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=1600&q=80"
        title="Our Story"
        subtitle="Two decades of crafting timeless luxury in the heart of Paris"
        ctaText="Discover More"
        ctaLink="#story"
        compact
      />

      {/* Brand Story */}
      <section id="story" className="py-20 md:py-32">
        <SplitSection
          imageSrc="https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=900&q=80"
          imageAlt="Maison Atelier"
          imagePosition="left"
          ratio="40/60"
        >
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Est. 2003</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
              Born from a Love of Craft
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
              Founded in the heart of Paris, our maison is rooted in a love for handcrafted elegance. For over two decades, we have woven heritage techniques with modern sensibilities, creating pieces that speak to the soul.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
              We believe in slow fashion, in garments that accompany you through life's moments rather than fleeting trends. Our ateliers are sanctuaries where artisans infuse intention into each creation, ensuring that what you wear is not only luxurious but meaningful.
            </p>
          </div>
        </SplitSection>
      </section>

      {/* Brand Values */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Our Philosophy</p>
            <AnimatedText
              text="What We Stand For"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {values.map((value, i) => (
              <RevealOnScroll key={value.title} variant={fadeUp} delay={i * 0.1} className="text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="w-14 h-14 mx-auto border border-border/50 rounded-full flex items-center justify-center">
                    <value.icon className="w-5 h-5 text-foreground/70" />
                  </div>
                  <h3 className="text-xl" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
                    {value.description}
                  </p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Our Journey</p>
            <AnimatedText
              text="Milestones"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/30 -translate-x-1/2" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <RevealOnScroll
                  key={item.year}
                  variant={i % 2 === 0 ? slideInLeft : slideInRight}
                  delay={i * 0.1}
                >
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                      <span
                        className="text-5xl text-foreground/10"
                        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-foreground/30 shrink-0 relative z-10" />
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:hidden">{item.year}</span>
                      <h3 className="text-xl mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">The People</p>
            <AnimatedText
              text="Our Atelier"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, i) => (
              <RevealOnScroll key={member.name} variant={fadeUp} delay={i * 0.1} className="group">
                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="text-base" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}>
                  {member.name}
                </h4>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">{member.role}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Press Marquee */}
      <Marquee
        items={["VOGUE", "ELLE", "HARPER'S BAZAAR", "GQ", "WALLPAPER*", "MONOCLE", "THE NEW YORK TIMES"]}
        className="py-8 border-y border-border/20"
        itemClassName="text-xs md:text-sm tracking-[0.3em] text-foreground/20 uppercase"
        speed={45}
      />

      {/* Stats */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 20, suffix: "+", label: "Years" },
            { target: 150, suffix: "+", label: "Artisans" },
            { target: 12, suffix: "", label: "Countries" },
            { target: 50, suffix: "K+", label: "Clients" },
          ].map((stat) => (
            <RevealOnScroll key={stat.label} variant={fadeUp}>
              <div className="text-4xl md:text-5xl mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
