import Layout from "@/assets/components/layout";
import style from "./shop.module.scss";
import ProductCard from "@/assets/components/productCard/productCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import {
  fetchAllProducts,
  fetchFilteredProducts,
  fetchSearchProducts,
} from "@/store/productSlice";
import { useSearchParams } from "react-router-dom";

const categories = [
  "Chocolate Cake",
  "Fruit Cake",
  "Classic Cake",
  "Birthday Cake",
  "Cheesecake",
  "Fresh Cake",
  "Premium Cake",
];

const flavors = [
  "Chocolate",
  "Strawberry",
  "Red Velvet",
  "Vanilla",
  "Caramel",
  "Blueberry",
  "Oreo",
  "Lemon",
  "Cherry Chocolate",
  "Pistachio",
];

const tags = ["Vegan", "Gluten Free", "Nut Free", "Dairy Free", "Low Sugar"];

const sizes = ["Small", "Medium", "Large"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  const query = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedFlavor = searchParams.getAll("flavors");
  const selectedTag = searchParams.getAll("tags");
  const selectedSize = searchParams.get("size") || "";

  const updateUrlParams = (newFilters: {
    category?: string;
    flavors?: string[];
    tags?: string[];
    size?: string;
  }) => {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    if (newFilters.category) {
      params.set("category", newFilters.category);
    }

    newFilters.flavors?.forEach((flavor) => {
      params.append("flavors", flavor);
    });

    newFilters.tags?.forEach((tag) => {
      params.append("tags", tag);
    });

    if (newFilters.size) {
      params.set("size", newFilters.size);
    }

    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategory = selectedCategory === category ? "" : category;

    updateUrlParams({
      category: updatedCategory,
      flavors: selectedFlavor,
      tags: selectedTag,
      size: selectedSize,
    });
  };

  const handleFlavorChange = (flavor: string) => {
    const updatedFlavors = selectedFlavor.includes(flavor)
      ? selectedFlavor.filter((f) => f !== flavor)
      : [...selectedFlavor, flavor];

    updateUrlParams({
      category: selectedCategory,
      flavors: updatedFlavors,
      tags: selectedTag,
      size: selectedSize,
    });
  };

  const handleTagChange = (tag: string) => {
    const updatedTags = selectedTag.includes(tag)
      ? selectedTag.filter((t) => t !== tag)
      : [...selectedTag, tag];

    updateUrlParams({
      category: selectedCategory,
      flavors: selectedFlavor,
      tags: updatedTags,
      size: selectedSize,
    });
  };

  const handleSizeChange = (size: string) => {
    const updatedSize = selectedSize === size ? "" : size;

    updateUrlParams({
      category: selectedCategory,
      flavors: selectedFlavor,
      tags: selectedTag,
      size: updatedSize,
    });
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const hasFilters =
      selectedCategory ||
      selectedFlavor.length > 0 ||
      selectedTag.length > 0 ||
      selectedSize;

    if (query) {
      dispatch(fetchSearchProducts(query));
      return;
    }

    if (hasFilters) {
      dispatch(
        fetchFilteredProducts({
          category: selectedCategory || undefined,
          flavors: selectedFlavor,
          tags: selectedTag,
          sizes: selectedSize ? [selectedSize] : [],
        })
      );
      return;
    }

    dispatch(fetchAllProducts());
  }, [
    query,
    selectedCategory,
    selectedFlavor.join(","),
    selectedTag.join(","),
    selectedSize,
    dispatch,
  ]);

  return (
    <Layout>
      <div className={style.page}>
        <h1>Shop</h1>

        <div className={style.container}>
          <aside className={style.sidebar}>
            <div className={style.sidebarTop}>
              <h2 className={style.sideTitle}>Filters</h2>
              <button
                className={style.clearBtn}
                type="button"
                onClick={handleClearFilters}
              >
                Clear
              </button>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Category</h3>
              </div>

              <div className={style.list}>
                {categories.map((cat) => (
                  <div
                    className={style.list}
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      padding: "10px",
                      border:
                        selectedCategory === cat
                          ? "2px solid rgba(211, 116, 143, 0.92)"
                          : "1px solid rgb(239 206 216 / 92%)",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Flavors</h3>
              </div>

              <div className={style.checkList}>
                {flavors.map((flavor) => (
                  <label key={flavor} className={style.checkItem}>
                    <input
                      type="checkbox"
                      value={flavor}
                      onChange={() => handleFlavorChange(flavor)}
                      checked={selectedFlavor.includes(flavor)}
                    />
                    <span>{flavor}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Allergens / Tags</h3>
              </div>

              <div className={style.checkList}>
                {tags.map((tag) => (
                  <label key={tag} className={style.checkItem}>
                    <input
                      type="checkbox"
                      value={tag}
                      onChange={() => handleTagChange(tag)}
                      checked={selectedTag.includes(tag)}
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={style.block}>
              <div className={style.blockHead}>
                <h3>Size / Servings</h3>
              </div>

              <div className={style.pills}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeChange(size)}
                    className={
                      selectedSize === size
                        ? `${style.pill} ${style.active}`
                        : style.pill
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className={style.content}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className={style.grid3}>
              {items.map((item) => (
                <ProductCard key={item.id} card={item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}