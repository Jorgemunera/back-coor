export interface OrderStatusHistory {
  id: number;
  orderId: number;
  status: 'En espera' | 'En tránsito' | 'Entregado';
  changedAt: Date;
}
