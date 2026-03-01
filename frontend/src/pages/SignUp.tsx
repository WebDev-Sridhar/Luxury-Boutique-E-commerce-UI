import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const [submitting, setSubmitting] = React.useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errs.email = "Email is required";
    else if (!emailRegex.test(email)) errs.email = "Invalid email address";
    if (!password) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 500);
  };

  return (
   <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300"
>
  <div className="bg-card text-card-foreground p-12 shadow-[0_4px_20px_rgba(0,0,0,0.04)] max-w-md w-full transition-colors duration-300">
    <h2
      className="text-2xl mb-8 text-center"
      style={{
        fontFamily: "Cormorant Garamond, serif",
        fontWeight: 300,
      }}
    >
      Create Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm mb-1 text-muted-foreground">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-border bg-input-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
          aria-invalid={errors.email ? "true" : undefined}
        />
        <p className="h-5 text-destructive text-sm mt-1">
          {errors.email || "\u00A0"}
        </p>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm mb-1 text-muted-foreground">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-border bg-input-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
          aria-invalid={errors.password ? "true" : undefined}
        />
        <p className="h-5 text-destructive text-sm mt-1">
          {errors.password || "\u00A0"}
        </p>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={submitting || !email || !password}
        className="w-full py-3 text-sm uppercase tracking-widest bg-primary text-primary-foreground  active:scale-95 transition-all duration-200"
        style={{ letterSpacing: "0.15em" }}
      >
        Sign Up
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link
        to="/signin"
        className="underline hover:text-foreground transition-colors"
      >
        Sign in
      </Link>
    </p>
  </div>
</motion.div>
  );
}
