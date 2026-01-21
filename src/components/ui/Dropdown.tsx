import Link from 'next/link';

type DropdownItem = {
  label: string;
  href: string;
  onClick?: () => void;
};

const Dropdown = ({
  displayChild,
  listObject,
}: {
  displayChild: React.ReactNode;
  listObject: DropdownItem[];
}) => {
  return (
    <div className='dropdown dropdown-hover dropdown-center'>
      <div
        tabIndex={0}
        role='button'
        className='btn m-0  border-gray-400 bg-white border-0 rounded-sm  hover:shadow-sm hover:bg-gray-100'
      >
        {displayChild}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-sm'
      >
        {listObject.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dropdown;
