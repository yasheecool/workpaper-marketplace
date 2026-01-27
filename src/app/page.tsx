import Header from '@/components/layout/Header';
import {
  HeroSection,
  SocialProof,
  FeaturedListings,
  SignupCta,
} from '@/feature/marketing';
import { Loading } from '@/components/ui';
import { Suspense } from 'react';
import { getUserClaimsPublic } from '@/feature/auth';
import TryDemoButton from '@/feature/auth/components/TryDemoButton';
import Link from 'next/link';

export default async function HomePage() {
  const isLoggedIn = (await getUserClaimsPublic()).success;
  return (
    <>
      <Header disableNavigation>
        <div className='flex items-center gap-4 ml-auto'>
          {isLoggedIn ? (
            <Link href='/firm-selection' className={`btn btn-primary`}>
              Enter App
            </Link>
          ) : (
            <>
              <Link
                href='/login'
                className={`btn bg-none text-primary border-primary`}
              >
                Log In
              </Link>
              <TryDemoButton styles={`btn btn-primary`} />
            </>
          )}
        </div>
      </Header>

      <main className='min-h-[calc(100vh-70px)]'>
        <HeroSection isLoggedIn={isLoggedIn} />

        <SocialProof />
        <Suspense fallback={<Loading />}>
          <FeaturedListings />
        </Suspense>
        <SignupCta />
      </main>
    </>
  );
}
