import api from "@/api";

export type PaymentMethod = "CARD" | "CASH";

interface OrderItemRequest {
  cakeId: number;
  quantity: number;
}

interface PlaceOrderRequest {
  items: OrderItemRequest[];
  paymentMethod: PaymentMethod;
}

export const placeOrder = (data: PlaceOrderRequest) =>
  api.post("/orders", data).then((r) => r.data);

export const getMyOrders = () =>
  api.get("/orders/my-orders").then((r) => r.data);
