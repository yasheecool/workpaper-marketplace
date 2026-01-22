import { z } from 'zod';

export const vendorProfileFormSchema = z.object({
  firmEmail: z.string().email(),
  firmLogo: z.string().url().nullable(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  websiteUrl: z.string().url().nullable(),
});

export type VendorProfileType = z.infer<typeof vendorProfileFormSchema> & {};
