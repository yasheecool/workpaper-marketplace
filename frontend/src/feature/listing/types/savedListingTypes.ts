import { SavedListingRow } from '@/types/domain/listing';
import { type FirmReference } from './listingStatuses';

export type SavedListingFromDb = Omit<SavedListingRow, 'listing'> & {
  listing: {
    id: string;
    name: string;
    content_type: string;
    images_link: string[] | null;
    owned_by_firm: FirmReference;
  };
};

export type SavedListing = {
  id: string;
  listingId: string;
  savedByFirm: string;
  createdAt: string;
  listing: {
    id: string;
    name: string;
    contentType: string;
    imagesLink: string[] | null;
    ownedByFirm: FirmReference;
  };
};
