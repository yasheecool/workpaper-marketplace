'use client';

import Image from 'next/image';

interface ListingCardImageProps {
  imagesLink: string[] | null;
  name: string;
}

const ListingCardImage = ({ imagesLink, name }: ListingCardImageProps) => {
  return (
    <div className='relative rounded-md flex justify-center items-center border-[0.5px] border-gray-300'>
      {imagesLink && imagesLink.length > 0 ? (
        <Image
          src={'/undraw_approve.svg'}
          alt={`${name} image`}
          fill
          className='object-contain border-[0.5px] border-gray-300'
        />
      ) : (
        <div className='text-sm flex items-center justify-center'>
          No Image Available
        </div>
      )}
    </div>
  );
};

export default ListingCardImage;
