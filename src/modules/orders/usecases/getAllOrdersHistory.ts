import { getAllOrderStatusHistories } from '../orders.repository';
import { OrderStatusHistory } from '../../../entities/orderStatusHistory.entity';

export const getAllOrdersHistoryUseCase = async (): Promise<OrderStatusHistory[]> => {
  return await getAllOrderStatusHistories();
};
