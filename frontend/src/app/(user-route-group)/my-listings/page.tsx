import TableWrapper from './_components/TableWrapper';
import Loading from '@/components/ui/Loading';
import Container from '@/components/layout/Container';
import Filters from './_components/Filters';
import { ListingType } from '@/types/domain/listing';
import { getInstalledListings, getRequestedListings } from '@/feature/listing';

const InstalledListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { status = 'installed' } = await searchParams;

  return (
    <section className='py-8 min-h-[calc(100vh-140px)]'>
      <Container styles='flex flex-col gap-6 h-full'>
        <h1 className='text-2xl font-semibold border-b-[0.5px] border-gray-400 pb-2'>
          Installed & Requested Listings
        </h1>
        {/* FILTERS */}
        <Filters />

        <div className='h-full rounded-md overflow-x-auto border-[0.5px] border-gray-200 max-w-full'>
          <TableWrapper
            filters={{
              status: status as 'installed' | 'requested',
              // contentType: contentType as ListingType | 'all',
            }}
          />
        </div>

        <p className=' text-sm text-gray-600'>
          {/* Total {selectedStatus} listings: {currentRecords?.length} */}
        </p>
      </Container>
    </section>
  );
};

export default InstalledListingsPage;
