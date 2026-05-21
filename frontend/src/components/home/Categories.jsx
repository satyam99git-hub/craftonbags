// Renders featured shopping categories on the homepage.
import React from "react";
import CategoryCard from "./CategoriesCard"; // Double-check if your filename is CategoriesCard.jsx or CategoryCard.jsx

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
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop", // Replaced with a placeholder or custom asset
    bgColor: "bg-blue-100"
  },
  {
    title: "Crossbody Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
    bgColor: "bg-rose-100"
  },
  {
    title: "Minimalist Wallets",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
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
          Explore premium travel and lifestyle collections designed for utility.
        </p>
      </div>

      {/* Fully balanced layout structure mapping 5 continuous items across 5 responsive screen spaces */}
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