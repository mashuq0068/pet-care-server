import { z } from "zod";

const emailRegex = /.+@.+\..+/;

// Zod schema for creating a user
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z
      .string({ required_error: 'email is required' })
      .regex(emailRegex, { message: 'Please enter a valid email address' }),
    password: z.string({ required_error: 'password is required' }),
    image: z.string({ required_error: 'image is required' }),
    role: z.enum(['user', 'admin']).optional(),
    isPremium: z.boolean().optional(), 
    following: z.array(z.string()).optional(), 
    followers: z.array(z.string()).optional(),
  }),
});

// Zod schema for updating a user
export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .regex(emailRegex, { message: 'Please enter a valid email address' })
      .optional(),
    password: z.string().optional(),
    image: z.string().optional(), 
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    isPremium: z.boolean().optional(), 
    following: z.array(z.string()).optional(), 
    followers: z.array(z.string()).optional(), 
  }),
});