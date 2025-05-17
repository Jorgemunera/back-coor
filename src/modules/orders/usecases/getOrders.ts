import { getOrders } from '../orders.repository';

export const getOrdersUseCase = async (status?: string) => {
  return await getOrders(status);
};
