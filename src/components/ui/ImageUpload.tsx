'use client';

import { useRef } from 'react';

const ImageUpload = ({
  setImages,
}: {
  setImages: (imageObjs: { url: string; file: File | null }[]) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files;
    if (!fileList) return;

    const files = Array.from(fileList);

    const imageObjects = files.map((file) => {
      const url = URL.createObjectURL(file);
      return { url, file };
    });
    setImages(imageObjects);

    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <p className='font-semibold'>Image</p>
      <fieldset className='fieldset'>
        <legend className='fieldset-legend font-normal'>
          Select images to upload
        </legend>
        <input
          ref={inputRef}
          type='file'
          className='file-input'
          multiple
          accept='image/*'
          onChange={handleChange}
        />
        <label className='label'>Max size 2MB</label>
      </fieldset>
    </>
  );
};
export default ImageUpload;
