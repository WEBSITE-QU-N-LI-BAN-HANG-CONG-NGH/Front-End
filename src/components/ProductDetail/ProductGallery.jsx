"use client";
import { useState } from "react";
import React from "react";

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn.builder.io/api/v1/image/assets/TEMP/e2f7d537ede4a5fde21f5bd0173838fef0902d55",
  );

  const thumbnails = [
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2f7d537ede4a5fde21f5bd0173838fef0902d55",
      alt: "Thumbnail 1",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d9ba25f121bda0f2088c0049a2c34793d96869f",
      alt: "Thumbnail 2",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/164f84db069bfd14b27a15fa2a3edd8622d1ed0c",
      alt: "Thumbnail 3",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f68096aee92ddb16e5916c78fdc6fbccb41469f",
      alt: "Thumbnail 4",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/2cb1591b85c48d1f78fff2ca5b54dc44fbe4603c",
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
