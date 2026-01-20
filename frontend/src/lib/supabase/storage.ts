import { createClient } from './browserClient'; // lib/supabase/storage.ts - Client-side upload

export const buckets = {
  LISTING_IMAGES_BUCKET: 'listing_image',
  USER_PROFILE_IMAGE_BUCKET: 'user_profile_image',
  VENDOR_PROFILE_IMAGE_BUCKET: 'vendor_profile_image',
} as const;

export const uploadImage = async (
  file: File,
  resourceId: string,
  bucketName: keyof typeof buckets
) => {
  // Validate file size/type on client
  if (file.size > 5 * 1024 * 1024) throw new Error('File too large');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Invalid file type');
  }

  const supabase = createClient();
  const filename = safeName(`${file.name}`);

  const { data, error } = await supabase.storage
    .from(buckets[bucketName])
    .upload(`${resourceId}/${filename}`, file, { upsert: true });

  if (error) {
    throw error;
  }

  return data.path;
};

export const deleteImage = async (
  path: string,
  bucketName: keyof typeof buckets
) => {
  console.log('Deleting image at path:', path);
  const supabase = createClient();

  const { error } = await supabase.storage
    .from(buckets[bucketName])
    .remove([path]);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getImageUrl = async (
  path: string,
  bucketName: keyof typeof buckets
) => {
  const supabase = createClient();

  const { data } = await supabase.storage
    .from(buckets[bucketName])
    .getPublicUrl(path);

  return data.publicUrl;
};

/**
 * Generates a safe filename by removing unsafe characters and normalizing whitespace.
 * Keeps file extension intact.
 */
export function safeName(filename: string): string {
  const parts = filename.split('.');
  if (parts.length < 2) {
    // No extension, just sanitize the whole string
    return filename
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');
  }
  const ext = parts.pop();
  const base = parts.join('.');
  const safeBase = base
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return `${safeBase}.${ext}`;
}
