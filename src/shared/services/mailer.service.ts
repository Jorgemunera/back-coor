import sgMail from '@sendgrid/mail';
import { config } from '../config/config';
import { OrderEmailData } from '../types/email';
import { buildOrderConfirmationEmail } from '../templates/confirmationOrder';

sgMail.setApiKey(config.sendgrid.apiKey);

export const sendConfirmationEmail = async (
  to: string,
  order: OrderEmailData
): Promise<void> => {
  if (!config.sendgrid.enabled) {
    console.log(`❌ Envío de correos deshabilitado`);
    return;
  }

  const html = buildOrderConfirmationEmail(order);

  try {
    await sgMail.send({
      to,
      from: {
        email: config.sendgrid.fromEmail,
        name: 'Coordinadora',
      },
      subject: `Confirmamos tu orden 📦#${order.orderId}`,
      html,
    });

    console.log(`✅ Correo enviado exitosamente a ${to}`);
  } catch (err) {
    console.error('❌ Error al enviar correo con SendGrid:', err);
  }
};
