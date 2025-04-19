'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LandingPage = () => {
  const router = useRouter();
  return (
    <>
      <header className='border-b-[0.5px] border-gray-500'>
        <nav className='w-[92.5vw] max-w-7xl px-4 mx-auto py-6 max-h-[70px] flex flex-row items-center'>
          <Image
            src={'./workpapers_logo.svg'}
            alt='logo'
            height={27.5}
            width={27.5}
            className='inline-block mr-3 cursor-pointer'
          />
          <span className='text-2xl cursor-pointer text-gray-800 tracking-wide font-semibold'>
            marketplace
          </span>

          <div className='flex items-center gap-4 ml-auto'>
            <button
              className='btn bg-transparent text-secondary-500 border-1 border-secondary-500 hover:bg-gray-100'
              onClick={() => router.push('./marketplace')}
            >
              Log In
            </button>
            <button className='btn bg-secondary-500 text-white hover:bg-secondary-700 ease-in-out'>
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className='bg-linear-to-br from-[#c9ccffa0] to-[#edd7fbba]  py-20 lg:py-28'>
          <div className='w-[92.5vw] max-w-7xl mx-auto px-4 flex flex-col items-center gap-8 lg:flex-row '>
            <div className='flex flex-col items-center lg:items-start'>
              <h1 className='text-gray-800 text-4xl mb-4 font-semibold tracking-tight md:text-5xl text-center lg:text-6xl lg:text-start lg:tracking-[-2px]'>
                Explore Verified Workpaper Content
              </h1>
              <p className='mb-4 leading-normal text-center lg:text-start text-gray-900'>
                Browse procedures, checklists, reports and more - add to your
                workspace with one click.
              </p>
              <div>
                <button className='btn bg-secondary-500 text-white hover:bg-secondary-600 mr-2'>
                  Sign Up
                </button>
                <button className='mr-2 btn text-secondary-500 bg-transparent  border-secondary-500  hover:bg-gray-100'>
                  Log In
                </button>
              </div>
            </div>
            <div className='flex justify-center w-1/2'>
              <div className='relative h-[350px] w-full max-w-[350px]'>
                <Image
                  src='./undraw_approve.svg'
                  alt='logo'
                  height={350}
                  width={175}
                  className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lg:top-1 lg:translate-y-0 w-[275px] lg:max-w-1/2 lg:scale-100'
                />
                <Image
                  src='./undraw_screen.svg'
                  alt='logo'
                  height={350}
                  width={175}
                  className='absolute bottom-0 left-0 hidden lg:block'
                />
                <Image
                  src='./undraw-files.svg'
                  alt='logo'
                  height={320}
                  width={160}
                  className='absolute bottom-0 right-0 hidden lg:block'
                />
              </div>
            </div>
          </div>
        </section>

        <section className='bg-gray-100 py-18'></section>
        <section className='py-18'>
          <div className='w-[90vw] max-w-7xl px-4 mx-auto'>
            <h2 className='text-gray-800 text-3xl tracking-tight'>
              Browse verified workpaper content
            </h2>
            <div></div>
          </div>
        </section>
        <section className='bg-linear-to-br from-[#c9ccffa0] to-[#edd7fbba] py-18'>
          <div className='w-[90vw] max-w-4xl mx-auto px-4 grid grid-cols-2 gap-4'>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <Image
                  src={'./workpapers_logo.svg'}
                  height={30}
                  width={30}
                  alt='cimplico workpapers logo'
                  className='inline-block mr-2'
                />
                <span className='text-2xl font-semibold'>marketplace</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default LandingPage;
