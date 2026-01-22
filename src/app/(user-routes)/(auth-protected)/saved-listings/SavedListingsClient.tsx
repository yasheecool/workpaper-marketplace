'use client';

import {
  type SavedListing,
  SavedListingCard,
  useSavedListings,
} from '@/feature/listing';
import { Loading } from '@/components/ui';

const SavedListingsClient = ({ listings }: { listings: SavedListing[] }) => {
  const { data, isError, isLoading } = useSavedListings(listings);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>There was an error loading your saved listings.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div>
        <p>
          You do not have any saved listings. Browse the marketplace to get
          started!
        </p>
      </div>
    );
  }

  const mappedListings = data.map((savedListing) => savedListing.listing);

  return (
    <div className='grid grid-cols-[repeat(2,350px)] justify-items-start gap-14 lg:grid-cols-[repeat(3,350px)]'>
      {mappedListings.map((listing) => (
        <SavedListingCard
          key={listing.id}
          listing={listing}
          showUnsaveButton={true}
        />
      ))}
    </div>
  );
};

export default SavedListingsClient;
