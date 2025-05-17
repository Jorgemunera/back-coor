import { CreateOrderInput } from "../../modules/orders/types";

export type OrderEmailData = Omit<CreateOrderInput, 'userId'> & {
  orderId: number;
};
