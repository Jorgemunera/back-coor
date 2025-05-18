import { Request, Response } from 'express';
import { getReportsUseCase } from './usecases/getReports';

export const getReportsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      status,
      transporterId,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {
      status: status as any,
      transporterId: transporterId ? Number(transporterId) : undefined,
      startDate: startDate as string,
      endDate: endDate as string,
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    };

    const result = await getReportsUseCase(filters);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
