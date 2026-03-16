import { Hero } from "../components/hero";
import { Marquee } from "../components/layout/Marquee";
import { NewArrivals } from "../components/home/NewArrivals";
import { Lookbook } from "../components/home/Lookbook";
import { BrandStory } from "../components/home/BrandStory";
import { Testimonials } from "../components/testimonials";
import { LifestyleGrid } from "../components/home/LifestyleGrid";
import { CTABanner } from "../components/home/CTABanner";

export function Home() {
  return (
    <>
      <Hero
        imageUrl="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&q=80"
        title={"The Art of\nTimeless Style"}
        subtitle="Discover our curated collection of refined luxury essentials"
        ctaText="Explore Collection"
        ctaLink="/collections"
      />

      {/* Brand Marquee */}
      <Marquee
        items={["SPRING 2026", "NEW ARRIVALS", "FREE SHIPPING", "HANDCRAFTED LUXURY", "TIMELESS DESIGN"]}
        className="py-5 border-b border-border/20 text-foreground/40"
        itemClassName="text-[10px] md:text-xs tracking-[0.3em] uppercase"
        speed={35}
      />

      <NewArrivals />

      <Lookbook />

      <BrandStory />

      <Testimonials />

      <LifestyleGrid />

      <CTABanner />
    </>
  );
}
