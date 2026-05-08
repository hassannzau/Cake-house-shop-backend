import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/assets/components/layout";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { removeFromCart } from "@/store/cartSlice";
import { placeOrder, type PaymentMethod } from "@/api/order";
import styles from "./checkout.module.scss";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const token = useAppSelector((state: RootState) => state.auth.token);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;
    return sum + price * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await placeOrder({
        items: cartItems.map((item) => ({ cakeId: item.id, quantity: item.quantity })),
        paymentMethod,
      });
      setOrderId(result.id);
      cartItems.forEach((item) => dispatch(removeFromCart(item)));
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      const serverMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      if (status === 401 || status === 403) {
        setError("Session expired. Please log in again.");
      } else {
        setError(serverMsg || "Failed to place order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <Layout>
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.success}>
                <h2>Order Placed!</h2>
                <p>Your order #{orderId} has been received and is being prepared.</p>
                <button
                  type="button"
                  className={styles.successBtn}
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>CHECKOUT</h1>

          <div className={styles.card}>
            {!token && (
              <div className={styles.loginBanner}>
                You need to{" "}
                <Link to="/auth/login" className={styles.loginLink}>log in</Link>
                {" "}before placing an order.
              </div>
            )}

            {cartItems.length === 0 ? (
              <p className={styles.emptyMsg}>
                Your cart is empty.{" "}
                <button
                  type="button"
                  style={{ background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "inherit" }}
                  onClick={() => navigate("/products")}
                >
                  Browse cakes
                </button>
              </p>
            ) : (
              <>
                <p className={styles.sectionTitle}>Order Summary</p>
                <ul className={styles.itemList}>
                  {cartItems.map((item) => {
                    const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;
                    return (
                      <li key={item.id} className={styles.item}>
                        <img
                          className={styles.itemImg}
                          src={item.images[0]}
                          alt={item.title}
                        />
                        <div className={styles.itemInfo}>
                          <p className={styles.itemName}>{item.title}</p>
                          <p className={styles.itemQty}>Qty: {item.quantity}</p>
                        </div>
                        <span className={styles.itemPrice}>
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <hr className={styles.divider} />

                <div className={styles.paymentSection}>
                  <p className={styles.sectionTitle}>Payment Method</p>
                  <div className={styles.paymentOptions}>
                    {(["CARD", "CASH"] as PaymentMethod[]).map((method) => (
                      <button
                        key={method}
                        type="button"
                        className={`${styles.paymentOption} ${paymentMethod === method ? styles.paymentOptionActive : ""}`}
                        onClick={() => setPaymentMethod(method)}
                      >
                        <span className={styles.paymentLabel}>
                          {method === "CARD" ? "Credit / Debit Card" : "Cash on Delivery"}
                        </span>
                        <span className={styles.paymentDesc}>
                          {method === "CARD" ? "Pay securely online" : "Pay when you receive"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.totals}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className={`${styles.totalRow} ${styles.totalRowBold}`}>
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handlePlaceOrder}
                  disabled={loading || !token}
                >
                  {loading ? "PLACING ORDER..." : "PLACE ORDER"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
