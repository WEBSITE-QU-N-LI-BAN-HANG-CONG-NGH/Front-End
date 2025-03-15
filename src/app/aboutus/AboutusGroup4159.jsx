import { Img, Heading } from "../../components";
import React from "react";

export default function AboutusGroup4159() {
  return (
    <div className="self-stretch">
      <div className="flex justify-center bg-color___8 py-14 md:py-5 sm:py-4">
        <div className="container-xs mt-5 flex justify-center px-14 lg:px-5 md:px-5">
          <div className="flex w-[88%] items-center justify-center lg:w-full md:w-full md:flex-col">
            <div className="flex w-[58%] flex-col gap-[30px] md:w-full">
              <div className="flex items-start gap-6 sm:flex-col">
                <Img
                  src="img_favorite_color_3.svg"
                  width={50}
                  height={50}
                  alt="Favorite"
                  className="h-[50px] sm:w-full"
                />
                <Heading
                  size="text8xl"
                  as="h2"
                  className="w-[72%] self-center text-[44px] font-medium leading-[58px] !text-white-a700 lg:text-[37px] md:text-[28px] sm:w-full sm:text-[22px]"
                >
                  <>
                    Now You&#39;re In Safe
                    <br />
                    Hands
                  </>
                </Heading>
              </div>
              <Heading
                size="text4xl"
                as="h3"
                className="w-[84%] text-[18px] font-light leading-[26px] !text-white-a700 lg:w-full lg:text-[15px] md:w-full"
              >
                <>
                  Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel®
                  Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.
                  <br />
                  <br />
                  *Performance compared to i7-9700. Specs varies by model.
                </>
              </Heading>
            </div>
            <Img
              src="img_mask_group.png"
              width={448}
              height={544}
              alt="Mask Group"
              className="h-[544px] w-[38%] object-contain md:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
