import { Request, Response } from 'express';
import { getEnabledTransportersUseCase } from './usecases/getEnabledTransporters';
import { getAllTransportersUseCase } from './usecases/getAllTransporters';

export const getEnabledTransportersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const transporters = await getEnabledTransportersUseCase();
    res.status(200).json({ data: transporters });
  } catch (err: any) {
    console.error('Error fetching transporters:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllTransportersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const transporters = await getAllTransportersUseCase();
    res.status(200).json({ data: transporters });
  } catch (err: any) {
    console.error('Error fetching all transporters:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
