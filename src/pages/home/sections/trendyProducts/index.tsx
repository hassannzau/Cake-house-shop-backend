import { useState } from "react";
import ProductCard from "@/assets/components/productCard/productCard";
import style from "./trendyProducts.module.scss";

interface ProductDetails {
  id: number;
  title: string;
  category: string;
  price: number;
  discountedPrice: number;
  rating: number;
  reviews: string;
  description: string;
  sku: string;
  categories: string[];
  tags: string[];
  images: string[];
}

const products: ProductDetails[] = [
  {
    id: 1,
    title: "Lightweight Puffer Jacket With a Hood",
    category: "Men",
    price: 449,
    discountedPrice: 0,
    rating: 4.5,
    reviews: "8k+ reviews",
    description: "Light and warm puffer jacket designed for cold seasons.",
    sku: "N/A",
    categories: ["Casual & Urban Wear", "Jackets", "Men"],
    tags: ["biker", "black", "bomber", "leather"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/puffer1-2.jpg",
      "/images/products/puffer1-3.jpg",
      "/images/products/puffer1-4.jpg",
    ],
  },
  {
    id: 2,
    title: "Oversized Wool Coat",
    category: "Women",
    price: 520,
    discountedPrice: 449,
    rating: 4.8,
    reviews: "12k+ reviews",
    description: "Premium wool blend coat offering style and warmth.",
    sku: "WLC-244",
    categories: ["Women", "Coats", "Winter Wear"],
    tags: ["oversized", "coat", "wool"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/woolcoat2.jpg",
      "/images/products/woolcoat3.jpg",
      "/images/products/woolcoat4.jpg",
    ],
  },
  {
    id: 3,
    title: "Casual Knit Sweater",
    category: "Women",
    price: 189,
    discountedPrice: 149,
    rating: 4.4,
    reviews: "3.4k reviews",
    description: "Soft-touch knit sweater for everyday comfort.",
    sku: "KNIT-SW-11",
    categories: ["Women", "Tops", "Sweaters"],
    tags: ["knit", "casual", "soft"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/sweater2.jpg",
      "/images/products/sweater3.jpg",
    ],
  },
  {
    id: 4,
    title: "Slim Fit Denim Jacket",
    category: "Men",
    price: 259,
    discountedPrice: 219,
    rating: 4.6,
    reviews: "6k+ reviews",
    description: "Classic slim fit denim jacket for street style lovers.",
    sku: "DEN-SLIM-03",
    categories: ["Men", "Jackets", "Denim"],
    tags: ["denim", "slim fit", "street"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/denim2.jpg",
      "/images/products/denim3.jpg",
    ],
  },
  {
    id: 5,
    title: "Premium White Sneakers",
    category: "Men",
    price: 299,
    discountedPrice: 249,
    rating: 4.9,
    reviews: "15k+ reviews",
    description: "Comfortable premium sneakers for all-day wear.",
    sku: "SNK-WH-001",
    categories: ["Men", "Shoes", "Sneakers"],
    tags: ["sneakers", "white", "premium"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/sneakers2.jpg",
      "/images/products/sneakers3.jpg",
      "/images/products/sneakers4.jpg",
    ],
  },
  {
    id: 6,
    title: "Kids Winter Hoodie",
    category: "Kids",
    price: 89,
    discountedPrice: 69,
    rating: 4.7,
    reviews: "4.2k reviews",
    description: "Warm hoodie perfect for winter children activities.",
    sku: "KID-HOOD-77",
    categories: ["Kids", "Hoodies", "Winter Wear"],
    tags: ["hoodie", "kids", "warm"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/kidhood2.jpg",
      "/images/products/kidhood3.jpg",
    ],
  },
  {
    id: 7,
    title: "Elegant Leather Handbag",
    category: "Women",
    price: 350,
    discountedPrice: 289,
    rating: 4.8,
    reviews: "7k+ reviews",
    description: "Premium leather handbag with golden finishing.",
    sku: "BAG-LUX-92",
    categories: ["Women", "Accessories", "Bags"],
    tags: ["leather", "handbag", "elegant"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/bag2.jpg",
      "/images/products/bag3.jpg",
    ],
  },
  {
    id: 8,
    title: "Soft Cotton T-Shirt Pack (3 pcs)",
    category: "Men",
    price: 99,
    discountedPrice: 79,
    rating: 4.5,
    reviews: "9k reviews",
    description: "Breathable cotton T-shirts perfect for everyday use.",
    sku: "TSH-3PACK-10",
    categories: ["Men", "T-Shirts", "Casual"],
    tags: ["cotton", "tshirt", "pack"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/tshirt2.jpg",
      "/images/products/tshirt3.jpg",
    ],
  },
  {
    id: 9,
    title: "Warm Knitted Beanie",
    category: "Unisex",
    price: 49,
    discountedPrice: 35,
    rating: 4.3,
    reviews: "2k reviews",
    description: "Comfortable knitted beanie suitable for all genders.",
    sku: "BEANIE-44",
    categories: ["Accessories", "Winter Wear"],
    tags: ["beanie", "knit", "warm"],
    images: ["https://placehold.co/255x310", "/images/products/beanie2.jpg"],
  },
  {
    id: 10,
    title: "Stylish Oversized Hoodie",
    category: "Unisex",
    price: 159,
    discountedPrice: 129,
    rating: 4.8,
    reviews: "11k+ reviews",
    description: "Trendy oversized hoodie with soft fleece interior.",
    sku: "OVH-55",
    categories: ["Unisex", "Hoodies", "Streetwear"],
    tags: ["oversized", "hoodie", "street"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/hoodie2.jpg",
      "/images/products/hoodie3.jpg",
    ],
  },
];

