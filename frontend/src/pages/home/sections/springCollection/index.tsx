import { useNavigate } from "react-router-dom";
import style from "./springCollection.module.scss";

export default function SpringCollection() {
  const navigate = useNavigate();

  return (
    <section className={style.springCollection}>
      <div className={style.overlay} />

      <div className={style.springContainer}>
     <p className={style.tag}>- weekly sweet deal</p>

<h1 className={style.title}>
  spring <span>treats</span>
</h1>

<p className={style.subtitle}>
  Freshly baked cakes & pastries — limited-time offer.
</p>

<button className={style.cta} onClick={() => navigate("/products")}>
  shop sweets <span className={style.arrow}>→</span>
</button>

      </div>
    </section>
  );
}
