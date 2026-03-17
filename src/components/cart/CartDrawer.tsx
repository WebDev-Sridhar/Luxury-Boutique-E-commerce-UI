import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { generateCartMessage, openWhatsApp } from "@/lib/whatsapp";

export function CartDrawer() {
  const { items, cartCount, subtotal, isCartOpen, closeCart, removeItem, updateQuantity } =
    useCart();

  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-3/4 md:w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <SheetTitle className="text-2xl font-normal tracking-wide" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Your Bag
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {cartCount === 0
              ? "Your bag is empty"
              : `${cartCount} item${cartCount > 1 ? "s" : ""} in your bag`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-lg mb-1" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                Your bag is empty
              </p>
              <p className="text-sm text-muted-foreground">
                Discover our collection and find something you love
              </p>
            </div>
            <Link
              to="/shop"
              onClick={closeCart}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
            >
              Start Shopping
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => {
                  const itemKey = `${item.product.id}-${item.selectedSize || "default"}-${item.selectedColor || "default"}`;
                  return (
                    <motion.div
                      key={itemKey}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 mb-6 pb-6 border-b border-border/30 last:border-0"
                    >
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="shrink-0"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="block"
                        >
                          <h4 className="text-sm font-medium truncate mb-0.5 normal-case tracking-normal">
                            {item.product.name}
                          </h4>
                        </Link>
                        {item.selectedSize && (
                          <p className="text-xs text-muted-foreground mb-0.5">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        {item.selectedColor && (
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                            Color:
                            <span
                              className="inline-block w-3 h-3 rounded-full border border-border/50"
                              style={{ backgroundColor: item.product.colors?.find(c => c.name === item.selectedColor)?.hex }}
                            />
                            {item.selectedColor}
                          </p>
                        )}
                        <p className="text-sm font-medium tracking-wide">
                          ${item.product.price.toLocaleString()}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border/50">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 h-7 flex items-center justify-center text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.selectedSize, item.selectedColor)
                            }
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="border-t border-border/50 px-6 py-5 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-border/30">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const message = generateCartMessage(items);
                  openWhatsApp(message);
                }}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-[#20BD5A] transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </button>

              <Link
                to="/cart"
                onClick={closeCart}
                className="w-full block text-center bg-primary text-primary-foreground py-3.5 text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
              >
                View Full Cart
              </Link>

              <p className="text-[10px] text-muted-foreground text-center">
                Free shipping on orders over $500
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
