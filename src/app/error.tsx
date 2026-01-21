'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-center min-h-[calc(100vh-125px)] gap-6'>
        <Image
          src='/undraw_access-denied.svg'
          alt='Error Illustration'
          width={400}
          height={400}
        />
        <h2>Something went wrong!</h2>
        <div className='flex justify-between align-center gap-4'>
          <button
            className='btn btn-primary'
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
          <Link href='/' className='btn btn-primary'>
            Back Home
          </Link>
        </div>
      </main>
    </>
  );
}
