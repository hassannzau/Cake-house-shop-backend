import Layout from "@/assets/components/layout";
import ProductSlider from "./sections/productSlider";
import style from "./detail.module.scss";
import ProductDetails from "./sections/productDetails";
import ProductReviews from "./sections/productReviews";
import RelatedProducts from "./sections/relatedProducts";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { useEffect } from "react";
import { clearSelectedProduct, fetchProductById } from "@/store/productSlice";

function Details() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedProductById, loading, error } = useAppSelector(
    (state: RootState) => state.products,
  );
  console.log(id, "test_id");

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);


  return (
    <Layout>
      <div className={style.detail}>
        <div className={style.container}>
          {selectedProductById && (
            <>
            <ProductSlider product={selectedProductById} />
            <ProductDetails product={selectedProductById}/>
            </>
          )}
          
        </div>
        <ProductReviews />
        <RelatedProducts />
      </div>
    </Layout>
  );
}

export default Details;
