'use client';
import { FieldValues, useForm } from 'react-hook-form';
import {
  entityTypeOptions,
  listingTypeOptions,
  listingVisibilityOptions,
  regionOptions,
  workpaperTypeOptions,
  useCreateListingMutation,
  useUpdateListingMutation,
  type ListingContent,
} from '@/feature/listing';
import { LabelText, FormSelect, CheckboxGroup } from '@/components/input';
import { ImageUpload, ImagePreview } from '@/components/ui';
import { ListingInputType, listingInputSchema } from '@/types/schema';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { getChangedFields } from '@/utils/getChangedFields';
import { toSnakeCase } from '@/utils/convertToSnakeCase';
import { getQueryClient } from '@/lib/queryClient';
import { useRouter } from 'next/navigation';

type props = {
  listingData: ListingInputType | ListingContent;
  mode: 'create' | 'edit';
};

type ImageObject = {
  url: string;
  file: File | null; //file will be null if the image is already uploaded
};
function isListingInputType(
  data: ListingInputType | ListingContent
): data is ListingInputType {
  return Array.isArray((data as any).imagesLink);
}
//flow: fetch listing in editorPage/createPage -> receive here as prop (this component/page is used for both creating and editing a listing)-> prefill form with the received listing data -> check logic in useEffect hook which resets/prefills the form with the received listing data

