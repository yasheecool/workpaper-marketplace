import { getFirmsContext } from '@/feature/firm';
import VendorProfileForm from './VendorProfileForm';
import { getVendorProfile } from '@/feature/vendor';

const page = async () => {
  const { currentFirm } = await getFirmsContext();
  const vendorProfile = await getVendorProfile(currentFirm!.id);

  return (
    <div className='px-6 py-4 h-full flex flex-col gap-8'>
      <header className='flex flex-col gap-2 border-b-[0.5px] border-gray-300 pb-4'>
        <h1 className='text-lg'>Profile</h1>
        <p className='text-gray-600 text-sm'>
          This is how others will see you on the marketplace.
        </p>
      </header>
      <VendorProfileForm vendorProfile={vendorProfile} />
    </div>
  );
};
export default page;
