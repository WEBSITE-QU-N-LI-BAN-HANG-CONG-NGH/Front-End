"use client";
import React from "react";
import Header from "../shared/Header";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import ComplaintForm from "./ComplaintForm";
import ChatSupport from "./ChatSupport";
import Features from "../shared/Features";
import Footer from "../shared/Footer";

const ContactUs1 = () => {
  return (
    <div className="flex flex-col bg-white min-h-[screen] pt-3">
      <Header />
      <main className="flex flex-col px-64 py-10 max-md:px-10 max-sm:px-5">

        <h1 className="mb-10 mt-10 text-3xl font-semibold">Khiếu nại và báo cáo</h1>

        <div className="flex gap-10 max-md:flex-col">
          <ComplaintForm />
          <ChatSupport />
        </div>
      </main>

      <Features />
      <Footer />
    </div>
  );
};

export default ContactUs1;
