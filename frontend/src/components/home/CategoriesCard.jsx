import React, { useState } from "react";

const CategoryCard = ({
  title,
  image,
  bgColor = "bg-zinc-100", // Default baseline backup if class is omitted
}) => {
  // Graceful fallback image state logic for broken asset URLs
  const [imageSrc, setImageSrc] = useState(image);
  const fallbackPlaceholder = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop";

  return (
    <div
      className={`group relative h-[300px] w-full overflow-hidden rounded-3xl ${bgColor} cursor-pointer shadow-sm border border-zinc-100/50`}
    >
      {/* Image Asset Element with Error Fallback Fallthrough */}
      <img
        src={imageSrc}
        alt={title || "Product category collection item"}
        onError={() => setImageSrc(fallbackPlaceholder)}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy" // Optimizes initial page loading performance
      />

      {/* Industrial Dark Contrast Vignette Overlay Matrix */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />

      {/* Dynamic Title Overlay Container */}
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-sm line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;