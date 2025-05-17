import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateSchema = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: 'Invalid data',
        issues: result.error.format(),
      });
      return;
    }

    req.body = result.data;
    next();
  };
};
