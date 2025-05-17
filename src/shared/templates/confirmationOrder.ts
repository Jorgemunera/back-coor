import { OrderEmailData } from "../types/email";

export const buildOrderConfirmationEmail = (order: OrderEmailData): string => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 8px;">
      <h2 style="color: #2b4eff;">📦 Orden #${order.orderId} registrada exitosamente</h2>
      <p style="font-size: 16px;">Gracias por confiar en nosotros. Aquí tienes los detalles de tu envío:</p>

      <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Peso:</td>
          <td style="padding: 8px;">${order.weight} kg</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; font-weight: bold;">Dimensiones:</td>
          <td style="padding: 8px;">${order.dimensions}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Tipo de producto:</td>
          <td style="padding: 8px;">${order.productType}</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; font-weight: bold;">Dirección de destino:</td>
          <td style="padding: 8px;">${order.destinationAddress}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Estado inicial:</td>
          <td style="padding: 8px; color: #007b00;"><strong>En espera</strong></td>
        </tr>
      </table>
      <p style="margin-top: 16px; font-size: 16px;">Recibirás actualizaciones sobre el estado de tu envío a través de este correo electrónico.</p>
    </div>
  `;
};
