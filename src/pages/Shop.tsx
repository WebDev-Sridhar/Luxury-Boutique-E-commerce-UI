import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/product-card";
import { Hero } from "../components/hero";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import type { Product } from "@/types/product";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Sort + Count */}
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">
                {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-xs tracking-wide focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
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
          <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background max-w-2xl w-full flex flex-col md:flex-row overflow-hidden max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-1/2 aspect-[3/4] md:aspect-auto">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          {product.category && (
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">{product.category}</p>
          )}
          <h3 className="text-2xl mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
            {product.name}
          </h3>
          <p className="text-lg mb-4">${product.price.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed" style={{ fontWeight: 300 }}>
            {product.description || `A beautifully crafted ${product.category?.toLowerCase() || "piece"} from our latest collection.`}
          </p>
          <div className="flex gap-3">
            <a
              href={`/product/${product.id}`}
              className="flex-1 border border-border py-3 text-center text-[11px] uppercase tracking-[0.15em] hover:bg-muted transition-colors"
            >
              View Details
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

