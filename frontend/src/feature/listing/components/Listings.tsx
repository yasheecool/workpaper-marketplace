import { type MarketplaceListing } from '@/feature/listing/types';
import ListingCard from './ListingCard';

const Listings = ({ listings }: { listings: MarketplaceListing[] }) => {
  {
    listings.length === 0 && (
      <div>
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
