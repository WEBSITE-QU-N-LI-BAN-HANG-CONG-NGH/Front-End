import CatalogOne from "../../components/CatalogOne";
import React, { Suspense } from "react";

const data = [
  {
    productSupport: "Product Support",
    upto3yearsonsite: "Up to 3 years on-site warranty available for your peace of mind.",
  },
  { productSupport: "Product Support" },
  { productSupport: "Product Support" },
];

export default function ProductspecsGroup4333() {
  return (
    <div>
      <div className="flex justify-center bg-gray-50_01 py-11 md:py-5 sm:py-4">
        <div className="container-xs mt-3.5 flex justify-center px-14 lg:px-5 md:px-5">
          <div className="ml-1.5 flex w-[82%] gap-[130px] lg:ml-0 md:ml-0 md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {data.map((d, index) => (
                <CatalogOne {...d} key={"group5002" + index} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
