import React from "react";

const ProductForm = () => {
  return (
    <form className="grid gap-5 rounded-3xl bg-white p-8 shadow-sm">

      <input
        type="text"
        placeholder="Product Title"
        className="rounded-2xl border border-zinc-300 px-5 py-4 outline-none focus:border-black"
      />

      <input
        type="text"
        placeholder="Category"
        className="rounded-2xl border border-zinc-300 px-5 py-4 outline-none focus:border-black"
      />

      <input
        type="number"
        placeholder="Price"
        className="rounded-2xl border border-zinc-300 px-5 py-4 outline-none focus:border-black"
      />

      <input
        type="text"
        placeholder="Image URL"
        className="rounded-2xl border border-zinc-300 px-5 py-4 outline-none focus:border-black"
      />

      <textarea
        rows="5"
        placeholder="Description"
        className="rounded-2xl border border-zinc-300 px-5 py-4 outline-none focus:border-black"
      />

      <button
        type="submit"
        className="rounded-2xl bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800"
      >
        Save Product
      </button>

    </form>
  );
};

export default ProductForm;