import { redirect } from 'next/navigation';

const page = () => {
  return redirect('/admin/requests');
};
export default page;
