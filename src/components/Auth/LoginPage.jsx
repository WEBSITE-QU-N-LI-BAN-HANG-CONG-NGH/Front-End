import React from "react";
import LoginForm from "./LoginForm";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Features from "../shared/Features";

const LoginPage = () => {
  return (
    <div className="flex flex-col pt-3 bg-white min-h-screen">
      <Header />
      <div className="flex-1">
        <LoginForm />
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default LoginPage;