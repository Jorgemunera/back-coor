export type WebSocketMessage =
  | {
    type: 'status_update';
    orderId: number;
    newStatus: string;
    updatedAt: string;
  }
  | {
    type: 'new_order';
    order: {
      id: number;
      userId: number;
      destinationAddress: string;
      productType: string;
      dimensions: string;
      weight: number;
      status: string;
    };
  };
