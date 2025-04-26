import { useState, useEffect } from "react";
import React from "react";

const ProductGallery = ({ item }) => {
  // Sử dụng state để lưu trữ ảnh đã chọn
  const [selectedImage, setSelectedImage] = useState("/Placeholder1.png");
  const [thumbnails, setThumbnails] = useState([{ url: "/Placeholder1.png", alt: "Placeholder" }]);

  // Sử dụng useEffect để cập nhật state khi prop item thay đổi
  useEffect(() => {
    if (item && item.imageUrls && item.imageUrls.length > 0) {
      // Cập nhật ảnh đã chọn
      setSelectedImage(item.imageUrls[0].downloadUrl);
      
      // Cập nhật danh sách thumbnails
      const newThumbnails = item.imageUrls.map((image, index) => ({
        url: image.downloadUrl,
        alt: `${item.title || 'Product'} - Ảnh ${index + 1}`
      }));
      setThumbnails(newThumbnails);
    }
  }, [item]); // Chạy lại effect khi item thay đổi

  return (
    <div className="w-[420px] max-md:w-full">
      <div>
        <img
          src={selectedImage}
          alt={item?.title || "Product Image"}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex gap-2.5 mt-5 overflow-x-auto">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(thumb.url)}
            className={`w-20 h-20 cursor-pointer ${selectedImage === thumb.url ? 'border-2 border-blue-600' : ''}`}
          >
            <img 
              src={thumb.url} 
              alt={thumb.alt} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;