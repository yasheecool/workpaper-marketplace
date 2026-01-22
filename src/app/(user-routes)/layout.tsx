import Header from '@/components/layout/Header';
import { UserHeaderNav } from '@/feature/user';
import { Suspense } from 'react';
import { getUserClaimsPublic } from '@/feature/auth';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const response = await getUserClaimsPublic();
  const userLoggedIn = response.success;

  return (
    <>
      {userLoggedIn ? (
        <Header>
          <Suspense fallback={<div className='skeleton h-8 w-32' />}>
            <UserHeaderNav />
          </Suspense>
        </Header>
      ) : (
        <Header />
      )}

      <main className='min-h-[calc(100vh-140px)]'>{children}</main>
    </>
  );
};
export default AppLayout;
