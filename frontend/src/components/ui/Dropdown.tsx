import Link from 'next/link';

//for more broad use cases, this component an onClick property can also be included in the listObject, then this component can be used for dropdowns with actions
const Dropdown = ({
  displayChild,
  listObject,
}: {
  displayChild: React.ReactNode;
  listObject: Record<string, any>[];
}) => {
  return (
    <div className='dropdown dropdown-hover dropdown-center'>
      <div
        tabIndex={0}
        role='button'
        className='btn m-0 border-l-[0.5px] border-gray-400 bg-white border-0 rounded-sm  hover:shadow-sm hover:bg-gray-100'
      >
        {displayChild}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-sm'
      >
        {listObject.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dropdown;
