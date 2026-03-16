import { Instagram, Facebook, Twitter, ArrowUp, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { footerLinks } from "../data/footerLinks";
import { Marquee } from "./layout/Marquee";
import { RevealOnScroll } from "./animation/RevealOnScroll";
import { fadeUp } from "@/lib/animations";
import { useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/30 bg-background relative">
      {/* Marquee Strip */}
      <Marquee
        items={["MAISON", "LUXURY", "CRAFTSMANSHIP", "ELEGANCE", "HERITAGE", "TIMELESS"]}
        className="py-4 border-b border-border/20 text-xs tracking-[0.3em] text-foreground/30"
        itemClassName="text-[10px] md:text-xs tracking-[0.3em] uppercase"
        speed={40}
      />

      {/* Newsletter Section */}
      <RevealOnScroll variant={fadeUp} className="border-b border-border/20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
            >
              Join the Maison
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              Be the first to discover new collections, exclusive offers, and stories from our atelier.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent border border-border/50 px-5 py-3 text-sm tracking-wide placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity shrink-0"
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-[10px] text-muted-foreground/50 mt-4 tracking-wide">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Main Footer Grid */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/">
              <h3
                className="text-3xl md:text-4xl tracking-[0.2em]"
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
              >
                MAISON
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs" style={{ fontWeight: 300 }}>
              Curating timeless pieces for the modern wardrobe. Experience luxury that transcends seasons and celebrates the art of refined living.
            </p>
            <div className="flex items-center gap-5 pt-2">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-foreground/40 hover:text-foreground transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {[
            { title: "Shop", links: footerLinks.shop, base: "/shop" },
            { title: "About", links: footerLinks.about, base: "/about" },
            { title: "Support", links: [...footerLinks.support, "WhatsApp"], base: "/contact" },
          ].map(({ title, links }) => (
            <div key={title} className="lg:col-span-2">
              <h4 className="text-[11px] uppercase tracking-[0.2em] mb-6 text-foreground/80">{title}</h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link}>
                    {link === "WhatsApp" ? (
                      <button
                        onClick={() => openWhatsApp("Hi! I need help with my MAISON order.")}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 normal-case tracking-normal"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group inline-block"
                      >
                        {link}
                        <span className="absolute -bottom-0.5 left-0 w-full h-[0.5px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-6 text-foreground/80">Contact</h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li>contact@maison.com</li>
              <li>+1 (555) 234-5678</li>
              <li className="leading-relaxed">
                123 Rue de la Mode<br />
                Paris, 75001
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Icons + Bottom Bar */}
        <div className="border-t border-border/30 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[11px] text-muted-foreground/60 tracking-wide">
              &copy; {currentYear} Maison. All rights reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              {["Visa", "Mastercard", "Amex", "PayPal"].map((brand) => (
                <span
                  key={brand}
                  className="text-[9px] text-muted-foreground/40 border border-border/30 px-2.5 py-1 rounded-sm uppercase tracking-wider"
                >
                  {brand}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-8 text-[11px] text-muted-foreground/60">
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-6 right-6 md:right-12 lg:right-20 w-10 h-10 border border-border/30 flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-foreground/30 transition-all duration-300"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
}
