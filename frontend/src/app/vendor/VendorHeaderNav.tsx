import Dropdown from '@/components/ui/Dropdown';
import { HeaderFirmSelectorLink } from '@/components/ui';
import { getFirmsContext } from '@/feature/firm';
import { getUserFromDB } from '@/feature/user';

const dropdownListObject = [
  {
    label: 'Profile',
    href: '/vendor/profile',
  },
  {
    label: 'Go to Marketplace',
    href: '/marketplace',
  },
  {
    label: 'Logout',
    href: '/',
  },
];

const VendorHeaderNav = async () => {
  const { currentFirm } = await getFirmsContext();
  const { firstName, lastName } = await getUserFromDB();

  return (
    <div className='flex items-center gap-4'>
      <HeaderFirmSelectorLink firmName={currentFirm!!.name} />

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
            <span>
              {firstName} {lastName}
            </span>
          </>
        }
        listObject={dropdownListObject}
      />
    </div>
  );
};
export default VendorHeaderNav;
