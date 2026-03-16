import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { fadeUp } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
  showQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index = 0, className = "", showQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted mb-4 aspect-[3/4]">
          {/* Primary Image */}
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Secondary Image Crossfade */}
          {product.secondaryImageUrl && (
            <motion.img
              src={product.secondaryImageUrl}
              alt={`${product.name} alternate`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-foreground text-background text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "fill-accent text-accent" : "text-foreground"}`}
            />
          </button>

          {/* Bottom Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4 flex gap-2"
          >
            <button
              onClick={handleQuickAdd}
              className="flex-1 bg-primary/95 backdrop-blur-sm text-primary-foreground py-3 text-[10px] uppercase tracking-[0.18em] hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Bag
            </button>
            {showQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showQuickView(product);
                }}
                className="w-11 bg-background/90 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5 px-0.5">
          {product.category && (
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{product.category}</p>
          )}
          <h3 className="text-sm text-foreground group-hover:text-foreground/70 transition-colors duration-300 font-normal tracking-wide normal-case">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-foreground tracking-wide" style={{ fontWeight: 400 }}>
              ${product.price.toLocaleString()}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
