import Image from 'next/image';
import ListingCard from './ListingCard';

const Marketplace = () => {
  return (
    <>
      <section className='bg-lavender py-18 relative overflow-hidden z-0 text-gray-800 h-[340px]'>
        <div className='w-[95vw] max-w-7xl px-4 mx-auto z-10 flex flex-col items-center'>
          <div className='absolute right-0 top-0 w-80 h-full'>
            <Image
              src='/workpapers_outline.svg'
              alt='cimplico workpapers logo'
              fill
              className='object-contain z-[-1] scale-105 opacity-75'
            />
          </div>
          <h1 className='text-5xl text-center font-semibold  mb-2 capitalize'>
            Browse verified content
          </h1>
          <p className='text-center text-lg mb-10'>
            Explore content from verified vendors and take your accounting
            workflow to the next level.
          </p>

          <label className='input w-[90%] max focus:outline-primary-500 max-w-[900px]'>
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
            <input type='search' required placeholder='Search' />
          </label>
        </div>
      </section>

      <section className='py-18 bg-gray-50 text-gray-800'>
        <div className='max-w-7xl w-[95vw] px-4 mx-auto grid grid-cols-1 gap-6 min-[992px]:grid-cols-[275px_1fr] items-start'>
          <div className='flex-col gap-4  hidden min-[992px]:flex'>
            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4  w-full'>
              <legend className='fieldset-legend text-lg'>Content Type</legend>
              <label className='label text-base'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Reports
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Checklist
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Procedure
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Calculations
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Worksheet
              </label>
            </fieldset>

            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4  w-full'>
              <legend className='fieldset-legend text-lg'>
                Workpaper Type
              </legend>
              <label className='label text-base'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Compliance
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Fringe Benefits Tax
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Income Tax Return
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1 '
                />
                Business Activity Statement
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Tax Planning
              </label>
            </fieldset>

            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4 w-full'>
              <legend className='fieldset-legend text-lg'>Region</legend>
              <label className='label text-base'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Australia
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                New Zealand
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                United Kingdom
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Republic of Ireland
              </label>
            </fieldset>

            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4 w-full'>
              <legend className='fieldset-legend text-lg'>Entity Type</legend>
              <label className='label text-base'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Company
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Individual
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Partnership
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-xs checkbox checkbox-primary mr-1'
                />
                Trust
              </label>
            </fieldset>
          </div>

          <div className='pt-6 grid grid-cols-1 gap-8'>
            <button className='btn bg-secondary-500 text-white justify-self-end min-[992px]:hidden hover:bg-secondary-700'>
              Filter
            </button>
            <ListingCard />
            <ListingCard />
          </div>
        </div>
      </section>
    </>
  );
};
export default Marketplace;
