import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { generateCartMessage, openWhatsApp } from "@/lib/whatsapp";
import { products } from "../data/products";
import { ProductCard } from "../components/product-card";
import { AnimatedText } from "../components/animation/AnimatedText";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import { PageTransition } from "../components/animation/PageTransition";

export function Cart() {
  const { items, subtotal, cartCount, removeItem, updateQuantity, clearCart } = useCart();

  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const recommended = products.filter((p) => !items.some((item) => item.product.id === p.id)).slice(0, 4);

  return (
    <PageTransition>
      <div className="pt-28 md:pt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <AnimatedText
              text="Your Bag"
              as="h1"
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
            <p className="text-sm text-muted-foreground mt-2">
              {cartCount === 0 ? "Your bag is empty" : `${cartCount} item${cartCount > 1 ? "s" : ""} in your bag`}
            </p>
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
                  Your bag is empty
                </h2>
                <p className="text-sm text-muted-foreground mb-8">Discover our collection and find something you love</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                >
                  Start Shopping
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Items List */}
              <div className="flex-1">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => {
                    const key = `${item.product.id}-${item.selectedSize || ""}-${item.selectedColor || ""}`;
                    return (
                      <motion.div
                        key={key}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-6 py-8 border-b border-border/30"
                      >
                        <Link to={`/product/${item.product.id}`} className="shrink-0">
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-28 h-36 md:w-32 md:h-40 object-cover" />
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <Link to={`/product/${item.product.id}`}>
                              <h3 className="text-lg mb-1 hover:text-foreground/70 transition-colors" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}>
                                {item.product.name}
                              </h3>
                            </Link>
                            {item.product.category && (
                              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{item.product.category}</p>
                            )}
                            {item.selectedSize && <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>}
                            {item.selectedColor && <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-border/50">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 h-9 flex items-center justify-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-lg" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground mt-1">${item.product.price.toLocaleString()} each</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <div className="flex justify-between items-center pt-6">
                  <Link to="/shop" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Bag
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-[380px] shrink-0">
                <div className="lg:sticky lg:top-28 bg-card border border-border/30 p-8 space-y-6">
                  <h3 className="text-2xl" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-border/30 my-2" />
                    <div className="flex justify-between text-lg" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                  >
                    Proceed to Checkout
                  </motion.button>

                  <button
                    onClick={() => { openWhatsApp(generateCartMessage(items)); }}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-3.5 text-[11px] uppercase tracking-[0.15em] hover:bg-[#20BD5A] transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order via WhatsApp
                  </button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    Free shipping on orders over $500. Complimentary returns within 30 days.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* You Might Also Like */}
        {recommended.length > 0 && (
          <RevealOnScroll variant={fadeUp} className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mt-20 pt-16 border-t border-border/20">
            <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {recommended.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </RevealOnScroll>
        )}
      </div>
    </PageTransition>
  );
}
