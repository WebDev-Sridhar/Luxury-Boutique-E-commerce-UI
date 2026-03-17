import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { AnimatedText } from "@/components/animation/AnimatedText";

const lifestyleImages = [
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80", aspect: "tall" },
  { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", aspect: "wide" },
  { src: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", aspect: "tall" },
  { src: "https://images.unsplash.com/photo-1762341532424-c7262c26d245?w=600&q=80", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80", aspect: "wide" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", aspect: "tall" },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80", aspect: "square" },
];

export function LifestyleGrid() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
      <div className="text-center mb-14 md:mb-20">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Follow Along</p>
        <AnimatedText
          text="The Maison Life"
          as="h2"
          className="text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        />
        <p className="text-sm text-muted-foreground mt-4">@maison</p>
      </div>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 768: 3, 1024: 4 }}>
        <Masonry gutter="12px">
          {lifestyleImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative group cursor-pointer overflow-hidden"
            >
              <img
                src={img.src}
                alt="Lifestyle"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
