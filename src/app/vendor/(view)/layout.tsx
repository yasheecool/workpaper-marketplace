import SidebarNav from './SidebarNav';

const layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className='section-container bg-white shadow-sm rounded-md grid grid-cols-[280px_1fr] overflow-x-hidden h-full overflow-hidden'>
      <SidebarNav />
      <div className='h-full overflow-y-auto'>{children}</div>
    </div>
  );
};
export default layout;
