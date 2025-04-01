"use client";
import React from "react";
import AccountSidebar from "./AccountSidebar";
import AccountForm from "./AccountForm";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Features from "../shared/Features";

function UserAccount1() {
  return (
    <div className="flex flex-col pt-3 bg-white min-h-[screen]">
      <Header />
      <main className="flex flex-col px-10 py-6 max-sm:px-5">
        <BreadcrumbNav />
        <div className="flex gap-10 mt-10 max-md:flex-col">
          <AccountSidebar />
          <AccountForm />
        </div>
      </main>
      <Features />
      <Footer />
    </div>
  );
}

export default UserAccount1;
