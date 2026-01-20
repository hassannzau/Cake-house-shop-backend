import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./limitedEdition.css";
import { Autoplay, FreeMode, Pagination,Navigation } from "swiper/modules";


import ProductCard from "@/assets/components/productCard/productCard";

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

const limitedProducts: ProductDetails[] = [
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
export default function LimitedEdition() {
  return (
    <section className="limitedEdition">
      <div className="limitedEdition__head">
        <h1 className="limited-title">Limited Edition</h1>
        <p className="limited-subtitle">
          Handpicked items available for a short time only.
        </p>
      </div>

      <Swiper
        spaceBetween={18}
        loop
        freeMode
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        speed={900}
        modules={[Autoplay, FreeMode, Pagination, Navigation]}
        className="limitedSwiper"
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 14 },
          480: { slidesPerView: 2.1, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 18 },
        }}
      >
        {limitedProducts.map((card) => (
          <SwiperSlide key={card.id}>
            <ProductCard
              img={card.images[0]}
              category={card.category}
              productName={card.title}
              price={card.price}
              discounted_price={card.discountedPrice}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}