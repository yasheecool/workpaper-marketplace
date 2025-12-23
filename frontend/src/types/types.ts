export type Firm = {
  id: string;
  shortId: string;
};

export type JWTMetadata = {
  uuid: string;
  workpapers: {
    firms: Firm[];
  };
  marketplace: {
    isAdmin: boolean;
  };
};

// This will be a user returned from the Workpapers API
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const REGIONS = {
  australia: 'Australia',
  newZealand: 'New Zealand',
  unitedKingdom: 'United Kingdom',
  republicOfIreland: 'Republic of Ireland',
} as const;

export type Region = keyof typeof REGIONS;

export const WORKPAPER_TYPES = {
  compliance: 'Compliance',
  itr: 'Income Tax Return',
  bas: 'Business Activity Statement',
  taxPlanning: 'Tax Planning',
  fbt: 'Fringe Tax Benefits',
} as const;

export type WorkpaperTypeKeys = (keyof typeof WORKPAPER_TYPES)[];

export const ENTITY_TYPES = {
  company: 'Company',
  individual: 'Individual',
  partnership: 'Partnership',
  trust: 'Trust',
} as const;

export type EntityType = (keyof typeof ENTITY_TYPES)[];

export const LISTING_VISIBILITY = {
  public: 'Public',
  request_access: 'Request Only',
  private: 'Private Invite',
} as const;

export type ListingVisibility = keyof typeof LISTING_VISIBILITY;

type Tag = string[];

export const CONTENT_TYPE = {
  calculation: 'Calculation',
  checklist: 'Checklist',
  procedure: 'Procedure',
  report: 'Report',
  wiki: 'Wiki',
} as const;

export type ContentType = keyof typeof CONTENT_TYPE;

export type BaseContent = {
  id: string; //used
  // createdAt: Date;
  // updatedAt: Date;
  // createdBy: User;
  // publishedAt: Date;
  // publishedBy: User;
  region: Region[]; //used
  name: string; //used
  description: string; //used
  tags: Tag[];
  contentType: ContentType;
  workpaperType: WorkpaperTypeKeys[]; // No options means its available for any type
  entityType: EntityType[]; // No options means its available for any type
};
