'use client';
import { useRouter } from 'next/navigation';
import Dropdown from '@/components/ui/Dropdown';
import useAppStore from '@/store/appStore';
import { useFirm } from '@/hooks/react-query/firm';
import { useUser } from '@/hooks/react-query/user';

import Link from 'next/link';

const UserHeaderNav = () => {
  const router = useRouter();
  const { jwt, currentFirm } = useAppStore();

  const { data: user, error: userError } = useUser(); //current user from DB
  const { data: firm, error: userErr } = useFirm(currentFirm!.id); //current firm from DB

  const navList = [
    {
      label: 'My Profile',
      href: '/profile',
    },
    {
      label: 'Installed Listings',
      href: '/installed-listings',
    },
    {
      label: 'Saved Listings',
      href: '/saved-listings',
    },
    ...(firm && firm.isVendor
      ? [
          {
            label: 'Switch to Vendor View',
            href: '/vendor',
          },
        ]
      : []),
    { label: 'Logout', href: '/' },
  ];

  return (
    <div className='flex items-center'>
      {firm && !firm.isVendor && (
        <Link href={'/vendor-request'}>
          <p className='text-sm link link-hover text-gray-600 hover:text-gray-800'>
            Become a Vendor
          </p>
        </Link>
      )}

      {/* FIRM Selection if firms more than 1 */}
      {jwt?.workpapers.firms.length !== 1 && (
        <button
          className='btn flex items-center bg-white border-none rounded-none hover:shadow-sm hover:bg-gray-100'
          onClick={() => router.push('/firm-selection')}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 30 26'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
            />
          </svg>
          {firm ? <p>{firm.firmName}</p> : <p className='skeleton h-4 w-14' />}
        </button>
      )}

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

            {user ? (
              <p>
                {user.firstName} {user.lastName}
              </p>
            ) : (
              <p className='skeleton h-4 w-14' />
            )}
          </>
        }
        listObject={navList}
      />
    </div>
  );
};
export default UserHeaderNav;
