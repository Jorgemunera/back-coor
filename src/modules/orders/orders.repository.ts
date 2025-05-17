import { db } from '../../shared/database/mysql';
import { Order } from '../../entities/order.entity';
import { OrderStatusHistory } from 'entities/orderStatusHistory.entity';
import { CreateOrderInput } from './types';
import { OrderStatus } from '../../shared/types/order';

export const getOrders = async (status?: OrderStatus): Promise<Order[]> => {
  let query = `SELECT * FROM orders`;
  const params: any[] = [];

  if (status) {
    query += ` WHERE status = ?`;
    params.push(status);
  }

  query += ` ORDER BY created_at DESC`;

  console.log('Query:', query);
  console.log('Params:', params);
  const [rows]: [Order[]] | any[] = await db.query(query, params);
  return rows;
};


export const getOrderHistoryById  = async (orderId: number): Promise<OrderStatusHistory[]> => {
  const [rows]: any[] = await db.query(
    `SELECT id, order_id AS orderId, status, changed_at AS changedAt
     FROM order_status_history
     WHERE order_id = ?
     ORDER BY changed_at ASC`,
    [orderId]
  );

  return rows;
};


export const getUserOrderHistoryRepository = async (userId: number): Promise<Order[]> => {
  const [rows]: [Order[]] | any[] = await db.query(
    `
    SELECT
     *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};


export const findOrderStatusById = async (orderId: number): Promise<string> => {
  const [rows]: any = await db.query(`SELECT status FROM orders WHERE id = ?`, [orderId]);
  if (rows.length === 0) throw new Error('Order not found.');
  return rows[0].status;
};


export const createOrder = async (order: CreateOrderInput): Promise<number> => {
  const query = `
    INSERT INTO orders (user_id, weight, dimensions, product_type, destination_address, status)
    VALUES (?, ?, ?, ?, ?, 'En espera')
  `;
  const [result]: any = await db.query(query, [
    order.userId,
    order.weight,
    order.dimensions,
    order.productType,
    order.destinationAddress,
  ]);

  return result.insertId;
};

export const insertInitialStatus = async (orderId: number) => {
  await db.query(
    `INSERT INTO order_status_history (order_id, status) VALUES (?, ?)`,
    [orderId, 'En espera']
  );
};

export const getOrderWithUserId = async (orderId: number): Promise<{ status: OrderStatus, userId: number }> => {
  const [rows]: any = await db.query(
    'SELECT status, user_id FROM orders WHERE id = ?',
    [orderId]
  );
  if (rows.length === 0) throw new Error('Orden no encontrada');
  return {
    status: rows[0].status,
    userId: rows[0].user_id,
  };
};

export const updateOrderStatusInDb = async (orderId: number, newStatus: OrderStatus): Promise<void> => {
  await db.query('UPDATE orders SET status = ? WHERE id = ?', [
    newStatus,
    orderId,
  ]);
};

export const insertOrderStatusHistory = async (orderId: number, status: OrderStatus): Promise<void> => {
  await db.query(
    'INSERT INTO order_status_history (order_id, status) VALUES (?, ?)',
    [orderId, status]
  );
};

export const findAssignedTransporterByOrderId = async (orderId: number): Promise<number | null> => {
  const [rows]: any = await db.query(
    'SELECT transporter_id FROM order_assignments WHERE order_id = ?',
    [orderId]
  );
  return rows.length ? rows[0].transporter_id : null;
};

export const markTransporterAvailable = async (transporterId: number): Promise<void> => {
  await db.query('UPDATE transporters SET is_available = TRUE WHERE id = ?', [
    transporterId,
  ]);
};
