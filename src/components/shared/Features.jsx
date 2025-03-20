import React from "react";

const Features = () => {
  return (
    <div className="flex flex-col justify-center items-center px-16 py-14 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="max-w-full w-[1054px]">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center text-center text-black max-md:mt-10">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8154905fe520d1fcb48ee63f2e6af5ed6758e70fea632e4f0245c94ed6cd305d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
                className="object-contain aspect-square w-[65px]"
                alt="Product Support"
              />
              <div className="flex flex-col items-center mt-6 max-w-full w-[265px]">
                <div className="text-lg font-bold leading-none">
                  Product Support
                </div>
                <div className="mt-3.5 text-sm leading-5">
                  Up to 3 years on-site warranty available for your peace of
                  mind.
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center text-center text-black max-md:mt-10">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/43611754d46ecc2e28442aff3456b730f50f5a4ef4113bfa75d07e5ef88b9f9f?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
                className="object-contain aspect-square w-[65px]"
                alt="Personal Account"
              />
              <div className="flex flex-col items-center mt-6 max-w-full w-[265px]">
                <div className="text-lg font-bold leading-none">
                  Personal Account
                </div>
                <div className="mt-3.5 text-sm leading-5">
                  With big discounts, free delivery and a dedicated support
                  specialist.
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center text-center text-black max-md:mt-10">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa06bc39263095be2be8d54e475356775ca62772349639aecfe0cca73373b1e7?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
                className="object-contain aspect-square w-[65px]"
                alt="Amazing Savings"
              />
              <div className="flex flex-col items-center mt-6 max-w-full w-[265px]">
                <div className="text-lg font-bold leading-none">
                  Amazing Savings
                </div>
                <div className="mt-3.5 text-sm leading-5">
                  Up to 70% off new Products, you can be sure of the best price.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
