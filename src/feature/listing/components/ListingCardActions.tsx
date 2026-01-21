'use client';

import Tooltip from '@/components/ui/Tooltip';
import {
  useSaveListingMutation,
  useInstallListingMutation,
  useRequestListingMutation,
} from '../hooks/useListingMutations';
import {
  getSavedButtonText,
  getInstallButtonText,
  isInstallButtonDisabled,
} from '../utils';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import { REQUEST_STATUS_MESSAGES } from '../utils';

interface ListingCardActionsProps {
  id: string;
  updatedAt: string;
  visibility: string;
  isSaved: boolean;
  isInstalled: boolean;
  isRequested: boolean;
  requestStatus: 'pending' | 'approved' | 'rejected' | null;
}

const ListingCardActions = ({
  id,
  updatedAt,
  visibility,
  isSaved,
  isInstalled,
  isRequested,
  requestStatus,
}: ListingCardActionsProps) => {
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
    <div className='flex flex-col items-center justify-between gap-2'>
      <div className='text-center text-gray-700'>
        <p className='font-bold'>FREE</p>
        <p className='text-xs'>Last updated: {formatDate(updatedAt)}</p>
      </div>

      <div className='w-full space-y-1'>
        <div className='flex items-center justify-between gap-2 mb-2'>
          <button
            className='btn btn-primary w-9/10'
            onClick={handleInstallRequest}
            disabled={installButtonDisabled}
          >
            {(isInstallPending || isRequestPending) && (
              <span className='loading loading-spinner loading-xs'></span>
            )}{' '}
            {installButtonText}
          </button>
          {isRequested && !isInstalled && (
            <div
              className='tooltip tooltip-left'
              data-tip={
                requestStatus ? REQUEST_STATUS_MESSAGES[requestStatus] : ''
              }
            >
              <Tooltip />
            </div>
          )}
        </div>

        <button
          className='btn w-9/10 bg-transparent text-primary border-primary hover:bg-base-300'
          onClick={() => saveListingMutation(saveButtonText)}
          disabled={isSavePending}
        >
          {isSavePending && (
            <span className='loading loading-spinner loading-xs'></span>
          )}
          {capitalize(saveButtonText)}
        </button>
      </div>
    </div>
  );
};

export default ListingCardActions;
