'use client';
import LabelText from '@/components/input/LabelText';
import { useForm, FieldErrors } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  userProfileFormSchema,
  UserProfileType,
  updateUserProfile,
  type User,
} from '@/feature/user';
import { getChangedFields } from '@/utils/getChangedFields';
import { toast } from 'react-toastify';

import { deleteImage, uploadImage, getImageUrl } from '@/lib/supabase/storage';
import Image from 'next/image';

type ImageObject = {
  url: string;
  file: File | null; //null for the cases if image is from the server
};

const UserProfileForm = ({ userProfile }: { userProfile: User }) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UserProfileType>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: userProfile,
  });

  const onError = (errors: FieldErrors<UserProfileType>) => {
    const firstErrorField = Object.values(errors)[0];
    if (firstErrorField && firstErrorField.message) {
      toast.error(firstErrorField.message.toString());
    }
  };

  const [userProfileImage, setUserProfileImage] = useState<ImageObject | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return toast.error('No file selected');

    setUserProfileImage({
      url: URL.createObjectURL(file),
      file: file,
    });

    if (inputRef.current) inputRef.current.value = ''; //Clear the image input field
  };

  const removeImage = () => {
    URL.revokeObjectURL(userProfileImage?.url || ''); //free up memory
    setUserProfileImage(null);
  };

  const handleServerImageUpload = async (
    changedFields: Record<string, any>
  ) => {
    //case 1: user had no image, and uploaded one
    if (userProfile.profileImage === null && userProfileImage) {
      //upload image and get path
      const url = await uploadImage(
        userProfileImage.file as File,
        userProfile.id,
        'USER_PROFILE_IMAGE_BUCKET'
      );
      changedFields.profileImage = url;
    }

    //case 2: user had an image, and removed it
    if (userProfile.profileImage && userProfileImage === null) {
      await deleteImage(userProfile.profileImage, 'USER_PROFILE_IMAGE_BUCKET');
      changedFields.profileImage = null;
    }

    //case 3: user had an image, and changed it
    if (
      userProfileImage?.url &&
      userProfileImage.url !== userProfile.profileImage
    ) {
      const url = await uploadImage(
        userProfileImage.file as File,
        userProfile.id,
        'USER_PROFILE_IMAGE_BUCKET'
      );
      changedFields.profileImage = url;
    }
    return changedFields;
  };

  const onSubmit = async (data: UserProfileType) => {
    let changedFields = getChangedFields(data, userProfile);

    try {
      changedFields = await handleServerImageUpload(changedFields);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : 'An error occurred while uploading the profile image.'
      );
      return;
    }

    if (Object.keys(changedFields).length === 0) {
      toast.info('No changes made to the profile');
      return;
    }

    // Type-safe snake_case conversion
    const snakeCaseChangedFields: Record<string, any> = {};

    (Object.keys(changedFields) as Array<keyof typeof changedFields>).forEach(
      (key) => {
        const snakeCaseKey = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        );
        snakeCaseChangedFields[snakeCaseKey] = changedFields[key];
      }
    );

    try {
      const data = await updateUserProfile(snakeCaseChangedFields);
      toast.success('Profile updated successfully!');
    } catch (e) {
      console.error('Error updating profile:', e);
      toast.error(
        e instanceof Error
          ? e.message
          : 'An error occurred while updating the profile.'
      );
      return;
    }
  };

  useEffect(() => {
    if (userProfile.profileImage) {
      getImageUrl(userProfile.profileImage, 'USER_PROFILE_IMAGE_BUCKET').then(
        (url) => {
          console.log('Fetched profile image URL:', url);
          setUserProfileImage({ url, file: null });
        }
      );
    }
  }, [userProfile.profileImage]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className='flex flex-col gap-8'>
        {/* PROFILE IMAGE */}
        <div className='flex flex-col gap-2 px-4 border-l-3 border-secondary'>
          <p className='text-lg font-semibold'>Profile Image</p>
          <div
            className='w-32 h-32 bg-base-300 rounded-full flex items-center justify-center text-sm text-gray-500 cursor-pointer border-[0.5px] border-gray-300 relative'
            onClick={() => {
              inputRef.current?.click(); // Open the file input dialog
            }}
          >
            {/* If image is present, then show the image and show X (remove) button to clear the image*/}
            {userProfileImage ? (
              <>
                <button
                  className='absolute right-0 top-0 border-gray-300 text-black hover:bg-base-200 cursor-pointer rounded-full'
                  onClick={(e) => {
                    removeImage();
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
                <Image
                  src={userProfileImage.url}
                  alt='Profile Image'
                  className='w-full h-full object-cover rounded-full'
                  width={128}
                  height={128}
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
              onChange={handleLocalImageUpload}
              ref={inputRef}
            />
          </div>
        </div>

        {/* FIRST NAME, LASTNAME */}
        <div className='flex flex-col gap-4 px-4 border-l-3 border-secondary'>
          <div>
            <LabelText
              required={true}
              label={'First Name'}
              type='input'
              name='firstName'
              register={register}
            />
          </div>

          <div>
            <LabelText
              required={true}
              label={'Last Name'}
              type='input'
              name='lastName'
              register={register}
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className='flex flex-col gap-4 px-4 border-l-3 border-secondary'>
          <p className='font-semibold text-lg'>Contact info</p>
          <LabelText
            required={true}
            label={'Email'}
            type='input'
            register={register}
            name='email'
          />
        </div>

        <button
          className='btn btn-secondary text-white'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
