import React from "react";

function TopBar() {
  return (
    <div className="flex flex-col justify-center items-center px-16 py-3 w-full text-xs font-semibold text-white bg-black max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between items-start w-full max-w-[1401px] max-md:max-w-full">
        <div className="flex gap-2 self-stretch my-auto">
          <div className="grow my-auto">
            <span className="text-[#A2A6B0]">Mon-Thu:</span> 9:00 AM - 5:30 PM
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/70122338c4f8b9fbc27c3c2fa943264aadc19470f1829739d971828944e51456"
            className="object-contain shrink-0 w-4 aspect-[1.07]"
            alt="Clock icon"
          />
        </div>
        <div className="flex flex-col mt-1 text-center max-md:max-w-full">
          <div className="max-md:mr-0.5 max-md:max-w-full">
            <span className="text-[#ACACAC]">
              Visit our showroom in 1234 Street Adress City Address, 1234
            </span>{" "}
            Contact Us
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/412b8bf4e091415e1b80f6f19ef50c432c93c9f4914bef9ea6ea1e42ae365b7d"
            className="object-contain self-end aspect-[34.48] w-[69px]"
            alt="Decoration"
          />
        </div>
        <div className="flex gap-2 text-center">
          <div className="grow">Call Us: (00) 1234 5678</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/e265278f4666b6dbdce9648e208b77e39987753061fa4abd49fdc04f14d6bdfe"
            className="object-contain shrink-0 w-5 aspect-square"
            alt="Social icon 1"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/a06191b25c18e23bb1d74a10012efbc95fbee66dd214a4237119cb0d34eb0237"
            className="object-contain shrink-0 w-5 aspect-square"
            alt="Social icon 2"
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
