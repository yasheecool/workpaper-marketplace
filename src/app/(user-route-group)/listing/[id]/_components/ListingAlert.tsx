const ListingAlert = ({
  isInstalled,
  requestStatus,
}: {
  requestStatus: 'pending' | 'approved' | 'rejected' | null;
  isInstalled: boolean;
}) => {
  const getAlertMessage = () => {
    // if (isDeleted) {
    //   return 'This listing has been deleted by the vendor.';
    // }
    if (isInstalled) {
      return `This listing is installed.`;
    }
    if (requestStatus === 'pending') {
      return 'Your request is pending. Please wait for the vendor to approve your request.';
    }
    if (requestStatus === 'approved') {
      return `Your request was approved by the vendor.`;
    }
    if (requestStatus === 'rejected') {
      return `Your request was rejected by the vendor. Please contact the vendor for more information.`;
    }
  };
  return (
    <div role='alert' className={`alert lg:col-span-2`}>
      <div className={`flex items-center gap-2  text-primary`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
          />
        </svg>
        <p>{getAlertMessage()}</p>
      </div>
    </div>
  );
};
export default ListingAlert;
