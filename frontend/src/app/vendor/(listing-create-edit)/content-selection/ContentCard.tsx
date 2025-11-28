import Link from 'next/link';
import { BaseContent } from '@/types/Cimplico_Marketplace_Typescript_Definitions';
import _ from 'lodash';

const ContentCard = ({ content }: { content: BaseContent }) => {
  console.log(content);
  return (
    <div className='border border-gray-300 rounded-md shadow-sm p-4 bg-white hover:shadow-md transition-all max-w-[66.5rem] flex flex-col gap-1'>
      <div className='badge badge-soft badge-primary badge-sm'>
        {_.capitalize(content.contentType)}
      </div>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>{content.name}</h3>
      </div>
      <p className='text-sm text-gray-600'>{content.description}</p>

      {/* TODO: Format the below types properly rather than the raw value */}
      <div className='flex gap-6 items-center mt-3'>
        {content.workpaperType?.length > 0 && (
          <p className='text-sm text-gray-500'>
            <strong>Workpaper:</strong> {content.workpaperType.join(', ')}
          </p>
        )}

        {content.entityType?.length > 0 && (
          <p className='text-sm text-gray-500'>
            <strong>Entity:</strong> {content.entityType.join(', ')}
          </p>
        )}
        <Link href={`/vendor/listing/create/${content.id}`} className='ml-auto'>
          <span className='flex gap-1 text-primary-500 hover:scale-105 transition-all ease-in-out'>
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
