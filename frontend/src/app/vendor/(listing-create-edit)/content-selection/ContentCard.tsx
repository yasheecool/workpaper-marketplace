import Link from 'next/link';
import { type ListingContent } from '@/feature/listing';
import { capitalize } from 'lodash';

const ContentCard = ({ content }: { content: ListingContent }) => {
  return (
    <div className='border border-base-300 rounded-md shadow-sm p-4 bg-white hover:shadow-md transition-all flex flex-col gap-1 mr-4'>
      <p className='badge badge-soft badge-primary badge-sm'>
        {capitalize(content.contentType)}
      </p>

      <h3 className='text-lg font-semibold'>{content.name}</h3>
      <p className='text-sm text-gray-600'>{content.description}</p>

      <div className='flex gap-6 items-center mt-3'>
        <p className='text-sm text-gray-500'>
          <strong>Workpaper:</strong>{' '}
          {content.workpaperType.map((type) => capitalize(type)).join(', ')}
        </p>

        <p className='text-sm text-gray-500'>
          <strong>Entity:</strong>{' '}
          {content.entityType.map((type) => capitalize(type)).join(', ')}
        </p>

        <Link href={`/vendor/listing/create/${content.id}`} className='ml-auto'>
          <span className='flex gap-1 text-secondary hover:scale-105 transition-all ease-in-out bg-primary/10 p-2 rounded-md hover:bg-primary/15'>
            Create Listing
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ContentCard;
