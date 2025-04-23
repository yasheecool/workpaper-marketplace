import SavedListingCard from './SavedListingCard';

const SavedListings = () => {
  return (
    <section className='py-12 text-gray-800'>
      <div className='section-container text-gray-800'>
        <h1 className='text-2xl font-semibold mb-8'>Saved Listings</h1>
        <div className='grid grid-cols-[repeat(2,_350px)] justify-items-start gap-14 lg:grid-cols-[repeat(3,_350px)]'>
          <SavedListingCard />
          <SavedListingCard />
          <SavedListingCard />
        </div>
      </div>
    </section>
  );
};
export default SavedListings;
