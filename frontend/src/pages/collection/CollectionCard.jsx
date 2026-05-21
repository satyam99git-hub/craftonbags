import React from "react";

const CollectionCard = ({
  title,
  image,
}) => {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-zinc-900">
          {title}
        </h3>

        <button className="mt-4 text-sm font-medium text-black hover:underline">
          Explore Collection →
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;