import { ShoppingBag, Search, User, Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { menuItems } from "../data/navigation";
import { useTheme } from "../hooks/useTheme";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const toggleTheme = () => toggle();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Left Icons - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-foreground/70 hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              {" "}
              <h1
                className="text-3xl md:text-4xl tracking-wider"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                }}
              >
                MAISON
              </h1>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={toggleTheme}
              className="hidden md:block text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link
              to="/signin"
              className="hidden md:block text-foreground/70 hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <button className="text-foreground/70 hover:text-foreground transition-colors relative">
              <Link to="/cart">
                {" "}
                <ShoppingBag className="w-5 h-5" />{" "}
              </Link>
              <span
                className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center"
                style={{ fontSize: "10px" }}
              >
                0
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center justify-center gap-12 pb-6 text-sm tracking-widest">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={item == "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-foreground/70 hover:text-foreground transition-colors uppercase"
              style={{ letterSpacing: "0.15em" }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="px-6 py-8 space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block w-full text-left text-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-6 border-t border-border flex items-center gap-6">
              <button className="text-foreground/70 hover:text-foreground transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTheme}
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Link
                to="/signin"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
