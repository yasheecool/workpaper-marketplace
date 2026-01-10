import {
  type ListingStatusesFromDb,
  type ListingStatuses,
} from './listingStatuses';
import { FirmReference } from '../types';

export type MarketplaceListingFromDb = {
  id: string;
  name: string;
  description: string;
  content_type: string;
  updated_at: string;
  images_link: string[];
  visibility: string;
  owned_by_firm: FirmReference;
} & ListingStatusesFromDb;

export type MarketplaceListingFromDbWithStatuses = MarketplaceListingFromDb &
  ListingStatuses;

export type MarketplaceListing = {
  id: string;
  name: string;
  description: string;
  contentType: string;
  updatedAt: string;
  imagesLink: string[];
  visibility: string;
  ownedByFirm: FirmReference;
} & ListingStatuses;
