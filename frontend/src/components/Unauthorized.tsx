import Header from './layout/Header';
import Footer from './layout/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Unauthorized = ({ text }: { text: string }) => {
  const router = useRouter();
  return (
    <>
      <Header disableNavigation={true} />
      <div className='flex flex-col items-center justify-center h-[calc(100vh-140px)]  gap-8'>
        <Image
          src='/undraw_access-denied.svg'
          alt='Unauthorized Access'
          width={200}
          height={200}
          className='mb-4'
        />
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-semibold text-gray-800'>
            Access Denied
          </h1>
          <p>{text}</p>
          <button
            className='bg-secondary-500 btn text-white hover:bg-secondary-700'
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};
export default Unauthorized;
