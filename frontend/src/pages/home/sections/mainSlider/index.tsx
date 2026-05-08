import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./mainSlider.css";
import { Autoplay, Pagination } from "swiper/modules";
import mainImageSlider from "@/assets/images/sliders/mainSlider/cake1.jpg";
import mainImageSlider1 from "@/assets/images/sliders/mainSlider/cake2.jpg";

interface FakeData {
  id: number;
  p: string;
  title: string;
  title2: string;
  img: string;
}

const fakeSliderData: FakeData[] = [
  {
    id: 1,
    p: "New trend",
    title: "CHOCOLATE DREAM CAKES",
    title2: "Birthdays • Weddings • Special Days",
    img: mainImageSlider,
  },
  {
    id: 2,
    p: "Summer 2026",
    title: "CAKES FOR EVERY CELEBRATION",
    title2: "Birthdays • Weddings • Special Days",
    img: mainImageSlider1,
  },
];

export default function MainSlider() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      speed={500}
      modules={[Autoplay, Pagination]}
      className="mySwiper swipper-main"
    >
      {fakeSliderData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="mainSlider-cnt">
            <p className="mainSlider-p">— {slide.p}</p>
            <h1 className="mainSlider-h1">{slide.title}</h1>
            <h1 className="mainSlider-h2">{slide.title2}</h1>
            <p className="mainSlider-p2">Discover more</p>
          </div>
          <img src={slide.img} alt="Slide" className="mainSlide-img" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
