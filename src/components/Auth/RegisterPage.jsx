import React from "react";
import RegisterForm from "./RegisterForm";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Features from "../shared/Features";

const RegisterPage = () => {
  return (
    <div className="flex flex-col pt-3 bg-white min-h-screen">
      <Header />
      <div className="flex-1">
        <RegisterForm />
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default RegisterPage;