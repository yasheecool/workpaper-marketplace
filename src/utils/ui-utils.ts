const getButtonText = (
  isInstalled: boolean,
  requestStatus: 'approved' | 'pending' | 'rejected',
  listingVisibility: string
) => {
  if (isInstalled) {
    return 'Installed';
  } else if (requestStatus === 'approved') {
    return 'Install';
  } else if (requestStatus === 'pending') {
    return 'Requested';
  } else if (requestStatus === 'rejected') {
    return 'Rejected';
  } else if (listingVisibility === 'public') {
    return 'Install';
  } else {
    return 'Request Access';
  }
};

//returns a status class for displaying request status. the class status-class is a daisyui utility class
const getStatusClass = (
  requestStatus: 'pending' | 'approved' | 'rejected' | 'deleted'
): string => {
  switch (requestStatus) {
    case 'pending':
      return 'status-warning';
    case 'approved':
      return 'status-success';
    case 'rejected':
      return 'status-error';
    case 'deleted':
      return 'status-error';
    default:
      return '';
  }
};

export { getButtonText, getStatusClass };
