import Image from 'next/image';

const FirmSelection = () => {
  return (
    <>
      <header className='border-b-[0.5px] border-gray-500'>
        <nav className='section-container py-6 max-h-[70px] flex flex-row items-center'>
          <Image
            src={'./workpapers_logo.svg'}
            alt='logo'
            height={27.5}
            width={27.5}
            className='inline-block mr-3'
          />
          <span className='text-2xl cursor-pointer text-gray-800 tracking-wide font-semibold'>
            marketplace
          </span>
        </nav>
      </header>
      <main>
        <section className='py-10 bg-base-200 text-gray-800'>
          <div className='section-container max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
            <p className='col-span-2 text-2xl text-secondary-600'>
              Select a firm to continue
            </p>
            <div className='grid grid-cols-[auto_1fr] gap-4'>
              <input
                type='radio'
                name='radio-1'
                className='radio'
                defaultChecked
              />
              <label>Cimplico Pty Ltd</label>
              <input type='radio' name='radio-1' className='radio' />
              <label>Clear Accounting Pty Ltd</label>
              <input type='radio' name='radio-1' className='radio' />
              <label>Audit & Co.</label>

              <div className='flex justify-center items-center col-span-2 mt-4'>
                <button className='btn text-white bg-secondary-500 hover:bg-secondary-700'>
                  Continue with this firm
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default FirmSelection;
