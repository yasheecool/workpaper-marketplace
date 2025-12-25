import { LoginForm } from '@/feature/auth';

const page = () => {
  return (
    <main className='min-h-[calc(100vh-70px)] flex items-center justify-center'>
      <div className='w-full max-w-md px-6 border-[0.5px] p-8 rounded-lg shadow-lg border-primary-500'>
        <LoginForm />
      </div>
    </main>
  );
};
export default page;
