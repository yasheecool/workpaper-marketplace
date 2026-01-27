import Container from '@/components/layout/Container';
import { GradientHeroPart } from './GradientHeroPart';
import { TryDemoButton } from '@/feature/auth';
import Link from 'next/link';

const HeroSection = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <section className='lg:py-36 py-14 lg:flex lg:items-center'>
      {/* Background Grid Pattern */}
      <Container styles='flex flex-col gap-12 lg:gap-16 lg:flex-row lg:items-center'>
        {/* Left Content */}
        <div className='flex flex-col gap-6 lg:w-1/2'>
          <div className='space-y-4'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-base-content leading-tight'>
              Explore{' '}
              <span className='underline decoration-primary'>Verified</span>{' '}
              Workpaper Content
            </h1>
            <p className='text-lg text-base-content/80 leading-relaxed'>
              Browse procedures, checklists, reports and more - add to your
              workspace with one click.
            </p>
          </div>

          {/* Buttons */}
          <div className='flex flex-col sm:flex-row gap-3'>
            {isLoggedIn ? (
              <Link href='/firm-selection' className={`btn btn-primary`}>
                Enter App
              </Link>
            ) : (
              <>
                <TryDemoButton styles='btn btn-primary px-8 py-3 text-base font-semibold' />

                <Link href='/login'>
                  <button className='btn btn-outline btn-primary px-8 py-3 text-base font-semibold w-full sm:w-auto'>
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Content - Dashboard Preview with Decorative Border */}
        <GradientHeroPart />
      </Container>
    </section>
  );
};

export default HeroSection;
