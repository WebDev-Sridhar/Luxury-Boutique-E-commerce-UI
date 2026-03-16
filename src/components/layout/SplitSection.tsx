import { ParallaxImage } from "./ParallaxImage";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";

interface SplitSectionProps {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  ratio?: "50/50" | "60/40" | "40/60";
  children: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

const ratioMap = {
  "50/50": { image: "lg:w-1/2", content: "lg:w-1/2" },
  "60/40": { image: "lg:w-[60%]", content: "lg:w-[40%]" },
  "40/60": { image: "lg:w-[40%]", content: "lg:w-[60%]" },
};

export function SplitSection({
  imageSrc,
  imageAlt = "",
  imagePosition = "left",
  ratio = "50/50",
  children,
  className = "",
  imageClassName = "",
}: SplitSectionProps) {
  const sizes = ratioMap[ratio];

  const imageBlock = (
    <RevealOnScroll
      variant={imagePosition === "left" ? slideInLeft : slideInRight}
      className={`w-full ${sizes.image}`}
    >
      <ParallaxImage
        src={imageSrc}
        alt={imageAlt}
        className={`w-full h-[50vh] lg:h-[80vh] ${imageClassName}`}
      />
    </RevealOnScroll>
  );

  const contentBlock = (
    <RevealOnScroll
      variant={imagePosition === "left" ? slideInRight : slideInLeft}
      delay={0.2}
      className={`w-full ${sizes.content} flex items-center`}
    >
      <div className="px-8 py-12 lg:px-16 lg:py-0 w-full">{children}</div>
    </RevealOnScroll>
  );

  return (
    <section className={`flex flex-col lg:flex-row ${className}`}>
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
    </section>
  );
}
