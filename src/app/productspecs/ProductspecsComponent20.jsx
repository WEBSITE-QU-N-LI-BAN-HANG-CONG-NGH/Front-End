"use client";

import { Img, Heading, Text } from "../../components";
import React from "react";
import {
  AccordionItemPanel,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  Accordion,
  AccordionItem,
} from "react-accessible-accordion";

const accordionData = [
  { productSupport2: "Product Support", data2: "→" },
  { productSupport2: "FAQ", data2: "→" },
  { productSupport2: "Our Buyer Guide", data2: "→" },
];

export default function ProductspecsComponent20() {
  return (
    <div className="relative h-[406px]">
      <div className="absolute bottom-0 left-0 top-0 my-auto mr-[154px] flex h-max flex-1 justify-end bg-color___1 lg:mr-0 md:mr-0">
        <div className="container-xs flex justify-center px-14 lg:px-5 md:px-5">
          <div className="flex w-[68%] items-center justify-center lg:w-full md:w-full md:flex-col">
            <Accordion className="relative z-[1] flex w-[34%] flex-col gap-5 md:w-full">
              {accordionData.map((d, i) => (
                <AccordionItem uuid={i} key={`Group 36${i}`}>
                  <AccordionItemHeading className="w-full">
                    <AccordionItemButton>
                      <AccordionItemState>
                        {(props) => (
                          <>
                            <div className="ml-1.5 flex flex-1 flex-wrap items-center justify-between gap-5 rounded-md border border-solid border-color___6-1 bg-white-a700 px-[22px] py-3 md:ml-0 sm:px-4">
                              <Text
                                size="text3xl"
                                as="p"
                                className="ml-1 self-end text-[16px] font-medium !text-blue_gray-900 lg:ml-0 lg:text-[13px] md:ml-0"
                              >
                                {d.productSupport2}
                              </Text>
                              <Heading
                                size="text4xl"
                                as="h2"
                                className="text-[18px] font-medium !text-color___3 lg:text-[15px]"
                              >
                                {d.data2}
                              </Heading>
                            </div>
                          </>
                        )}
                      </AccordionItemState>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div>Dummy Content</div>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Img
              src="img_image_22.png"
              width={656}
              height={406}
              alt="Image 22"
              className="relative ml-[-132px] h-[406px] w-[64%] object-contain md:ml-0 md:w-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-px top-0 my-auto h-[406px] w-[32%] bg-gradient1" />
    </div>
  );
}
