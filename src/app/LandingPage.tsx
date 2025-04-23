'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';

const LandingPage = () => {
  const router = useRouter();
  return (
    <>
      <Header
        children={
          <div className='flex items-center gap-4 ml-auto'>
            <button
              className='btn bg-transparent text-secondary-500 border-1 border-secondary-500 hover:bg-gray-100'
              onClick={() => router.push('/marketplace')}
            >
              Log In
            </button>
            <button className='btn bg-secondary-500 text-white hover:bg-secondary-700 ease-in-out'>
              Sign Up
            </button>
          </div>
        }
      />

      <main className='min-h-[calc(100vh-70px)]'>
        <section className='bg-linear-to-br from-[#c9ccffa0] to-[#edd7fbba]  py-20 lg:py-28'>
          <div className='section-container flex flex-col items-center gap-8 lg:flex-row '>
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
                <button
                  className='mr-2 btn text-secondary-500 bg-transparent  border-secondary-500  hover:bg-gray-100'
                  onClick={() => router.push('/marketplace')}
                >
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
          <div className='section-container'>
            <h2 className='text-gray-800 text-3xl tracking-tight'>
              Browse verified workpaper content
            </h2>
            <div></div>
          </div>
        </section>

        <section className='bg-linear-to-br from-[#c9ccffa0] to-[#edd7fbba] py-20'>
          <div className='section-container max-w-3xl grid gap-6 grid-rows-2 sm:grid-cols-2 sm:grid-rows-none'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center'>
                <Image
                  src={'./workpapers_logo.svg'}
                  height={20}
                  width={20}
                  alt='cimplico workpapers logo'
                  className='inline-block mr-2'
                />
                <span className='text-2xl font-semibold'>marketplace</span>
              </div>

              <div className='text-gray-800 flex flex-col gap-2'>
                <p className='text-3xl font-semibold tracking-tight'>
                  Get started today
                </p>
                <ul className='text-sm'>
                  <li className='flex gap-2 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      className='size-4 text-primary-500'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z'
                        clipRule='evenodd'
                      />
                    </svg>

                    <span>Get content from verified vendors</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='size-4 text-primary-500'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z'
                        clipRule='evenodd'
                      />
                      <path d='M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z' />
                    </svg>

                    <span>Add to your firm with a single click</span>
                  </li>
                </ul>
              </div>
              <button className='btn bg-secondary-500 text-white hover:bg-secondary-700'>
                Sign up
              </button>
            </div>
            <div className='relative'>
              <Image
                src={'./undraw_reviewed.svg'}
                alt='verified document illustration graphic'
                fill
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default LandingPage;
