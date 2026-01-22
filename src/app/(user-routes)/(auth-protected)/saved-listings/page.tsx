import { getSavedListings } from '@/feature/listing';
import SavedListingsClient from './SavedListingsClient';

const SavedListings = async () => {
  const savedListingRecords = await getSavedListings();

  return (
    <section className='py-12 text-gray-800 min-h-[calc(100vh-140px)]'>
      <div className='section-container text-gray-800'>
        <h1 className='text-2xl font-semibold mb-8 pb-4 border-b-2 border-base-300 '>
          Saved Listings
        </h1>
        <SavedListingsClient listings={savedListingRecords} />
      </div>
    </section>
  );
};
export default SavedListings;
