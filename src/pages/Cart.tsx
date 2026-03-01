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
  <div key={item.id} className="pb-10">
    <div className="flex items-start gap-8">
      <ImageWithFallback
        src={item.imageUrl}
        alt={item.name}
        loading="lazy"
        className="w-28 h-32 object-cover bg-muted"
      />

      <div className="flex-1">
        <p
          className="text-xl mb-1"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {item.name}
        </p>

        <p className="text-sm text-muted-foreground mb-2">
          Category: Ready-to-Wear
        </p>

        <p className="text-sm text-muted-foreground mb-4">
          ${item.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQty(item.id, item.quantity - 1)}
            className="px-3 py-1 border border-border hover:bg-secondary transition"
          >
            −
          </button>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQty(item.id, Number(e.target.value))
            }
            className="w-14 text-center border border-border bg-input-background"
          />

          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            className="px-3 py-1 border border-border hover:bg-secondary transition"
          >
            +
          </button>

          <button className="ml-6 text-sm text-destructive hover:underline">
            Remove
          </button>
        </div>
      </div>

      <div
        className="text-lg"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>

    <div className="mt-8 h-px bg-border" />
  </div>
))}
              </>
            )}
          </div>

          {/* summary panel */}
<div className="p-10 bg-card text-card-foreground border border-border shadow-sm space-y-6">

  <h3
    className="text-2xl"
    style={{ fontFamily: "Cormorant Garamond, serif" }}
  >
    Order Summary
  </h3>

  <div className="space-y-3 text-sm">
    <div className="flex justify-between">
      <span className="text-muted-foreground">Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-muted-foreground">Estimated Shipping</span>
      <span>Free</span>
    </div>

    <div className="flex justify-between">
      <span className="text-muted-foreground">Estimated Tax</span>
      <span>${(subtotal * 0.08).toFixed(2)}</span>
    </div>

    <div className="h-px bg-border my-4" />

    <div
      className="flex justify-between text-lg"
      style={{ fontFamily: "Cormorant Garamond, serif" }}
    >
      <span>Total</span>
      <span>${(subtotal * 1.08).toFixed(2)}</span>
    </div>
  </div>

  <button
    className="w-full mt-6 px-6 py-3 uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all duration-200"
    style={{ letterSpacing: "0.15em" }}
  >
    Proceed to Checkout
  </button>

  <p className="text-xs text-muted-foreground text-center">
    Secure payment. Complimentary returns within 14 days.
  </p>

  <div className="text-center pt-4">
    <a
      href="/shop"
      className="text-sm underline hover:text-foreground"
    >
      Continue Shopping
    </a>
  </div>
</div>
        </div>
            </div>
            </motion.div>
  );
}
