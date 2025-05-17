import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5, 'name is required'),
  email: z.string().email('email invalid'),
  password: z.string().min(8, 'password must be at least 8 characters long'),
});
