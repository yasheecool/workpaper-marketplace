'use client';
import Dropdown from '@/components/ui/Dropdown';
import useUser from '@/hooks/react-query/user/useUser';

const Header = () => {
  const { data: user } = useUser();
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className='flex items-center justify-between px-6 pt-6 pb-4 b border-b border-gray-200 pr-8'>
      <div className='flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='size-5 text-primary-500'
        >
          <path
            fillRule='evenodd'
            d='M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z'
            clipRule='evenodd'
          />
        </svg>
        <p className='text-sm'>{formattedDate}</p>
      </div>

      <Dropdown
        displayChild={
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 26 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>
            {user?.firstName} {user?.lastName}
          </>
        }
        listObject={[
          {
            label: 'Profile',
            href: '#',
          },
          { label: 'Logout', href: '/' },
        ]}
      />
    </header>
  );
};
export default Header;
