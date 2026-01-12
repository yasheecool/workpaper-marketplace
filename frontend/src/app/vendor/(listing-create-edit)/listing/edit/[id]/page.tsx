import EditorPage from './EditorPage';
import { getListingById } from '@/feature/listing';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const listing = await getListingById(id);

  if (!listing) {
    return <div className='error-message'>Listing not found</div>;
  }

  return (
    <div className='flex flex-col h-full'>
      <Breadcrumbs
        breadcrumbs={[
          { target: '/vendor/listings', label: 'Listings' },
          { target: '', label: listing?.name || '' },
        ]}
      />
      <EditorPage listingId={id} listing={listing} />
    </div>
  );
};
export default page;
