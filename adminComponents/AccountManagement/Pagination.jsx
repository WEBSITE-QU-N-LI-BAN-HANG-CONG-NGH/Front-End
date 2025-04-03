"use client";
import React from "react";

const PaginationButton = ({ children }) => (
  <button className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100">
    {children}
  </button>
);

const Pagination = () => {
  return (
    <div className="flex gap-2">
      <PaginationButton>Trước</PaginationButton>
      <PaginationButton>1</PaginationButton>
      <PaginationButton>2</PaginationButton>
      <PaginationButton>3</PaginationButton>
      <PaginationButton>Sau</PaginationButton>
    </div>
  );
};

export default Pagination;
