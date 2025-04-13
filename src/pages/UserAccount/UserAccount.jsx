"use client";
import React from "react";
import Header from "../../components/layout/Header";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import AccountSidebar from "../../components/ui/AccountSidebar";
import AccountForm from "../../components/ui/Account";
import Features from "../../components/layout/Features";
import Footer from "../../components/layout/Footer";


function UserAccount() {
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

export default UserAccount;
