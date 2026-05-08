import { useState } from "react";
import styles from "./productDetails.module.scss";
import { Heart, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import type { RootState } from "@/store/store";
import { toggleWishlist } from "@/store/wishlistSlice";

interface Product {
  id: number;
  title: string;
  quantity: number;
  category: string;
  flavor: string;
  price: number;
  discountedPrice: number;
  rating: number;
  images: string[];
  brand: string;
  sizes: { id: number; label: string }[];
  description: string;
}

interface ProductDetailProps {
  product: Product;
}

function ProductDetails({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedQuantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const existingItem = useAppSelector((state: RootState) =>
    state.cart.items.find((item) => item.id == product.id),
  );

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (selectedQuantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddCart = () => {
    if (existingItem) {
      for (let i = 0; i < selectedQuantity; i++) {
        dispatch(
          addToCart({
            ...product,
            quantity: 1,
          }),
        );
      }
    } else {
      dispatch(
        addToCart({
          ...product,
          quantity: selectedQuantity,
        }),
      );
    }
  };

  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );

  const isInWishlist = wishlistItems.some(
    (item: Product) => item.id === product.id,
  );

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.topRow}>
        <div className={styles.breadcrumb}>
          <span>HOME</span>
          <span className={styles.slash}>/</span>
          <span>THE SHOP</span>
        </div>
      </div>

      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.ratingRow}>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.round(product.rating) ? "#f4b26b" : "none"}
              stroke="#f4b26b"
            />
          ))}
        </div>
        <span className={styles.reviewText}>{product.rating}</span>
      </div>
      <div className={styles.prices}>
        {product.discountedPrice > 0 ? (
          <>
            <div className={styles.oldPrice}>$ {product.price}</div>
            <div className={styles.price}>$ {product.discountedPrice}</div>
          </>
        ) : (
          <div className={styles.price}>$ {product.price}</div>
        )}
      </div>

      <p className={styles.description}>{product.description}</p>

      <div className={styles.optionRow}>
        <div className={styles.optionLabel}>SIZES</div>

        <div className={styles.sizes}>
          {product.sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              className={`${styles.sizeBtn} ${
                selectedSize === size.label ? styles.activeSize : ""
              }`}
              onClick={() => setSelectedSize(size.label)}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.optionRow}>
        <div className={styles.optionLabel}>CATEGORY:</div>

        <p className={styles.category}>{product.category}</p>
      </div>

      <div className={styles.cartRow}>
        <div className={styles.quantityBox}>
          <button type="button" onClick={decreaseQty}>
            -
          </button>
          <span>{selectedQuantity}</span>
          <button type="button" onClick={increaseQty}>
            +
          </button>
        </div>

        <button
          type="button"
          className={styles.addToCart}
          onClick={handleAddCart}
        >
          ADD TO CART
        </button>
      </div>

      <div className={styles.actionRow}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleWishlist}
        >
          <Heart
            size={16}
            fill={isInWishlist ? "#e11d48" : "none"} 
            stroke={isInWishlist ? "#e11d48" : "#111"}
          />
          ADD TO WISHLIST
        </button>
      </div>

      <div className={styles.meta}>
        <p>
          <span>BRAND:</span> {product.brand}
        </p>
        <p>
          <span>CATEGORY:</span> {product.category}
        </p>
        <p>
          <span>FLAVOR:</span> {product.flavor}
        </p>
        <p>
          <span>SELECTED SIZE:</span> {selectedSize}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
