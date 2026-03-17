import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export function HorizontalScroll({
  children,
  className = "",
  height = "300vh",
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (scrollRef.current) {
        const contentWidth = scrollRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(contentWidth - viewportWidth);
      }
    };

    // Measure after layout + images settle
    measure();
    const raf = requestAnimationFrame(measure);
    const timer = setTimeout(measure, 500);

    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Mobile: horizontal overflow scroll instead of scroll-jacking
  if (isMobile) {
    return (
      <div className={`${className} overflow-hidden`}>
        <div className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {children}
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-6 pl-8 lg:pl-20 pr-8 lg:pr-20"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
