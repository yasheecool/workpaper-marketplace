import { Tables } from '@/types/supabase';

export type FirmRow = Tables<'firm'>;

export type FirmFromPayload = {
  id: string;
  shortId: string;
};

export type Firm = {
  id: string;
  name: string;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
  shortId: string;
};

export type FirmWithVendorFlag = Firm & {
  isVendor: boolean;
};

export function mapFirmFromDb(
  row: FirmRow & { vendor_profile?: null | { firm_id: string } }
): FirmWithVendorFlag {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    shortId: row.short_id,
    isVendor: !!row.vendor_profile,
  };
}

export function mapFirmsFromDb(rows: FirmRow[]): FirmWithVendorFlag[] {
  return rows.map(mapFirmFromDb);
}
