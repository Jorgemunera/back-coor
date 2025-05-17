import { z } from 'zod';

export const createOrderSchema = z.object({
  weight: z.number().positive('The weight must be a positive number'),
  dimensions: z.string().min(5, 'Wrong dimensions format'),
  productType: z.string().min(1, 'Product type is required'),
  destinationAddress: z.string().min(4, 'Wrong address format'),
});
