'use client';
import LabelText from '@/components/input/LabelText';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import useUser from '@/hooks/react-query/user/useUser';
import { useUpdateUserProfile } from '@/hooks/react-query/user';
import { userProfileFormSchema, UserProfileType } from '@/types/schema';
import { getChangedFields } from '@/utils/getChangedFields';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { toast } from 'react-toastify';

type ImageObject = {
  url: string;
  file: File | null; //null for the cases if image is from the server
};

const UserProfileForm = () => {
  const { data: userProfile, error } = useUser(); //get user from DB

  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting },
  } = useForm<UserProfileType>({
    resolver: zodResolver(userProfileFormSchema),
  });

  const { mutate: update, data } = useUpdateUserProfile();

  const [userProfileImage, setUserProfileImage] = useState<ImageObject | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
      userProfile.profileImage &&
        setUserProfileImage({
          url: userProfile.profileImage,
          file: null,
        });
    }
  }, [userProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return console.log('No file selected');
    setUserProfileImage({
      url: URL.createObjectURL(file),
      file: file,
    });
    if (inputRef.current) inputRef.current.value = ''; //Clear the image input field
  };

  const onSubmit = async (data: UserProfileType) => {
    // console.log('Data:', data);
    const changedFields = getChangedFields(data, userProfile);

    if (
      userProfileImage?.file &&
      userProfileImage?.url !== userProfile.profileImage //and the new image is different from the existing one
    ) {
      const url = await uploadToCloudinary(userProfileImage.file);
      changedFields.profileImage = url;
    } else if (userProfileImage === null && userProfile.profileImage) {
      // the above if statement checks if the user has removed the image
      changedFields.profileImage = null;
    }

    if (Object.keys(changedFields).length === 0) {
      toast.info('No changes made to the profile');
      return;
    }
    // console.log('Changed Fields:', changedFields);
    update(changedFields, {
      onSuccess: (data) => {
        const updatedProfile = data.data;
        reset(updatedProfile);
        toast.success('Profile updated successfully');
      },
    });
  };

  //this form can be further split up by using an object, which can be used to render the input fields dynamically while also passing the props
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-8'>
        {/* PROFILE IMAGE */}
        <div className='flex flex-col gap-2 px-4 border-l-3 border-primary-500'>
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
                    URL.revokeObjectURL(userProfileImage.url);
                    setUserProfileImage(null);
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
                  src={userProfileImage.url}
                  alt='Firm Logo'
                  className='w-full h-full object-cover rounded-full'
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

        {/* FIRST NAME, LASTNAME */}
        <div className='flex flex-col gap-4 px-4 border-l-3 border-primary-500'>
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
        <div className='flex flex-col gap-4 px-4 border-l-3 border-primary-500'>
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
          className='btn bg-primary-400 hover:bg-primary-300 text-white mb-4'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
