'use client';

import Header from '../layout/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Unauthorized = ({ message }: { message: string }) => {
  const router = useRouter();
  return (
    <>
      <Header disableNavigation={true} />
      <div className='flex flex-col items-center justify-center h-[calc(100vh-140px)]  gap-8'>
        <Image
          src='/undraw_access-denied.svg'
          alt='Unauthorized Access'
          width={200}
          height={200}
          className='mb-4'
        />
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-semibold text-gray-800'>
            Access Denied
          </h1>
          <p>{message}</p>
          <button className='btn btn-primary' onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
