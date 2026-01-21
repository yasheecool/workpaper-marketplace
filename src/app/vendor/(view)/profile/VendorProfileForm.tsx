'use client';

import LabelText from '@/components/input/LabelText';
import { useForm, type FieldErrors } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { vendorProfileFormSchema, VendorProfileType } from '@/types/schema';
import { getChangedFields, toSnakeCase } from '@/utils';
import { toast } from 'react-toastify';
import { type VendorProfile, updateVendorProfile } from '@/feature/vendor';
import { getImageUrl, deleteImage, uploadImage } from '@/lib/supabase/storage';

type ImageObject = {
  url: string;
  file: File | null; //null for the cases if image is from the server
};

const VendorProfileForm = ({
  vendorProfile,
}: {
  vendorProfile: VendorProfile;
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<VendorProfileType>({
    resolver: zodResolver(vendorProfileFormSchema),
    defaultValues: {
      description: vendorProfile.description,
      firmEmail: vendorProfile.firmEmail,
      websiteUrl: vendorProfile.websiteUrl,
      firmLogo: vendorProfile.firmLogo,
    },
  });

  const [firmLogo, setFirmLogo] = useState<ImageObject | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (vendorProfile) {
      if (vendorProfile.firmLogo) {
        getImageUrl(vendorProfile.firmLogo, 'VENDOR_PROFILE_IMAGE_BUCKET').then(
          (url) => {
            setFirmLogo({ url, file: null });
          }
        );
      }
    }
  }, [vendorProfile]);

  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return console.log('No file selected');

    setFirmLogo({
      url: URL.createObjectURL(file),
      file: file,
    });
    if (inputRef.current) inputRef.current.value = '';
  };

  const onSubmit = async (data: VendorProfileType) => {
    // console.log('Submitting form with data:', data);
    let changedFields = getChangedFields<VendorProfileType>(data, {
      ...vendorProfile,
    });

    //user uploaded a new image
    if (firmLogo?.file && firmLogo?.url !== vendorProfile.firmLogo) {
      const path = await uploadImage(
        firmLogo.file,
        vendorProfile.id,
        'VENDOR_PROFILE_IMAGE_BUCKET'
      );

      changedFields.firmLogo = path;
    }
    //user removed the existing image
    if (firmLogo === null && vendorProfile?.firmLogo) {
      await deleteImage(vendorProfile.firmLogo, 'VENDOR_PROFILE_IMAGE_BUCKET');
      changedFields.firmLogo = null; // If firmLogo is removed
    }

    if (Object.keys(changedFields).length === 0) {
      toast.info('No changes made to the profile');
      return;
    }

    changedFields = toSnakeCase(changedFields);

    try {
      await updateVendorProfile(vendorProfile.id, changedFields);
      toast.success('Profile updated successfully');
    } catch (e) {
      toast.error('Error updating profile: ' + (e as Error).message);
    }
  };

  const onError = (errors: FieldErrors<VendorProfileType>) => {
    const firstErrorField = Object.values(errors)[0];
    if (firstErrorField && firstErrorField.message) {
      toast.error(firstErrorField.message.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2 px-4 border-l-3 border-secondary'>
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
              onChange={handleLocalUpload}
              ref={inputRef}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4 px-4 border-l-3 border-secondary'>
          <div>
            <LabelText
              required={true}
              label={'Firm Name'}
              type='input'
              name='name'
              extraProps={{
                defaultValue: vendorProfile.firmName,
                disabled: true,
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

        <div className='flex flex-col gap-4 px-4 border-l-3 border-secondary'>
          <p className='font-semibold text-lg'>Contact info</p>
          <LabelText
            required={true}
            label={'Contact Email'}
            type='input'
            register={register}
            name='firmEmail'
          />
        </div>

        <div className='flex flex-col gap-4 px-4 border-l-3 border-secondary'>
          <p className='font-semibold text-lg'>Website and socials</p>
          <LabelText
            required={true}
            label={'Website URL'}
            type='input'
            register={register}
            name='websiteUrl'
          />
        </div>

        <button
          className='btn btn-secondary mb-4'
          disabled={isSubmitting}
          type='submit'
        >
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default VendorProfileForm;
