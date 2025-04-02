import React from "react";
const Filter = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center max-w-full text-sm font-semibold leading-loose text-black w-[611px]">
                    <div className="flex flex-row grow gap-2.5 justify-center items-center px-4 py-3 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] max-w-[230px] max-md:pr-5">
                      <span>
                        CUSTOM PCS{" "}
                        <span className="font-normal text-gray-400">(24)</span>
                      </span>
                      <img
                        src="/Close.png"
                        alt="Remove filter"
                        className="box-border object-cover overflow-hidden shrink-0 aspect-square min-h-5 min-w-5 w-[0%]"
                      />
                    </div>
                    <div className="flex flex-row gap-2.5 justify-center items-center px-4 py-3 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] max-w-[230px] max-md:pr-5">
                      <span>
                        HP/COMPAQ PCS{" "}
                        <span className="font-normal text-gray-400">(24)</span>
                      </span>
                      <img
                        src="/Close.png"
                        alt="Remove filter"
                        className="box-border object-cover overflow-hidden shrink-0 aspect-square min-h-5 min-w-5 w-[0%]"
                      />
                    </div>
                    <button className="px-4 py-3.5 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] h-[53px]">
                      Clear All
                    </button>
                  </div>
  );
};

export default Filter;