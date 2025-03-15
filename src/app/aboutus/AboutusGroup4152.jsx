import { Img, Heading } from "../../components";
import React from "react";

export default function AboutusGroup4152() {
  return (
    <div className="self-stretch">
      <div className="flex justify-center bg-color___8 py-[68px] lg:py-8 md:py-5 sm:py-4">
        <div className="container-xs flex justify-center px-14 lg:px-5 md:px-5">
          <div className="flex w-[88%] items-center justify-center lg:w-full md:w-full md:flex-col">
            <div className="flex w-[60%] flex-col gap-[30px] md:w-full">
              <div className="flex items-start gap-6 sm:flex-col">
                <Img src="img_group_176.svg" width={50} height={50} alt="Group 176" className="h-[50px] sm:w-full" />
                <Heading
                  size="text8xl"
                  as="h2"
                  className="w-[70%] self-center text-[44px] font-medium leading-[58px] !text-white-a700 lg:text-[37px] md:text-[28px] sm:w-full sm:text-[22px]"
                >
                  We Deliver to Any Regions
                </Heading>
              </div>
              <Heading
                size="text4xl"
                as="h3"
                className="w-[82%] text-[18px] font-light leading-[26px] !text-white-a700 lg:w-full lg:text-[15px] md:w-full"
              >
                We deliver our goods all across Australia. No matter where you live, your order will be shipped in time
                and delivered right to your door or to any other location you have stated. The packages are handled with
                utmost care, so the ordered products will be handed to you safe and sound, just like you expect them to
                be.
              </Heading>
            </div>
            <Img
              src="img_mask_group_gray_400_01.png"
              width={408}
              height={542}
              alt="Mask Group"
              className="h-[542px] w-[34%] object-contain md:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
