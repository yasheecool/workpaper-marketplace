import UserHeaderNav from './UserHeaderNav';
import { Header } from '@/components/layout';
import { Suspense } from 'react';
import { getUserClaimsPublic } from '@/feature/auth';

const UserHeader = async () => {
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
    </>
  );
};
export default UserHeader;