const ListingEditor = ({ listingData, mode }: props) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ListingInputType>({
    defaultValues: listingData,
    resolver: zodResolver(listingInputSchema),
  });

  const router = useRouter();
  const [images, setImages] = useState<ImageObject[]>([]);
  const { mutate: updateListing } = useUpdateListingMutation(listingData.id);
  const { mutate: createListing } = useCreateListingMutation();

  useEffect(() => {
    if (listingData) {
      reset(listingData); // Reset the form with the listing data if user mutates listing

      if (mode === 'create') setValue('imagesLink', []); //set imagesLink to empty array if mode is create

      //set image objects if listing already has some images
      if (isListingInputType(listingData) && listingData.imagesLink?.length) {
        const imageObjects = listingData.imagesLink.map((url) => ({
          url,
          file: null,
        }));
        setImages(imageObjects);
      }
    }
  }, [listingData]);

  const removeUrl = (url: string) => {
    const updatedImages = images.filter((img) => {
      if (img.url === url) {
        URL.revokeObjectURL(img.url); // Revoke the object URL to free up memory
        return false; // Remove this image from the array
      } else return true;
    });
    setImages(updatedImages);
  };

  const handleImageUpload = (imageObjs: ImageObject[]) => {
    setImages((prev) => [...prev, ...imageObjs]);
  };

  const onSubmit = async (data: FieldValues) => {
    //Separate Existing image urls
    const existingImgUrls = images
      .filter((img) => img.file === null)
      .map((img) => img.url);

    const newBlobUrls = images.filter((img) => img.file !== null);

    let uploadedUrls: string[] = [];

    //Upload new images to cloudinary
    if (newBlobUrls.length) {
      // uploadedUrls = await Promise.all(
      //   newBlobUrls.map((img) => uploadToCloudinary(img.file!))
      // );
    }

    //construct the final images array
    const finalImagesLink = [...existingImgUrls, ...uploadedUrls];

    if (mode === 'edit') {
      let changedFields = getChangedFields(
        { ...data, imagesLink: [...finalImagesLink] } as FieldValues,
        listingData
      );

      const isEmpty = Object.keys(changedFields).length === 0;

      if (!isEmpty) {
      } else toast.info('No changes made to the listing');

      changedFields = toSnakeCase({
        ...changedFields,
        imagesLink: finalImagesLink,
      });
      await updateListing(changedFields, {
        onSuccess: () => {
          getQueryClient().invalidateQueries({
            queryKey: ['listing', listingData.id],
          });
          getQueryClient().invalidateQueries({ queryKey: ['vendor-listings'] });
        },
      });
    }

    if (mode === 'create' && !isListingInputType(listingData)) {
      const listing = toSnakeCase({
        ...data,
        ownedByFirm: listingData.ownedByFirm,
        imagesLink: finalImagesLink,
      });
      console.log(listing);

      createListing(listing, {
        onSuccess: () => {
          router.replace(`/vendor/listing/edit/${listingData.id}`);
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => console.log(errors))}
      className='flex flex-col gap-8 '
    >
      {/* NAME */}
      <div
        className={`px-4 border-l-3 border-secondary py-1 max-w-200 flex flex-col gap-1`}
      >
        <LabelText
          required={true}
          label={'Name'}
          type='input'
          name='name'
          register={register}
        />
        {errors.name?.message && (
          <p className='text-red-500 text-xs'>{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div
        className={`px-4 border-l-3 border-secondary py-1 justify-center  max-w-200`}
      >
        <LabelText
          required={true}
          label={'Description'}
          type='textarea'
          name='description'
          register={register}
        />
        {errors.description?.message && (
          <p className='text-red-500 text-xs'>{errors.description.message}</p>
        )}
      </div>

      {/* Long Description */}
      <div
        className={`px-4 border-l-3 border-secondary py-1 justify-center  max-w-200`}
      >
        <LabelText
          required={false}
          label={'Long Description'}
          type='textarea'
          name='longDescription'
          register={register}
        />
        {errors.longDescription?.message && (
          <p className='text-red-500 text-xs'>
            {errors.longDescription.message}
          </p>
        )}
      </div>

      {/* Getting Started Steps */}
      <div
        className={`px-4 border-l-3 border-secondary py-1 justify-center  max-w-200`}
      >
        <LabelText
          required={false}
          label={'Getting Started Steps'}
          type='textarea'
          name='gettingStartedSteps'
          register={register}
        />
        {errors.gettingStartedSteps?.message && (
          <p className='text-red-500 text-xs'>
            {errors.gettingStartedSteps.message}
          </p>
        )}
      </div>

      {/* Content Type */}
      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-secondary py-1 justify-center '>
        <FormSelect
          optionsObj={listingTypeOptions}
          label='Listing Type'
          defaultValue=''
          displayAll={false}
          name='contentType'
          register={register}
        />
        {errors.contentType?.message && (
          <p className='text-red-500 text-xs'>{errors.contentType.message}</p>
        )}
      </fieldset>

      {/* Region */}
      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-secondary py-1 justify-center '>
        <FormSelect
          optionsObj={regionOptions}
          defaultValue=''
          displayAll={false}
          label='Region'
          name='region'
          register={register}
        />
        {errors.region?.message && (
          <p className='text-red-500 text-xs'>{errors.region.message}</p>
        )}
      </fieldset>

      {/* Workpaper Type */}
      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-secondary py-1 justify-center max-w-200'>
        <CheckboxGroup
          required={true}
          optionsObj={workpaperTypeOptions}
          legend='Workpaper Type'
          name='workpaperType'
          register={register}
        />
        {errors.workpaperType?.message && (
          <p className='text-red-500 text-xs'>{errors.workpaperType.message}</p>
        )}
      </fieldset>

      {/* Entity Type */}
      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-secondary py-1 justify-center max-w-200'>
        <CheckboxGroup
          required={true}
          optionsObj={entityTypeOptions}
          legend='Entity Type'
          name='entityType'
          register={register}
        />
        {errors.entityType?.message && (
          <p className='text-red-500 text-xs'>{errors.entityType.message}</p>
        )}
      </fieldset>

      {/* Listing Visibility */}
      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-secondary py-1 justify-center '>
        <div className='flex items-center gap-2'>
          <FormSelect
            optionsObj={listingVisibilityOptions}
            label='Access Settings'
            defaultValue=''
            displayAll={false}
            name='visibility'
            register={register}
          />
          {errors.visibility?.message && (
            <p className='text-red-500 text-xs'>{errors.visibility.message}</p>
          )}
          <div
            className='tooltip tooltip-top z-10'
            data-tip={
              'Please set this field as "Request Only", and save changes to access the Whitelist Management tab.'
            }
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
                d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
              />
            </svg>
          </div>
        </div>
      </fieldset>

      {/* Image */}
      <div className='px-4 border-l-3 border-secondary py-2 flex flex-col gap-4'>
        <ImageUpload setImages={handleImageUpload} />

        {!!images.map((img) => img.url).length && (
          <div className=' w-75 md:w-125 rounded overflow-hidden'>
            <ImagePreview
              imgUrls={images.map((img) => img.url)}
              setUrls={removeUrl}
            />
          </div>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='btn bg-secondary text-white hover:bg-primary-400   min-w-100'
      >
        {!isSubmitting && (
          <span>{mode === 'create' ? 'Create' : 'Update'} Listing </span>
        )}
        {isSubmitting && (
          <>
            <span className='loading-spinner' />
            <p>{mode === 'create' ? 'Creating' : 'Updating'} Listing </p>
          </>
        )}
      </button>
    </form>
  );
};

export default ListingEditor;
