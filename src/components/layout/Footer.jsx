import React from "react";

function Footer() {
  const footerSections = {
    information: [
      "About Us",
      "About Zip",
      "Privacy Policy",
      "Search",
      "Terms",
      "Orders and Returns",
      "Contact Us",
      "Advanced Search",
      "Newsletter Subscription",
    ],
    pcParts: [
      "CPUS",
      "Add On Cards",
      "Hard Drives (Internal)",
      "Graphic Cards",
      "Keyboards / Mice",
      "Cases / Power Supplies / Cooling",
      "RAM (Memory)",
      "Software",
      "Speakers / Headsets",
      "Motherboards",
    ],
    desktopPCs: [
      "Custom PCs",
      "Servers",
      "MSI All-In-One PCs",
      "HP/Compaq PCs",
      "ASUS PCs",
      "Tecs PCs",
    ],
    laptops: [
      "Evryday Use Notebooks",
      "MSI Workstation Series",
      "MSI Prestige Series",
      "Tablets and Pads",
      "Netbooks",
      "Infinity Gaming Notebooks",
    ],
  };

  return (
    <div className="flex flex-col items-center px-20 pt-12 pb-4 w-full bg-black max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1400px] max-md:max-w-full">
        <div className="flex gap-10 items-start mt-10 w-full text-sm font-light leading-5 text-white max-w-[1335px] max-md:mt-10 max-md:max-w-full">
          <div>
            <h3 className="font-bold leading-[14px]">Information</h3>
            <ul className="mt-6">
              {footerSections.information.map((item, index) => (
                <li key={index} className="text-[13px] leading-[18px] mt-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold leading-[14px]">PC Parts</h3>
            <ul className="mt-6">
              {footerSections.pcParts.map((item, index) => (
                <li key={index} className="text-[13px] leading-[18px] mt-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold leading-[14px]">Desktop PCs</h3>
            <ul className="mt-6">
              {footerSections.desktopPCs.map((item, index) => (
                <li key={index} className="text-[13px] leading-[18px] mt-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold leading-[14px]">Laptops</h3>
            <ul className="mt-6">
              {footerSections.laptops.map((item, index) => (
                <li key={index} className="text-[13px] leading-[18px] mt-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grow shrink w-[277px]">
            <h3 className="font-bold leading-[14px]">Address</h3>
            <div className="mt-6 text-[13px] leading-[18px]">
              <p>Address: 1234 Street Adress City Address, 1234</p>
              <p>
                Phones: <span className="text-[#01A4FF]">(00) 1234 5678</span>
              </p>
              <p>We are open: Monday-Thursday: 9:00 AM - 5:30 PM</p>
              <p>Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 11:00 AM - 5:00 PM</p>
              <p>
                E-mail: <span className="text-[#01A4FF]">shop@email.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 mt-9 w-full h-px bg-white" />

        <div className="flex flex-wrap gap-5 justify-between mt-4 w-full max-md:max-w-full">
          <div className="flex gap-3">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/9333beaebd023e1729bccfea601f88c443c12b1c17dbb3e15398e3a348668865"
              className="object-contain shrink-0 aspect-square w-[22px]"
              alt="Social icon 1"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/3ad488784c9d908234cbfcbecd8ba6e4ae2281b858a81476118a9d8acb01d1dc"
              className="object-contain shrink-0 aspect-square w-[22px]"
              alt="Social icon 2"
            />
          </div>
          <div className="flex flex-wrap gap-10 text-xs font-medium leading-none text-right text-white max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/911f093b5873d3993151c95e4759b33b3ae684c0c342f92e18a0fcac3795cdf2"
              className="object-contain shrink-0 w-52 max-w-full aspect-[9.43]"
              alt="Payment methods"
            />
            <div className="my-auto">Copyright © 2020 Shop Pty. Ltd.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
