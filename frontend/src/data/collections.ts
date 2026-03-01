

export interface Collection {
  imageUrl: string;
  title: string;
  description: string;
}
// Add additional collections here as needed
export const featuredCollection: Collection = {
  imageUrl:
    "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Timeless Essentials",
  description:
    "Our signature collection celebrates the beauty of simplicity. Each piece is thoughtfully designed to transcend fleeting trends, offering versatility and enduring elegance for every season.",
};

// sample grid data
export const collections: Collection[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Summer Edit",
    description: "Light linens and effortless silhouettes for warm days.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1758539720658-4a1732a5b7cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXZlbmluZyUyMFdlYXJ8ZW58MHx8MHx8fDA%3D",
    title: "Evening Wear",
    description: "Dramatic pieces that transition from dusk to dawn.",
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1668268751273-b0e8be5d3f03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RXZlbmluZyUyMFdlYXJ8ZW58MHx8MHx8fDA%3D",
    title: "Accessories",
    description: "Curated bags, jewelry, and more to complete your look.",
  },
];
