'use client';
import useAppStore from '@/store/appStore';
import Loading from '../ui/Loading';
import Unauthorized from '../Unauthorized';
import { useFirm } from '@/hooks/react-query/firm';

interface AuthGuardProps {
  children: React.ReactNode;
  checkFirm?: boolean;
  checkAdminRole?: boolean;
  checkIsFirmVendor?: boolean;
}

const AuthGuard = ({
  children,
  checkFirm = true,
  checkAdminRole = false,
  checkIsFirmVendor = false,
}: AuthGuardProps) => {
  const jwt = useAppStore((state) => state.jwt);
  const currentFirm = useAppStore((state) => state.currentFirm);
  const hydrated = useAppStore((state) => state.hydrated);

  // TODO: Possible bug. The screen flickers on refreshes

  // TODO: This approach can be replaced with queryClient.fetchQuery(). This will eliminate the need for the useFirm hook to be called when there is no firmId available, preventing UNDEFINED in its parameter.
  const {
    data: firm,
    error: firmErr,
    isLoading,
    status,
  } = useFirm(currentFirm?.id); //current firm from DB

  if (!hydrated || isLoading) {
    return <Loading />;
  }

  //case when the user is not logged in
  if (!jwt) {
    return <Unauthorized text='Please log in to access the page.' />;
  }

  //case when the user is logged in but firm is not selected
  if (checkFirm && !currentFirm) {
    if (status !== 'success') return <Loading />;
    return <Unauthorized text='Please select a firm to access the page.' />;
  }

  //case when the firm is not vendor, this is to protect vendor functionality of the app
  if (checkIsFirmVendor && !firm?.isVendor) {
    // console.log('Firm is not a vendor');
    return <Unauthorized text='You must be a vendor to access this page.' />;
  }

  //case when the user is not admin, this is to protect admin functionality of the app
  if (checkAdminRole && !jwt.marketplace.isAdmin) {
    return (
      <Unauthorized text='You do not have the permission to access this page.' />
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
