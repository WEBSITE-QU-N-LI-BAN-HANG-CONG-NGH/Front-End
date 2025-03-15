import { Heading } from "../../components";
import ProductDescription from "../../components/ProductDescription";
import React, { Suspense } from "react";

const data = [
  { productImage: "img_image_16.png" },
  { productImage: "img_image_17.png" },
  { productImage: "img_image_18.png" },
  { productImage: "img_image_19.png" },
];

export default function ProductdetailsGroup47() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gradient2 py-[76px] lg:py-8 md:py-5 sm:py-4">
        <div className="container-xs mb-2 flex flex-col items-center px-14 lg:px-5 md:px-5">
          <Heading
            size="text7xl"
            as="h2"
            className="text-[38px] font-medium !text-white-a700 lg:text-[32px] md:text-[32px] sm:text-[30px]"
          >
            Featues
          </Heading>
          <Heading
            size="text4xl"
            as="h3"
            className="mt-7 w-[32%] text-center text-[18px] font-light leading-[26px] !text-white-a700 lg:w-full lg:text-[15px] md:w-full"
          >
            The MPG series brings out the best in gamers by allowing full expression in color with advanced RGB lighting
            control and synchronization.
          </Heading>
          <div className="ml-1 mt-[60px] flex w-[90%] gap-[46px] md:ml-0 md:w-full md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {data.map((d, index) => (
                <ProductDescription {...d} key={"group4031" + index} className="mb-[18px] md:mb-0" />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
