'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ListingEditor from '@/app/vendor/components/ListingEditor';
import { useFirmContent } from '@/hooks/react-query/firm';
import Tabs from '@/components/ui/Tabs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Loading from '@/components/ui/Loading';

const CreatePage = () => {
  const [currentView, setCurrentView] = useState<'editor' | 'whitelist'>(
    'editor'
  );
  const { data: firmContent, error, isLoading } = useFirmContent(); // fetch the available content for creation again from react query

  const { id } = useParams(); //receive the listingId from the URL params

  const currentContent = firmContent?.data.find(
    (content: any) => content.id === id
  ); //find the content by id from the react query cache/data which is then passed to the listingEditor

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error loading firm content.</div>;
  }

  return (
    <div className='flex flex-col h-full'>
      <Breadcrumbs
        breadcrumbs={[
          { target: '/vendor/listings', label: 'Listings' },
          { target: '/vendor/content-selection', label: 'Create' },
          { target: '', label: currentContent?.name || '' },
        ]}
      />
      <Tabs
        tabs={[
          {
            label: 'Editor',
            isActive: true,
            onClick: () => {},
          },
        ]}
      />

      <div className='px-6 py-8 overflow-auto'>
        {currentView === 'editor' && (
          <ListingEditor listingData={currentContent} mode='create' />
        )}
      </div>
    </div>
  );
};
export default CreatePage;
