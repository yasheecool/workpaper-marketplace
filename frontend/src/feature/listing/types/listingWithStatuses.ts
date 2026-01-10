import { type Listing } from '@/types/domain/listing';
import { type ListingStatuses } from './listingStatuses';
import { FirmReference } from '../types';

export type ListingWithStatuses = Omit<Listing, 'ownedByFirm'> &
  ListingStatuses & {
    ownedByFirm: FirmReference;
  };
