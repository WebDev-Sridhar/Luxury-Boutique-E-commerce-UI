import React from "react";
import { ProductCard } from "./product-card";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export const ProductGrid = React.memo(function ProductGrid({
  products,
  title,
  subtitle,
}: ProductGridProps) {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="text-center mb-16 md:mb-20">
          {title && (
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-4"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className="text-muted-foreground text-sm md:text-base tracking-wide max-w-xl mx-auto"
              style={{ fontWeight: 300 }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
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
    </section>
  );
});
