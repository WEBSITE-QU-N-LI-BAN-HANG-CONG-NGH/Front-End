import { Heading, Img } from "../../components";
import React from "react";

export default function AboutusGroup4165() {
  return (
    <div className="mt-5 self-stretch">
      <div>
        <div className="flex justify-center bg-color___8 py-24 lg:py-8 md:py-5 sm:py-4">
          <div className="container-xs flex justify-center px-14 lg:px-5 md:px-5">
            <div className="flex w-[90%] items-center justify-center lg:w-full md:w-full md:flex-col">
              <div className="flex flex-1 flex-col items-start gap-[30px] md:self-stretch">
                <Heading
                  size="text8xl"
                  as="h2"
                  className="w-[68%] text-[44px] font-medium leading-[58px] !text-white-a700 lg:w-full lg:text-[37px] md:w-full md:text-[28px] sm:text-[22px]"
                >
                  A Family That Keeps On Growing
                </Heading>
                <Heading
                  size="text4xl"
                  as="h3"
                  className="w-[82%] text-[18px] font-light leading-[26px] !text-white-a700 lg:w-full lg:text-[15px] md:w-full"
                >
                  <>
                    We always aim to please the home market, supplying great computers and hardware at great prices to
                    non-corporate customers, through our large Melbourne CBD showroom and our online store.
                    <br />
                    <br />
                    Shop management approach fosters a strong customer service focus in our staff. We prefer to
                    cultivate long-term client relationships rather than achieve quick sales, demonstrated in the
                    measure of our long-term success.
                  </>
                </Heading>
              </div>
              <Img
                src="img_rectangle_54.png"
                width={470}
                height={488}
                alt="Rectangle 54"
                className="h-[488px] w-[40%] object-contain md:w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center bg-white-a700 px-14 py-[62px] lg:py-8 md:p-5 sm:p-4">
          <div className="flex w-[80%] items-center justify-between gap-5 lg:w-full md:w-full md:flex-col">
            <Img
              src="img_rectangle_11_556x776.png"
              width={776}
              height={556}
              alt="Rectangle 11"
              className="h-[556px] w-[52%] object-contain md:w-full"
            />
            <div className="flex w-[40%] flex-col gap-[18px] md:w-full">
              <div className="flex items-start gap-[19px]">
                <div className="flex w-[10%] flex-col items-center">
                  <Img
                    src="img_logo_white_a700.svg"
                    width={60}
                    height={50}
                    alt="Logo"
                    className="relative z-[1] h-[50px] w-full lg:h-auto md:h-auto"
                  />
                  <div className="relative ml-1 mr-1.5 mt-[-50px] h-[50px] w-[50px] rotate-[-180deg] rounded-br-[24px] rounded-tl-[24px] rounded-tr-[24px] bg-color___3 md:mx-0" />
                </div>
                <Heading
                  size="text8xl"
                  as="h2"
                  className="self-center text-[44px] font-medium lg:text-[37px] md:text-[28px] sm:text-[22px]"
                >
                  Shop.com
                </Heading>
              </div>
              <Heading
                size="text4xl"
                as="h3"
                className="ml-1 w-[94%] text-[18px] font-light leading-[26px] lg:w-full lg:text-[15px] md:ml-0 md:w-full"
              >
                Shop.com is a proudly Australian owned, Melbourne based supplier of I.T. goods and services, operating
                since 1991. Our client base encompasses individuals, small business, corporate and government
                organisations. We provide complete business IT solutions, centred on high quality hardware and
                exceptional customer service.
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
