'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/supabase/storage';
import { useState, useEffect } from 'react';

export const LogoDisplay = ({ firmLogo }: { firmLogo: string | null }) => {
  const [logoUrl, setLogoUrl] = useState<string>('/undraw_approve.svg');

  useEffect(() => {
    const setLogo = async () => {
      if (!firmLogo) return;
      const url = await getImageUrl(firmLogo, 'VENDOR_PROFILE_IMAGE_BUCKET');
      if (url) {
        setLogoUrl(url);
      }
    };

    setLogo();
  }, [firmLogo]);

  return (
    <div className=' rounded-md overflow-hidden shrink-0 relative w-24 h-24'>
      <Image
        alt="Vendor firm's profile image"
        src={logoUrl}
        fill
        className='object-cover'
      />
    </div>
  );
};
