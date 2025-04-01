"use client";
import React from "react";
import Header from "../shared/Header";
import CartProgress from "./CartProgress";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Features from "../shared/Features";
import Footer from "../shared/Footer";
import BreadcrumbNav from "../shared/BreadcrumbNav";

const ShoppingCart1 = () => {
  const cartItems = [
    {
      id: 1,
      name: "Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A",
      price: "48.590.000đ",
      originalPrice: "52.990.000đ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbIwiKbRMRJkaJBTn7kU1Atnt_Qd6exNbacQ&s",
    },
    {
      id: 2,
      name: "Card màn hình ASUS TUF Gaming GeForce RTX 4070 Ti SUPER BTF White OC Edition 16GB GDDR6X (TUF-RTX4070TIS-O16G-BTF-WHITE)",
      price: "29.490.000đ",
      originalPrice: "31.990.000đ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbIwiKbRMRJkaJBTn7kU1Atnt_Qd6exNbacQ&s",
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

export default ShoppingCart1;
