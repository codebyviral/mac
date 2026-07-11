import * as z from 'zod';

export const userValidation = z.object({
  username: z.string().min(2, 'username must have at least 2 characters'),
  email: z.email(),
  password: z.string().min(5, 'password must have at least 5 characters'),
});