const newArrivals: ProductDetails[] = [
  {
    id: 1,
    title: "Oversized Wool Coat",
    category: "Women",
    price: 520,
    discountedPrice: 449,
    rating: 4.8,
    reviews: "12k+ reviews",
    description: "Premium wool blend coat offering style and warmth.",
    sku: "WLC-244",
    categories: ["Women", "Coats", "Winter Wear"],
    tags: ["oversized", "coat", "wool"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/woolcoat2.jpg",
      "/images/products/woolcoat3.jpg",
      "/images/products/woolcoat4.jpg",
    ],
  },

  {
    id: 2,
    title: "Premium White Sneakers",
    category: "Men",
    price: 299,
    discountedPrice: 249,
    rating: 4.9,
    reviews: "15k+ reviews",
    description: "Comfortable premium sneakers for all-day wear.",
    sku: "SNK-WH-001",
    categories: ["Men", "Shoes", "Sneakers"],
    tags: ["sneakers", "white", "premium"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/sneakers2.jpg",
      "/images/products/sneakers3.jpg",
      "/images/products/sneakers4.jpg",
    ],
  },
  {
    id: 3,
    title: "Kids Winter Hoodie",
    category: "Kids",
    price: 89,
    discountedPrice: 69,
    rating: 4.7,
    reviews: "4.2k reviews",
    description: "Warm hoodie perfect for winter children activities.",
    sku: "KID-HOOD-77",
    categories: ["Kids", "Hoodies", "Winter Wear"],
    tags: ["hoodie", "kids", "warm"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/kidhood2.jpg",
      "/images/products/kidhood3.jpg",
    ],
  },
  {
    id: 4,
    title: "Elegant Leather Handbag",
    category: "Women",
    price: 350,
    discountedPrice: 289,
    rating: 4.8,
    reviews: "7k+ reviews",
    description: "Premium leather handbag with golden finishing.",
    sku: "BAG-LUX-92",
    categories: ["Women", "Accessories", "Bags"],
    tags: ["leather", "handbag", "elegant"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/bag2.jpg",
      "/images/products/bag3.jpg",
    ],
  },
  {
    id: 5,
    title: "Warm Knitted Beanie",
    category: "Unisex",
    price: 49,
    discountedPrice: 35,
    rating: 4.3,
    reviews: "2k reviews",
    description: "Comfortable knitted beanie suitable for all genders.",
    sku: "BEANIE-44",
    categories: ["Accessories", "Winter Wear"],
    tags: ["beanie", "knit", "warm"],
    images: ["https://placehold.co/255x310", "/images/products/beanie2.jpg"],
  },
  {
    id: 6,
    title: "Stylish Oversized Hoodie",
    category: "Unisex",
    price: 159,
    discountedPrice: 129,
    rating: 4.8,
    reviews: "11k+ reviews",
    description: "Trendy oversized hoodie with soft fleece interior.",
    sku: "OVH-55",
    categories: ["Unisex", "Hoodies", "Streetwear"],
    tags: ["oversized", "hoodie", "street"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/hoodie2.jpg",
      "/images/products/hoodie3.jpg",
    ],
  },
];

const bestSeller: ProductDetails[] = [
  {
    id: 1,
    title: "Slim Fit Denim Jacket",
    category: "Men",
    price: 259,
    discountedPrice: 219,
    rating: 4.6,
    reviews: "6k+ reviews",
    description: "Classic slim fit denim jacket for street style lovers.",
    sku: "DEN-SLIM-03",
    categories: ["Men", "Jackets", "Denim"],
    tags: ["denim", "slim fit", "street"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/denim2.jpg",
      "/images/products/denim3.jpg",
    ],
  },
  {
    id: 2,
    title: "Stylish Oversized Hoodie",
    category: "Unisex",
    price: 159,
    discountedPrice: 129,
    rating: 4.8,
    reviews: "11k+ reviews",
    description: "Trendy oversized hoodie with soft fleece interior.",
    sku: "OVH-55",
    categories: ["Unisex", "Hoodies", "Streetwear"],
    tags: ["oversized", "hoodie", "street"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/hoodie2.jpg",
      "/images/products/hoodie3.jpg",
    ],
  },
  {
    id: 3,
    title: "Soft Cotton T-Shirt Pack (3 pcs)",
    category: "Men",
    price: 99,
    discountedPrice: 79,
    rating: 4.5,
    reviews: "9k reviews",
    description: "Breathable cotton T-shirts perfect for everyday use.",
    sku: "TSH-3PACK-10",
    categories: ["Men", "T-Shirts", "Casual"],
    tags: ["cotton", "tshirt", "pack"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/tshirt2.jpg",
      "/images/products/tshirt3.jpg",
    ],
  },
];

