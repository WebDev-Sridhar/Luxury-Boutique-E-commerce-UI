import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/product";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    const size = product.sizes?.[0] || "M";
    addItem(product, 1, size);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-background w-full max-h-[85vh] md:max-h-[80vh] md:max-w-2xl md:w-full flex flex-col md:flex-row overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-2 z-10 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mobile drag indicator */}
        <div className="md:hidden flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-border/50" />
        </div>

        {/* Scrollable content wrapper for mobile */}
        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
          {/* Image */}
          <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-full relative shrink-0">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            <button
              onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`absolute top-3 left-3 w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-colors ${
                wishlisted ? "text-accent" : "text-foreground/60 hover:text-foreground"
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-center">
            {product.category && (
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">{product.category}</p>
            )}
            <h3 className="text-xl md:text-2xl mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
              {product.name}
            </h3>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <p className="text-lg">${product.price.toLocaleString()}</p>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-5 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none" style={{ fontWeight: 300 }}>
              {product.description || `A beautifully crafted ${product.category?.toLowerCase() || "piece"} from our latest collection.`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground py-3 text-[11px] uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
              >
                Add to Bag
              </button>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex-1 border border-border py-3 text-center text-[11px] uppercase tracking-[0.15em] hover:bg-muted transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
