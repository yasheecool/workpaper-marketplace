'use client';
import { useParams } from 'next/navigation';
import ListingEditor from '@/feature/listing/components/ListingEditor';
import useListingContent from '@/feature/listing/hooks/useListingContent';
import { Tabs, Loading, Breadcrumbs } from '@/components/ui';

//Client component because data already available in query cache, no need to fetch again
const CreatePage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useListingContent(); //fetch the content details from the listing content hook using the id from params

  if (isLoading) {
    return <Loading />;
  }
  if (error || !data) {
    return <div>Error loading firm content.</div>;
  }

  const currentContent = data.find((content) => content.id === id);

  if (!currentContent) {
    return <div>Content not found.</div>;
  }

  return (
    <div className='flex flex-col h-full'>
      <Breadcrumbs
        breadcrumbs={[
          { target: '/vendor/listings', label: 'Listings' },
          { target: '/vendor/content-selection', label: 'Create' },
          { target: '', label: currentContent.name || '' },
        ]}
      />

      <Tabs
        tabs={[
          {
            label: 'Editor',
            isActive: true,
            href: '',
          },
        ]}
      />

      <div className='px-6 py-8 overflow-auto'>
        <ListingEditor listingData={currentContent} mode='create' />
      </div>
    </div>
  );
};
export default CreatePage;
