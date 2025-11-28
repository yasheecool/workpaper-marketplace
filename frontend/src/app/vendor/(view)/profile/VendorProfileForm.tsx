'use client';

import LabelText from '@/components/input/LabelText';
import { useForm } from 'react-hook-form';
import useAppStore from '@/store/appStore';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVendorProfile } from '@/hooks/react-query/firm';
import { useUpdateVendorProfile } from '@/hooks/react-query/firm';
import { vendorProfileFormSchema, VendorProfileType } from '@/types/schema';
import { getChangedFields } from '@/utils/getChangedFields';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { toast } from 'react-toastify';

type ImageObject = {
  url: string;
  file: File | null; //null for the cases if image is from the server
};

const VendorProfileForm = () => {
  const currentFirm = useAppStore((s) => s.currentFirm);
  const { vendorProfile, error } = useVendorProfile(currentFirm!.id);
  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting },
  } = useForm<VendorProfileType>({
    resolver: zodResolver(vendorProfileFormSchema),
  });
  const { mutate: update, data } = useUpdateVendorProfile(currentFirm!.id);
  const [firmLogo, setFirmLogo] = useState<ImageObject | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // console.log('Vendor Profile:', vendorProfile);
    if (vendorProfile) {
      reset(vendorProfile);
      vendorProfile.firmLogo &&
        setFirmLogo({ url: vendorProfile.firmLogo, file: null });
    }
  }, [vendorProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log('File:', file);
    if (!file) return console.log('No file selected');
    setFirmLogo({
      url: URL.createObjectURL(file),
      file: file,
    });
    if (inputRef.current) inputRef.current.value = '';
  };

  const onSubmit = async (data: VendorProfileType) => {
    console.log('Submitting form with data:', data);
    const changedFields = getChangedFields(
      { ...data, firmLogo: firmLogo?.url || null },
      vendorProfile
    );
    // console.log('Changed Fields:', changedFields); // Added logging for changed fields
    if (firmLogo?.file && firmLogo?.url !== vendorProfile?.firmLogo) {
      const url = await uploadToCloudinary(firmLogo.file);
      changedFields.firmLogo = url;
    } else if (firmLogo === null && vendorProfile?.firmLogo) {
      changedFields.firmLogo = null; // If firmLogo is removed
    }

    if (Object.keys(changedFields).length === 0) {
      toast.info('No changes made to the profile');
      return;
    }

    update(changedFields, {
      onSuccess: (data) => {
        const { updatedProfile } = data.data;
        reset(updatedProfile);
        toast.success('Profile updated successfully');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2 px-4 border-l-3 border-primary-500'>
          <p className='text-lg font-semibold'>Firm Logo</p>
          <div
            className='w-32 h-32 bg-base-300 flex items-center justify-center text-sm text-gray-500 cursor-pointer border-[0.5px] border-gray-300 relative'
            onClick={() => {
              console.log('Clicked');
              inputRef.current?.click();
            }}
          >
            {firmLogo ? (
              <>
                <button
                  className='absolute right-0 top-0 border-gray-300 text-black hover:bg-base-200 cursor-pointer rounded-full'
                  onClick={(e) => {
                    URL.revokeObjectURL(firmLogo.url);
                    setFirmLogo(null);
                    e.stopPropagation();
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </button>
                <img
                  src={firmLogo.url}
                  alt='Firm Logo'
                  className='w-full h-full object-cover'
                />
              </>
            ) : (
              <p className='text-center'>Click to upload</p>
            )}
            <input
              type='file'
              accept='image/*'
              multiple={false}
              className='hidden'
              onChange={handleImageChange}
              ref={inputRef}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4 px-4 border-l-3 border-primary-500'>
          <div>
            <LabelText
              required={true}
              label={'Firm Name'}
              type='input'
              extraProps={{
                defaultValue: vendorProfile?.vendor.firmName,
                readOnly: true,
              }}
            />
          </div>

          <div>
            <LabelText
              required={true}
              label={'About your firm'}
              register={register}
              name='description'
              type='textarea'
            />
          </div>
        </div>

        <div className='flex flex-col gap-4 px-4 border-l-3 border-primary-500'>
          <p className='font-semibold text-lg'>Contact info</p>
          <LabelText
            required={true}
            label={'Contact Email'}
            type='input'
            register={register}
            name='firmEmail'
          />
        </div>

        <div className='flex flex-col gap-4 px-4 border-l-3 border-primary-500'>
          <p className='font-semibold text-lg'>Website and socials</p>
          <LabelText
            required={true}
            label={'Website URL'}
            type='input'
            register={register}
            name='websiteUrl'
          />
          <LabelText
            required={false}
            label={'Linkedin URL'}
            type='input'
            register={register}
            name='linkedInUrl'
          />
        </div>

        <button className='btn bg-primary-400 hover:bg-primary-300 text-white mb-4'>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default VendorProfileForm;
