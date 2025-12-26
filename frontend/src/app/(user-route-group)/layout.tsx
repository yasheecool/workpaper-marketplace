import Header from '@/components/layout/Header';
import { UserHeaderNav } from '@/feature/user';
import { Suspense } from 'react';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <Suspense fallback={<div className='skeleton h-8 w-32' />}>
          <UserHeaderNav />
        </Suspense>
      </Header>

      <main className='min-h-[calc(100vh-140px)]'>{children}</main>
    </>
  );
};
export default AppLayout;
