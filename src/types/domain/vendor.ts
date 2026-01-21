import { Database } from '../supabase';

export type VendorProfileRow =
  Database['public']['Tables']['vendor_profile']['Row'] & {
    firm: { name: string };
  };

export type VendorProfile = {
  createdAt: string;
  description: string;
  firmEmail: string;
  firmId: string;
  firmLogo: string | null;
  id: string;
  status: Database['public']['Enums']['vendor_status'];
  vendorSince: string | null;
  websiteUrl: string | null;
  firmName: string;
};

export function mapVendorProfileFromDb(row: VendorProfileRow): VendorProfile {
  return {
    createdAt: row.created_at,
    description: row.description,
    firmEmail: row.firm_email,
    firmId: row.firm_id,
    firmLogo: row.firm_logo,
    id: row.id,
    status: row.status,
    vendorSince: row.vendor_since,
    websiteUrl: row.website_url,
    firmName: row.firm.name,
  };
}
