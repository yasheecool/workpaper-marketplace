import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import users from '../../mockData/users.js';
import firms from '../../mockData/firms.js';
import vendorProfiles from '../../mockData/vendorProfiles.js';
import listings from '../../mockData/listings.js';
import firmUsers from '../../mockData/firmUsers.js';

// import { Database } from '@/types/supabase.js';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

async function seed() {
  const mappedUsers = users.map((user) => ({
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    profile_image: user.profileImage,
    is_admin: user.isAdmin,
  }));

  const { data: userData, error: userError } = await supabase
    .from('user')
    .upsert(mappedUsers)
    .select();

  if (userError) {
    console.error('Error seeding users:', userError);
  } else console.log('Seeded users:', userData.length);

  const { data: firmData, error: firmError } = await supabase
    .from('firm')
    .upsert(firms)
    .select();

  if (firmError) {
    console.error('Error seeding firms:', firmError);
  } else console.log('Seeded firms:', firmData.length);

  const { data: firmUserData, error: firmUserError } = await supabase
    .from('firm_user')
    .upsert(firmUsers)
    .select();

  if (firmUserError) {
    console.error('Error seeding firm users:', firmUserError);
  } else console.log('Seeded firm users:', firmUserData.length);

  const mappedVendorProfiles = vendorProfiles.map((profile) => ({
    firm_id: profile.firmId,
    firm_email: profile.firmEmail,
    description: profile.description,
    website_url: profile.websiteUrl,
    vendor_since: profile.vendorSince,
    status: profile.status,
  }));

  const { data: vendorData, error: vendorError } = await supabase
    .from('vendor_profile')
    .upsert(mappedVendorProfiles)
    .select();

  if (vendorError) {
    console.error('Error seeding vendor profiles:', vendorError);
  } else console.log('Seeded vendor profiles:', vendorData.length);

  const mappedListings = listings.map((listing) => ({
    id: listing.id,
    created_at: listing.createdAt,
    updated_at: listing.updatedAt,
    name: listing.name,
    description: listing.description,
    long_description: listing.longDescription,
    getting_started_steps: listing.gettingStartedSteps,
    region: listing.region,
    content_type: listing.contentType,
    workpaper_type: listing.workpaperType,
    entity_type: listing.entityType,
    images_link: listing.imagesLink,
    visibility: listing.visibility,
    owned_by_firm: listing.ownerFirmId,
    updated_by_user: listing.updatedByUserId,
    created_by_user: listing.createdByUserId,
  }));

  const { data: listingData, error: listingError } = await supabase
    .from('listing')
    .upsert(mappedListings)
    .select();

  if (listingError) {
    console.error('Error seeding listings:', listingError);
  } else console.log('Seeded listings:', listingData.length);
}

await seed().then(() => {
  console.log('Seeding completed');
  process.exit(0);
});
