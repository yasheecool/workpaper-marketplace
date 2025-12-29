import { ListingSearchInput } from '@/feature/listing';
import { Suspense } from 'react';

const HeroSection = () => {
  return (
    <section className='bg-accent py-18 relative overflow-hidden z-0 text-gray-800 h-85'>
      <div className='section-container z-10 flex flex-col items-center'>
        <h1 className='text-5xl text-center font-semibold  mb-2 capitalize'>
          Browse verified content
        </h1>
        <p className='text-center text-lg mb-10'>
          Explore content from verified vendors and take your accounting
          workflow to the next level.
        </p>

        <label className='input w-[90%] focus:outline-primary-500 max-w-225'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <Suspense fallback={<div className='skeleton h-6 w-full' />}>
            <ListingSearchInput />
          </Suspense>
        </label>
      </div>
    </section>
  );
};
export default HeroSection;
