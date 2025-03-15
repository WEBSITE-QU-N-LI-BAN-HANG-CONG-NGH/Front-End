import { Heading } from "../../components";
import HomeOneFrame35 from "../../components/HomeOneFrame35";
import React, { Suspense } from "react";

const data = [
  {
    image29: "img_image_29_150x224.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_27.png",
    ifYouVeRecently:
      "As a gamer, superior sound counts for a lot. You need to hear enemies tiptoeing up behind you for a sneak attack or a slight change in the atmospheric music signaling a new challenge or task...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_28.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_29.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_30.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_31.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_32.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_33.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
  {
    image29: "img_image_29_34.png",
    ifYouVeRecently:
      "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
    p01092020: "01.09.2020",
  },
];

export default function HomepageGroup4553() {
  return (
    <div className="mt-[42px] flex flex-col items-center self-stretch">
      <div className="container-xs flex flex-col items-start gap-5 lg:px-5 md:px-5">
        <Heading size="heading5xl" as="h5" className="ml-2 text-[22px] font-semibold lg:text-[18px] md:ml-0">
          Follow us on Instagram for News, Offers & More
        </Heading>
        <div className="grid grid-cols-6 gap-2 self-stretch lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1">
          <Suspense fallback={<div>Loading feed...</div>}>
            {data.map((d, index) => (
              <HomeOneFrame35 {...d} key={"group4397" + index} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
