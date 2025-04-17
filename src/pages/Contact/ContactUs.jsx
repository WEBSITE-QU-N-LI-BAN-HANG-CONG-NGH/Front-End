// src/pages/Contact/ContactUs.jsx
import React from "react";
import ComplaintForm from "../../components/features/user/ComplaintForm";
import ChatSupport from "../../components/features/user/ChatSupport";

const ContactUs = () => {
  return (
    <div className="flex flex-col bg-white min-h-[screen] pt-3">
      <main className="flex flex-col px-64 py-10 max-md:px-10 max-sm:px-5">
        <h1 className="mb-10 mt-10 text-3xl font-semibold">Khiếu nại và báo cáo</h1>
        <div className="flex gap-10 max-md:flex-col">
          <ComplaintForm />
          <ChatSupport />
        </div>
      </main>
    </div>
  );
};

export default ContactUs;