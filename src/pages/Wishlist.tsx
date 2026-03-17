import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { ProductCard } from "../components/product-card";
import { AnimatedText } from "../components/animation/AnimatedText";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import { PageTransition } from "../components/animation/PageTransition";

export function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const recommended = products
    .filter((p) => !items.some((item) => item.id === p.id))
    .slice(0, 4);

  const handleAddToBag = (product: (typeof items)[0]) => {
    const size = product.sizes?.[0] || "M";
    addItem(product, 1, size);
    removeFromWishlist(product.id);
  };

  return (
    <PageTransition>
      <div className="pt-28 md:pt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <AnimatedText
              text="Your Wishlist"
              as="h1"
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            />
            <p className="text-sm text-muted-foreground mt-2">
              {items.length === 0
                ? "Your wishlist is empty"
                : `${items.length} piece${items.length > 1 ? "s" : ""} saved`}
            </p>
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h2
                  className="text-2xl mb-2"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
                >
                  Nothing saved yet
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Browse our collection and save your favorite pieces
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-10">
                <AnimatePresence mode="popLayout">
                  {items.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${product.id}`}
                        className="block relative overflow-hidden aspect-[3/4] mb-4 bg-muted"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {product.secondaryImageUrl && (
                          <img
                            src={product.secondaryImageUrl}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            loading="lazy"
                          />
                        )}
                      </Link>

                      {/* Info */}
                      <div className="space-y-1.5">
                        {product.category && (
                          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {product.category}
                          </p>
                        )}
                        <Link to={`/product/${product.id}`}>
                          <h3
                            className="text-base hover:text-foreground/70 transition-colors"
                            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400 }}
                          >
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">${product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToBag(product)}
                          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-[10px] uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add to Bag
                        </motion.button>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="w-12 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue Shopping */}
              <div className="mt-12 text-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* You Might Also Like */}
        {recommended.length > 0 && (
          <RevealOnScroll
            variant={fadeUp}
            className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mt-20 pt-16 border-t border-border/20"
          >
            <h2
              className="text-3xl md:text-4xl mb-12 text-center"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            >
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
