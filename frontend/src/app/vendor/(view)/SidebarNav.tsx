'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SidebarNav = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      label: 'Profile',
      target: '/vendor/profile',
    },
    {
      label: 'Listings',
      target: '/vendor/listings',
    },
    {
      label: 'Listing Requests',
      target: '/vendor/listing-requests',
    },
  ];

  return (
    <aside className='pr-4 py-4 border-r-[1px] border-r-gray-200 text-gray-800'>
      <nav>
        <ul className='flex flex-col text-sm h-full'>
          {navLinks.map((link) => (
            <Link href={link.target} key={link.target}>
              <li
                className={`p-2 hover:bg-gray-100 rounded-md hover:cursor-pointer ${
                  pathname === link.target
                    ? 'bg-gray-200 font-semibold hover:bg-gray-200'
                    : ''
                }`}
              >
                {link.label}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default SidebarNav;
