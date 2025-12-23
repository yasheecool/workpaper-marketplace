'use client';
import Header from '@/components/layout/Header';
import { queryClient } from '@/lib/queryClient';
import useMockLogin from '@/hooks/useLogin';
import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SocialProof from './components/SocialProof';
import FeaturedListings from './components/FeaturedListings';

import SignupCta from './components/SignupCta';
import Link from 'next/link';

const LandingPage = () => {
  const { login } = useMockLogin();

  useEffect(() => {
    queryClient.clear();
  }, []);

  return (
    <>
      <Header disableNavigation={true}>
        <div className='flex items-center gap-4 ml-auto'>
          <Link href='/login'>
            <button
              className='btn bg-transparent text-primary border-1 border-primary hover:bg-base-200'
              // onClick={login}
            >
              Log In
            </button>
          </Link>
          <button className='btn btn-primary ease-in-out'>Sign Up</button>
        </div>
      </Header>

      <main className='min-h-[calc(100vh-70px)]'>
        <HeroSection />
        <SocialProof />
        <FeaturedListings />
        <SignupCta />
      </main>
    </>
  );
};
export default LandingPage;
