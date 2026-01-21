import Header from '@/components/layout/Header';
import { FirmSelectorContainer } from '@/feature/firm';
import Container from '@/components/layout/Container';
import { Suspense } from 'react';

const FirmSelectionPage = async () => {
  return (
    <>
      <Header disableNavigation={true} />

      <main className='h-[calc(100vh-135px)] bg-base-200 py-14 text-base-content'>
        <Container styles='max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
          <p className='col-span-2 text-2xl text-primary font-semibold'>
            Select a firm to continue
          </p>
          <Suspense fallback={<div className='skeleton h-10 w-full' />}>
            <FirmSelectorContainer />
          </Suspense>
        </Container>
      </main>
    </>
  );
};

export default FirmSelectionPage;
