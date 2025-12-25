'use client';

import Image from 'next/image';
import useAppStore from '@/store/appStore';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

const HeroSection = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);
  const setSearchTerm = useAppStore((s) => s.setSearchTerm);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <section className='bg-accent py-18 relative overflow-hidden z-0 text-gray-800 h-[340px]'>
      <div className='section-container z-10 flex flex-col items-center'>
        <div className='absolute right-0 top-0 w-80 h-full'>
          {/* <Image
            src='/workpapers_outline.svg'
            alt='cimplico workpapers logo'
            fill
            className='object-contain z-[-1] scale-105 opacity-75'
          /> */}
        </div>
        <h1 className='text-5xl text-center font-semibold  mb-2 capitalize'>
          Browse verified content
        </h1>
        <p className='text-center text-lg mb-10'>
          Explore content from verified vendors and take your accounting
          workflow to the next level.
        </p>

        <label className='input w-[90%] focus:outline-primary-500 max-w-[900px]'>
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
          <input
            type='search'
            required
            placeholder='Search'
            value={localSearchTerm}
            onChange={(e) => {
              setLocalSearchTerm(e.target.value);
            }}
          />
        </label>
      </div>
    </section>
  );
};
export default HeroSection;
