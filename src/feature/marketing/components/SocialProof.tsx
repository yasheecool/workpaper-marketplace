import { Container } from '@/components/layout';
import Image from 'next/image';

const SocialProof = () => {
  return (
    <section className='bg-gray-100 py-18'>
      <Container styles='flex flex-col gap-6'>
        <p className='mx-auto text-lg font-semibold'>
          Trusted by leading companies
        </p>
        <div className='flex flex-row gap-8 items-center justify-between'>
          <Image src='/sp-logo-1.svg' alt='Logo 1' width={75} height={40} />
          <Image src='/sp-logo-2.svg' alt='Logo 2' width={75} height={40} />
          <Image src='/sp-logo-3.svg' alt='Logo 3' width={75} height={40} />
          <Image src='/sp-logo-4.svg' alt='Logo 4' width={75} height={40} />
          <Image src='/sp-logo-5.svg' alt='Logo 5' width={75} height={40} />
        </div>
      </Container>
    </section>
  );
};
export default SocialProof;
