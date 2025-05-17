import { updateOrderStatusInDb, insertOrderStatusHistory, getOrderWithUserId, findAssignedTransporterByOrderId, markTransporterAvailable } from '../orders.repository';
import { redisClient } from '../../../shared/database/redis';
import { notifyClients } from '../../../shared/services/websocket.service';
import { sendStatusUpdateEmail } from '../../../shared/services/mailer.service';
import { findUserById } from '../../users/users.repository';
import { OrderStatus } from '../../../shared/types/order';
import { config } from '../../../shared/config/config';

const TTL = config.redis.ttlSeconds;

const allowedTransitions: Record<OrderStatus, OrderStatus | null> = {
  'En espera': 'En tránsito',
  'En tránsito': 'Entregado',
  'Entregado': null,
};

export const updateOrderStatusUseCase = async (
  orderId: number,
  newStatus: OrderStatus
): Promise<void> => {
  const { status: currentStatus, userId } = await getOrderWithUserId(orderId);

  const expectedNext = allowedTransitions[currentStatus];
  if (newStatus !== expectedNext) {
    throw new Error(`no valid transition from "${currentStatus}" to "${newStatus}"`);
  }

  await updateOrderStatusInDb(orderId, newStatus);
  await insertOrderStatusHistory(orderId, newStatus);

  await redisClient.setEx(
    `order:${orderId}:status`,
    TTL,
    newStatus
  );

  notifyClients({
    type: 'status_update',
    orderId,
    newStatus,
    updatedAt: new Date().toISOString(),
  });

  const user = await findUserById(userId);
  if (user?.email) {
    await sendStatusUpdateEmail(user.email, orderId, newStatus );
  }

  if (newStatus === 'Entregado') {
    const transporterId = await findAssignedTransporterByOrderId(orderId);
    if (transporterId) await markTransporterAvailable(transporterId);
  }
};
