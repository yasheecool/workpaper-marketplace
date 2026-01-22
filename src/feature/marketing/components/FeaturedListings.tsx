import { Container } from '@/components/layout';
import { getFeaturedListings, SavedListingCard } from '@/feature/listing';

const FeaturedListings = async () => {
  const featuredListings = await getFeaturedListings();

  if (featuredListings === null) {
    return null;
  }

  return (
    <section className='py-18'>
      <Container>
        <h2 className='text-gray-800 text-3xl  font-semibold mb-8'>
          Browse Verified Workpaper Content
        </h2>

        <div className='flex flex-col justify-between gap-8 sm:flex-row items-center'>
          {featuredListings.map((listing) => (
            <SavedListingCard
              key={listing.id}
              listing={listing}
              showUnsaveButton={false}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
export default FeaturedListings;
