import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { CartDrawer } from "../components/cart/CartDrawer";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

export function Layout() {
  return (
    <div className="overflow-x-clip">
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}
