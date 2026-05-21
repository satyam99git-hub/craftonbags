import React from "react";

import CollectionCard from "./CollectionCard";

const collections = [
  {
    title: "Luxury Travel Bags",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Business Backpacks",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Weekend Duffles",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Minimal Laptop Bags",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
  },
];

const CollectionGrid = () => {
  return (
    <section className="px-6 py-14 lg:px-16">
      
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-zinc-900">
          Featured Collections
        </h2>

        <p className="mt-2 text-zinc-500">
          Explore curated collections tailored for every journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        
        {collections.map((item) => (
          <CollectionCard
            key={item.title}
            title={item.title}
            image={item.image}
          />
        ))}

      </div>
    </section>
  );
};

export default CollectionGrid;