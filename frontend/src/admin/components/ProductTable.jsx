import React from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

const ProductTable = ({
  products,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">

      <table className="w-full">

        <thead className="bg-zinc-100">

          <tr className="text-left text-sm text-zinc-600">

            <th className="px-6 py-4">
              Product
            </th>

            <th className="px-6 py-4">
              Category
            </th>

            <th className="px-6 py-4">
              Price
            </th>

            <th className="px-6 py-4">
              Stock
            </th>

            <th className="px-6 py-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-zinc-200"
            >

              <td className="flex items-center gap-4 px-6 py-4">

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-bold">
                    {product.title}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {product.slug}
                  </p>

                </div>

              </td>

              <td className="px-6 py-4">
                {product.category}
              </td>

              <td className="px-6 py-4">
                ₹{product.price}
              </td>

              <td className="px-6 py-4">
                {product.stock}
              </td>

              <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                  <button className="rounded-xl bg-zinc-100 p-2 transition hover:bg-zinc-200">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100">
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;