/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adczmndslhsvhgaxovxw.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
        search: ''
      }
    ]
  },
  output: 'export'
};

export default nextConfig;
