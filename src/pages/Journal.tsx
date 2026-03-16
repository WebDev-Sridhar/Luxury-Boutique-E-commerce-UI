import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { featuredArticle, articles } from "../data/journal";
import { AnimatedText } from "../components/animation/AnimatedText";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import { PageTransition } from "../components/animation/PageTransition";

function getReadingTime(text: string) {
  const words = text.split(" ").length;
  return Math.max(1, Math.ceil(words / 200));
}

export function Journal() {
  return (
    <PageTransition>
      {/* Featured Article Hero */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src={featuredArticle.imageUrl}
          alt={featuredArticle.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1800px] mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Featured</span>
                <span className="w-8 h-[1px] bg-white/30" />
                <span className="text-white/60 text-[10px] tracking-wide">{featuredArticle.date}</span>
                {featuredArticle.author && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/60 text-[10px] tracking-wide">By {featuredArticle.author}</span>
                  </>
                )}
              </div>
              <h1
                className="text-white text-4xl md:text-6xl lg:text-7xl max-w-3xl leading-tight mb-6"
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
              >
                {featuredArticle.title}
              </h1>
              <p className="text-white/70 text-sm md:text-base max-w-xl mb-8" style={{ fontWeight: 300 }}>
                {featuredArticle.excerpt}
              </p>
              <button className="group inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.2em]">
                Read Article
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Latest Stories</p>
            <AnimatedText
              text="From the Journal"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
          </div>

          {/* Magazine Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {articles.map((article, i) => (
              <RevealOnScroll
                key={article.id}
                variant={fadeUp}
                delay={i * 0.1}
                className={`group cursor-pointer ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className={`flex flex-col ${i === 0 ? "md:flex-row md:gap-10" : ""}`}>
                  <div className={`overflow-hidden ${i === 0 ? "md:w-3/5" : "w-full"}`}>
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        i === 0 ? "h-[40vh] md:h-[50vh]" : "h-[35vh]"
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <div className={`${i === 0 ? "md:w-2/5 flex flex-col justify-center" : ""} pt-6 ${i === 0 ? "md:pt-0" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {getReadingTime(article.excerpt)} min read
                      </span>
                    </div>
                    <h3
                      className={`${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"} mb-3 group-hover:text-foreground/70 transition-colors duration-300`}
                      style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                      {article.excerpt}
                    </p>
                    {article.author && (
                      <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/50">
                        By {article.author}
                      </p>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
