import Container from '@/components/layout/Container';
import HeroSection from './_components/HeroSection';
import { ListingsDisplay, ListingSearchFilters } from '@/feature/listing';

const MarketplacePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

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
            {/* FILTERING OVERLAY + LISTINGS + PAGINATION */}
            <ListingsDisplay params={params} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default MarketplacePage;
