import Link from 'next/link';

const Tabs = ({
  tabs,
}: {
  tabs: {
    label: string;
    isActive: boolean;
    href: string;
  }[];
}) => {
  return (
    <div
      role='tablist'
      className='tabs tabs-border border-b-[0.5px] pt-2 border-gray-400 font-semibold text-secondary'
    >
      {tabs.map((tab, index) => {
        return (
          <Link
            key={index}
            role='tab'
            className={`tab ${tab.isActive ? 'tab-active' : ''} hover:text-secondary`}
            href={tab.href}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};
export default Tabs;
