import Dropdown from '@/components/ui/Dropdown';
import { getUserFromDB } from '../queries';
import { getAllFirmsOfUser, getCurrentFirm } from '@/feature/firm';
import { HeaderFirmSelectorLink } from '@/components/ui';
import { signOut } from '@/feature/auth';

const UserHeaderNav = async () => {
  const user = await getUserFromDB();
  const currentFirm = await getCurrentFirm();
  const { allUserFirms } = await getAllFirmsOfUser();

  const navList = [
    {
      label: 'My Profile',
      href: '/profile',
    },
    {
      label: 'My Listings',
      href: '/my-listings',
    },
    {
      label: 'Saved Listings',
      href: '/saved-listings',
    },
    ...(currentFirm && currentFirm.isVendor
      ? [
          {
            label: 'Switch to Vendor View',
            href: '/vendor',
          },
        ]
      : []),
    { label: 'Logout', href: '', onClick: signOut },
  ];

  return (
    <div className='flex items-center gap-1'>
      {allUserFirms.length > 1 && (
        <HeaderFirmSelectorLink firmName={currentFirm!.name} />
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
