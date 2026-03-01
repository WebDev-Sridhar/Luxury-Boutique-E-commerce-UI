import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import ScrollToTop from "../components/ScrollToTop";

// simple layout with header and footer
export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen pt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
