import Header from '@/components/Header';
import SidebarNav from './SidebarNav';

const VendorLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Header disableNavigation={true} />
      <main className='bg-base-200 py-4 min-h-[calc(100vh-70px)]'>
        <div className='section-container bg-white shadow-sm rounded-md grid grid-cols-[280px_1fr]'>
          <SidebarNav />
          <div>{children}</div>
        </div>
      </main>
    </>
  );
};
export default VendorLayout;
