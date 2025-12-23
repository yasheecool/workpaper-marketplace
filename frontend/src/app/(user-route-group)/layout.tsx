import Header from '@/components/layout/Header';
import UserHeaderNav from './UserHeaderNav';
import AuthGuard from '@/components/layout/AuthGuard';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <AuthGuard checkFirm={true}> */}
      <Header>
        <UserHeaderNav />
      </Header>

      <main className='min-h-[calc(100vh-140px)]'>{children}</main>
      {/* </AuthGuard> */}
    </>
  );
};
export default AppLayout;
