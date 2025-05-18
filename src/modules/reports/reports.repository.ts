import { db } from '../../shared/database/mysql';
import {
  OrderReportFilters,
  OrderReportItem,
  OrderReportResult,
} from './types';
import { OrderStatus } from '../../shared/types/order';

export const getOrdersReport = async (filters: OrderReportFilters): Promise<OrderReportResult> => {
  const {
    status = null,
    transporterId = null,
    startDate = null,
    endDate = null,
    limit = 10,
    offset = 0,
  } = filters;

  const query = `
    SELECT
      o.id AS order_id,
      o.status,
      TIMESTAMPDIFF(HOUR, MIN(sh.changed_at), MAX(sh.changed_at)) AS delivery_time_hours,
      COALESCE(t.name, 'Not assigned') AS transporter,
      MIN(sh.changed_at) AS created_at,
      MAX(sh.changed_at) AS delivered_at
    FROM orders o
    LEFT JOIN order_assignments oa ON oa.order_id = o.id
    LEFT JOIN transporters t ON t.id = oa.transporter_id
    JOIN order_status_history sh ON sh.order_id = o.id
    WHERE 1 = 1
      AND (? IS NULL OR o.status = ?)
      AND (? IS NULL OR t.id = ?)
      AND (? IS NULL OR sh.changed_at >= ?)
      AND (? IS NULL OR sh.changed_at <= ?)
    GROUP BY o.id, o.status, t.name
    ORDER BY delivered_at DESC
    LIMIT ? OFFSET ?
  `;

  const params = [
    status, status,
    transporterId, transporterId,
    startDate, startDate,
    endDate, endDate,
    limit, offset
  ];

  const [rows]: any[] = await db.query(query, params);

  const data: OrderReportItem[] = rows.map((row: any) => ({
    orderId: row.order_id,
    status: row.status as OrderStatus,
    deliveryTimeHours: row.delivery_time_hours !== null ? Number(row.delivery_time_hours) : null,
    transporter: row.transporter,
    createdAt: row.created_at,
    deliveredAt: row.delivered_at,
  }));

  return {
    data,
    total: data.length
  };
};
