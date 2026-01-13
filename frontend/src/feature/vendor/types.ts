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
  listings: VendorListingFromDb[]
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

export * from '@/types/domain/vendor';
