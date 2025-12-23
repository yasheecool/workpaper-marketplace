'use client';

import { useRouter } from 'next/navigation';
import useAppStore from '@/store/appStore';
import Header from '@/components/layout/Header';
import FirmSelector from './FirmSelector';
import { useEffect } from 'react';
import { useUserFirms } from '@/hooks/react-query/user';
import Loading from '@/components/ui/Loading';

const FirmSelection = () => {
  const router = useRouter();
  const { jwt, hydrated: isHydrated } = useAppStore();

  const { data, isLoading, isError } = useUserFirms(isHydrated);

  useEffect(() => {
    if (!isHydrated) return;
    // if (!jwt) router.replace('/'); //go back to landing page if jwt is NULL
  }, [jwt, isHydrated]);

  if (isLoading) {
    return (
      <div className='section-container max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='section-container max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
        <p className='text-red-500'>
          Error fetching firms. Please try again later.
        </p>
      </div>
    );
  }

  if (data) {
    return (
      <>
        <Header disableNavigation={true} />

        <main className='h-[calc(100vh-140px)] bg-base-200 py-14 text-gray-800'>
          <div className='section-container max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
            <p className='col-span-2 text-2xl text-secondary-600'>
              Select a firm to continue
            </p>

            <div className='grid grid-cols-[auto_1fr] gap-4'>
              <FirmSelector firms={data} />
            </div>
          </div>
        </main>
      </>
    );
  }
};
export default FirmSelection;
