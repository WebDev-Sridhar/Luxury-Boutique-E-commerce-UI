import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/animation/PageTransition";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col lg:flex-row pt-20 md:pt-20">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block lg:w-1/2 relative"
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-12 left-12">
            <p className="text-white/70 text-[10px] uppercase tracking-[0.3em] mb-2">Join the Maison</p>
            <h2 className="text-white text-4xl" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
              Begin Your Journey
            </h2>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex-1 flex items-center justify-center px-6 py-20 "
        >
          <div className="w-full max-w-sm">
            <Link to="/" className="block text-center mb-12">
              <span className="text-2xl tracking-[0.2em]" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
                MAISON
              </span>
            </Link>

            <h1 className="text-3xl text-center mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-10">Join the world of Maison</p>

            {/* Social Buttons */}
            <div className="space-y-3 mb-8">
              {["Google", "Apple"].map((provider) => (
                <button
                  key={provider}
                  className="w-full py-3 border border-border/50 text-[11px] uppercase tracking-[0.15em] hover:bg-muted transition-colors flex items-center justify-center gap-2"
                >
                  Continue with {provider}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-[1px] bg-border/30" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">or</span>
              <div className="flex-1 h-[1px] bg-border/30" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-border/50 pb-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-border/50 pb-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-border/50 pb-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity mt-4"
              >
                Create Account
              </motion.button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-foreground hover:underline transition-colors">
                Sign in
              </Link>
            </p>

            <p className="mt-4 text-center text-[10px] text-muted-foreground/50 tracking-wide">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
