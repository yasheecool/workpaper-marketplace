'use client';

import { FormSelect } from '@/components/input';
import { ListingSearchInput } from '@/feature/listing';
import {
  listingTypeOptions,
  listingVisibilityOptions,
} from '@/types/domain/listing';
import { useRouter } from 'next/navigation';

//sort a-z updatedAt
//listingType Filter
//visibility filter
//search by title
const Filters = () => {
  const router = useRouter();

  const updateSearchParams = (key: string, val: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (val === 'all') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, val);
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.replace(newPathname);
  };

  return (
    <>
      <label className='input grow'>
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
        <ListingSearchInput />
      </label>
      <div className='flex gap-4 relative'>
        <FormSelect
          label='Listing Type'
          optionsObj={listingTypeOptions}
          name='listingType'
          displayAll={true}
          defaultValue={'all'}
          onSelect={(e) => updateSearchParams('listing-type', e.target.value)}
        />
        <FormSelect
          label='Access Type'
          optionsObj={listingVisibilityOptions}
          displayAll={true}
          name='accessType'
          defaultValue={'all'}
          onSelect={(e) => updateSearchParams('access-type', e.target.value)}
        />
      </div>
      <select
        defaultValue={'updated_at'}
        onChange={(e) => updateSearchParams('sort-by', e.target.value)}
        className='select select-bordered select-sm w-30 justify-self-end col-start-2 row-start-2'
      >
        <option value='name'>Name (A-Z)</option>
        <option value='updated_at'>Last Updated</option>
      </select>
    </>
  );
};

export default Filters;
