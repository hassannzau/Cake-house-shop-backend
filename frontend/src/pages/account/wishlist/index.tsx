import AccountLayout from "@/assets/components/accountLayout";
import ProductCard from "@/assets/components/productCard/productCard";
import style from "./wishlist.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";




function Wishlist() {
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <AccountLayout title="Wishlist">
      <div className={style.grid3}>
        {wishlistItems.map((card) => (
          <ProductCard
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </AccountLayout>
  );
}

export default Wishlist;
