import { Order } from '../../entities/order.entity';

export type CreateOrderInput = Omit<Order, 'id' | 'createdAt' | 'status'>;
