import { getUserOrderHistoryRepository } from '../orders.repository';
import { Order } from '../../../entities/order.entity';

export const getOrdersByUserUseCase = async (userId: number): Promise<Order[]> => {
  return await getUserOrderHistoryRepository(userId);
};
