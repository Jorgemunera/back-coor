import { Request, Response } from 'express';
import { getAllRoutesUseCase } from './usecases/getAllRoutes';

export const getAllRoutesController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const routes = await getAllRoutesUseCase();
    res.status(200).json({ data: routes });
  } catch (err: any) {
    console.error('Error fetching routes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
