import { InstalledListingFromDb, InstalledListing } from './installedListing';
import { RequestStatus } from '@/types/domain/listing';

export type RequestedListingFromDb = Omit<
  InstalledListingFromDb,
  'installed_by_user'
> & {
  request_status: RequestStatus;
  requested_by_user: {
    last_name: string;
    first_name: string;
  };
};

export type RequestedListing = Omit<InstalledListing, 'installedByUser'> & {
  requestStatus: RequestStatus;
  requestedByUser: {
    lastName: string;
    firstName: string;
  };
};
