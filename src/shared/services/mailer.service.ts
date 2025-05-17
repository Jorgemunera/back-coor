import sgMail from '@sendgrid/mail';
import { config } from '../config/config';
import { OrderEmailData } from '../types/email';
import { buildOrderConfirmationEmail } from '../templates/confirmationOrder';
import { OrderStatus } from '../types/order';
import { buildStatusUpdateEmail } from '../templates/statusOrderUpdate';

sgMail.setApiKey(config.sendgrid.apiKey);

export const sendConfirmationEmail = async (
  to: string,
  order: OrderEmailData
): Promise<void> => {
  if (!config.sendgrid.enabled) {
    console.log(`❌ Email sending is disabled`);
    return;
  }

  const html = buildOrderConfirmationEmail(order);

  try {
    await sgMail.send({
      to,
      from: {
        email: config.sendgrid.fromEmail,
        name: 'Empresa de Envíos',
      },
      subject: `Confirmamos tu orden 📦#${order.orderId}`,
      html,
    });

    console.log(`✅ email sent to ${to} successfully`);
  } catch (err) {
    console.error('❌ Error sending confirmation email:', err);
  }
};


export const sendStatusUpdateEmail = async (
  to: string,
  orderId: number,
  newStatus: OrderStatus
): Promise<void> => {
  if (!config.sendgrid.enabled) {
    console.log(`❌ Email sending is disabled`);
    return;
  }

  const html = buildStatusUpdateEmail(orderId, newStatus);

  try {
    await sgMail.send({
      to,
      from: {
        email: config.sendgrid.fromEmail,
        name: 'Empresa de Envíos',
      },
      subject: `📦 Tu envío #${orderId} cambió de estado a ${newStatus}`,
      html,
    });

    console.log(`✅ Change status order: email sent to ${to} successfully`);
  } catch (err) {
    console.error('❌ Error sending status update email:', err);
  }
};
