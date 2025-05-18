import { Request, Response } from 'express';
import { clearReportsCacheUseCase } from './usecases/clearCacheReports';
import { clearOrderStatusCacheUseCase } from './usecases/clearCacheOrderStatus';
import { getAllCacheKeysUseCase } from './usecases/getAllKeys';

export const clearReportsCacheController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const count = await clearReportsCacheUseCase();
    res.status(200).json({ message: 'Report cache cleared', count });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const clearOrderStatusCacheController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const count = await clearOrderStatusCacheUseCase();
    res.status(200).json({ message: 'Order status cache cleared', count });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCacheKeysController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const keys = await getAllCacheKeysUseCase();
    res.status(200).json({ keys });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
