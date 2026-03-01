import React from "react";
import { motion } from "motion/react";


export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<{ [field: string]: string }>({});
  const [submitting, setSubmitting] = React.useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) errs.name = "Name is required";
    if (!email) errs.email = "Email is required";
    else if (!emailRegex.test(email)) errs.email = "Invalid email";
    if (!subject) errs.subject = "Subject is required";
    if (!message) errs.message = "Message is required";
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
 <motion.main
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="bg-background py-32"
>
  <div className="max-w-[1200px] mx-auto px-6">

    {/* HEADER */}
    <header className="text-center mb-20 max-w-2xl mx-auto">
      <h1
        className="text-5xl mb-6"
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontWeight: 400,
          letterSpacing: "0.04em"
        }}
      >
        Get in Touch
      </h1>

      <p className="text-muted-foreground text-lg leading-relaxed">
        Our atelier team is here to assist you. Whether you have inquiries about
        our collections, orders, or private appointments — we’d love to hear from you.
      </p>

      <div className="w-24 h-px bg-accent mx-auto mt-8" />
    </header>

    {/* CONTENT */}
    <div className="grid md:grid-cols-2 gap-20">

      {/* LEFT PANEL – CONTACT DETAILS */}
      <div className="bg-card border border-border p-10 space-y-10">

        <div>
          <h2
            className="text-xl mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Visit Our Boutique
          </h2>
          <p className="text-muted-foreground">
            123 Luxury St.<br />
            City, State ZIP
          </p>
        </div>

        <div>
          <h2
            className="text-xl mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Contact
          </h2>
          <p className="text-muted-foreground">
            contact@luxuryboutique.com<br />
            (123) 456-7890
          </p>
        </div>

        <div>
          <h2
            className="text-xl mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Opening Hours
          </h2>
          <p className="text-muted-foreground">
            Monday – Friday: 10am – 6pm<br />
            Saturday: 11am – 5pm
          </p>
        </div>

        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Private styling appointments available upon request.
          </p>
        </div>

      </div>

      {/* RIGHT PANEL – FORM */}
      <div>
        <form className="space-y-8">

          {/* NAME */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 bg-input-background border border-border focus:outline-none focus:ring-1 focus:ring-accent transition"
            />
            <p className="h-5 text-destructive text-sm mt-1">
              {errors.name || "\u00A0"}
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-input-background border border-border focus:outline-none focus:ring-1 focus:ring-accent transition"
            />
            <p className="h-5 text-destructive text-sm mt-1">
              {errors.email || "\u00A0"}
            </p>
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-5 py-4 bg-input-background border border-border focus:outline-none focus:ring-1 focus:ring-accent transition"
            />
            <p className="h-5 text-destructive text-sm mt-1">
              {errors.subject || "\u00A0"}
            </p>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Message
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-5 py-4 bg-input-background border border-border focus:outline-none focus:ring-1 focus:ring-accent transition"
            />
            <p className="h-5 text-destructive text-sm mt-1">
              {errors.message || "\u00A0"}
            </p>
          </div>

          {/* BUTTON */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm transition-all duration-300"
              style={{ letterSpacing: "0.15em" }}
            >
              Send Message
            </motion.button>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              We typically respond within 24 hours.
            </p>
          </div>

        </form>
      </div>

    </div>
  </div>
</motion.main>
  );
}

export default Contact;
