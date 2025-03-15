import ProductSupportInfo from "../../components/ProductSupportInfo";
import React, { Suspense } from "react";

const data = [
  {
    floatingIconImage: "img_floating_icon.svg",
    supportTitle: "Product Support",
    warrantyDescription: "Up to 3 years on-site warranty available for your peace of mind.",
  },
  {
    floatingIconImage: "img_close.svg",
    supportTitle: "Personal Account",
    warrantyDescription: "With big discounts, free delivery and a dedicated support specialist.",
  },
  {
    floatingIconImage: "img_checkmark_color_3.svg",
    supportTitle: "Amazing Savings",
    warrantyDescription: "Up to 70% off new Products, you can be sure of the best price.",
  },
];

export default function AboutusGroup1234() {
  return (
    <div className="mt-[62px] self-stretch">
      <div className="flex justify-center bg-color___1 py-11 md:py-5 sm:py-4">
        <div className="container-xs mt-3.5 flex justify-center px-14 lg:px-5 md:px-5">
          <div className="ml-1.5 flex w-[82%] gap-[130px] lg:ml-0 md:ml-0 md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {data.map((d, index) => (
                <ProductSupportInfo {...d} key={"group4723" + index} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
