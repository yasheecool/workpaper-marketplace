import Header from './Header';
import SidebarNav from './SidebarNav';
import AuthGuard from '@/components/layout/AuthGuard';

const layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <AuthGuard checkAdminRole={true} checkFirm={false}>
      <div className='flex min-h-[calc(100vh-68px)]'>
        <SidebarNav />
        <main className='flex-1 shrink-0 overflow-hidden'>
          <Header />
          <div className='px-6 py-8 max-w-6xl mx-auto'>{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
};
export default layout;
