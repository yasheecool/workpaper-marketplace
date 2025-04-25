import Header from '@/components/Header';
import VendorHeaderNav from './VendorHeaderNav';

const VendorLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Header disableNavigation={true}>
        <VendorHeaderNav />
      </Header>
      <main className='bg-base-200 py-4 h-[calc(100vh-70px)]'>{children}</main>
    </>
  );
};
export default VendorLayout;
