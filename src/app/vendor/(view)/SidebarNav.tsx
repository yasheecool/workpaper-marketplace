'use client';
import { useRouter, usePathname } from 'next/navigation';

const SidebarNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (destinationPath: string) => {
    if (pathname !== destinationPath) router.push(destinationPath);
  };

  return (
    <aside className='pr-4 py-4 border-r-[1px] border-r-gray-200 text-gray-800'>
      <nav>
        <ul className='flex flex-col text-sm h-full'>
          <li
            className={`p-2 hover:bg-gray-100 rounded-md hover:cursor-pointer ${pathname === '/vendor/profile' ? 'bg-gray-200 font-semibold hover:bg-gray-200' : ''}`}
            onClick={() => navigate('/vendor/profile')}
          >
            Profile
          </li>
          <li
            className={`p-2 hover:bg-gray-100 rounded-md hover:cursor-pointer ${pathname === '/vendor/listings' ? 'bg-gray-200 font-semibold hover:bg-gray-200' : ''}`}
            onClick={() => navigate('/vendor/listings')}
          >
            Listings
          </li>
          <li
            className={`p-2 hover:bg-gray-100 rounded-md hover:cursor-pointer ${pathname === '/vendor/listing-requests' ? 'bg-gray-200 font-semibold hover:bg-gray-200' : ''}`}
            onClick={() => navigate('/vendor/listing-requests')}
          >
            Listing Requests
          </li>

          <li
            className={`p-2 hover:bg-gray-100 rounded-md hover:cursor-pointer ${pathname === '/vendor/whitelist-management' ? 'bg-gray-200 font-semibold hover:bg-gray-200' : ''}`}
            onClick={() => navigate('/vendor/whitelist-management')}
          >
            Global Whitelist Management
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default SidebarNav;
