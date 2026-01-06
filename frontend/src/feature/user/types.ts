import { z } from 'zod';

export const userProfileFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('A valid email is required'),
  profileImage: z.string().nullable(),
});

export type UserProfileType = z.infer<typeof userProfileFormSchema>;
