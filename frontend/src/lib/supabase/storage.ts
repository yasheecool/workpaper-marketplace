import { createClient } from './browserClient'; // lib/supabase/storage.ts - Client-side upload

export const uploadProfileImage = async (file: File, userId: string) => {
  // Validate file size/type on client
  if (file.size > 5 * 1024 * 1024) throw new Error('File too large');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Invalid file type');
  }

  const supabase = createClient();
  const filename = `profile-image`;

  const { data, error } = await supabase.storage
    .from('user_profile_image')
    .upload(`${userId}/${filename}`, file, { upsert: true });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data.path;
};

export const deleteProfileImage = async (path: string) => {
  const supabase = createClient();

  const { error, data } = await supabase.storage
    .from('user_profile_image')
    .remove([path]);

  console.log(data);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getProfileImageUrl = async (path: string) => {
  const supabase = createClient();

  const { data } = await supabase.storage
    .from('user_profile_image')
    .getPublicUrl(path);

  return data.publicUrl;
};
