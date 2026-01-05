import {
  isInstallButtonDisabled,
  getSavedButtonText,
  getInstallButtonText,
} from '@/feature/listing';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import { ListingVisibility } from '@/types/domain/listing';
import { capitalize } from 'lodash';
import {
  useSaveListingMutation,
  useInstallListingMutation,
  useRequestListingMutation,
} from '@/feature/listing/hooks/useListingMutations';

type ListingHeaderProps = {
  id: string;
  name: string;
  vendorName: string;
  vendorId: string;
  updatedAt: string;
  createdAt: string;
  visibility: ListingVisibility;
  isRequested: boolean;
  requestStatus: string | null;
  isInstalled: boolean;
  isSaved: boolean;
};

const ListingHeader = ({
  id,
  visibility,
  isRequested,
  requestStatus,
  isInstalled,
  isSaved,
  name,
  vendorName,
  vendorId,
  updatedAt,
  createdAt,
}: ListingHeaderProps) => {
  const { mutate: saveListingMutation, isPending: isSavePending } =
    useSaveListingMutation(id);

  const { mutate: installListingMutation, isPending: isInstallPending } =
    useInstallListingMutation(id);

  const { mutate: requestListingMutation, isPending: isRequestPending } =
    useRequestListingMutation(id);

  const saveButtonText = getSavedButtonText(isSaved);
  const installButtonText = getInstallButtonText(
    visibility,
    isRequested,
    requestStatus,
    isInstalled
  );
  const installButtonDisabled = isInstallButtonDisabled(
    visibility,
    isRequested,
    requestStatus,
    isInstalled
  );

  const handleInstallRequest = () => {
    if (installButtonText === 'Install') {
      installListingMutation();
    }

    if (installButtonText === 'Request') {
      requestListingMutation();
    }
  };

  return (
    <div className='grid grid-cols-[1fr_auto] gap-4 rounded-md bg-base-300 p-4'>
      <h1 className='text-2xl font-semibold'>{name}</h1>

      <div className='flex gap-2 items-center lg:order-1 lg:flex-col  lg:justify-center lg:items-stretch'>
        <button
          className='btn text-primary bg-transparent rounded-3xl  border-primary  hover:bg-white'
          onClick={() => saveListingMutation(saveButtonText)}
          disabled={isSavePending}
        >
          {isSavePending && <span className='loading loading-sm'></span>}
          {capitalize(saveButtonText)}
        </button>
        <button
          className='btn btn-primary disabled:text-primary disabled:border-primary rounded-3xl disabled:bg-transparent'
          disabled={
            isInstallPending || isRequestPending || installButtonDisabled
          }
          onClick={handleInstallRequest}
        >
          {installButtonText}
        </button>
      </div>

      <div className='flex justify-between col-span-2 lg:flex-col'>
        <p className='text-xs text-gray-600 '>
          By{' '}
          <Link href={`/vendor-details/${vendorId}`}>
            <span className='link link-hover font-semibold'>{vendorName}</span>
          </Link>
        </p>

        <p className='text-xs '>Last Updated: {formatDate(updatedAt)}</p>
        <p className='text-xs'>Date Created: {formatDate(createdAt)}</p>
      </div>
    </div>
  );
};
export default ListingHeader;
