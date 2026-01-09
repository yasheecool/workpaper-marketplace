import SavedListingCard from '@/feature/listing/components/SavedListingCard';
import { getSavedListings } from '@/feature/listing';

const SavedListings = async () => {
  const listings = await getSavedListings();

  return (
    <section className='py-12 text-gray-800 min-h-[calc(100vh-140px)]'>
      <div className='section-container text-gray-800'>
        <h1 className='text-2xl font-semibold mb-8 pb-4 border-b-2 border-base-300 '>
          Saved Listings
        </h1>

        {listings?.length === 0 ? (
          <div>
            <p>
              You don't have any saved listings. Browse the marketplace to get
              started!
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-[repeat(2,_350px)] justify-items-start gap-14 lg:grid-cols-[repeat(3,350px)]'>
            {listings!!.map((savedListing) => (
              <SavedListingCard
                key={savedListing.id}
                savedListing={savedListing}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedListings;
