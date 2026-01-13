import { createClient } from './browserClient'; // lib/supabase/storage.ts - Client-side upload

export const uploadImage = async (
  file: File,
  id: string,
  bucketName: string
) => {
  // Validate file size/type on client
  if (file.size > 5 * 1024 * 1024) throw new Error('File too large');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Invalid file type');
  }

  const supabase = createClient();
  const filename = `profile-image`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`${id}/${filename}`, file, { upsert: true });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data.path;
};

export const deleteImage = async (path: string, bucketName: string) => {
  const supabase = createClient();

  const { error, data } = await supabase.storage
    .from(bucketName)
    .remove([path]);

  console.log(data);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getImageUrl = async (path: string, bucketName: string) => {
  const supabase = createClient();

  const { data } = await supabase.storage.from(bucketName).getPublicUrl(path);

  return data.publicUrl;
};
