import { redirect } from 'next/navigation';

const page = () => {
  redirect('/vendor/listings');
  // return <div>Hello</div>;
};
export default page;
