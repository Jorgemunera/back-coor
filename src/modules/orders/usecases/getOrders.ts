import { OrderStatus } from 'shared/types/order';
import { getOrders } from '../orders.repository';

export const getOrdersUseCase = async (status?: OrderStatus) => {
  return await getOrders(status);
};
