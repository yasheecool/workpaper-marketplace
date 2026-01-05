import { type Listing } from '@/types/domain/listing';
import { type ListingStatuses, type FirmReference } from './listingStatuses';

export type ListingWithStatuses = Omit<Listing, 'ownedByFirm'> &
  ListingStatuses & {
    ownedByFirm: FirmReference;
  };
