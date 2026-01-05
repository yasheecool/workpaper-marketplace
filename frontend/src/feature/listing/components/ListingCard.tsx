import { type MarketplaceListing } from '../types';
import ListingCardImage from './ListingCardImage';
import ListingCardInfo from './ListingCardInfo';
import ListingCardActions from './ListingCardActions';

interface ListingCardProps {
  listing: MarketplaceListing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <div className='grid grid-cols-[2fr_3fr_minmax(40px,220px)] gap-4 p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow ease-in-out bg-white'>
      <ListingCardImage imagesLink={listing.imagesLink} name={listing.name} />
      <ListingCardInfo
        id={listing.id}
        name={listing.name}
        description={listing.description}
        contentType={listing.contentType}
        firmName={listing.ownedByFirm.name}
        vendorId={listing.ownedByFirm.id}
      />
      <ListingCardActions
        id={listing.id}
        updatedAt={listing.updatedAt}
        visibility={listing.visibility}
        isSaved={listing.isSaved}
        isInstalled={listing.isInstalled}
        isRequested={listing.isRequested}
        requestStatus={listing.requestStatus}
      />
    </div>
  );
};

export default ListingCard;
