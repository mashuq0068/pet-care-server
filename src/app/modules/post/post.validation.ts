import { z } from 'zod';

// Zod schema for creating a post
export const createPostValidationSchema = z.object({
  body: z.object({
    content: z.string({ required_error: 'Content is required' }),
    author: z.string().optional(),
    category: z.enum(['tip', 'story'], { required_error: 'Category is required' }),
    image: z.string().optional(),
    isPremium: z.boolean().optional(),
    upvotes: z.array(z.string()).optional(),
    downvotes: z.array(z.string()).optional(),
    comments: z.array(
      z.object({
        user: z.string({ required_error: 'User ID is required' }),
        content: z.string({ required_error: 'Comment content is required' }),
      }),
    ).optional(),
  }),
});

// Zod schema for updating a post
export const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    category: z.enum(['tip', 'story']).optional(),
    image: z.string().optional(),
    isPremium: z.boolean().optional(),
    upvotes: z.array(z.string()).optional(),
    downvotes: z.array(z.string()).optional(),
    comments: z.array(
      z.object({
        user: z.string({ required_error: 'User ID is required' }),
        content: z.string({ required_error: 'Comment content is required' }),
      }),
    ).optional(),
  }),
});
