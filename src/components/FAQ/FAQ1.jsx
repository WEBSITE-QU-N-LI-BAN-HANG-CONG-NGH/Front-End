"use client";
import React from "react";
import Header from "../shared/Header";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import TermsContent from "./TermsContent";
import Features from "../shared/Features";
import Footer from "../shared/Footer";

export const FAQ1 = () => {
  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white max-md:pb-24">
      <Header />
      <main className="flex flex-col items-start self-center mt-9 w-full font-light text-black max-w-[1401px] max-md:max-w-full">
        <TermsContent />
      </main>
      <Features />
      <Footer />
    </div>
  );
};

export default FAQ1;
