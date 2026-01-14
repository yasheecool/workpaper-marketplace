import ListingEditor from '@/feature/listing/components/ListingEditor';
import WhitelistEditor from '@/feature/listing/components/WhitelistEditor';
import { Loading } from '@/components/ui';
import { type ListingWithStatuses, useListingById } from '@/feature/listing';

type Props = {
  listingId: string;
  listing: ListingWithStatuses;
};

const EditorPage = ({ listingId, listing: initialData }: Props) => {
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

  // const tabs = [
  //   {
  //     label: 'Editor',
  //     isActive: currentView === 'editor',
  //     href: '?view=editor',
  //   },
  //   listing.visibility !== 'public' && {
  //     label: 'Whitelist',
  //     isActive: currentView === 'whitelist',
  //     href: '?view=whitelist',
  //   },
  // ].filter(
  //   (tab): tab is { label: string; isActive: boolean; onClick: () => void } =>
  //     Boolean(tab)
  // );

  return (
    <>
      {/* <Tabs tabs={tabs} /> */}

      <div className='px-6 py-8 overflow-auto'>
        {/* {currentView === 'editor' && (
          <ListingEditor
            listingData={{
              ...listing,
              imagesLink: listing.imagesLink ?? [],
            }}
            mode='edit'
          />
        )} */}

        {/* TODO: Enable whitelist editor */}
        {/* {currentView === 'whitelist' && <WhitelistEditor listing={listing} />} */}
      </div>
    </>
  );
};

export default EditorPage;
