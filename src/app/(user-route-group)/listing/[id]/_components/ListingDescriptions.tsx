import Link from 'next/link';

type ListingDescriptionsProps = {
  description: string;
  longDescription: string | null;
  gettingStartedSteps: string | null;
  vendorId: string;
  vendorName: string;
};

const ListingDescriptions = ({
  description,
  longDescription,
  gettingStartedSteps,
  vendorId,
  vendorName,
}: ListingDescriptionsProps) => {
  return (
    <div className='rounded-md flex flex-col gap-8'>
      <div className='flex flex-col gap-6'>
        <div>
          <h2 className='text-xl font-semibold'>Short Description</h2>
          <p>{description}</p>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Long Description</h2>
          <p>{longDescription}</p>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Getting Started Steps</h2>
          <p>{gettingStartedSteps}</p>
        </div>
      </div>

      {/* Listing Support */}
      <div>
        <h2 className='text-xl font-semibold'>Listing Support</h2>
        <p>Support Email: Support Email</p>

        <p>
          Vendor Information:{' '}
          <Link href={`/vendor-details/${vendorId}`}>
            <span className='link link-hover font-semibold'>{vendorName}</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ListingDescriptions;
