import { Order } from '../../entities/order.entity';
import { Route } from '../../entities/route.entity';
import { Transporter } from '../../entities/transporter.entity';

export const buildAssignmentEmail = (
  order: Order,
  route: Route,
  transporter: Transporter
): string => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Tu Orden #${order.id} fue asignada</h2>
      <p>Te informamos que tu orden ha sido asignada a un transportista y ya está en camino</p>

      <h3>Detalles de la orden:</h3>
      <ul>
        <li><strong>Dirección de destino:</strong> ${order.destinationAddress}</li>
        <li><strong>Peso:</strong> ${order.weight} kg</li>
        <li><strong>Tipo de producto:</strong> ${order.productType}</li>
      </ul>

      <h3>Transportista asignado:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${transporter.name}</li>
      </ul>

      <h3>Ruta asignada:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${route.name}</li>
      </ul>

      <p>Gracias por confiar en nuestra empresa de envíos 💙</p>
    </div>
  `;
};
