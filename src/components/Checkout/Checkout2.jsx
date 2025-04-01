"use client";
import React from "react";
import InfoSummary from "./InfoSummary";
import PaymentMethods from "./PaymentMethods";
import Features from "../shared/Features";
import Footer from "../shared/Footer";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import Header from "../shared/Header";
import CartProgress from "./CartProgress";

const Checkout2 = () => {
  return (
    <div className="flex flex-col pt-3 bg-white min-h-[screen]">
      <Header />
      <section className="flex flex-col items-center px-64 py-10 max-md:px-10 max-sm:px-5">
        <BreadcrumbNav />
        <h1 className="mb-10 text-6xl font-semibold">Checkout</h1>
        <CartProgress />
        <main className="p-5 mx-auto my-0 max-w-[1200px]">
        <InfoSummary />
        <PaymentMethods />
      </main>
        <Features />
      </section>
      <Footer />
    </div>
  );
};

export default Checkout2;
