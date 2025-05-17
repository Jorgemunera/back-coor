import { z } from 'zod';

export const assignTransporterSchema = z.object({
  routeId: z.number().int().positive('Route ID required and must be a positive integer'),
  transporterId: z.number().int().positive('Transporter ID required and must be a positive integer'),
});
