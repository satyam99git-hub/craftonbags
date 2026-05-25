import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({
  title,
  image,
  bgColor = "bg-zinc-100",
}) => {
  const [imageSrc, setImageSrc] = useState(image);
  const navigate = useNavigate();
  const fallbackPlaceholder = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600";

  // Create clean URL parameters dynamically from titles
  const handleCategoryClick = () => {
    const slug = title.toLowerCase().replace(/ /g, "-");
    navigate(`/shop/${slug}`);
  };

  return (
    <div
      onClick={handleCategoryClick}
      className={`group relative h-[280px] sm:h-[300px] md:h-[320px] w-full overflow-hidden rounded-3xl ${bgColor} cursor-pointer 
      border border-zinc-100/50 shadow-sm 
      transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
      hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-300/40`}
    >
      <img
        src={imageSrc}
        alt={title || "Product collection item"}
        onError={() => setImageSrc(fallbackPlaceholder)}
        className="h-full w-full object-cover 
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
        group-hover:scale-110 group-hover:rotate-1"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-sm 
        transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
        group-hover:-translate-y-1 line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;