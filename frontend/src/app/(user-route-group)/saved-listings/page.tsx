'use client';

import SavedListingCard from '@/components/ui/SavedListingCard';
// import { useUserSavedListings } from '@/hooks/react-query/user';
import Loading from '@/components/ui/Loading';

const SavedListings = () => {
  // const {
  //   data: savedListingRecords,
  //   isLoading,
  //   error,
  // } = useUserSavedListings();

  // if (error) {
  //   // console.error('Error fetching saved listings:', error);
  //   return <div className='text-red-500'>Failed to load saved listings.</div>;
  // }

  return (
    <>
      <h1>Hello World</h1>
    </>
  );

  // return (
  //   <section className='py-12 text-gray-800 min-h-[calc(100vh-140px)]'>
  //     <div className='section-container text-gray-800'>
  //       <h1 className='text-2xl font-semibold mb-8 pb-4 border-b-2 border-base-300 '>
  //         Saved Listings
  //       </h1>
  //       {isLoading ? (
  //         <Loading />
  //       ) : !savedListingRecords?.length ? (
  //         <div>
  //           <p>
  //             You don't have any saved listings. Browse the marketplace to get
  //             started!
  //           </p>
  //         </div>
  //       ) : (
  //         <div className='grid grid-cols-[repeat(2,_350px)] justify-items-start gap-14 lg:grid-cols-[repeat(3,_350px)]'>
  //           {savedListingRecords?.map((record: Record<string, any>) => (
  //             <SavedListingCard key={record.id} listing={record.listing} />
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </section>
  // );
};
export default SavedListings;
