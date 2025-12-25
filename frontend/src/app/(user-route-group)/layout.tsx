import Header from '@/components/layout/Header';
import { UserHeaderNav } from '@/feature/user';
import AuthGuard from '@/components/layout/AuthGuard';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <UserHeaderNav />
      </Header>

      <main className='min-h-[calc(100vh-140px)]'>{children}</main>
    </>
  );
};
export default AppLayout;
