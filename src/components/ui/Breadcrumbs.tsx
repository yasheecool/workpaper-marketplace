import Link from 'next/link';

const Breadcrumbs = ({
  breadcrumbs,
}: {
  breadcrumbs: {
    target: string;
    label: string;
  }[];
}) => {
  return (
    <div className='breadcrumbs py-3 px-6 border-b-[0.5px] border-gray-400 overflow-clip text-gray-600'>
      <ul>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link href={breadcrumb.target}>
              <p>{breadcrumb.label}</p>{' '}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Breadcrumbs;
