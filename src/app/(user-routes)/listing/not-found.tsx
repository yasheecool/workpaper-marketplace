import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='min-h-[calc(100vh-70px)] flex flex-col items-center justify-center gap-8'>
      <Image src='/not-found.svg' alt='Not Found' width={300} height={300} />
      <p>Listing not found</p>
      <Link href='/marketplace' className='text-blue-500 underline'>
        Go back to Listings
      </Link>
    </div>
  );
};

export default NotFoundPage;
