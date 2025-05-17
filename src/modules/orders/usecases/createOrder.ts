import { createOrder, insertInitialStatus } from '../orders.repository';
import { findUserById } from '../../users/users.repository';
import { validateAddress } from '../../../shared/services/validateAddress.service';
import { sendConfirmationEmail } from '../../../shared/services/mailer.service';
import { notifyClients } from '../../../shared/services/websocket.service';
import { CreateOrderInput } from '../types';


export const createOrderUseCase = async (data: CreateOrderInput): Promise<number> => {
  const isValid = await validateAddress(data.destinationAddress);
  if (!isValid) {
    throw new Error('Invalid address');
  }

  const orderId = await createOrder(data);
  await insertInitialStatus(orderId);

  await notifyClients({
    type: 'new_order',
    order: {
      id: orderId,
      ...data,
      status: 'En espera',
    },
  });

  const user = await findUserById(data.userId);
  if (user?.email) {
    await sendConfirmationEmail(user.email, {
      orderId,
      ...data,
    });
  }

  return orderId;
};
