import HeroSection from './_components/HeroSection';
import Container from '@/components/layout/Container';
import { ListingSearchFilters } from '@/feature/listing';
import FilteringMetadataOverlay from './_components/FilteringMetadataOverlay';
import ListingDisplay from './_components/ListingDisplay';
import { getMarketplaceListings } from '@/feature/listing/queries';
import Pagination from '@/components/ui/Pagination';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const {
    data: listings,
    error,
    count,
    currentPage,
    totalPages,
  } = await getMarketplaceListings(params);

  return (
    <>
      <HeroSection />
      <section className='py-16 bg-base-200 text-base-content'>
        <Container styles='grid gap-6 lg:grid-cols-12'>
          {/* Filtering Sidebar */}
          <aside className='hidden lg:block lg:col-span-3 lg:sticky lg:top-20 self-start'>
            <ListingSearchFilters />
          </aside>

          <div className='lg:col-span-9'>
            {/* Filtering Metadata + Overlay + Toggle Button */}
            <FilteringMetadataOverlay />

            {/* LISTING DISPLAY + PAGINATION */}
            <div className='pt-5 grid grid-cols-1 gap-6 min-[992px]:col-start-2 min-[992px]:grid-rows-2'>
              {error && (
                <div className='text-red-500'>
                  Error loading listings: {error}
                </div>
              )}

              {listings && <ListingDisplay listings={listings} />}

              {/* PAGINATION */}
              <Pagination
                totalPages={totalPages || 0}
                currentPage={currentPage || 1}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default page;
