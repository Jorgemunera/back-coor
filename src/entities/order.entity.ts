import { OrderStatus } from '../shared/types/order';

export interface Order {
  id: number;
  userId: number;
  weight: number;
  dimensions: string;
  productType: string;
  destinationAddress: string;
  status: OrderStatus;
  createdAt: Date;
}
