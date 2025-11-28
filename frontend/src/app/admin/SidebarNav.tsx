'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <aside className='w-72 bg-base-100 border-r border-gray-200'>
      <div className='flex items-center gap-3 px-6 py-6'>
        <Image src='/workpapers_logo.svg' alt='logo' height={30} width={30} />
        <h1 className='text-2xl font-semibold tracking-wide'>management</h1>
      </div>

      <nav className='py-8 px-4'>
        <ul className='flex flex-col gap-1 text-sm'>
          <Link href='/admin/requests'>
            <li
              className={`${pathname === '/admin/requests' ? 'bg-base-300 font-semibold' : ''} py-2 px-4 rounded-md hover:cursor-pointer transition-all`}
            >
              Vendor Requests
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};
export default SidebarNav;
