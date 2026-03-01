import { motion } from "motion/react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simulate submission
    setEmail("");
  };

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl mb-6"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
        >
          Stay Informed
        </h2>
        <p
          className="text-muted-foreground text-base md:text-lg mb-10 tracking-wide"
          style={{ fontWeight: 300 }}
        >
          Subscribe to receive updates on new arrivals, special offers, and
          exclusive content.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 bg-background border border-border focus:outline-none focus:border-primary transition-colors text-sm"
            style={{ letterSpacing: "0.02em" }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
            style={{ letterSpacing: "0.15em" }}
          >
            Subscribe
          </motion.button>
        </form>

        <p className="text-xs text-muted-foreground mt-6 tracking-wide">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </p>
      </motion.div>
    </section>
  );
}
