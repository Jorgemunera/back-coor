import { getOrderHistoryById } from '../orders.repository';

export const getOrderHistoryUseCase = async (orderId: number) => {
  return await getOrderHistoryById(orderId);
};
