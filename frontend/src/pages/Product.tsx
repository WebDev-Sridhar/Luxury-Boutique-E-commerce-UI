import React, { useState } from "react";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";

import { products } from "../data/products";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Product() {
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="bg-[#faf5ef] py-24">
        <p className="text-center text-lg text-foreground/70">Loading...</p>
      </div>
    );
  }
  const images = product
    ? [product.imageUrl, product.secondaryImageUrl].filter(Boolean)
    : [];

  if (!product) {
    return (
      <div className="py-24 px-6 text-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL"];
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-background py-24"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* image gallery */}
          <div className="flex-1">
            <div className="relative overflow-hidden aspect-[4/5] bg-muted">
              {images.map((src, idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedImage === idx ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ImageWithFallback
                    src={src}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className="w-16 h-20 overflow-hidden bg-muted"
                >
                  <ImageWithFallback
                    src={src}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* info panel */}
          <div className="flex-1">
            <h1
              className="text-4xl"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 300,
              }}
            >
              {product.name}
            </h1>
            <div className="h-px bg-border opacity-30 my-4" />
            <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>
            <p
              className="text-base mb-8 text-foreground/80"
              style={{ fontWeight: 300 }}
            >
              {product.category} piece made with care and attention to detail. A
              perfect addition to any wardrobe.
            </p>

            {/* size selector */}
            <div className="mb-6">
              <label className="block text-sm mb-2 uppercase tracking-wide text-muted-foreground">
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-32 px-3 py-2 border border-border bg-background text-sm focus:outline-none"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* quantity */}
            <div className="mb-6">
              <label className="block text-sm mb-2 uppercase tracking-wide text-muted-foreground">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-border bg-background text-sm focus:outline-none"
              />
            </div>

            <button
              className="px-8 py-3 uppercase tracking-widest text-sm text-primary-foreground transition-colors"
              style={{ backgroundColor: "#bfa98f", letterSpacing: "0.15em" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
