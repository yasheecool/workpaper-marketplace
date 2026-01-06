import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hyhjcbzpcnnvbrdrjrbn.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
