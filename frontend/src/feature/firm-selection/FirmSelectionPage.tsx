// 'use client';

import { useRouter } from 'next/navigation';
import useAppStore from '@/store/appStore';
import Header from '@/components/layout/Header';
import FirmSelector from './FirmSelector';
import { useEffect } from 'react';
import { useUserFirms } from '@/hooks/react-query/user';
import Loading from '@/components/ui/Loading';
import Container from '@/components/layout/Container';
import { type Firm } from '@/types/types';
import { getFirms } from './actions';

const FirmSelection = async ({ firms }: { firms?: unknown }) => {
  const router = useRouter();

  // console.log(firms);
  // return <h1>Hello World</h1>;
  // const { jwt, hydrated: isHydrated } = useAppStore();

  // const { data, isLoading, isError } = useUserFirms(isHydrated);

  // useEffect(() => {
  //   if (!isHydrated) return;
  //   // if (!jwt) router.replace('/'); //go back to landing page if jwt is NULL
  // }, [jwt, isHydrated]);

  // if (isLoading) {
  //   return (
  //     <main className='min-h-[calc(100vh-70px)]'>
  //       <Container styles='max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
  //         <Loading />
  //       </Container>
  //     </main>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className='section-container max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
  //       <p className='text-red-500'>
  //         Error fetching firms. Please try again later.
  //       </p>
  //     </div>
  //   );
  // }

  // if (data) {
  return (
    <>
      <Header disableNavigation={true} />

      <main className='h-[calc(100vh-140px)] bg-base-200 py-14 text-gray-800'>
        <Container styles='max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
          <p className='col-span-2 text-2xl text-primary font-semibold'>
            Select a firm to continue
          </p>

          <div className='grid grid-cols-[auto_1fr] gap-4'>
            <FirmSelector />
          </div>
        </Container>
      </main>
    </>
  );
  // }
};
export default FirmSelection;
