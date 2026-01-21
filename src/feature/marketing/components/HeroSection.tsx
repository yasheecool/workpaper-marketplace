import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';

const HeroSection = () => {
  return (
    <section className='lg:py-48 sm:py-20 lg:flex lg:items-center'>
      <Container styles='flex flex-col gap-12 lg:gap-16 lg:flex-row lg:items-center'>
        {/* Left Content */}
        <div className='flex flex-col gap-6 lg:w-1/2'>
          <div className='space-y-4'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-base-content leading-tight'>
              Explore Verified Workpaper Content
            </h1>
            <p className='text-lg text-base-content/80 leading-relaxed'>
              Browse procedures, checklists, reports and more - add to your
              workspace with one click.
            </p>
          </div>

          {/* Buttons */}
          <div className='flex flex-col sm:flex-row gap-3'>
            <button className='btn btn-primary px-8 py-3 text-base font-semibold'>
              Sign Up
            </button>
            <Link href='/login'>
              <button className='btn btn-outline btn-primary px-8 py-3 text-base font-semibold w-full sm:w-auto'>
                Log In
              </button>
            </Link>
          </div>
        </div>

        {/* Right Content - Dashboard Preview with Decorative Border */}
        <div className='w-full lg:w-1/2 order-1'>
          <div className='relative'>
            {/* Background Grid Pattern */}
            <div
              className='absolute inset-0 opacity-50 hidden lg:block'
              style={{
                backgroundImage: `
                  linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                  linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            ></div>

            {/* Decorative Gradient Border - Bartix style */}
            <div className='absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl opacity-75 blur'></div>

            {/* Inner Content Box */}
            <div className='relative bg-white rounded-2xl overflow-hidden shadow-2xl'>
              <Image
                src='/dashboard-preview.png'
                alt='Dashboard preview showing workpaper listings'
                width={1200}
                height={700}
                className='w-full h-auto object-cover'
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
