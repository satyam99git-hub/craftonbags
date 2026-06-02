import Product from "../models/Product.model.js";

import products from "../../../frontend/src/data/product.js";
import schoolProducts from "../../../frontend/src/data/schoolProducts.js";
import luggageProducts from "../../../frontend/src/data/luggageProducts.js";

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();

    const schoolArray = Object.values(schoolProducts).flat();
    const luggageArray = Object.values(luggageProducts).flat();

    const allProducts = [
      ...products,
      ...schoolArray,
      ...luggageArray,
    ];
    console.log(allProducts);
    
    const formattedProducts = allProducts.map((item) => ({
      ...item,

      isFeatured: item.featured || false,
      // Convert stock string to number
      stock:
        typeof item.stock === "string"
          ? item.stock.toLowerCase() === "in stock"
            ? 10
            : 0
          : item.stock || 0,

      ratingsAverage: item.rating || 0,
      ratingsCount: item.reviews || 0,

      images: item.images
        ? item.images.map((img, index) => ({
            url: img,
            alt: `${item.title} ${index + 1}`,
          }))
        : [
            {
              url: item.image,
              alt: item.title,
            },
          ],
    }));

    await Product.bulkWrite(
  formattedProducts.map((product) => ({
    updateOne: {
      filter: { sku: product.sku },
      update: { $set: product },
      upsert: true,
    },
  }))
);

    console.log(
      `✅ ${formattedProducts.length} products seeded successfully`
    );
  } catch (err) {
    console.error("❌ Seed error:", err);
  }
};

export default seedProducts;