const topRated: ProductDetails[] = [
  {
    id: 1,
    title: "Oversized Wool Coat",
    category: "Women",
    price: 520,
    discountedPrice: 449,
    rating: 4.8,
    reviews: "12k+ reviews",
    description: "Premium wool blend coat offering style and warmth.",
    sku: "WLC-244",
    categories: ["Women", "Coats", "Winter Wear"],
    tags: ["oversized", "coat", "wool"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/woolcoat2.jpg",
      "/images/products/woolcoat3.jpg",
      "/images/products/woolcoat4.jpg",
    ],
  },
  {
    id: 2,
    title: "Casual Knit Sweater",
    category: "Women",
    price: 189,
    discountedPrice: 149,
    rating: 4.4,
    reviews: "3.4k reviews",
    description: "Soft-touch knit sweater for everyday comfort.",
    sku: "KNIT-SW-11",
    categories: ["Women", "Tops", "Sweaters"],
    tags: ["knit", "casual", "soft"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/sweater2.jpg",
      "/images/products/sweater3.jpg",
    ],
  },
  {
    id: 3,
    title: "Slim Fit Denim Jacket",
    category: "Men",
    price: 259,
    discountedPrice: 219,
    rating: 4.6,
    reviews: "6k+ reviews",
    description: "Classic slim fit denim jacket for street style lovers.",
    sku: "DEN-SLIM-03",
    categories: ["Men", "Jackets", "Denim"],
    tags: ["denim", "slim fit", "street"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/denim2.jpg",
      "/images/products/denim3.jpg",
    ],
  },
  {
    id: 4,
    title: "Oversized Wool Coat",
    category: "Women",
    price: 520,
    discountedPrice: 449,
    rating: 4.8,
    reviews: "12k+ reviews",
    description: "Premium wool blend coat offering style and warmth.",
    sku: "WLC-244",
    categories: ["Women", "Coats", "Winter Wear"],
    tags: ["oversized", "coat", "wool"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/woolcoat2.jpg",
      "/images/products/woolcoat3.jpg",
      "/images/products/woolcoat4.jpg",
    ],
  },
  {
    id: 5,
    title: "Casual Knit Sweater",
    category: "Women",
    price: 189,
    discountedPrice: 149,
    rating: 4.4,
    reviews: "3.4k reviews",
    description: "Soft-touch knit sweater for everyday comfort.",
    sku: "KNIT-SW-11",
    categories: ["Women", "Tops", "Sweaters"],
    tags: ["knit", "casual", "soft"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/sweater2.jpg",
      "/images/products/sweater3.jpg",
    ],
  },
  {
    id: 6,
    title: "Slim Fit Denim Jacket",
    category: "Men",
    price: 259,
    discountedPrice: 219,
    rating: 4.6,
    reviews: "6k+ reviews",
    description: "Classic slim fit denim jacket for street style lovers.",
    sku: "DEN-SLIM-03",
    categories: ["Men", "Jackets", "Denim"],
    tags: ["denim", "slim fit", "street"],
    images: [
      "https://placehold.co/255x310",
      "/images/products/denim2.jpg",
      "/images/products/denim3.jpg",
    ],
  },
];

const TABS = ["all", "new arrivals", "best seller", "top rated"];

export default function TrendyProducts() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getFilteredProducts = () => {
    const currentTab = TABS[activeTab];

    if (currentTab === "all") {
      return products;
    }
    if (currentTab === "new arrivals") {
      return newArrivals;
    }
    if (currentTab === "best seller") {
      return bestSeller;
    }
    if (currentTab === "top rated") {
      return topRated;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className={style.products}>
      <h1 className={style.product_title}>
        our trendy <strong>products</strong>
      </h1>

      <div className={style.tabs}>
        <div className={style.tabContainer}>
          {TABS.map((tab, index) => (
            <p
              key={tab}
              className={`${style.tabs_title} ${
                index === activeTab ? style.active_tab : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </p>
          ))}
        </div>

        <div
          key={activeTab}
          className={`${style.all_products_container} ${style.animate}`}
        >
          {filteredProducts?.map((card) => (
            <ProductCard
              key={card.id}
              img={card.images[0]}
              price={card.price}
              discounted_price={card.discountedPrice}
              category={card.category}
              productName={card.title}
            />
          ))}
        </div>

        <div className={style.discoverMore}>
          <p>discover more</p>
        </div>
      </div>
    </div>
  );
}
