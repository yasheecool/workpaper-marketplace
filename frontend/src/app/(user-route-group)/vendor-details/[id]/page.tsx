import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { getVendorProfile } from '@/feature/vendor';
import Container from '@/components/layout/Container';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getVendorProfile(id);

  if (!data) {
    notFound();
  }

  const { firmLogo, vendorSince, firmEmail, description, firmName } = data;

  return (
    <section className='text-base-content bg-base-200 py-8 flex flex-col gap-8 h-[calc(100vh-140px)]'>
      <header>
        <Container
          styles={`flex max-w-5xl flex gap-6 bg-base-100 py-6 px-8 rounded-md border border-gray-300`}
        >
          {/* Vendor Logo */}
          <div className=' rounded-md overflow-hidden shrink-0 relative w-24 h-24'>
            <Image
              alt="Vendor firm's profile image"
              src={firmLogo || '/undraw_approve.svg'}
              fill
              className='object-cover'
            />
          </div>

          {/* Vendor Info */}
          <div className='flex flex-col justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>{firmName}</h1>
            <p className='text-sm text-gray-500'>
              Vendor since {vendorSince ? formatDate(vendorSince) : 'N/A'}
            </p>
          </div>

          {/* Contact Info */}
          <div className='ml-auto flex flex-col justify-center items-end gap-1'>
            <h2 className='text-lg font-semibold'>Contact Info</h2>
            <p className='text-sm text-gray-600'>{firmEmail}</p>
            <button className='link link-primary text-sm'>
              Visit Vendor Website
            </button>
          </div>
        </Container>
      </header>

      <Container
        styles={`max-w-5xl py-6 px-8 rounded-md border border-gray-300 bg-base-100 flex flex-col gap-4`}
      >
        <h3 className='text-2xl font-semibold'>About</h3>
        <p className='text-gray-700 leading-6'>{description}</p>
      </Container>
    </section>
  );
};

export default page;
