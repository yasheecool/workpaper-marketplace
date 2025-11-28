'use client';
import { useParams } from 'next/navigation';
import { useVendorProfile } from '@/hooks/react-query/firm';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';

const VendorDetailPage = () => {
  const { id } = useParams();
  const { vendorProfile: vendor } = useVendorProfile(String(id));

  return (
    <section className='text-gray-800 bg-base-200 py-8 flex flex-col gap-8 h-[calc(100vh-140px)]'>
      <header>
        <div className='section-container max-w-5xl flex gap-6 bg-base-100 py-6 px-8 rounded-md border border-gray-300'>
          {/* Vendor Logo */}
          <div className=' rounded-md overflow-hidden flex-shrink-0 relative w-24 h-24'>
            <Image
              alt="Vendor firm's profile image"
              src={vendor?.firmLogo || '/undraw_approve.svg'}
              fill
              className='object-cover'
            />
          </div>

          {/* Vendor Info */}
          <div className='flex flex-col justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>
              {vendor?.vendor?.firmName}
            </h1>
            <p className='text-sm text-gray-500'>
              Member since {formatDate(vendor?.vendorSince)}
            </p>
          </div>

          {/* Contact Info */}
          <div className='ml-auto flex flex-col justify-center items-end gap-1'>
            <h2 className='text-lg font-semibold'>Contact Info</h2>
            <p className='text-sm text-gray-600'>{vendor?.firmEmail}</p>
            <a
              href={vendor?.websiteUrl}
              className='text-sm text-primary hover:underline cursor-pointer'
              target='_blank'
              rel='noopener noreferrer'
            >
              Visit Website
            </a>
          </div>
        </div>
      </header>

      <div className='section-container max-w-5xl py-6 px-8 rounded-md border border-gray-300 bg-base-100 flex flex-col gap-4'>
        <h3 className='text-2xl font-semibold'>About</h3>
        <p className='text-gray-700 leading-6'>{vendor?.description}</p>
      </div>
    </section>
  );
};
export default VendorDetailPage;
