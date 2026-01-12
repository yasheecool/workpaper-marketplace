import Loading from '@/components/ui/Loading';
import TableWrapper from './TableWrapper';
import { Header } from './_components';
import Filters from './_components/Filters';
import { getVendorListings } from '@/feature/vendor';

type Filters = {
  listingType: string;
  visibility: string;
  sortBy: string;
  searchQuery: string;
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
  };

  const vendorListings = await getVendorListings(filters);

  return (
    <div className='p-4 flex flex-col gap-8 h-full'>
      <Header />

      <div className='grid grid-cols-2 justify-between gap-x-4 gap-y-4 mb-[-18]'>
        <Filters />
      </div>

      {vendorListings.length === 0 && (
        <div className='flex items-center justify-center mt-12'>
          <p>No listings found. Get started by creating a new listing!</p>
        </div>
      )}

      {vendorListings.length > 0 && (
        <div className='overflow-x-auto h-full rounded-md border-[0.5px] border-gray-200 relative'>
          <TableWrapper initialData={vendorListings} filters={filters} />
        </div>
      )}
    </div>
  );
};
export default ListingPage;
