const Ellipsis = ({ actions }: { actions: Record<string, any> }) => {
  return (
    <div className='dropdown dropdown-end px-2 hover:bg-base-300 hover:cursor-pointer rounded-md flex items-center justify-center'>
      <div tabIndex={0} role='button'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6 '
          role='button'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
          />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-sm border-[0.5px] border-gray-50'
      >
        {actions.map(
          (
            action: { label: string; action: () => void; className?: string },
            index: number
          ) => (
            <li
              key={index}
              className={`hover:bg-base-300 px-2 py-1 rounded-md ${action.className || ''}`}
              onClick={action.action}
            >
              {action.label}
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default Ellipsis;
