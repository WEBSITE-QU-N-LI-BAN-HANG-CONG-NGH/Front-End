"use client";
import React from "react";
import TopBar from "../layout/TopBar";
import MainNav from "../layout/MainNav";
import LoginForm from "./LoginForm";
import BenefitsSection from "../features/BenefitsSection";
import NewsletterSection from "../layout/NewsletterSection";
import Footer from "../layout/Footer";

function Register1() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <TopBar />
      <MainNav />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/46aedd3c36edbb2f97f11000171b6dfb9320f9077471ef3d53b65533228cee04"
        className="object-contain w-full aspect-[1000] stroke-[1px] stroke-gray-300 max-md:max-w-full"
        alt="Divider"
      />

      <div className="flex flex-col items-start self-center mt-5 max-w-full w-[1279px]">
        <div className="text-xs font-light text-center text-neutral-400">
          <span className="font-normal text-black">Home </span>
          <span className="font-normal text-blue-600">›</span>
          <span className="font-normal text-black"> Login</span>
        </div>
        <h1 className="mt-5 text-3xl font-semibold text-black">
          Customer Login
        </h1>
        <LoginForm />
      </div>

      <BenefitsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default Register1;
