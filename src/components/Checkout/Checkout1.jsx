"use client";
import React from "react";
import CartProgress from "./CartProgress";
import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import Header from "../shared/Header";
import Features from "../shared/Features";
import Footer from "../shared/Footer";
import BreadcrumbNav from "../shared/BreadcrumbNav";

const Checkout1 = () => {
  return (
    <div className="flex flex-col pt-3 bg-white min-h-[screen]">
      <Header />
      <section className="flex flex-col items-center px-64 py-10 max-md:px-10 max-sm:px-5">
        <BreadcrumbNav />
        <h1 className="mb-10 text-6xl font-semibold">Checkout</h1>
        <CartProgress />
        <main className="flex gap-10 px-56 py-0 max-md:flex-col max-md:px-5 max-md:py-0 max-sm:px-2.5 max-sm:py-0">
          <ShippingForm />
          <OrderSummary />
        </main>
        <Features />
      </section>
      <Footer />
    </div>
  );
};

export default Checkout1;