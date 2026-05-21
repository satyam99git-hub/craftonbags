import React from "react";
import CategoryCard from "./CategoriesCard";

const categories = [
  {
    title: "Luxury Backpacks",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600",
    bgColor: "bg-amber-100"
  },
  {
    title: "Leather Totes",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600",
    bgColor: "bg-emerald-100"
  },
  {
    title: "Travel Duffle Bags",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600", 
    bgColor: "bg-blue-100"
  },
  {
    title: "Crossbody Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600",
    bgColor: "bg-rose-100"
  },
  {
    title: "Minimalist Wallets",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600",
    bgColor: "bg-stone-100"
  }
];

const Categories = () => {
  return (
    <section className="px-6 py-14 lg:px-16 max-w-7xl mx-auto">
      
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
          Shop By Category
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Explore premium travel and lifestyle collections designed for modern utility.
        </p>
      </div>

      {/* Smooth fluid layout responsive scaling engine track wrapper mapping */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
            bgColor={category.bgColor}
          />
        ))}
      </div>
      
    </section>
  );
};

export default Categories;