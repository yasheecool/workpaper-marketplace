'use client';

import { useRouter } from 'next/navigation';
import useAppStore from '@/store/appStore';
import Header from '@/components/Header';
import { useEffect, Fragment } from 'react';

const FirmSelection = () => {
  const router = useRouter();
  const { jwt, setFirm, currentFirm } = useAppStore();

  useEffect(() => {
    if (!jwt) router.replace('/'); //go back to landing page if jwt is NULL
  });

  return (
    <>
      <Header disableNavigation={true} />

      <main className='h-[calc(100vh-140px)] bg-base-200 py-14 text-gray-800'>
        <div className='section-container max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
          <p className='col-span-2 text-2xl text-secondary-600'>
            Select a firm to continue
          </p>

          <div className='grid grid-cols-[auto_1fr] gap-4'>
            {jwt?.workpapers.firms.map((firm) => {
              return (
                <Fragment key={firm.id}>
                  <input
                    type='radio'
                    name='radio-1'
                    checked={currentFirm?.id === firm.id}
                    className='radio'
                    onChange={() => setFirm(firm)}
                  />
                  <label>{firm.name}</label>
                </Fragment>
              );
            })}

            <div className='flex justify-center items-center col-span-2 mt-4'>
              <button
                className='btn text-white bg-secondary-500 hover:bg-secondary-700'
                onClick={() => router.push('/marketplace')}
              >
                Continue with this firm
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default FirmSelection;
