import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./limitedEdition.css";

import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";

import ProductCard from "@/assets/components/productCard/productCard";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { fetchNewArrivalsProduct } from "@/store/productSlice";

export default function LimitedEdition() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchNewArrivalsProduct());
  }, [dispatch]);

  if (loading || items.length === 0) return null;

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
        loop={items.length > 1}
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
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard card={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
