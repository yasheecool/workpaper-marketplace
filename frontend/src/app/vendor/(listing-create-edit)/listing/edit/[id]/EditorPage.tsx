'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useListing } from '@/hooks/react-query/listing';
import ListingEditor from '@/app/vendor/components/ListingEditor';
import WhitelistEditor from '../../../../components/WhitelistEditor';
import Tabs from '@/components/ui/Tabs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Loading from '@/components/ui/Loading';

const EditorPage = () => {
  const { id } = useParams(); //receive the listingId from the URL params
  const [currentView, setCurrentView] = useState<'editor' | 'whitelist'>(
    'editor'
  );
  const { listing, error, isLoading } = useListing(String(id)); //fetch listing data by id

  const tabs = [
    {
      label: 'Editor',
      isActive: currentView === 'editor',
      onClick: () => setCurrentView('editor'),
    },
  ];

  //if listing is not public, add the whitelist tab
  if (listing?.visibility !== 'public') {
    tabs.push({
      label: 'Whitelist',
      isActive: currentView === 'whitelist',
      onClick: () => setCurrentView('whitelist'),
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className='error-message'>An error occurred: {error.message}</div>
    );
  }

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
        {currentView === 'editor' && (
          <ListingEditor listingData={listing} mode='edit' /> //pass the fetched listing data to the editor
        )}

        {currentView === 'whitelist' && <WhitelistEditor listing={listing} />}
      </div>
    </div>
  );
};
export default EditorPage;
