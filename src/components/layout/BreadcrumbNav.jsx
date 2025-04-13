import React from "react";

const BreadcrumbNav = () => {
  return (
    <nav className="self-start mt-5 mb-3 text-xs font-light text-center text-neutral-400 max-md:max-w-full">
      <a href="/" className="text-black">
        Home
      </a>
      <span className="text-blue-600"> › </span>
      <a href="/laptops" className="text-black">
        Laptops
      </a>
      <span className="text-blue-600"> › </span>
      <a href="/laptops/everyday" className="text-black">
        Everyday Use Notebooks
      </a>
      <span className="text-blue-600"> › </span>
      <a href="/laptops/msi-prestige" className="text-black">
        MSI Prestige Series
      </a>
      <span className="text-blue-600"> › </span>
      <span className="text-gray-400">MSI WS Series</span>
    </nav>
  );
};

export default BreadcrumbNav;
