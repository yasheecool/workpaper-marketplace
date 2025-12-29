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

export const entityTypeOptions: Record<EntityType, string> = {
  individual: 'Individual',
  company: 'Company',
  trust: 'Trust',
  partnership: 'Partnership',
};

export type ListingType = Database['public']['Enums']['listing_type'];

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

export const mapListingFromDb = (listing: ListingRow): Listing => {
  return {
    id: listing.id,
    createdAt: listing.created_at,
    updatedAt: listing.updated_at,
    name: listing.name,
    description: listing.description,
    longDescription: listing.long_description,
    gettingStartedSteps: listing.getting_started_steps,
    region: listing.region,
    contentType: listing.content_type,
    workpaperType: listing.workpaper_type,
    entityType: listing.entity_type,
    visibility: listing.visibility,
    status: listing.status,
    createdByUser: listing.created_by_user,
    updatedByUser: listing.updated_by_user,
    imagesLink: listing.images_link,
    ownedByFirm: listing.owned_by_firm,
  };
};

export const mapListingsFromDb = (listings: ListingRow[]): Listing[] => {
  return listings.map((listing) => mapListingFromDb(listing));
};
