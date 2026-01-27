import { UserHeader } from '@/feature/user';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserHeader />

      <main className='min-h-[calc(100vh-140px)]'>{children}</main>
    </>
  );
};
export default AppLayout;
