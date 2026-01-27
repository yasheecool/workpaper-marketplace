import { type MarketplaceListing } from '../types';
import ListingCardImage from './ListingCardImage';
import ListingCardInfo from './ListingCardInfo';
import ListingCardActions from './ListingCardActions';
import { getImageUrl } from '@/lib/supabase/storage';
import { useState, useEffect } from 'react';

interface ListingCardProps {
  listing: MarketplaceListing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const [imagePath, setImagePath] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (listing.imagesLink && listing.imagesLink.length > 0) {
        const url = await getImageUrl(
          listing.imagesLink[0],
          'LISTING_IMAGES_BUCKET',
        );
        setImagePath([url]);
      }
    };

    fetchImageUrl();
  }, [listing.imagesLink]);

  return (
    <div className='grid grid-cols-[2fr_3fr_minmax(40px,220px)] gap-4 p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow ease-in-out bg-white'>
      <ListingCardImage
        imagesPath={imagePath || ['/undraw_files.svg']}
        name={listing.name}
      />
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
