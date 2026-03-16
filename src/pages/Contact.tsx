import { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { AnimatedText } from "../components/animation/AnimatedText";
import { RevealOnScroll } from "../components/animation/RevealOnScroll";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations";
import { PageTransition } from "../components/animation/PageTransition";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <PageTransition>
      <div className="pt-28 md:pt-32">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto px-6 mb-16 md:mb-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Get in Touch</p>
          <AnimatedText
            text="We'd Love to Hear From You"
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
          />
          <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
            Whether you have inquiries about our collections, need styling advice, or wish to schedule a private appointment — our team is here to assist.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <RevealOnScroll variant={fadeUp} className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <button
            onClick={() => openWhatsApp("Hi! I'd like to get in touch with the MAISON team.")}
            className="w-full flex items-center justify-center gap-4 bg-[#25D366] text-white py-5 text-[11px] uppercase tracking-[0.15em] hover:bg-[#20BD5A] transition-colors cursor-pointer group"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Us on WhatsApp
            <span className="text-white/60 normal-case tracking-normal text-[10px]">— Instant response</span>
          </button>
        </RevealOnScroll>

        {/* Split: Image/Info + Form */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left: Image + Contact Details */}
            <RevealOnScroll variant={slideInLeft}>
              <div className="space-y-10">
                <div className="overflow-hidden h-[40vh] lg:h-[50vh]">
                  <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
                    alt="Maison Boutique"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { icon: MapPin, title: "Visit Us", lines: ["123 Rue de la Mode", "Paris, 75001, France"] },
                    { icon: Phone, title: "Call Us", lines: ["+1 (555) 234-5678", "+33 1 42 60 00 00"] },
                    { icon: Mail, title: "Email", lines: ["contact@maison.com", "press@maison.com"] },
                    { icon: Clock, title: "Hours", lines: ["Mon – Fri: 10am – 7pm", "Sat: 11am – 6pm"] },
                  ].map(({ icon: Icon, title, lines }) => (
                    <div key={title} className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium">{title}</h3>
                      </div>
                      {lines.map((line, i) => (
                        <p key={i} className="text-sm text-muted-foreground" style={{ fontWeight: 300 }}>{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Right: Form */}
            <RevealOnScroll variant={slideInRight} delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: "name", label: "Full Name", type: "text" },
                  { name: "email", label: "Email Address", type: "email" },
                  { name: "subject", label: "Subject", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => update(field.name, e.target.value)}
                      required
                      className="w-full bg-transparent border-b border-border/50 pb-3 text-sm focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/30"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-border/50 pb-3 text-sm focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-muted-foreground/30"
                  />
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                  >
                    {submitted ? "Message Sent!" : "Send Message"}
                  </motion.button>
                  <p className="text-[10px] text-muted-foreground/60 mt-3 text-center tracking-wide">
                    We typically respond within 24 hours
                  </p>
                </div>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="border-t border-border/20 py-20 md:py-28">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <AnimatedText
                text="Frequently Asked"
                as="h2"
                className="text-3xl md:text-4xl"
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
              />
            </div>
            <div className="space-y-0">
              {[
                { q: "What are your shipping options?", a: "We offer complimentary standard shipping on orders over $500. Express delivery is available for all orders at checkout." },
                { q: "Can I schedule a private appointment?", a: "Absolutely. Private styling sessions are available at our Paris and New York boutiques. Contact us to arrange a time." },
                { q: "What is your return policy?", a: "We accept returns within 30 days of delivery. Items must be unworn, with tags attached, in original packaging." },
                { q: "Do you ship internationally?", a: "Yes, we ship to over 40 countries worldwide. Delivery times and duties vary by destination." },
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-sm font-normal tracking-wide normal-case">{question}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-lg font-light ml-4 shrink-0">+</motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-muted-foreground leading-relaxed pb-5" style={{ fontWeight: 300 }}>{answer}</p>
      </motion.div>
    </div>
  );
}

export default Contact;
