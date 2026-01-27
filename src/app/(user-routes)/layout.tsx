import { UserHeader } from '@/feature/user';
import { Suspense } from 'react';
import { Loading } from '@/components/ui';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<div className='skeleton h-16 w-full' />}>
        <UserHeader />
      </Suspense>

      <main className='min-h-[calc(100vh-140px)]'>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
};
export default AppLayout;
