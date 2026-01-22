import { type ListingRequestRow, RequestStatus, ListingType } from '../listing';

// ============================================================================
// Vendor Listing Types
// ============================================================================

export type VendorListingFromDb = {
  id: string;
  name: string;
  content_type: string;
  updated_at: string;
  updated_by_user: {
    first_name: string;
    last_name: string;
  };
  visibility: string;
  status: string;
};

export type VendorListing = {
  id: string;
  name: string;
  contentType: string;
  updatedAt: string;
  updatedByUser: {
    firstName: string;
    lastName: string;
  };
  visibility: string;
  status: string;
};

export function mapVendorListingsFromDb(
  listings: VendorListingFromDb[],
): VendorListing[] {
  return listings.map((item) => ({
    id: item.id,
    name: item.name,
    contentType: item.content_type,
    updatedAt: item.updated_at,
    updatedByUser: {
      firstName: item.updated_by_user.first_name,
      lastName: item.updated_by_user.last_name,
    },
    visibility: item.visibility,
    status: item.status,
  }));
}

// ============================================================================
// Listing Request Types (Base)
// ============================================================================

export type ListingRequestFromDb = Omit<
  ListingRequestRow,
  'listing' | 'requested_by_firm' | 'requested_by_user' | 'actioned_by_user'
> & {
  listing: {
    owned_by_firm: string;
    name: string;
    id: string;
    content_type: ListingType;
  };
  requested_by_firm: {
    name: string;
  };
  requested_by_user: {
    first_name: string;
    last_name: string;
  };
  actioned_by_user: {
    first_name: string;
    last_name: string;
  } | null;
};

export type ListingRequestBase = {
  id: string;
  listing: {
    owned_by_firm: string;
    name: string;
    id: string;
    contentType: ListingType;
  };
  requestingFirm: {
    name: string;
  };
  requestingUser: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
};

// ============================================================================
// Pending Request (uses Exclude to narrow status)
// ============================================================================

export type PendingListingRequest = ListingRequestBase & {
  requestStatus: Extract<RequestStatus, 'pending'>;
  actionedBy: null;
  actionTime: null;
};

// ============================================================================
// Completed Request (uses Exclude to narrow status)
// ============================================================================

export type CompletedListingRequest = ListingRequestBase & {
  requestStatus: Exclude<RequestStatus, 'pending'>;
  actionedBy: {
    firstName: string;
    lastName: string;
  };
  actionTime: string;
};

// ============================================================================
// Mappers
// ============================================================================

export const mapListingRequestFromDb = (request: ListingRequestFromDb) => {
  const base = {
    id: request.id,
    listing: {
      owned_by_firm: request.listing.owned_by_firm,
      name: request.listing.name,
      id: request.listing.id,
      contentType: request.listing.content_type,
    },
    requestingFirm: {
      name: request.requested_by_firm.name,
    },
    requestingUser: {
      firstName: request.requested_by_user.first_name,
      lastName: request.requested_by_user.last_name,
    },
    createdAt: request.created_at,
  };

  if (request.request_status === 'pending') {
    return {
      ...base,
      requestStatus: 'pending' as const,
      actionedBy: null,
      actionTime: null,
    } as PendingListingRequest;
  }

  return {
    ...base,
    requestStatus: request.request_status,
    actionedBy: {
      firstName: request.actioned_by_user!.first_name,
      lastName: request.actioned_by_user!.last_name,
    },
    actionTime: request.actioned_at,
  } as CompletedListingRequest;
};

export * from '@/types/domain/vendor';
