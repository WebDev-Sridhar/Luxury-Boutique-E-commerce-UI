import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Product } from "./pages/Product";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Collections } from "./pages/Collections";
import { Journal } from "./pages/Journal";
import { Contact } from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="collections" element={<Collections />} />
          <Route path="journal" element={<Journal />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
