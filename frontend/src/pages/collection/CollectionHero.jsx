import React from "react";

const CollectionHero = () => {
  return (
    <section className="relative h-[420px] overflow-hidden">
      
      <img
        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop"
        alt="Collection Banner"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        
        <p className="mb-3 text-sm uppercase tracking-[0.3em]">
          Premium Collection
        </p>

        <h1 className="text-5xl font-bold lg:text-6xl">
          Crafted For Modern Travel
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-200">
          Discover timeless handcrafted bags designed for style,
          comfort, and performance.
        </p>
      </div>
    </section>
  );
};

export default CollectionHero;