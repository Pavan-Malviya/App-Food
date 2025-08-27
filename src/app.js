import React from "react";
import ReactDom from "react-dom/client";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "/index.css";
import About from "./About";
import Error from "./Error";
import Contact from "./Contact";
import RestaurantMenu from "./RestaurantMenu";
import Cart from "./Cart";

const AppLayout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
