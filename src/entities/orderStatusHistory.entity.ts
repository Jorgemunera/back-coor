import { OrderStatus } from "../shared/types/order";

export interface OrderStatusHistory {
  id: number;
  orderId: number;
  status: OrderStatus;
  changedAt: Date;
}
