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

export const listingVisibilityOptions: Record<ListingVisibility, string> = {
  public: 'Public',
  request_access: 'Request Access',
};

export type ListingStatus = Database['public']['Enums']['listing_status'];

export const listingStatusOptions: Record<ListingStatus, string> = {
  active: 'Active',
  deleted: 'Deleted',
};

export type Region = Database['public']['Enums']['region'];

export const regionOptions: Record<Region, string> = {
  australia: 'Australia',
  newZealand: 'New Zealand',
  unitedKingdom: 'United Kingdom',
  republicOfIreland: 'Republic of Ireland',
};

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

export type SavedListingRow =
  Database['public']['Tables']['saved_listing']['Row'];

export type ListingContentRow =
  Database['public']['Tables']['listing_content']['Row'];

export type ListingContent = {
  id: string;
  contentType: ListingType;
  workpaperType: WorkpaperType[];
  entityType: EntityType[];
  region: Region;
  description: string;
  name: string;
  createdAt: string;
  ownedByFirm: string;
};

export type ListingRequestRow =
  Database['public']['Tables']['listing_access_control']['Row'];
