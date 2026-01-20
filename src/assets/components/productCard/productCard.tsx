import { useState } from "react";
import { HeartActiveIcon, HeartIcon } from "@/assets/images/icons";
import style from "./productCard.module.scss";

interface ProductProps {
  img: string;
  category: string;
  productName: string;
  price: number;
  discounted_price: number;
}

export default function ProductCard({
  img,
  category,
  productName,
  price,
  discounted_price,
}: ProductProps) {
  const [activeHeart, setActiveHeart] = useState(false);

  return (
    <div className={style.productCard}>
      <div className={style.productImg}>
        <img src={img} alt="Product Image" />
        <button className={style.addToCart}>add to cart</button>
      </div>
      <div className={style.productCategory_cnt}>
        <p className={style.categoryName}> {category}</p>
        {activeHeart ? (
          <img
            src={HeartActiveIcon}
            alt="Wishlist Icon"
            onClick={() => setActiveHeart(!activeHeart)}
          />
        ) : (
          <img
            src={HeartIcon}
            alt="Wishlist Icon"
            onClick={() => setActiveHeart(!activeHeart)}
          />
        )}
      </div>
      <p className={style.product_name}>{productName}</p>
      {discounted_price > 0 ? (
        <div className={style.discountedPrice}>
          <span className={style.oldPrice}>${price}</span>
          <span className={style.newPrice}>${discounted_price}</span>
        </div>
      ) : (
        <span className={style.price}>${price}</span>
      )}
    </div>
  );
}
