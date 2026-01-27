import SidebarNav from './SidebarNav';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='section-container bg-white shadow-sm rounded-md grid grid-cols-[auto_1fr] overflow-x-hidden h-full overflow-hidden md:grid-cols-[250px_1fr]'>
      <SidebarNav />
      <div className='h-full overflow-auto'>{children}</div>
    </div>
  );
};
export default layout;
