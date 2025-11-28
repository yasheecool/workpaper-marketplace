import { z } from 'zod';
import {
  REGIONS,
  WORKPAPER_TYPES,
  CONTENT_TYPE,
  ENTITY_TYPES,
  LISTING_VISIBILITY,
} from '@/types/Cimplico_Marketplace_Typescript_Definitions';

export const listingInputSchema = z.object({
  id: z.string(), //needed by the backend to uniquely identify the listing

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
    .optional()
    .nullable(),

  gettingStartedSteps: z
    .string()
    .max(1500, 'Getting started steps must be under 1500 characters')
    .optional(),

  region: z.enum(Object.keys(REGIONS) as [keyof typeof REGIONS]),

  workpaperType: z
    .array(
      z.enum(Object.keys(WORKPAPER_TYPES) as [keyof typeof WORKPAPER_TYPES])
    )
    .min(1, 'Select at least one workpaper type'),

  entityType: z
    .array(z.enum(Object.keys(ENTITY_TYPES) as [keyof typeof ENTITY_TYPES]))
    .min(1, 'Select at least one entity type'),

  contentType: z.enum(Object.keys(CONTENT_TYPE) as [keyof typeof CONTENT_TYPE]),

  visibility: z.enum(
    Object.keys(LISTING_VISIBILITY) as [keyof typeof LISTING_VISIBILITY],
    {
      errorMap: () => ({ message: 'Please select a visibility option' }),
    }
  ),
  imagesLink: z.array(z.string()),
  tags: z.array(z.string()),
});

export type ListingInputType = z.infer<typeof listingInputSchema>;

export type ListingType = ListingInputType & {
  createdAt: string;
  updatedAt: string;
  ownerFirmId: string;
  createdBy: string;
  status: 'active' | 'deleted';
  updatedBy: Record<string, any>;
  ownedByFirm: {
    firmName: string;
    firmId: string;
  };
};

export const vendorProfileFormSchema = z.object({
  firmEmail: z.string().email(),
  firmLogo: z.string().url().optional().nullable(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  websiteUrl: z.string().url(),
  linkedInUrl: z.string().url().optional().nullable(),
});

export type VendorProfileType = z.infer<typeof vendorProfileFormSchema> & {};

export const userProfileFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email(),
  profileImage: z.string().url().optional().nullable(),
});

export type UserProfileType = z.infer<typeof userProfileFormSchema>;
