import { Request, Response } from 'express';
import { getOrdersUseCase } from './usecases/getOrders';
import { getOrderStatusUseCase } from './usecases/getOrderStatus';
import { getOrderHistoryUseCase } from './usecases/getOrderHistory';
import { createOrderUseCase } from './usecases/createOrder';
import { updateOrderStatusUseCase } from './usecases/updateOrderStatus';
import { OrderStatus } from '../../shared/types/order';

export const getOrdersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const orders = await getOrdersUseCase(status as OrderStatus);
    res.status(200).json({ data: orders });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getOrderStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const orderId = Number(id);

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const status = await getOrderStatusUseCase(orderId);
    res.status(200).json({ status });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const getOrderHistoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const history = await getOrderHistoryUseCase(orderId);
    res.status(200).json({ history });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const { weight, dimensions, productType, destinationAddress } = req.body;

    const orderId = await createOrderUseCase({
      userId,
      weight,
      dimensions,
      productType,
      destinationAddress,
    });

    res.status(201).json({ orderId, message: 'Orden creada correctamente' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateOrderStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    const { status } = req.body;

    if (!orderId || typeof status !== 'string') {
      res.status(400).json({ error: 'status or orderId inválido' });
      return;
    }

    await updateOrderStatusUseCase(orderId, status as OrderStatus);

    res.status(200).json({ message: 'status success update' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
