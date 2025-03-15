import { Button, Img, Heading, Text } from "../../components";
import React from "react";

export default function ProductdetailsGroup4291() {
  return (
    <div className="mt-[26px] flex flex-col items-center gap-6">
      <div className="container-xs lg:px-5 md:px-5">
        <div className="flex items-center md:flex-col">
          <div className="mb-2.5 flex w-[38%] justify-center self-end px-2 md:w-full">
            <div className="flex w-full items-center gap-[31px]">
              <div className="flex w-[36%] flex-col items-end">
                <Heading as="h1" className="text-[14px] font-semibold">
                  Details
                </Heading>
                <div className="relative mt-[-20px] flex flex-col items-start self-stretch">
                  <Heading as="h2" className="text-[14px] font-semibold !text-color___11">
                    About Product
                  </Heading>
                  <div className="h-[2px] w-[26%] self-end bg-color___3" />
                </div>
              </div>
              <Heading as="h3" className="text-[14px] font-semibold !text-color___11">
                Specs
              </Heading>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
            <Text size="textxl" as="p" className="text-[14px] font-normal">
              <span>On Sale from&nbsp;</span>
              <span className="font-semibold">$3,299.00</span>
            </Text>
            <div className="flex w-[48%] justify-center sm:w-full sm:flex-col">
              <div className="flex w-[18%] items-center justify-center gap-4 rounded-md bg-color___1 p-2 sm:w-full">
                <Heading size="headinglg" as="h4" className="text-[13px] font-semibold">
                  1
                </Heading>
                <div className="flex-1">
                  <Img
                    src="img_frame_98_color_5_1.svg"
                    width={16}
                    height={16}
                    alt="Frame 98"
                    className="h-[16px] w-full"
                  />
                  <Img
                    src="img_frame_97_color_5_1.svg"
                    width={16}
                    height={16}
                    alt="Frame 97"
                    className="h-[16px] w-full"
                  />
                </div>
              </div>
              <Button
                size="4xl"
                variant="fill"
                className="ml-5 min-w-[150px] rounded-[24px] px-[34px] font-semibold sm:ml-0 sm:px-4"
              >
                Add to Cart
              </Button>
              <Button size="3xl" variant="fill" className="ml-3 w-[140px] rounded-[24px] px-4 sm:ml-0">
                <Img src="img_frame_159.svg" width={72} height={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-full self-stretch bg-black-900_33" />
    </div>
  );
}
