import { AuthGuard, Header } from '@/components/layout';
import VendorHeaderNav from './VendorHeaderNav';

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthGuard checkIsFirmVendor={true}>
        <Header disableNavigation={true}>
          <VendorHeaderNav />
        </Header>
        <main className='bg-base-200 py-4 h-[calc(100vh-142px)]'>
          {children}
        </main>
      </AuthGuard>
    </>
  );
};
export default VendorLayout;
