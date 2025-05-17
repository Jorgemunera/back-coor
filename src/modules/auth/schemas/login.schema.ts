import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('email invalid'),
  password: z.string().min(1, 'password invalid'),
});
