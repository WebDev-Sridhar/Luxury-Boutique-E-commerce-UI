import { ShoppingBag, Heart, User, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { menuItems } from "../data/navigation";
import { useTheme } from "../hooks/useTheme";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const heroPages = ["/", "/about", "/collections", "/shop", "/journal"];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, toggle } = useTheme();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const { scrollY } = useScroll();

  const isHeroPage = heroPages.includes(location.pathname);

  let lastScroll = 0;
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
    if (latest > lastScroll && latest > 400) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScroll = latest;
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navBg =
    isHeroPage && !scrolled
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur-md border-border/50";

  const textColor = isHeroPage && !scrolled ? "text-white" : "text-foreground";
  const subtleColor = isHeroPage && !scrolled ? "text-white/70" : "text-foreground/60";

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: hidden && !mobileMenuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-24">
            {/* Left: Mobile menu + Desktop nav */}
            <div className="flex items-center gap-8">
              <button
                className={`md:hidden ${textColor} transition-colors`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <div className="hidden md:flex items-center gap-8">
                {menuItems.slice(0, 3).map((item) => (
                  <NavLink key={item} item={item} className={subtleColor} activeClassName={textColor} />
                ))}
              </div>
            </div>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <motion.span
                className={`text-3xl md:text-4xl tracking-[0.2em] block ${textColor} transition-colors duration-500`}
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                MAISON
              </motion.span>
            </Link>

            {/* Right: Nav + Icons */}
            <div className="flex items-center gap-6 md:gap-8">
              <div className="hidden md:flex items-center gap-8">
                {menuItems.slice(3).map((item) => (
                  <NavLink key={item} item={item} className={subtleColor} activeClassName={textColor} />
                ))}
              </div>

              <div className="flex items-center gap-4 md:gap-5">
                <button
                  onClick={toggle}
                  className={`hidden md:block ${subtleColor} hover:${textColor} transition-colors`}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>

                <Link to="/signin" className={`hidden md:block ${subtleColor} hover:${textColor} transition-colors`}>
                  <User className="w-[18px] h-[18px]" />
                </Link>

                <Link
                  to="/wishlist"
                  className={`relative hidden md:block ${subtleColor} hover:${textColor} transition-colors`}
                  aria-label="Wishlist"
                >
                  <Heart className="w-[18px] h-[18px]" />
                  {wishlistCount > 0 && (
                    <motion.span
                      key={wishlistCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[9px] rounded-full flex items-center justify-center font-medium"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>

                <button
                  onClick={openCart}
                  className={`relative ${subtleColor} hover:${textColor} transition-colors cursor-pointer`}
                  aria-label="Open cart"
                >
                  <ShoppingBag className="w-[18px] h-[18px] md:w-5 md:h-5" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-medium"
                    >
                      {cartCount}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-3xl text-foreground/80 hover:text-foreground transition-colors"
                    style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, letterSpacing: "0.05em" }}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-8 pt-10 border-t border-border/30 mt-6"
              >
                <button onClick={toggle} className="text-foreground/60 hover:text-foreground transition-colors" aria-label="Toggle theme">
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="text-foreground/60 hover:text-foreground transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="text-foreground/60 hover:text-foreground transition-colors" aria-label="Wishlist">
                  <Heart className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  item,
  className,
  activeClassName,
}: {
  item: string;
  className: string;
  activeClassName: string;
}) {
  const location = useLocation();
  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`relative text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 group ${isActive ? activeClassName : className} hover:${activeClassName}`}
    >
      {item}
      <span
        className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-transform duration-300 origin-left ${
          isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}
