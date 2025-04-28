'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ListingCard = () => {
  const router = useRouter();

  return (
    <div
      className='grid grid-cols-[1fr_1fr_minmax(40px,_220px)] gap-4 p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition-shadow ease-in-out '
      onClick={() => router.push('/listing/1')}
    >
      <div className='relative bg-base-300 p-4'>
        <Image src={'./undraw_approve.svg'} alt='listing image' fill />
      </div>

      <div>
        <h2 className='font-semibold'>End of Year GST Checklist</h2>
        <p className='text-xs mb-4 text-gray-600 '>
          By{' '}
          <span className='link link-hover font-semibold'>
            Cimplico Pvt Ltd
          </span>
        </p>
        <ul className='text-sm flex flex-col gap-2 text-gray-600'>
          <li className='pl-2'>Verified by relevant accounting bodies.</li>
          <li className='pl-2'>
            Make EOY GST checks a breeze - currently used by over 500 firms.
          </li>
          <li className='pl-2'>
            Highly customizable, always ensuring your needs.
          </li>
        </ul>
      </div>

      <div className='flex flex-col items-center justify-between'>
        <div></div>
        <div className='text-center text-gray-700'>
          <p className='font-bold'>FREE</p>
          <p className='text-xs'>Last updated: 25 April, 2025</p>
        </div>

        <div className='w-full space-y-2'>
          <button className='btn w-full bg-secondary-500 text-white hover:bg-secondary-700'>
            Install
          </button>
          <button className='btn w-full bg-transparent text-secondary-500 border-secondary-500 hover:bg-base-300'>
            Save Listing
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListingCard;
