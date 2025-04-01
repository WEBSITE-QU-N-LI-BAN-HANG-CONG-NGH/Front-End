import React from "react";

const ProductCardList = ({ imageUrl, reviewsImageUrl }) => {
  return (
    <article className="pt-2.5 pr-6 pb-9 pl-14 mt-5 bg-white shadow-sm max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[24%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full text-xs leading-loose text-center text-gray-400 max-md:mt-10">
            <img
              src={imageUrl}
              className="object-contain w-full aspect-square"
              alt="Product"
            />
            <div className="flex gap-2.5 self-start mt-5">
              <img
                src={reviewsImageUrl}
                className="object-contain shrink-0 aspect-[5.62] w-[73px]"
                alt="Reviews"
              />
              <span>Reviews (4)</span>
            </div>
          </div>
        </div>

        <div className="ml-5 w-[76%] max-md:ml-0 max-md:w-full">
          <div className="mt-1.5 w-full max-md:mt-10 max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow items-start mt-12 text-black max-md:mt-10">
                    <p className="text-xs font-light text-center">
                      SKU D5515AI
                    </p>
                    <h2 className="self-stretch mt-6 text-sm">
                      MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel
                      10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB
                      SSD NVME - Windows 10 PRO Laptop
                    </h2>
                    <p className="mt-7 text-lg font-semibold leading-snug">
                      <span className="line-through text-sm text-gray-600">
                        $499.00
                      </span>{" "}
                      $499.00
                    </p>
                  </div>
                </div>

                <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col max-md:mt-10">
                    <p className="self-end px-6 py-2.5 text-xs leading-loose text-center bg-white text-neutral-500 w-[71px] max-md:pl-5">
                      in stock
                    </p>
                    <div className="mt-14 max-w-full text-xs w-[234px] max-md:mt-10">
                      <div className="flex items-start px-4 py-1.5 whitespace-nowrap bg-white">
                        <span className="text-black w-[121px]">CPU</span>
                        <span className="text-stone-500 w-[84px]">N/A</span>
                      </div>
                      <div className="flex items-start px-4 py-1.5 whitespace-nowrap bg-violet-50">
                        <span className="text-black w-[121px]">Featured</span>
                        <span className="text-stone-500 w-[84px]">N/A</span>
                      </div>
                      <div className="flex items-start px-4 py-1.5 bg-white">
                        <span className="text-black w-[121px]">I/O Ports</span>
                        <span className="text-stone-500 w-[84px]">N/A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 justify-between mt-14 w-full max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
              <button className="gap-2.5 self-stretch px-5 py-2 text-sm font-semibold text-blue-600 border-2 border-solid border-[color:var(--Color---3,#0156FF)] rounded-[50px] w-[150px]">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCardList;
