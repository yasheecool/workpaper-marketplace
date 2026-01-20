export const getSavedButtonText = (isSaved: boolean) =>
  isSaved ? 'unsave' : 'save';

export const getInstallButtonText = (
  visibility: string,
  isRequested: boolean,
  requestStatus: string | null,
  isInstalled: boolean
) => {
  if (isInstalled) return 'Installed';

  if (isRequested) {
    if (requestStatus === 'pending') return 'Requested';
    if (requestStatus === 'rejected') return 'Rejected';
    if (requestStatus === 'approved') return 'Install';
  }

  if (visibility === 'request_access') return 'Request';

  return 'Install'; //for public listings not yet installed and for approved requests
};

export const isInstallButtonDisabled = (
  visibility: string,
  isRequested: boolean,
  requestStatus: string | null,
  isInstalled: boolean
) => {
  if (isInstalled) return true;

  if (isRequested) {
    if (requestStatus === 'pending' || requestStatus === 'rejected')
      return true;
    // if (requestStatus === 'approved') return false;
  }
  return false; //for public listings not yet installed and for approved requests
};

export const REQUEST_STATUS_MESSAGES = {
  pending: 'The request is pending approval. Please check back later.',
  approved:
    'The request has been approved. You can proceed with the installation.',
  rejected:
    'The request has been rejected. Please contact the vendor support for more information.',
} as const;
