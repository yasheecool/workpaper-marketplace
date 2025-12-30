import { type Database } from '../supabase';

export type WorkpaperType = Database['public']['Enums']['workpaper_type'];

export const workpaperTypeOptions: Record<WorkpaperType, string> = {
  compliance: 'Compliance',
  itr: 'Income Tax Return',
  bas: 'Business Activity Statement',
  taxPlanning: 'Tax Planning',
  fbt: 'Fringe Benefits Tax',
};

export type EntityType = Database['public']['Enums']['entity_type'];

export type RequestStatus = Database['public']['Enums']['request_status'];

export const entityTypeOptions: Record<EntityType, string> = {
  individual: 'Individual',
  company: 'Company',
  trust: 'Trust',
  partnership: 'Partnership',
};

export type ListingType = Database['public']['Enums']['listing_type']; // content_type

export const listingTypeOptions: Record<ListingType, string> = {
  calculation: 'Calculation',
  checklist: 'Checklist',
  wiki: 'Wiki',
  procedure: 'Procedure',
  report: 'Report',
};

export type ListingVisibility =
  Database['public']['Enums']['listing_visibility'];

export type ListingStatus = Database['public']['Enums']['listing_status'];

export type Region = Database['public']['Enums']['region'];

export type ListingRow = Database['public']['Tables']['listing']['Row'];

export type Listing = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  longDescription: string | null;
  gettingStartedSteps: string | null;
  region: Region;
  contentType: ListingType;
  workpaperType: WorkpaperType[];
  entityType: EntityType[];
  imagesLink: string[] | null;
  visibility: ListingVisibility;
  status: ListingStatus;
  ownedByFirm: string;
  updatedByUser: string;
  createdByUser: string;
};
