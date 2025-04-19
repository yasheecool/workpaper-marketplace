import Image from 'next/image';

const Marketplace = () => {
  return (
    <>
      <section className='bg-lavender py-18 relative overflow-hidden z-0 text-gray-800'>
        <div className='w-[92.5vw] max-w-7xl px-4 mx-auto z-10 flex flex-col items-center'>
          <div className='absolute right-[-10px] top-[-40px] w-80 h-100 lg:h-80 lg:top-[-10px]'>
            <Image
              src='/workpapers_outline.svg'
              alt='cimplico workpapers logo'
              fill
              className='object-contain z-[-1]'
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
        <div className='max-w-7xl w-[92.5vw] px-4 mx-auto grid grid-cols-[minmax(275px,_3fr)_7fr] gap-8'>
          <div className='flex flex-col gap-4'>
            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 min-w-[275px] '>
              <legend className='fieldset-legend text-lg'>Content Type</legend>
              <label className='label text-base'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Reports
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Checklist
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Procedure
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Calculations
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Worksheet
              </label>
            </fieldset>

            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 '>
              <legend className='fieldset-legend text-lg'>
                Workpaper Type
              </legend>
              <label className='label text-base'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Compliance
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Fringe Benefits Tax
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Income Tax Return
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Business Activity Statement
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Tax Planning
              </label>
            </fieldset>

            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 min-w-[275px] '>
              <legend className='fieldset-legend text-lg'>Region</legend>
              <label className='label text-base'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Australia
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                New Zealand
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                United Kingdom
              </label>
              <label className='label text-base mb-1'>
                <input
                  type='checkbox'
                  className='checkbox-sm checkbox checkbox-primary mr-1'
                />
                Republic of Ireland
              </label>
            </fieldset>
          </div>

          <div className='pt-6 flex flex-col gap-8'>
            <div className='grid grid-cols-[1fr_1fr_minmax(150px,_1fr)] gap-4 p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition-shadow ease-in-out'>
              <div className='relative bg-base-300 p-4'>
                <Image src={'./undraw_approve.svg'} alt='listing image' fill />
              </div>
              <div>
                <h2 className='font-semibold'>End of Year GST Checklist</h2>
                <p className='text-xs mb-4 text-gray-600'>
                  By Cimplico Pvt Ltd.
                </p>
                <ul className='text-sm flex flex-col gap-2 text-gray-600'>
                  <li className='pl-2'>
                    Verified by relevant accounting bodies.
                  </li>
                  <li className='pl-2'>
                    Make EOY GST checks a breeze - currently used by over 500
                    firms.
                  </li>
                  <li className='pl-2'>
                    Highly customizable, always ensuring your needs.
                  </li>
                </ul>
              </div>

              <div className='relative flex items-center flex-col justify-center gap-4'>
                <button className='btn w-full bg-secondary-500 text-white hover:bg-secondary-700'>
                  Add To Firm
                </button>
                <button className='btn w-full bg-gray-100 text-secondary-500 border-secondary-500 hover:bg-gray-200'>
                  Save Listing
                </button>
              </div>
            </div>

            <div className='grid grid-cols-[1fr_1fr_minmax(150px,_1fr)] gap-4 p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition-shadow ease-in-out'>
              <div className='relative bg-base-300 p-4'>
                <Image src={'./undraw_approve.svg'} alt='listing image' fill />
              </div>
              <div>
                <h2 className='font-semibold'>End of Year GST Checklist</h2>
                <p className='text-xs mb-4 text-gray-600'>
                  By Cimplico Pvt Ltd.
                </p>
                <ul className='text-sm flex flex-col gap-2 text-gray-600'>
                  <li className='pl-2'>
                    Verified by relevant accounting bodies.
                  </li>
                  <li className='pl-2'>
                    Make EOY GST checks a breeze - currently used by over 500
                    firms.
                  </li>
                  <li className='pl-2'>
                    Highly customizable, always ensuring your needs.
                  </li>
                </ul>
              </div>

              <div className='relative flex items-center flex-col justify-center gap-4'>
                <button className='btn w-full bg-secondary-500 text-white hover:bg-secondary-700'>
                  Add To Firm
                </button>
                <button className='btn w-full bg-gray-100 text-secondary-500 border-secondary-500 hover:bg-gray-200'>
                  Save Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Marketplace;
