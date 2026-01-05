import { type RequestStatus } from '@/types/domain/listing';
import { ListingRow } from '@/types/domain/listing';

export type FirmReference = {
  id: string;
  name: string;
};

export type ListingStatusesFromDb = {
  saved_listing: {
    id: string;
    saved_by_firm: string;
  }[];
  installed_listing: {
    id: string;
    installed_by_firm: string;
  }[];
  listing_access_control: {
    id: string;
    requested_by_firm: string;
    request_status: RequestStatus;
  }[];
};

export type ListingStatuses = {
  isSaved: boolean;
  isInstalled: boolean;
  isRequested: boolean;
  requestStatus: RequestStatus | null;
};

export type ListingFromDb = ListingRow &
  ListingStatusesFromDb & {
    owned_by_firm: FirmReference;
  };

export type ListingFromDbWithStatuses = ListingFromDb & ListingStatuses;
