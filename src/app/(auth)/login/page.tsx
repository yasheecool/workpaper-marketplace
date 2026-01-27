import { LoginForm } from '@/feature/auth';
import Link from 'next/link';

const page = () => {
  return (
    <main className='min-h-[calc(100vh-130px)] flex items-center justify-center relative'>
      <Link
        href='/'
        className='absolute top-6 left-12 text-primary link link-hover flex'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 30 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
          />
        </svg>
        Back
      </Link>
      <div className='w-full max-w-md px-6 border-[0.5px] p-8 rounded-lg shadow-lg border-primary-500'>
        <LoginForm />
      </div>
    </main>
  );
};
export default page;
