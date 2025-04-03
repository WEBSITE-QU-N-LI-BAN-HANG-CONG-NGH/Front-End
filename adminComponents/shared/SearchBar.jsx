"use client";
import React from "react";

const SearchBar = ({ placeholder, className = "" }) => {
  return (
    <div
      className={`flex gap-2 items-center px-4 py-2 bg-gray-100 rounded-lg ${className}`}
    >
      <i className="ti ti-search" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full text-gray-600 bg-transparent border-none focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
