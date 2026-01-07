import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME}`,
        port: '',
        pathname: '/storage/v1/object/public/user_profile_image/**',
      },
    ],
  },
};

export default nextConfig;
