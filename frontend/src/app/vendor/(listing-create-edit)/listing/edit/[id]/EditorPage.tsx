'use client';
import { useState } from 'react';
import ListingEditor from '@/app/vendor/components/ListingEditor';
import WhitelistEditor from '@/app/vendor/components/WhitelistEditor';
import Tabs from '@/components/ui/Tabs';
import Loading from '@/components/ui/Loading';
import { type ListingWithStatuses, useListingById } from '@/feature/listing';

type Props = {
  listingId: string;
  listing: ListingWithStatuses;
};

const EditorPage = ({ listingId, listing: initialData }: Props) => {
  const [currentView, setCurrentView] = useState<'editor' | 'whitelist'>(
    'editor'
  );

  const {
    data: listing,
    isLoading,
    error,
  } = useListingById(listingId, initialData);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !listing) {
    return (
      <div className='error-message'>An error occurred: {error?.message}</div>
    );
  }

  const tabs = [
    {
      label: 'Editor',
      isActive: currentView === 'editor',
      onClick: () => setCurrentView('editor'),
    },
    listing.visibility !== 'public' && {
      label: 'Whitelist',
      isActive: currentView === 'whitelist',
      onClick: () => setCurrentView('whitelist'),
    },
  ].filter(
    (tab): tab is { label: string; isActive: boolean; onClick: () => void } =>
      Boolean(tab)
  );

  return (
    <>
      <Tabs tabs={tabs} />

      <div className='px-6 py-8 overflow-auto'>
        {currentView === 'editor' && (
          <ListingEditor
            listingData={{
              ...listing,
              imagesLink: listing.imagesLink ?? [],
            }}
            mode='edit'
          />
        )}

        {/* TODO: Enable whitelist editor */}
        {currentView === 'whitelist' && <WhitelistEditor listing={listing} />}
      </div>
    </>
  );
};

export default EditorPage;
