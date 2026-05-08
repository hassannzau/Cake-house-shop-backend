import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import styles from "./productSlider.module.scss";

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

interface ProductSliderProps {
  product: Product;
}

function ProductSlider({product}:ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
  ];
console.log(product,"test slider");

  return (
    <div className={styles.productSlider}>
      {/* Thumbs (left) */}
      <div className={styles.thumbsCol}>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop
          direction="vertical"
          spaceBetween={12}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className={`${styles.thumbsSwiper} thumbsSwiper`}
          breakpoints={{
            0: {
              direction: "horizontal",
              slidesPerView: 4,
            },
            768: {
              direction: "vertical",
              slidesPerView: 4,
            },
          }}
        >
          {product?.images.map((src) => (
            <SwiperSlide key={src} className={styles.thumbSlide}>
              <div className={styles.thumbBox}>
                <img src={src} alt="thumbnail" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main (right) */}
      <div className={styles.mainCol}>
        <div className={styles.mainFrame}>
          <Swiper
            loop
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className={`${styles.mainSwiper} mainSwiper`}
          >
            {product?.images  .map((src) => (
              <SwiperSlide key={src} className={styles.mainSlide}>
                <img src={src} alt="product" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;
