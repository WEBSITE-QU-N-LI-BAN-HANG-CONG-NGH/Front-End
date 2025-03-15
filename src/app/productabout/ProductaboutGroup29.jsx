import { Heading, Img } from "../../components";
import React from "react";

export default function ProductaboutGroup29() {
  return (
    <div className="relative h-[680px] content-center lg:h-auto md:h-auto">
      <Img
        src="img_rectangle_11_680x962.png"
        width={962}
        height={680}
        alt="Rectangle 11"
        className="ml-auto mr-[278px] h-[680px] w-[58%] object-contain lg:mr-0 md:mr-0"
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 justify-between gap-5 md:relative md:flex-col">
        <div className="flex w-[58%] flex-col items-end bg-gradient3 py-[54px] pl-14 pr-[262px] lg:pr-8 md:w-full md:p-5 sm:px-5 sm:py-4">
          <Heading
            size="text8xl"
            as="h2"
            className="mr-7 mt-[110px] w-[58%] text-[44px] font-medium leading-[58px] !text-white-a700 lg:w-full lg:text-[37px] md:mr-0 md:w-full md:text-[28px] sm:text-[22px]"
          >
            Outplay the Competittion
          </Heading>
          <Heading
            size="text4xl"
            as="h3"
            className="mr-[58px] mt-[58px] w-[56%] text-[18px] font-light leading-[26px] !text-white-a700 lg:w-full lg:text-[15px] md:mr-0 md:w-full"
          >
            <>
              Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™
              i7 processor with the upmost computing power to bring you an unparalleled gaming experience.
              <br />
              <br />
              *Performance compared to i7-9700. Specs varies by model.
            </>
          </Heading>
          <div className="mt-[106px] flex w-[74%] gap-[11px] lg:w-full md:w-full">
            <div className="h-[10px] w-[10px] rounded-[5px] bg-color___3" />
            <div className="h-[10px] w-[10px] rounded-[5px] bg-white-a700" />
            <div className="h-[10px] w-[10px] rounded-[5px] bg-white-a700" />
          </div>
        </div>
        <div className="h-[680px] w-[26%] rotate-[-180deg] bg-gradient3 md:px-5" />
      </div>
    </div>
  );
}
