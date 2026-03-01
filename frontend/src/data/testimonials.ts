export interface Testimonial {
  quote: string;
  author: string;
  title?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The attention to detail and quality is unmatched. Every piece feels like a treasure that will last a lifetime.",
    author: "Sophie Laurent",
    title: "Fashion Editor",
  },
  {
    quote:
      "A truly elevated shopping experience. The curation is impeccable, and the service is exceptional.",
    author: "Emma Chen",
    title: "Creative Director",
  },
  {
    quote:
      "Timeless elegance meets modern sensibility. This is where I find pieces that define my wardrobe.",
    author: "Isabella Rose",
    title: "Style Consultant",
  },
];
