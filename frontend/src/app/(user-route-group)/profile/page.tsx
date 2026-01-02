import UserProfileForm from './UserProfileForm';

const page = () => {
  return (
    <section className='px-6 py-4 h-full flex flex-col gap-8 max-w-5xl mx-auto overflow-y-auto'>
      <header className='flex flex-col gap-2 border-b-[0.5px] border-gray-300 pb-4'>
        <h1 className='text-lg'>Profile</h1>
        <p className='text-gray-600 text-sm'>Configure your profile here</p>
      </header>
      <UserProfileForm />
    </section>
  );
};
export default page;
