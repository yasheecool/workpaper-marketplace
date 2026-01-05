import { type RequestStatus } from '@/types/domain/listing';

interface ListingAlertMessageProps {
  isRequested: boolean;
  isInstalled: boolean;
  requestStatus: RequestStatus | null;
}

const ALERT_MESSAGES = {
  pending: {
    message:
      'Your access request is pending approval. Please check back later.',
  },
  approved: {
    message:
      'Your request has been approved. You can now install this listing.',
  },
  rejected: {
    message:
      'Your request has been rejected. Please contact vendor support for more information.',
  },
  installed: {
    message: 'This listing is currently installed and active.',
  },
};

const ListingAlertMessage = ({
  isRequested,
  isInstalled,
  requestStatus,
}: ListingAlertMessageProps) => {
  if (!isRequested && !isInstalled) return null;

  const alertConfig = isInstalled
    ? ALERT_MESSAGES.installed
    : requestStatus && ALERT_MESSAGES[requestStatus];

  if (!alertConfig) return null;

  return (
    <div role='alert' className='alert lg:col-span-2'>
      <div className={`flex items-center gap-2`}>
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
        <p>{alertConfig.message}</p>
      </div>
    </div>
  );
};

export default ListingAlertMessage;
