import { type MarketplaceListing } from '@/feature/listing/types';
import ListingCard from './ListingCard';

const Listings = ({ listings }: { listings: MarketplaceListing[] }) => {
  if (listings.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        No listings found. Try using a new set of filters or search term!
      </div>
    );
  }

  return (
    <>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </>
  );
};
export default Listings;
