'use client';
import Image from 'next/image';

const SavedListingCard = () => {
  return (
    <div className='rounded-md flex flex-col gap-4 shadow-sm max-h-[350px]  overflow-hidden hover:shadow-md w-350px b'>
      <div className='relative h-[300px] w-[350px] border-b-[0.25]'>
        <Image src={'/undraw_approve.svg'} fill alt='listing image' />
      </div>
      <div className='px-4 pb-4 flex flex-col gap-3'>
        <div>
          <h2 className='text-lg font-semibold'>Listing Name</h2>
          <p className='text-xs text-gray-600 '>
            By <span className='link link-hover'>Cimplico Pvt Ltd</span>
          </p>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <p className='text-xs text-gray-600 '>
            Type:{' '}
            <span className='badge badge-primary badge-sm opacity-75'>
              Checklist
            </span>
          </p>
          <p className='font-semibold text-gray-700'>FREE</p>
        </div>
        <div className='flex gap-2 justify-end'>
          <button className='btn btn-sm bg-transparent border-secondary-500 hover:bg-base-300 text-secondary-500'>
            Unsave
          </button>
          <button className='btn btn-sm bg-secondary-500 text-white hover:bg-secondary-700'>
            View
          </button>
        </div>
      </div>
    </div>
  );
};
export default SavedListingCard;
