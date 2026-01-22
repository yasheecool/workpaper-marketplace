import Unauthorized from '../ui/Unauthorized';
import { getCurrentFirm } from '@/feature/firm';

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
  if (checkIsFirmVendor) {
    const currentFirm = await getCurrentFirm();

    if (!currentFirm.isVendor) {
      return <Unauthorized message='You do not have vendor access.' />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
