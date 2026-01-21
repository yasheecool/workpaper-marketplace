'use client';

import { capitalize } from 'lodash';
import Link from 'next/link';

interface ListingCardInfoProps {
  id: string;
  name: string;
  description: string;
  contentType: string;
  firmName: string;
  vendorId: string;
}

const ListingCardInfo = ({
  id,
  name,
  description,
  contentType,
  firmName,
  vendorId,
}: ListingCardInfoProps) => {
  return (
    <div>
      <Link href={`/listing/${id}`}>
        <h2 className='font-semibold cursor-pointer hover:underline'>
          {name}{' '}
          <span className='badge badge-sm badge-primary'>
            {capitalize(contentType)}
          </span>
        </h2>
      </Link>

      <p className='text-xs mb-4 text-gray-600'>
        By{' '}
        <Link
          href={`/vendor-details/${vendorId}`}
          className='text-xs text-gray-600 hover:underline'
        >
          <span className='link link-hover font-semibold'>{firmName}</span>
        </Link>
      </p>

      <p className='text-sm text-gray-600 line-clamp-3'>{description}</p>
    </div>
  );
};

export default ListingCardInfo;
