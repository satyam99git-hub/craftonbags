import React, { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200",
  "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1200",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
];

const ProductGallery = () => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex gap-4">

      <div className="flex flex-col gap-3">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActiveImage(img)}
            className={`overflow-hidden rounded-xl border-2 ${
              activeImage === img
                ? "border-black"
                : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt=""
              className="h-24 w-24 object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden rounded-3xl bg-white p-8">
        <img
          src={activeImage}
          alt=""
          className="h-[600px] w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;