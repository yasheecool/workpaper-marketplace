'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Container from './Container';

const Header = ({
  children,
  disableNavigation = false,
}: {
  children?: React.ReactElement;
  disableNavigation?: boolean;
}) => {
  const router = useRouter();

  return (
    <header className='border-b-[0.5px] border-gray-500'>
      <nav>
        <Container styles='flex flex-row items-center justify-between py-3'>
          <div
            className={`flex items-center ${disableNavigation ? '' : 'cursor-pointer'}`}
            onClick={() => !disableNavigation && router.push('/marketplace')}
          >
            <Image
              src={'/workpapers_logo.svg'}
              alt='logo'
              height={27.5}
              width={27.5}
              className='inline-block mr-3 cursor-pointer'
            />
            <span className='text-2xl cursor-pointer text-gray-800 tracking-wide font-semibold'>
              marketplace
            </span>
          </div>
          {children}
        </Container>
      </nav>
    </header>
  );
};
export default Header;
