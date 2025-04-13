"use client";
import { useState } from "react";
import React from "react";

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState(
    "/Placeholder1.png",
  );

  const thumbnails = [
    {
      url: "/Placeholder1.png",
      alt: "Thumbnail 1",
    },
    {
      url: "/Placeholder1.png",
      alt: "Thumbnail 2",
    },
    {
      url: "/Placeholder1.png",
      alt: "Thumbnail 3",
    },
    {
      url: "/Placeholder1.png",
      alt: "Thumbnail 4",
    },
    {
      url: "/Placeholder1.png",
      alt: "Thumbnail 5",
    },
  ];

  return (
    <div className="w-[420px] max-md:w-full">
      <div>
        <img
          src={selectedImage}
          alt="Laptop Acer Swift"
          className="w-full h-auto"
        />
      </div>
      <div className="flex gap-2.5 mt-5">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(thumb.url)}
            className="w-20 h-auto cursor-pointer"
          >
            <img src={thumb.url} alt={thumb.alt} className="w-full h-auto" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
