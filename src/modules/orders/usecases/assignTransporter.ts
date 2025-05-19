import { getOrderIfPending } from '../orders.repository';
import {
  findRouteById,
  findTransporterById,
  markTransporterAsBusy,
} from '../../transporters/transporters.repository';
import { assignOrder } from '../orders.repository';
import { insertStatus } from '../orders.repository';
import { findUserById } from '../../users/users.repository';
import { sendAssignmentEmail } from '../../../shared/services/mailer.service';
import { notifyClients } from '../../../shared/services/websocket.service';

export const assignTransporterUseCase = async (
  orderId: number,
  transporterId: number,
  routeId: number
): Promise<void> => {
  // 1. Validar orden
  const order = await getOrderIfPending(orderId);
  console.log('order', order);
  // 2. Validar ruta
  const route = await findRouteById(routeId);
  console.log('route', route);

  // 3. Validar transportista
  const transporter = await findTransporterById(transporterId);
  console.log('transporter', transporter);

  if (order.weight > transporter.capacity) {
    throw new Error(
      `The transporter ${transporter.name} with capacity ${transporter.capacity}kg does not have enough capacity for order ${orderId} weighing ${order.weight}kg`
    );
  }
  console.log("orderid:", orderId);
  console.log("transporterId:", transporterId);
  console.log("routeId:", routeId);

  // 4. Asignar orden
  await assignOrder(orderId, transporterId, routeId);

  // 5. Marcar transportista como ocupado
  await markTransporterAsBusy(transporterId);

  // 6. Guardar nuevo estado "En tránsito"
  await insertStatus(orderId, 'En tránsito');

  // 7. Notificar por WebSocket
  await notifyClients({
    type: 'status_update',
    orderId,
    newStatus: 'En tránsito',
    updatedAt: new Date().toISOString(),
  });

  // 8. Notificar por email
  const user = await findUserById(order.userId);

  if (user?.email) {
    await sendAssignmentEmail(user.email, order, route, transporter);
  }
};
