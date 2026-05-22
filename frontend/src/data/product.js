const products = {
  PROFESSIONAL: [
    {
      id: 1,
      slug: "premium-commuter-backpack",
      title: "The Premium Commuter Backpack",
      category: "Backpacks",

      price: 129,
      originalPrice: 159,

      rating: 4.9,
      reviews: 124,

      tag: "Bestseller",

      volume: "32L",

      image:
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80",

      images: [
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80",

        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1200",

        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
      ],

      description:
        "Premium commuter backpack crafted for professionals, creators, and modern travel lifestyle.",

      specifications: {
        material: "Water Resistant Polyester",
        capacity: "32L",
        laptopSize: "15.6 inch",
        dimensions: "48 x 32 x 18 cm",
        weight: "780g",
      },

      features: [
        "USB charging support",
        "Anti-theft pocket",
        "Water resistant exterior",
        "Breathable back padding",
      ],

      stock: 18,
      featured: true,
    },

    {
      id: 2,
      slug: "weekender-aviator-duffel",
      title: "Weekender Aviator Duffel Bag",
      category: "Travel Bags",

      price: 185,
      originalPrice: 220,

      rating: 4.8,
      reviews: 92,

      tag: "New",

      volume: "45L",

      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",

      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",

        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200",

        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200",
      ],

      description:
        "Luxury duffel bag engineered for weekend escapes, airport travel, and modern utility.",

      specifications: {
        material: "Premium Canvas",
        capacity: "45L",
        dimensions: "55 x 30 x 28 cm",
        weight: "1.2kg",
      },

      features: [
        "Large travel compartment",
        "Premium shoulder strap",
        "Separate shoe section",
        "Scratch-resistant finish",
      ],

      stock: 9,
      featured: true,
    },
  ],

  COLLEGE: [
    {
      id: 3,
      slug: "classic-over-shoulder-tote",
      title: "Classic Over-the-Shoulder Tote",
      category: "Totes",

      price: 145,
      originalPrice: 170,

      rating: 5.0,
      reviews: 67,

      tag: "Limited",

      volume: "28L",

      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",

      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",

        "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=1200",

        "https://images.unsplash.com/photo-1575844611586-37ce334f669f?q=80&w=1200",
      ],

      description:
        "Elegant tote bag combining luxury aesthetics with practical everyday carry.",

      specifications: {
        material: "Vegan Leather",
        capacity: "28L",
        dimensions: "42 x 16 x 36 cm",
        weight: "620g",
      },

      features: [
        "Minimal silhouette",
        "Magnetic closure",
        "Laptop compatible",
        "Soft premium straps",
      ],

      stock: 14,
      featured: true,
    },

    {
      id: 4,
      slug: "minimalist-city-crossbody",
      title: "Minimalist City Crossbody Pack",
      category: "Travel Bags",

      price: 78,
      originalPrice: 95,

      rating: 4.7,
      reviews: 43,

      tag: null,

      volume: "18L",

      image:
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",

      images: [
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",

        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000",

        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
      ],

      description:
        "Compact and lightweight sling crafted for urban commute and daily essentials.",

      specifications: {
        material: "Polyester",
        capacity: "18L",
        dimensions: "28 x 12 x 22 cm",
        weight: "340g",
      },

      features: [
        "Quick-access front pocket",
        "Adjustable crossbody strap",
        "Minimalist urban design",
        "Lightweight carry",
      ],

      stock: 24,
      featured: false,
    },
  ],
   productsFeatured : [
  {
    id: 1,
    name: "Valor NXT Black",
    category: "Backpacks",

    featured: true,
    rating: 4.9,
    tag: "Bestseller",

    price: 3779,
    originalPrice: 4000,

    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200",
    ],

    description:
      "Premium laptop backpack designed for professionals and travelers.",
  },

  {
    id: 2,
    name: "Urban Voyager",
    category: "Travel Bags",

    featured: true,
    rating: 4.8,
    tag: "New",

    price: 2999,
    originalPrice: 3499,

    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200",
    ],

    description:
      "Modern travel backpack with spacious compartments.",
  },

  {
    id: 3,
    name: "Classic Leather Tote",
    category: "Totes",

    featured: true,
    rating: 5.0,
    tag: "Limited",

    price: 4599,
    originalPrice: 5200,

    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200",
    ],

    description:
      "Elegant handcrafted tote bag for everyday fashion.",
  },

  {
    id: 4,
    name: "Nomad Daily",
    category: "Backpacks",

    featured: true,
    rating: 4.7,

    price: 2599,
    originalPrice: 3100,

    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200",
    ],

    description:
      "Minimal and lightweight backpack for daily commuting.",
  },
]
};

export default products;
