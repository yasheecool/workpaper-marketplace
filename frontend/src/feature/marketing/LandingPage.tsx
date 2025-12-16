'use client';
import Header from '@/components/layout/Header';
import { queryClient } from '@/lib/queryClient';
import useMockLogin from '@/hooks/useLogin';
import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SocialProof from './components/SocialProof';
import FeaturedListings from './components/FeaturedListings';

import SignupCta from './components/SignupCta';

const LandingPage = () => {
  const { login } = useMockLogin();

  useEffect(() => {
    queryClient.clear();
  }, []);

  return (
    <>
      <Header disableNavigation={true}>
        <div className='flex items-center gap-4 ml-auto'>
          <button
            className='btn bg-transparent text-secondary-500 border-1 border-secondary-500 hover:bg-gray-100'
            onClick={login}
          >
            Log In
          </button>
          <button className='btn bg-secondary-500 text-white hover:bg-secondary-700 ease-in-out'>
            Sign Up
          </button>
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
