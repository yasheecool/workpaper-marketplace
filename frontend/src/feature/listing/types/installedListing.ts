import { FirmReference } from './listingStatuses';

export type InstalledListingFromDb = {
  id: string;
  created_at: string;
  installed_by_user: {
    last_name: string;
    first_name: string;
  };
  listing: {
    id: string;
    name: string;
    content_type: string;
    owned_by_firm: FirmReference;
  };
};

export type InstalledListing = {
  id: string;
  createdAt: string;
  installedByUser: {
    lastName: string;
    firstName: string;
  };
  listing: {
    id: string;
    name: string;
    contentType: string;
    ownedByFirm: FirmReference;
  };
};
