import React, { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import { products, Product } from "../data/products";

type CartItem = Product & { quantity: number };

export function Cart() {
  // sample cart items
  const [items, setItems] = useState<CartItem[]>(
    products.slice(0, 3).map((p) => ({ ...p, quantity: 1 })),
  );

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item,
      ),
    );
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background py-24"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <h1
          className="text-4xl mb-12"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          Your Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-16">
          {/* items list */}
          <div className="flex-1">
            {items.length === 0 ? (
              <p className="text-center py-24 text-lg text-foreground/70">
                Your cart is empty.
              </p>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.id} className="pb-8">
                    <div className="flex items-center gap-6">
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className="w-24 h-24 object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-lg" style={{ fontWeight: 300 }}>
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="px-2"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQty(item.id, Number(e.target.value))
                          }
                          className="w-12 text-center border border-border bg-background"
                        />
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 h-px bg-border opacity-30" />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* summary panel */}
          <div className="w-full lg:w-1/3">
            <div className="p-8 bg-primary-foreground">
              <p className="text-lg mb-4" style={{ fontWeight: 300 }}>
                Subtotal
              </p>
              <p className="text-2xl mb-6">${subtotal.toFixed(2)}</p>
              <button
                className="w-full px-6 py-3 uppercase tracking-widest text-sm text-primary-foreground"
                style={{ backgroundColor: "#bfa98f", letterSpacing: "0.15em" }}
              >
                Add to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
