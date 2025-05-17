import { Order } from '../../entities/order.entity';
import { OrderStatusHistory } from '../../entities/orderStatusHistory.entity';
import { Route } from '../../entities/route.entity';
import { Transporter } from '../../entities/transporter.entity';
import { User } from '../../entities/user.entity';


export const mapOrder = (row: any): Order => ({
  id: row.id,
  userId: row.user_id,
  weight: parseFloat(row.weight),
  dimensions: row.dimensions,
  productType: row.product_type,
  destinationAddress: row.destination_address,
  status: row.status,
  createdAt: new Date(row.created_at),
});

export const mapOrderStatusHistory = (row: any): OrderStatusHistory => ({
  id: row.id,
  orderId: row.order_id,
  status: row.status,
  changedAt: new Date(row.changed_at),
});

export const mapTransporter = (row: any): Transporter => ({
  id: row.id,
  name: row.name,
  capacity: parseFloat(row.capacity),
  isAvailable: !!row.is_available,
  createdAt: new Date(row.created_at),
});

export const mapRoute = (row: any): Route => ({
  id: row.id,
  name: row.name,
  description: row.description,
  createdAt: new Date(row.created_at),
});

export const mapUser = (row: any): User => ({
  id: row.id,
  name: row.name,
  email: row.email,
  password: row.password,
  role: row.role,
  createdAt: new Date(row.created_at),
});
