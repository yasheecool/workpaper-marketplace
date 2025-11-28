import ContentDisplay from './ContentDisplay';

const page = () => {
  return (
    <div className='py-8 text-gray-800 px-2 flex flex-col gap-8 h-full'>
      <header className='flex flex-col gap-1'>
        <h1 className='text-3xl font-semibold tracking-tight'>
          Select a Content Template
        </h1>
        <p>Choose a piece of content to base your listing on</p>
      </header>
      <ContentDisplay />
    </div>
  );
};
export default page;
