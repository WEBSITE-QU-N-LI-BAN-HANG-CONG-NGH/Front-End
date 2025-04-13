"use client";
import React from "react";
import Header from "../../components/layout/Header";
import CartProgress from "../../components/ui/CartProgress";
import CartItem from "../../components/ui/CartItem";
import CartSummary from "../../components/ui/CartSummary";
import Features from "../../components/layout/Features";
import Footer from "../../components/layout/Footer";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A",
      price: "48.590.000đ",
      originalPrice: "52.990.000đ",
      image:
        "/Placeholder1.png",
    },
    {
      id: 2,
      name: "Card màn hình ASUS TUF Gaming GeForce RTX 4070 Ti SUPER BTF White OC Edition 16GB GDDR6X (TUF-RTX4070TIS-O16G-BTF-WHITE)",
      price: "29.490.000đ",
      originalPrice: "31.990.000đ",
      image:
        "/Placeholder1.png",
    },
  ];

  return (
    <main className="flex flex-col pt-3 bg-white min-h-[screen]">
      <Header />
      <section className="flex flex-col items-center px-64 py-10 max-md:px-10 max-sm:px-5">
        <BreadcrumbNav />
        <h1 className="mb-10 text-6xl font-semibold">Shopping Cart</h1>
        <CartProgress />
        <div className="w-full">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <CartSummary />
        </div>
      </section>
      <Features />
      <Footer />
    </main>
  );
};

export default Cart;
