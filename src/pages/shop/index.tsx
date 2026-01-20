import Layout from "@/assets/components/layout";
import style from "./shop.module.scss";
import ProductCard from "@/assets/components/productCard/productCard";
import { useState } from "react";

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
];
export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Layout>
      <div className={style.page}>
        <h1>Shop </h1>
        <div
          className={`${style.overlay} ${
            isFilterOpen ? style.overlayOpen : ""
          }`}
          onClick={() => setIsFilterOpen(false)}
        />

        <aside
          className={`${style.drawer} ${isFilterOpen ? style.drawerOpen : ""}`}
          aria-hidden={!isFilterOpen}
        >
          <div className={style.drawerHead}>
            <h3>FILTER BY</h3>
            <button
              type="button"
              className={style.drawerClose}
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className={style.drawerBody}>
            {/* SAME FILTER UI (STATIC) */}
            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Product Categories</h3>
              </div>
              <ul className={style.list}>
                {[
                  "Birthday",
                  "Wedding",
                  "Cupcake",
                  "Cheesecake",
                  "Kids",
                  "Custom",
                ].map((c) => (
                  <li key={c}>
                    <button type="button" className={style.listBtn}>
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Flavors</h3>
              </div>
              <div className={style.checkList}>
                {[
                  "Chocolate",
                  "Vanilla",
                  "Red Velvet",
                  "Strawberry",
                  "Pistachio",
                ].map((f) => (
                  <label key={f} className={style.checkItem}>
                    <input type="checkbox" />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Allergens / Tags</h3>
              </div>
              <div className={style.checkList}>
                {[
                  "Vegan",
                  "Gluten Free",
                  "Nut Free",
                  "Dairy Free",
                  "Low Sugar",
                ].map((t) => (
                  <label key={t} className={style.checkItem}>
                    <input type="checkbox" />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Size / Servings</h3>
              </div>
              <div className={style.pills}>
                {["6+", "10+", "14+", "20+"].map((s) => (
                  <button key={s} type="button" className={style.pill}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Price</h3>
              </div>
              <div className={style.priceBox}>
                <div className={style.rangeRow}>
                  <label className={style.rangeLabel}>
                    Min
                    <input
                      className={style.range}
                      type="range"
                      min={0}
                      max={250}
                    />
                  </label>
                  <label className={style.rangeLabel}>
                    Max
                    <input
                      className={style.range}
                      type="range"
                      min={0}
                      max={250}
                    />
                  </label>
                </div>

                <div className={style.priceRow}>
                  <span>$0</span>
                  <span>$250</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className={style.container}>
          {/* Desktop Sidebar */}
          <aside className={style.sidebar}>
            <div className={style.sidebarTop}>
              <h2 className={style.sideTitle}>Filters</h2>
              <button className={style.clearBtn} type="button">
                Clear
              </button>
            </div>

            {/* SAME FILTER UI (STATIC) */}
            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Category</h3>
              </div>
              <ul className={style.list}>
                {[
                  "Birthday",
                  "Wedding",
                  "Cupcake",
                  "Cheesecake",
                  "Kids",
                  "Custom",
                ].map((c) => (
                  <li key={c}>
                    <button type="button" className={style.listBtn}>
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Flavors</h3>
              </div>
              <div className={style.checkList}>
                {[
                  "Chocolate",
                  "Vanilla",
                  "Red Velvet",
                  "Strawberry",
                  "Pistachio",
                ].map((f) => (
                  <label key={f} className={style.checkItem}>
                    <input type="checkbox" />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Allergens / Tags</h3>
              </div>
              <div className={style.checkList}>
                {[
                  "Vegan",
                  "Gluten Free",
                  "Nut Free",
                  "Dairy Free",
                  "Low Sugar",
                ].map((t) => (
                  <label key={t} className={style.checkItem}>
                    <input type="checkbox" />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Size / Servings</h3>
              </div>
              <div className={style.pills}>
                {["6+", "10+", "14+", "20+"].map((s) => (
                  <button key={s} type="button" className={style.pill}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Price</h3>
              </div>
              <div className={style.priceBox}>
                <div className={style.rangeRow}>
                  <label className={style.rangeLabel}>
                    Min
                    <input
                      className={style.range}
                      type="range"
                      min={0}
                      max={250}
                    />
                  </label>
                  <label className={style.rangeLabel}>
                    Max
                    <input
                      className={style.range}
                      type="range"
                      min={0}
                      max={250}
                    />
                  </label>
                </div>

                <div className={style.priceRow}>
                  <span>$0</span>
                  <span>$250</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className={style.content}>
            {/* Top controls like screenshot */}
            <div className={style.mobileTopbar}>
              <div className={style.breadcrumbs}>
                <span>HOME</span> <span className={style.sep}>/</span>{" "}
                <span>THE SHOP</span>
              </div>

              <div className={style.mobileControls}>
                <select className={style.select} defaultValue="default">
                  <option value="default">Default sorting</option>
                  <option value="newest">Newest</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>

                <button
                  type="button"
                  className={style.filterBtn}
                  onClick={() => setIsFilterOpen(true)}
                >
                  <span className={style.filterIcon}>≡</span> FILTER
                </button>
              </div>
            </div>

            {/* GRID */}
            <div className={style.grid3}>
              {products.map((card) => (
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
            <div className={style.pagination}>
              <button className={style.pageNav}>‹ PREV</button>

              <div className={style.pageNumbers}>
                <button className={style.pageBtn + " " + style.active}>
                  1
                </button>
                <button className={style.pageBtn}>2</button>
                <button className={style.pageBtn}>3</button>
                <button className={style.pageBtn}>4</button>
              </div>

              <button className={style.pageNav}>NEXT ›</button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
