import Unauthorized from '../ui/Unauthorized';

import { getFirmsContext } from '@/feature/firm';

interface AuthGuardProps {
  children: React.ReactNode;
  checkFirm?: boolean;
  checkAdminRole?: boolean;
  checkIsFirmVendor?: boolean;
}

const AuthGuard = async ({
  children,
  checkIsFirmVendor = false,
}: AuthGuardProps) => {
  const { currentFirm } = await getFirmsContext();

  //change to redirect
  if (checkIsFirmVendor) {
    if (!currentFirm?.isVendor) {
      return <Unauthorized message='You do not have vendor access.' />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
