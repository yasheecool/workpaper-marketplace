const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='section-container bg-white shadow-sm rounded-md h-full'>
      {children}
    </div>
  );
};
export default layout;
