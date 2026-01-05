import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';

interface ListingHeaderProps {
  name: string;
  vendorId: string;
  vendorName: string;
  updatedAt: string;
  createdAt: string;
  saveButtonText: string;
  installButtonText: string;
  installButtonDisabled: boolean;
  onSave: () => void;
  onInstallRequest: () => void;
  isSavePending: boolean;
  isInstallPending: boolean;
  isRequestPending: boolean;
  isRequested: boolean;
}

const ListingHeader = ({
  name,
  vendorId,
  vendorName,
  updatedAt,
  createdAt,
  saveButtonText,
  installButtonText,
  installButtonDisabled,
  onSave,
  onInstallRequest,
  isSavePending,
  isInstallPending,
  isRequestPending,
  isRequested,
}: ListingHeaderProps) => {
  return (
    <div className='flex flex-col gap-10 lg:col-start-2'>
      <div className='grid grid-cols-[1fr_auto] gap-4 rounded-md bg-base-300 p-4'>
        <h1 className='text-2xl font-semibold'>{name}</h1>

        <div className='flex gap-2 items-center lg:order-1 lg:flex-col lg:justify-center lg:items-stretch'>
          <button
            className='btn text-primary bg-transparent rounded-3xl border-primary hover:bg-white'
            onClick={onSave}
            disabled={isSavePending}
          >
            {isSavePending && (
              <span className='loading loading-spinner loading-xs'></span>
            )}
            {capitalize(saveButtonText)}
          </button>

          <button
            className='btn btn-primary disabled:text-primary disabled:border-primary rounded-3xl disabled:bg-transparent'
            onClick={onInstallRequest}
            disabled={
              installButtonDisabled || isInstallPending || isRequestPending
            }
          >
            {(isInstallPending || isRequestPending) && (
              <span className='loading loading-spinner loading-xs'></span>
            )}
            {installButtonText}
          </button>
        </div>

        <div className='flex justify-between col-span-2 lg:flex-col'>
          <p className='text-xs text-gray-600'>
            By{' '}
            <Link href={`/vendor-details/${vendorId}`}>
              <span className='link link-hover font-semibold'>
                {vendorName}
              </span>
            </Link>
          </p>

          <p className='text-xs'>Last Updated: {formatDate(updatedAt)}</p>
          <p className='text-xs'>Date Created: {formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
