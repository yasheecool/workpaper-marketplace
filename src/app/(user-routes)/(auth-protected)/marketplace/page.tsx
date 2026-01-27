import Container from '@/components/layout/Container';
import HeroSection from './_components/HeroSection';
import { ListingsDisplay, ListingSearchFilters } from '@/feature/listing';
import { Suspense } from 'react';
import { Loading } from '@/components/ui';

const MarketplacePage = () => {
  return (
    <>
      <HeroSection />
      <section className='py-16 bg-base-200 text-base-content'>
        <Container styles='grid gap-6 lg:grid-cols-12'>
          {/* Filtering Sidebar */}
          <aside className='hidden lg:block lg:col-span-3 lg:sticky lg:top-20 self-start'>
            <Suspense fallback={<Loading />}>
              <ListingSearchFilters />
            </Suspense>
          </aside>

          <div className='lg:col-span-9'>
            {/* FILTERING OVERLAY + LISTINGS + PAGINATION */}
            <Suspense fallback={<Loading />}>
              <ListingsDisplay />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
};

export default MarketplacePage;
