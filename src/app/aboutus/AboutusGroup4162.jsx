import { Heading, Img } from "../../components";
import React from "react";

export default function AboutusGroup4162() {
  return (
    <div className="self-stretch">
      <div className="flex items-center justify-center gap-[46px] bg-white-a700 px-14 md:flex-col md:px-5 sm:px-4">
        <Img
          src="img_rectangle_13.png"
          width={870}
          height={680}
          alt="Rectangle 13"
          className="h-[680px] w-[48%] object-contain md:w-full"
        />
        <div className="flex w-[36%] flex-col gap-[30px] md:w-full">
          <div className="flex items-start gap-6 sm:flex-col">
            <Img src="img_close_color_3_50x50.svg" width={50} height={50} alt="Close" className="h-[50px] sm:w-full" />
            <Heading
              size="text8xl"
              as="h2"
              className="w-[74%] self-center text-[44px] font-medium leading-[58px] lg:text-[37px] md:text-[28px] sm:w-full sm:text-[22px]"
            >
              The Highest Quality of Products
            </Heading>
          </div>
          <Heading
            size="text4xl"
            as="h3"
            className="w-[86%] text-[18px] font-light leading-[26px] lg:w-full lg:text-[15px] md:w-full"
          >
            We guarantee the highest quality of the products we sell. Several decades of successful operation and
            millions of happy customers let us feel certain about that. Besides, all items we sell pass thorough quality
            control, so no characteristics mismatch can escape the eye of our professionals.
          </Heading>
        </div>
      </div>
    </div>
  );
}
