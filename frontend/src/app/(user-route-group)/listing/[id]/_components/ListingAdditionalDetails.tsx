interface ListingAdditionalDetailsProps {
  contentType: string;
  entityType: string[];
  workpaperType: string[];
}

const ListingAdditionalDetails = ({
  contentType,
  entityType,
  workpaperType,
}: ListingAdditionalDetailsProps) => {
  return (
    <div className='bg-base-300 p-4 rounded-md'>
      <h2 className='text-xl font-semibold mb-4'>Additional Details</h2>
      <div className='flex flex-col gap-2 text-sm'>
        <p>
          Listing type:{' '}
          <span className='badge badge-primary'>{contentType}</span>
        </p>
        <p>Applicable for: {entityType.join(', ')}</p>
        <p>Workpaper Type: {workpaperType.join(', ')}</p>
      </div>
    </div>
  );
};

export default ListingAdditionalDetails;
