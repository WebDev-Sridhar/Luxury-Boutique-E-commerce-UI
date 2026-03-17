import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/product-card";
import { Hero } from "../components/hero";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import { QuickViewModal } from "../components/product/QuickViewModal";
import type { Product } from "@/types/product";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean))) as string[];
    return ["All", ...cats];
  }, []);

  const filtered = useMemo(() => {
    let result = activeCategory === "All" ? [...products] : products.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <>
      {/* Hero Banner */}
      <Hero
        imageUrl="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80"
        title="The Collection"
        subtitle="Discover timeless pieces crafted with intention and care"
        ctaText="Start Shopping"
        ctaLink="#products"
        compact
      />

      <div id="products" className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Filter Bar */}
        <RevealOnScroll variant={fadeUp}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16 pb-8 border-b border-border/30">
            {/* Category Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 -mx-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 relative ${
                    activeCategory === cat
                      ? "text-foreground"
                      : "text-foreground/40 hover:text-foreground/70"
                  }`}
                >
                  {cat}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1px] bg-foreground transition-transform duration-300 origin-left ${
                      activeCategory === cat ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Sort + Count */}
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">
                {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
              </span>
              <div ref={sortRef} className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="text-xs tracking-wide">
                    {sortBy === "featured" ? "Featured" : sortBy === "price-asc" ? "Price: Low to High" : sortBy === "price-desc" ? "Price: High to Low" : "Name A-Z"}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 min-w-[180px] bg-background border border-border/50 shadow-lg z-20"
                    >
                      {([
                        { value: "featured", label: "Featured" },
                        { value: "price-asc", label: "Price: Low to High" },
                        { value: "price-desc", label: "Price: High to Low" },
                        { value: "name", label: "Name A-Z" },
                      ] as { value: SortOption; label: string }[]).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] transition-colors ${
                            sortBy === opt.value
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + sortBy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                showQuickView={setQuickViewProduct}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-lg text-muted-foreground" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              No pieces found in this category
            </p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

