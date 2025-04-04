"use client";
import React from "react";
import Sidebar from "../shared/Sidebar";
import Header from "../shared/Header";

const Layout = ({ children }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
