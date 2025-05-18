import { OrderStatus } from "shared/types/order";

export interface OrderReportFilters {
  status?: OrderStatus;
  transporterId?: number | null;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export interface OrderReportItem {
  orderId: number;
  status: OrderStatus;
  deliveryTimeHours: number | null;
  transporter: string;
  createdAt: string;
  deliveredAt: string | null;
}

export interface OrderReportResult {
  data: OrderReportItem[];
  total: number;
}

