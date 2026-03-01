export interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author?: string;
  date?: string;
}

export const featuredArticle: Article = {
  id: "f1",
  title: "The Art of Tailoring: Crafting a Timeless Wardrobe",
  excerpt:
    "Explore the meticulous process behind bespoke tailoring and how it shapes enduring style.",
  imageUrl:
    "https://images.unsplash.com/photo-1630905119003-329447458f85?q=80&w=1161&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  author: "Ava Laurent",
  date: "Feb 20, 2026",
};

export const articles: Article[] = [
  {
    id: "1",
    title: "Sustainable Fabrics Making Waves in 2026",
    excerpt:
      "From organic linen to recycled silk, discover the materials redefining slow fashion.",
    imageUrl:
      "https://images.unsplash.com/photo-1625471592808-3b848a6e9ffd?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Emma Chen",
    date: "Feb 15, 2026",
  },
  {
    id: "2",
    title: "Inside the Iconic Maison: A Studio Tour",
    excerpt:
      "Step behind the scenes of the atelier where dreams are stitched into reality.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664301895063-f94f09d90d72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Sophie Laurent",
    date: "Feb 10, 2026",
  },
  {
    id: "3",
    title: "Seasonless Dressing: Redefining Wardrobe Essentials",
    excerpt: "How to curate a closet that transcends trends and seasons.",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1080&q=80",
    author: "Isabella Rose",
    date: "Feb 5, 2026",
  },
];
