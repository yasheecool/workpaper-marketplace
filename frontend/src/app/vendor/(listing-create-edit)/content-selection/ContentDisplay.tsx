'use client';
import FormSelect from '@/components/input/FormSelect';
import {
  CONTENT_TYPE,
  ENTITY_TYPES,
} from '@/types/Cimplico_Marketplace_Typescript_Definitions';
import ContentCard from './ContentCard';
import { useFirmContent } from '@/hooks/react-query/firm';
import { BaseContent } from '@/types/Cimplico_Marketplace_Typescript_Definitions';
import Loading from '@/components/ui/Loading';
import { useEffect } from 'react';

type Content = BaseContent & {
  ownerFirmId: string;
};

const ContentDisplay = () => {
  const { data, error, isLoading } = useFirmContent();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-red-500'>Error loading content: {error.message}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-12 h-full overflow-y-hidden'>
      <div className='flex gap-4 pt-1'>
        <label className='input w-[66%] max-w-[530px] min-w-[200px]'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <input type='search' required placeholder='Search' />
        </label>
        <FormSelect optionsObj={CONTENT_TYPE} label='Content Type' />
      </div>

      {/* UI FOR SELECTION */}

      {data.totalItems === 0 && <p>No available content</p>}
      {data.totalItems && (
        <div className='flex flex-col gap-4 overflow-y-auto'>
          {data.data.map((c: Content, id: number) => {
            // console.log();
            return <ContentCard content={c} key={id} />;
          })}
        </div>
      )}
    </div>
  );
};
export default ContentDisplay;
