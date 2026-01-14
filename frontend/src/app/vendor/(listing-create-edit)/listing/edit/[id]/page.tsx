import {
  getListingById,
  ListingEditor,
  WhitelistEditor,
} from '@/feature/listing';
import { Tabs, Breadcrumbs } from '@/components/ui';

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const listing = await getListingById(id);
  const { view = 'editor' } = await searchParams;

  if (!listing) {
    return <div className='error-message'>Listing not found</div>;
  }

  const tabs = [
    {
      label: 'Editor',
      isActive: view === 'editor',
      href: '?view=editor',
    },
    listing.visibility !== 'public' && {
      label: 'Whitelist',
      isActive: view === 'whitelist',
      href: '?view=whitelist',
    },
  ].filter((tab): tab is { label: string; isActive: boolean; href: string } =>
    Boolean(tab)
  );

  return (
    <div className='flex flex-col h-full'>
      <Breadcrumbs
        breadcrumbs={[
          { target: '/vendor/listings', label: 'Listings' },
          { target: '', label: listing?.name || '' },
        ]}
      />
      <Tabs tabs={tabs} />

      <div className='px-6 py-8 overflow-auto'>
        {view === 'editor' && (
          <ListingEditor
            listingData={{ ...listing, imagesLink: listing.imagesLink ?? [] }}
            mode='edit'
          />
        )}

        {/* TODO: Enable whitelist editor */}
        {view === 'whitelist' && <WhitelistEditor listing={listing} />}
      </div>
    </div>
  );
};
export default page;
