'use client';
import { useMemo } from 'react';
// import { useFirmCreatedListings } from '@/hooks/react-query/firm';
import FormSelect from '../../../../components/input/FormSelect';
import { CONTENT_TYPE, LISTING_VISIBILITY } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from '@/components/ui/Loading';
import { ListingType } from '@/types/schema';
import TableWrapper from './TableWrapper';

const ListingPage = () => {
  const router = useRouter();
  // const { data: listings, error, isLoading } = useFirmCreatedListings(); //implement error handling

  //Filtering related states
  // const [visibility, setVisibility] = useState<string>('');
  // const [contentType, setContentType] = useState<string>('');

  // const filteredListings = useMemo(() => {
  //   const filtered = listings
  //     ?.filter((listing: Partial<ListingType>) => {
  //       if (!contentType || contentType === 'all') return true;
  //       return listing.contentType === contentType;
  //     })
  //     .filter((listing: Partial<ListingType>) => {
  //       if (!visibility || visibility === 'all') return true;
  //       return listing.visibility === visibility;
  //     });
  //   return filtered || [];
  // }, [listings, contentType, visibility]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return (
  //     <div className='flex items-center justify-center h-full'>
  //       <p className='text-red-500'>Error loading listings: {error.message}</p>
  //     </div>
  //   );
  // }

  // return (
  //   <div className='p-4 flex flex-col gap-8 h-full'>
  //     <header className='flex items-center justify-between gap-2'>
  //       <h1 className='text-2xl font-semibold'>Your Listings</h1>
  //       <button
  //         className='btn bg-primary-500 text-white hover:bg-primary-700 rounded-md'
  //         onClick={() => router.push('/vendor/content-selection')}
  //       >
  //         Create Listing
  //       </button>
  //     </header>

  //     {/* Filters */}
  //     <div className='flex items-center gap-4'>
  //       <FormSelect
  //         label='Listing Type'
  //         optionsObj={CONTENT_TYPE}
  //         setStateValue={setContentType}
  //         displayAll={true}
  //         value={contentType}
  //       />

  //       <FormSelect
  //         label='Access Type'
  //         optionsObj={LISTING_VISIBILITY}
  //         setStateValue={setVisibility}
  //         displayAll={true}
  //         value={visibility}
  //       />
  //     </div>

  //     <div className='overflow-x-auto h-full rounded-md border-[0.5px] border-gray-200'>
  //       {filteredListings.length === 0 && (
  //         <div className='flex items-center justify-center h-full'>
  //           <p className='text-gray-500'>No listings found.</p>
  //         </div>
  //       )}
  //       {filteredListings.length > 0 && (
  //         <TableWrapper filteredListings={filteredListings} />
  //       )}
  //     </div>
  //   </div>
  // );
  return <div>Listing Page under maintenance</div>;
};
export default ListingPage;
