export type MarketplaceListingFromDb = {
  id: string;
  name: string;
  description: string;
  content_type: string;
  updated_at: string;
  images_link: string[];
  visibility: string;
  owned_by_firm: {
    id: string;
    name: string;
  };
};

export type MarketplaceListing = {
  id: string;
  name: string;
  description: string;
  contentType: string;
  updatedAt: string;
  imagesLink: string[];
  visibility: string;
  ownedByFirm: {
    id: string;
    name: string;
  };
};

export const mapMarketplaceListingFromDb = (
  listing: MarketplaceListingFromDb
): MarketplaceListing => {
  return {
    id: listing.id,
    name: listing.name,
    description: listing.description,
    contentType: listing.content_type,
    updatedAt: listing.updated_at,
    imagesLink: listing.images_link,
    visibility: listing.visibility,
    ownedByFirm: {
      id: listing.owned_by_firm.id,
      name: listing.owned_by_firm.name,
    },
  };
};

export const mapMarketplaceListingsFromDb = (
  listings: MarketplaceListingFromDb[]
): MarketplaceListing[] => {
  return listings.map(mapMarketplaceListingFromDb);
};
