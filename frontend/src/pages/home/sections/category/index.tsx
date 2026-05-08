import { useNavigate } from "react-router-dom";
import "./category.scss";
import collectionIMG1 from "@/assets/images/home/collections/cake1.jpg";
import collectionIMG2 from "@/assets/images/home/collections/cake3.jpg";
import collectionIMG3 from "@/assets/images/home/collections/cake2.jpg";
import collectionIMG4 from "@/assets/images/home/collections/cake4.jpg";

interface CategoryCard {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  img?: string;
  layout: "chocolate" | "fruit" | "kids" | "custom";
  navigateTo: string;
}

const cards: CategoryCard[] = [
  {
    id: 1,
    title: "CHOCOLATE CAKES",
    subtitle: "BEST SELLERS",
    cta: "ORDER NOW",
    img: collectionIMG1,
    layout: "chocolate",
    navigateTo: "/products?category=Chocolate+Cake",
  },
  {
    id: 2,
    title: "FRUIT CAKES",
    subtitle: "FRESH & LIGHT",
    cta: "ORDER NOW",
    img: collectionIMG2,
    layout: "fruit",
    navigateTo: "/products?category=Fruit+Cake",
  },
  {
    id: 3,
    title: "KIDS CAKES",
    subtitle: "FUN & COLORFUL",
    cta: "ORDER NOW",
    img: collectionIMG3,
    layout: "kids",
    navigateTo: "/products?category=Birthday+Cake",
  },
  {
    id: 4,
    title: "CUSTOM CAKES",
    subtitle: "MADE TO ORDER",
    cta: "CONTACT US",
    img: collectionIMG4,
    layout: "custom",
    navigateTo: "/contact",
  },
];

export default function Category() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="title-category">Categories</h1>
      <div className="categories-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`category-card category-${card.layout}`}
            role="button"
            tabIndex={0}
            onClick={() => navigate(card.navigateTo)}
            onKeyDown={(e) => e.key === "Enter" && navigate(card.navigateTo)}
            style={{ cursor: "pointer" }}
          >
            <img src={card.img} alt={card.title} className="category-image" />

            <div className="category-text">
              <p className="category-subtitle">{card.subtitle}</p>
              <h3 className="category-title">{card.title}</h3>

              <div className="category-cta">
                <span>{card.cta}</span>
                <span className="cta-icon">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
