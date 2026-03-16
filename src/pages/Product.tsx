import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, ChevronRight, Truck, RotateCcw, Shield } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { generateProductMessage, openWhatsApp } from "@/lib/whatsapp";
import { ProductCard } from "../components/product-card";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import { PageTransition } from "../components/animation/PageTransition";

export function Product() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-3xl mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
            Product Not Found
          </h1>
          <Link to="/shop" className="text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.imageUrl, product.secondaryImageUrl, ...(product.galleryImages || [])].filter(Boolean) as string[];
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL"];
  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  if (relatedProducts.length < 4) {
    const more = products.filter((p) => p.id !== product.id && !relatedProducts.includes(p));
    relatedProducts.push(...more.slice(0, 4 - relatedProducts.length));
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || sizes[0]);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductMessage(product, quantity, selectedSize || sizes[0]);
    openWhatsApp(message);
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <PageTransition>
      <div className="pt-24 md:pt-28">
        {/* Breadcrumb */}
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-4">
          <nav className="flex items-center gap-2 text-[11px] text-muted-foreground tracking-wide">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pb-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Image Gallery */}
            <div className="lg:w-[58%] flex gap-4">
              {/* Thumbnails */}
              <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx ? "border-foreground" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={src} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative overflow-hidden bg-muted aspect-[3/4] group cursor-zoom-in">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </AnimatePresence>
              </div>

              {/* Mobile thumbnails */}
              <div className="flex md:hidden gap-2 mt-3 overflow-x-auto">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-20 shrink-0 overflow-hidden border-2 ${
                      selectedImage === idx ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info - Sticky */}
            <div className="lg:w-[42%]">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Category */}
                {product.category && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
                )}

                {/* Name */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-xl tracking-wide">${product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
                  {product.description ||
                    `A beautifully crafted ${product.category?.toLowerCase() || "piece"} from our curated collection. Designed with meticulous attention to detail and made from the finest materials.`}
                </p>

                <div className="h-px bg-border/30" />

                {/* Color Swatches */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-3">Color</p>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          className="w-8 h-8 rounded-full border-2 border-border/30 hover:border-foreground transition-colors"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Size</p>
                    <button className="text-[10px] uppercase tracking-wider text-muted-foreground underline hover:text-foreground transition-colors">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[3rem] px-4 py-2.5 border text-[11px] uppercase tracking-[0.1em] transition-all duration-300 ${
                          selectedSize === s
                            ? "border-foreground bg-foreground text-background"
                            : "border-border/50 hover:border-foreground/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-3">Quantity</p>
                  <div className="flex items-center border border-border/50 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart + Wishlist */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                  >
                    Add to Bag
                  </motion.button>
                  <button
                    onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                    className={`w-14 border flex items-center justify-center transition-all duration-300 ${
                      wishlisted ? "border-accent bg-accent/10 text-accent" : "border-border/50 hover:border-foreground/30"
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* WhatsApp Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-3.5 text-[11px] uppercase tracking-[0.15em] hover:bg-[#20BD5A] transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order via WhatsApp
                </button>

                {/* Shipping Info */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                  {[
                    { icon: Truck, label: "Free Shipping", sub: "Orders $500+" },
                    { icon: RotateCcw, label: "Easy Returns", sub: "30 Days" },
                    { icon: Shield, label: "Secure", sub: "Payment" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="text-center">
                      <Icon className="w-4 h-4 mx-auto mb-1.5 text-muted-foreground" />
                      <p className="text-[10px] uppercase tracking-wider font-medium">{label}</p>
                      <p className="text-[9px] text-muted-foreground">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Accordion Sections */}
                <div className="border-t border-border/30 pt-6 space-y-0">
                  {[
                    {
                      key: "details",
                      title: "Details",
                      content: product.details?.join(". ") ||
                        "Crafted from premium materials with meticulous attention to detail. Features a contemporary silhouette with timeless appeal.",
                    },
                    {
                      key: "shipping",
                      title: "Shipping & Returns",
                      content: "Complimentary shipping on orders over $500. Standard delivery 3-5 business days. Free returns within 30 days of delivery.",
                    },
                    {
                      key: "care",
                      title: "Care Instructions",
                      content: "Dry clean recommended. Store in provided garment bag. Avoid direct sunlight for extended periods.",
                    },
                  ].map((section) => (
                    <div key={section.key} className="border-b border-border/30">
                      <button
                        onClick={() => toggleAccordion(section.key)}
                        className="w-full flex items-center justify-between py-4 text-[11px] uppercase tracking-[0.15em] text-left"
                      >
                        {section.title}
                        <motion.span
                          animate={{ rotate: activeAccordion === section.key ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg font-light"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {activeAccordion === section.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-muted-foreground leading-relaxed pb-4" style={{ fontWeight: 300 }}>
                              {section.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RevealOnScroll variant={fadeUp} className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-20 border-t border-border/20">
            <h2
              className="text-3xl md:text-4xl mb-12 text-center"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            >
              Complete the Look
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </RevealOnScroll>
        )}
      </div>
    </PageTransition>
  );
}
