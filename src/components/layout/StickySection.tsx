import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";

interface StickySectionProps {
  stickyContent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function StickySection({ stickyContent, children, className = "" }: StickySectionProps) {
  return (
    <section className={`flex flex-col lg:flex-row gap-12 lg:gap-20 ${className}`}>
      <div className="w-full lg:w-[45%]">
        <div className="lg:sticky lg:top-32">{stickyContent}</div>
      </div>
      <div className="w-full lg:w-[55%]">
        <div className="space-y-16">
          {Array.isArray(children)
            ? children.map((child, i) => (
                <RevealOnScroll key={i} variant={fadeUp} delay={i * 0.1}>
                  {child}
                </RevealOnScroll>
              ))
            : children}
        </div>
      </div>
    </section>
  );
}
