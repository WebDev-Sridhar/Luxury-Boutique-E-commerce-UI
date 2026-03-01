import React from "react";
import { Hero } from "../components/hero";
import { ProductGrid } from "../components/product-grid";
import { FeaturedCollection } from "../components/featured-collection";
import { Testimonials } from "../components/testimonials";
import { Newsletter } from "../components/newsletter";
import { products } from "../data/products";
import { featuredCollection } from "../data/collections";

export function Home() {
  return (
    <>
      <Hero imageUrl="https://images.unsplash.com/photo-1567631643547-67a2dd59f266?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      <ProductGrid
        products={products}
        title="New Arrivals"
        subtitle="Discover our latest collection of refined essentials, crafted for the discerning individual."
      />

      {/* Divider */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-border/30" />
      </div>

      <FeaturedCollection
        imageUrl={featuredCollection.imageUrl}
        title={featuredCollection.title}
        description={featuredCollection.description}
      />

      {/* Divider */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-border/30" />
      </div>

      <Testimonials />

      <Newsletter />
    </>
  );
}
