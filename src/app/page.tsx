import Header from '@/components/layout/Header';
import {
  HeroSection,
  SocialProof,
  FeaturedListings,
  SignupCta,
} from '@/feature/marketing';

import Link from 'next/link';

const page = () => {
  return (
    <>
      <Header disableNavigation={true}>
        <div className='flex items-center gap-4 ml-auto'>
          <Link href='/login'>
            <button className='btn bg-none text-primary border-primary'>
              Log In
            </button>
          </Link>
          <button className='btn btn-primary ease-in-out'>Try Demo</button>
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

export default page;
