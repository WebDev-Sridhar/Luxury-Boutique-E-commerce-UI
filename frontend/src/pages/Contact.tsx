import React from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-background py-24"
    >
      <div className="max-w-[1000px] mx-auto px-4">
        {/* header */}
        <header className="text-center mb-16">
          <h1
            className="text-4xl"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          >
            Contact
          </h1>
          <p className="mt-4 text-sm text-foreground/70">
            We'd love to hear from you. Please reach out with any questions or
            comments.
          </p>
          <div className="border-t border-border mt-8" />
        </header>

        {/* two column layout */}
        <div className="flex flex-col md:flex-row gap-16">
          {/* left info block */}
          <div className="md:w-1/2 text-sm text-foreground/80 space-y-6">
            <div>
              <h2 className="font-semibold">Address</h2>
              <p className="mt-1">
                123 Luxury St.
                <br />
                City, State ZIP
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Email</h2>
              <p className="mt-1">contact@luxuryboutique.com</p>
            </div>
            <div>
              <h2 className="font-semibold">Phone</h2>
              <p className="mt-1">(123) 456‑7890</p>
            </div>
            <div>
              <h2 className="font-semibold">Store Hours</h2>
              <p className="mt-1">Mon–Fri: 10am–6pm</p>
            </div>
          </div>

          {/* right form block */}
          <div className="md:w-1/2">
            <form className="space-y-6">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-invalid={errors.name ? "true" : undefined}
                />
                <p className="h-5 text-red-600 text-sm mt-1">
                  {errors.name || "\u00A0"}
                </p>
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-invalid={errors.email ? "true" : undefined}
                />
                <p className="h-5 text-red-600 text-sm mt-1">
                  {errors.email || "\u00A0"}
                </p>
              </div>
              <div>
                <label className="block text-sm mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-invalid={errors.subject ? "true" : undefined}
                />
                <p className="h-5 text-red-600 text-sm mt-1">
                  {errors.subject || "\u00A0"}
                </p>
              </div>
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-invalid={errors.message ? "true" : undefined}
                />
                <p className="h-5 text-red-600 text-sm mt-1">
                  {errors.message || "\u00A0"}
                </p>
              </div>
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={
                    submitting || !name || !email || !subject || !message
                  }
                  className="w-full bg-[#bfa98f] hover:bg-[#a8937a] active:scale-95 transition-transform disabled:opacity-50"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

export default Contact;
