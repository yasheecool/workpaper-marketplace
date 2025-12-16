import Image from 'next/image';
import useMockLogin from '@/hooks/useLogin';

const HeroSection = () => {
  const { login } = useMockLogin();

  return (
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
              onClick={login}
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
  );
};
export default HeroSection;
