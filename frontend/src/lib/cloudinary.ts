export const uploadToCloudinary = async (file: File): Promise<string> => {
  // console.log('upload to cloudinary executing');
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
      (() => {
        throw new Error('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not defined');
      })()
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await res.json();

  return data.secure_url;
};
