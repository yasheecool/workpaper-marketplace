export const getSavedButtonText = (isSaved: boolean) =>
  isSaved ? 'Unsave' : 'Save';

export const getInstallButtonText = (
  visibility: string,
  isRequested: boolean,
  requestStatus: string | null,
  isInstalled: boolean
) => {
  if (visibility === 'request_access') return 'Request';

  if (isRequested) {
    if (requestStatus === 'pending') return 'Requested';
    if (requestStatus === 'rejected') return 'Rejected';
    // if (requestStatus === 'approved') return 'Install';
  }
  if (isInstalled) return 'Installed';

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
