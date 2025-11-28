const Tabs = ({
  tabs,
}: {
  tabs: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }[];
}) => {
  return (
    <div
      role='tablist'
      className='tabs tabs-border border-b-[0.5px] pt-2 border-gray-400 font-semibold text-primary-500'
    >
      {tabs.map((tab, index) => {
        return (
          <a
            key={index}
            role='tab'
            className={`tab ${tab.isActive ? 'tab-active' : ''} hover:text-primary-500`}
            onClick={tab.onClick}
          >
            {tab.label}
          </a>
        );
      })}
    </div>
  );
};
export default Tabs;
