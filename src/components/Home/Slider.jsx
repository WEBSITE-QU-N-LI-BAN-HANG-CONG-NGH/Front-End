import React, { useState, useEffect } from "react";

const Slider = () => {
  const images = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/de1a1c17200c70f4d94462b7b1268d15ce0023ba49faac1b3a8643192436aeb4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/de1a1c17200c70f4d94462b7b1268d15ce0023ba49faac1b3a8643192436aeb4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088", // Replace with your own image
    "https://cdn.builder.io/api/v1/image/assets/TEMP/de1a1c17200c70f4d94462b7b1268d15ce0023ba49faac1b3a8643192436aeb4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088", // Replace with your own image
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slides every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-[1398px] aspect-[4.26] overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`object-contain w-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0 absolute"
          }`}
        />
      ))}
    </div>
  );
};

export default Slider;
