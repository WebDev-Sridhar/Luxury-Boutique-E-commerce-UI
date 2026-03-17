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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Mobile: horizontal overflow scroll instead of scroll-jacking
  if (isMobile) {
    return (
      <div className={`${className} overflow-hidden`}>
        <div className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 scrollbar-hide">
          {children}
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-8 lg:pl-20">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
