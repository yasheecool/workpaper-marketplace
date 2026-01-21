'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { BackgroundGradient } from '@/components/ui/background-gradient';

export function GradientHeroPart() {
  return (
    <div className='relative flex h-[30rem] items-center justify-center bg-white lg:w-[60%]'>
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#6464c0_1px,transparent_1px),linear-gradient(to_bottom,#3434b8_1px,transparent_1px)]',
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      <BackgroundGradient className='rounded-[22px] bg-white ' animate={true}>
        <div className='relative'>
          <div className='absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-accent rounded-[22px] opacity-20 blur'></div>

          <div className='relative bg-white rounded-[22px] overflow-hidden shadow-2xl'>
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
      </BackgroundGradient>
    </div>
  );
}
