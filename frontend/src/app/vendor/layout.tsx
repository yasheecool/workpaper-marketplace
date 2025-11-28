import Header from '@/components/layout/Header';
import VendorHeaderNav from './VendorHeaderNav';
import AuthGuard from '@/components/layout/AuthGuard';

const VendorLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <AuthGuard checkFirm={true} checkIsFirmVendor={true}>
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
