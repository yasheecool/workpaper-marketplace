import Image from 'next/image';

const page = () => {
  return (
    <section className='text-gray-800 bg-base-200 py-8 flex flex-col gap-8 h-[calc(100vh-140px)]'>
      <header>
        <div className='section-container max-w-5xl flex gap-6 bg-base-100 py-6 px-8 rounded-md border border-gray-300'>
          {/* Vendor Logo */}
          <div className='border rounded-md overflow-hidden flex-shrink-0'>
            <Image
              alt="Vendor firm's profile image"
              src='/undraw_approve.svg'
              width={110}
              height={110}
              className='object-cover'
            />
          </div>

          {/* Vendor Info */}
          <div className='flex flex-col justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>Cimplico</h1>
            <p className='text-sm text-gray-500'>Member since March 2025</p>
            <button className='btn btn-md text-white bg-secondary-500 hover:bg-secondary-700 w-fit'>
              View Listings
            </button>
          </div>

          {/* Contact Info */}
          <div className='ml-auto flex flex-col justify-center items-end gap-1'>
            <h2 className='text-lg font-semibold'>Contact Info</h2>
            <p className='text-sm text-gray-600'>xyz@cimplico.com.au</p>
            <a href='#' className='text-sm text-primary hover:underline'>
              Visit Website
            </a>
          </div>
        </div>
      </header>

      <div className='section-container max-w-5xl py-6 px-8 rounded-md border border-gray-300 bg-base-100 flex flex-col gap-4'>
        <h3 className='text-2xl font-semibold'>About</h3>
        <p className='text-gray-700 leading-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nihil
          unde expedita ipsum voluptatibus ratione, culpa minus suscipit
          commodi. Molestiae quod temporibus facilis officiis pariatur facere
          saepe maiores corporis velit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Labore repellat dignissimos nesciunt cum amet
          nostrum animi odio soluta in consequatur. Aut quia enim, nisi ullam
          commodi ab illum numquam eos! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Dicta, mollitia dolorem. Possimus facere, debitis
          obcaecati doloribus maxime nam mollitia repellendus sequi esse saepe
          libero tempora, odit, fuga fugit pariatur aliquam?
        </p>
      </div>
    </section>
  );
};
export default page;
