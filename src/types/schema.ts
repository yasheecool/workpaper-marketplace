import { z } from 'zod';

import {
  regionOptions,
  workpaperTypeOptions,
  listingTypeOptions,
  listingVisibilityOptions,
  entityTypeOptions,
} from './domain/listing';

export const listingInputSchema = z.object({
  id: z.string(), // needed by the backend to uniquely identify the listing

  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be under 50 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(300, 'Description must be under 300 characters'),

  longDescription: z
    .string()
    .max(2000, 'Long description must be under 2000 characters')
    .nullable()
    .transform((value) => (value === '' ? null : value)),

  gettingStartedSteps: z
    .string()
    .max(1500, 'Getting started steps must be under 1500 characters')
    .nullable()
    .transform((value) => (value === '' ? null : value)),

  region: z.enum(Object.keys(regionOptions) as [keyof typeof regionOptions]),

  workpaperType: z
    .array(
      z.enum(
        Object.keys(workpaperTypeOptions) as [keyof typeof workpaperTypeOptions]
      )
    )
    .min(1, 'Select at least one workpaper type'),

  entityType: z
    .array(
      z.enum(Object.keys(entityTypeOptions) as [keyof typeof entityTypeOptions])
    )
    .min(1, 'Select at least one entity type'),

  contentType: z.enum(
    Object.keys(listingTypeOptions) as [keyof typeof listingTypeOptions]
  ),

  imagesLink: z
    .array(z.string())
    .nullable()
    .transform((value) => (value === undefined ? null : value)),

  visibility: z
    .enum(
      Object.keys(listingVisibilityOptions) as [
        keyof typeof listingVisibilityOptions,
      ]
    )
    .transform((val) => val || 'public'), // default to public if not provided
});

export type ListingInputType = z.infer<typeof listingInputSchema>;

export const vendorProfileFormSchema = z.object({
  firmEmail: z.string().email(),
  firmLogo: z.string().url().nullable(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  websiteUrl: z.string().url().nullable(),
});

export type VendorProfileType = z.infer<typeof vendorProfileFormSchema> & {};
