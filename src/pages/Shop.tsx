import React from "react";
import { motion } from "motion/react";

import { products } from "../data/products";
import { ProductCard } from "../components/product-card";

export function Shop() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean)),
  ) as string[];

  if (loading) {
    return (
      <div className="bg-background py-24">
        <p className="text-center text-lg text-foreground/70">Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background py-24"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Heading */}
        <header className="mb-12 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          >
            Shop
          </h1>
          <div className="mt-4 h-px bg-border opacity-30 w-24 mx-auto" />
        </header>

        {/* Content area */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-64 mb-10 lg:mb-0">
            <div className="space-y-4">
              <p className="uppercase text-sm tracking-wide text-muted-foreground">
                Categories
              </p>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors uppercase tracking-wide"
                      style={{ fontWeight: 300 }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <p className="text-center py-24 text-lg text-foreground/70">
                No products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    secondaryImageUrl={product.secondaryImageUrl}
                    category={product.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
