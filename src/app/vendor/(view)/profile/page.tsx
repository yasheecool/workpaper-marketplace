const page = () => {
  return (
    <div className='px-6 py-4 h-full'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2 px-4'>
          <p className='text-lg font-semibold'>Profile Image</p>
          <div className='w-32 h-32 bg-base-300 rounded-md flex items-center justify-center text-sm text-gray-500'>
            Upload Image
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
            <label className='text-sm'>
              Firm Name <span className='text-gray-500'>(required)</span>
            </label>
            <input type='text' className='input' required />
          </div>

          <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
            <label className='text-sm'>
              About your firm <span className='text-gray-500'>(required)</span>
            </label>
            <textarea className='textarea'></textarea>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='font-semibold px-4 text-lg'>Contact info</p>
          <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
            <label className='text-sm'>
              Contact Email <span className='text-gray-500'>(required)</span>
            </label>
            <input type='email' className='input' required />
          </div>

          <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
            <label className='text-sm'>
              Contact Phone <span className='text-gray-500'>(optional)</span>
            </label>
            <input type='text' className='input' />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='font-semibold px-4 text-lg'>Website and socials</p>
          <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
            <label className='text-sm'>
              Website Link <span className='text-gray-500'>(required)</span>
            </label>
            <input type='text' className='input' required />
          </div>

          <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
            <label className='text-sm'>
              LinkedIn url <span className='text-gray-500'>(optional)</span>
            </label>
            <input type='text' className='input' />
          </div>
        </div>

        <button className='btn bg-primary-400 hover:bg-primary-300 text-white mb-4'>
          Update profile
        </button>
      </div>
    </div>
  );
};
export default page;
