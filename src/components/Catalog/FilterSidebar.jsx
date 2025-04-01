"use client";
import React from "react";

const FilterSidebar = () => {
  return (
    <aside className="w-[17%] max-md:ml-0 max-md:w-full">
      <div className="max-md:mt-1.5">
        <section className="bg-violet-50">
          <div className="max-w-full text-center rounded-none w-[234px]">
            <div className="flex flex-col px-4 py-5 bg-violet-50">
              <h2 className="self-center text-base font-bold text-black">
                Filters
              </h2>
              <button className="px-6 py-2 mt-4 text-sm font-semibold text-gray-400 border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] rounded-[50px] max-md:px-5">
                Clear Filter
              </button>
            </div>
          </div>

          <section className="px-4 py-5 w-full text-black max-w-[234px]">
            <div className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap">
              <h3>Category</h3>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5090ceeb0eda4690752fa59424cd9782fff03374?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
                alt="Toggle category"
                className="object-contain shrink-0 w-4 aspect-[1.14]"
              />
            </div>
            <div className="flex gap-5 justify-between mt-4 text-sm leading-7">
              <div>
                CUSTOM PCS
                <br />
                MSI ALL-IN-ONE PCS
                <br />
                HP/COMPAQ PCS
              </div>
              <div className="text-right">
                15
                <br />
                45
                <br />1
              </div>
            </div>
          </section>

          <section className="p-4 w-full text-black max-w-[234px]">
            <div className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap">
              <h3>Price</h3>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a436b3fe44141d7cf0bffdc60be50ca5cebb716b?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
                alt="Toggle price"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>
            <div className="flex gap-5 justify-between mt-5 text-sm leading-7">
              <div>
                $0.00 - $1,000.00
                <br />
                $1,000.00 - $2,000.00
                <br />
                $2,000.00 - $3,000.00
                <br />
                $3,000.00 - $4,000.00
                <br />
                $4,000.00 - $5,000.00
                <br />
                $5,000.00 - $6,000.00
                <br />
                $6,000.00 - $7,000.00
                <br />
                $7,000.00 And Above
              </div>
              <div className="text-right">
                19
                <br />
                21
                <br />9<br />6<br />3<br />1<br />1<br />1
              </div>
            </div>
          </section>

          <section className="px-4 py-5 w-full text-sm font-semibold text-black whitespace-nowrap rounded-none max-w-[234px]">
            <div className="flex gap-5 justify-between">
              <h3 className="my-auto">Color</h3>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a436b3fe44141d7cf0bffdc60be50ca5cebb716b?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
                alt="Toggle color"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>
            <div className="flex shrink-0 mt-4 bg-black rounded-3xl h-[23px] w-[23px]" />
          </section>

          <section className="px-4 py-5 w-full text-sm font-semibold rounded-none max-w-[234px]">
            <div className="flex gap-5 justify-between text-black">
              <h3>Filter Name</h3>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/411695f9246914b6d1eeda4e44d91e2c1bd75c0d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
                alt="Toggle filter"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>
            <button className="px-11 py-2 mt-4 w-full text-center text-white bg-blue-600 rounded-[50px] max-md:px-5">
              Apply Filters (2)
            </button>
          </section>
        </section>

        <section className="flex flex-col items-center mt-2 text-center">
          <div className="px-px max-w-full rounded-none w-[233px]">
            <div className="flex flex-col px-4 py-5 bg-violet-50">
              <h2 className="self-center text-base font-bold text-black">
                Brands
              </h2>
              <button className="px-6 py-2 mt-4 text-sm font-semibold text-gray-400 border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] rounded-[50px] max-md:px-5">
                All Brands
              </button>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28d852c39935c46120c324c774798cc43839b32d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
            alt="Brands"
            className="object-contain max-w-full aspect-[1.04] w-[234px]"
          />
        </section>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1698a5f81bd60893316c86f52eae7309cb654e3c?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
          alt="Advertisement"
          className="object-contain mt-2 w-full aspect-[0.63]"
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
