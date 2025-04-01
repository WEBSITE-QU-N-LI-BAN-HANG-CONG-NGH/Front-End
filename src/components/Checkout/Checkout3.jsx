import BreadcrumbNav from "../shared/BreadcrumbNav";
import Features from "../shared/Features";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import CartProgress from "./CartProgress";
import React from "react";
import OrderDetails from "./OrderDetails";
import ShippingInfo from "./ShippingInfo";
import OrderSuccess from "./OrderSuccess";

const Checkout3 = () => {
    return (
            <div className="flex flex-col pt-3 bg-white min-h-[screen]">
            <Header />
            <section className="flex flex-col items-center px-64 py-10 max-md:px-10 max-sm:px-5">
            <BreadcrumbNav />
            <h1 className="mb-10 text-6xl font-semibold">Checkout</h1>
            <CartProgress />
            <div className="flex gap-10 p-5 mx-auto my-0 max-w-[1200px] order-[details] max-md:flex-col">
            <OrderDetails />
            <ShippingInfo />
          </div>
          <OrderSuccess />
            <Features />
            </section>
            <Footer />
            </div>
    );
  };
  
  export default Checkout3;
  