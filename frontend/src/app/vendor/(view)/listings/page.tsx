import TableWrapper from './TableWrapper';
import { Header, Filters } from './_components';
import { getVendorListings } from '@/feature/vendor';

type Filters = {
  listingType: string;
  visibility: string;
  sortBy: string;
  searchQuery: string;
  listingStatus: string;
};

const ListingPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchStr = await searchParams;

  const filters = {
    listingType: searchStr['listing-type'] || 'all',
    visibility: searchStr['access-type'] || 'all',
    sortBy: searchStr['sort-by'] || 'updated_at',
    searchQuery: searchStr['search'] || '',
    listingStatus: searchStr['listing-status'] || 'all',
  };

  const vendorListings = await getVendorListings(filters);

  return (
    <div className='p-4 flex flex-col gap-8 h-full'>
      <Header />

      <div className='grid grid-cols-[1fr_2fr] gap-x-4 gap-y-4 mb-[-18]'>
        <Filters />
      </div>

      {vendorListings.length === 0 && (
        <div className='flex items-center justify-center mt-12'>
          <p>No listings found!</p>
        </div>
      )}

      {vendorListings.length > 0 && (
        <>
          <div className='overflow-x-auto h-full rounded-md border-[0.5px] border-gray-200 relative'>
            <TableWrapper initialData={vendorListings} filters={filters} />
          </div>

          <p className='text-sm text-gray-600'>
            {vendorListings.length} listings found
          </p>
        </>
      )}
    </div>
  );
};
export default ListingPage;
