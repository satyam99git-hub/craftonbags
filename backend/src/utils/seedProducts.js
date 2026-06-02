import Product from "../models/Product.model.js";

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();

    if (count > 0) {
      console.log("Products already exist");
      return;
    }

    await Product.insertMany([
      {
        title: "Luxury Backpack Pro",
        slug: "luxury-backpack-pro",
        category: "luxury-backpacks",
        description: "Premium travel backpack",
        price: 1999,
        stock: 10,
        images: [
          { url: "https://images.unsplash.com/photo-1", alt: "bag" }
        ],
        ratingsAverage: 4.5,
        isFeatured: true,
      },
      {
        title: "Leather Travel Tote",
        slug: "leather-travel-tote",
        category: "leather-totes",
        description: "Elegant leather tote bag",
        price: 2499,
        stock: 5,
        images: [
          { url: "https://images.unsplash.com/photo-2", alt: "tote" }
        ],
        ratingsAverage: 4.2,
        isFeatured: true,
      },
      {
        title: "Premium Travel Duffle",
        slug: "premium-travel-duffle",
        category: "travel-duffles",
        description: "Durable duffle bag for trips",
        price: 2999,
        stock: 8,
        images: [
          { url: "https://images.unsplash.com/photo-3", alt: "duffle" }
        ],
        ratingsAverage: 4.7,
        isFeatured: false,
      }
    ]);

    console.log("✅ Products seeded successfully");
  } catch (err) {
    console.error("Seed error:", err);
  }
};

export default seedProducts;